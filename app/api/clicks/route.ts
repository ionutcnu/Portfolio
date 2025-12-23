// Server-Sent Events endpoint for real-time click counter with Cloudflare D1
export const dynamic = 'force-dynamic';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createCounterService } from '@/lib/d1-counter';

export async function GET() {
  const db = getCloudflareContext().env.DB as D1Database;
  const counter = createCounterService(db);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let isClosed = false;
      let localInterval: ReturnType<typeof setInterval>;

      const sendUpdate = async () => {
        if (!isClosed) {
          try {
            const clicks = await counter.getCount('global-clicks');
            const data = `data: ${JSON.stringify({
              clicks,
              timestamp: Date.now(),
            })}\n\n`;
            controller.enqueue(encoder.encode(data));
          } catch (error) {
            isClosed = true;
            controller.close();
          }
        }
      };

      // Send initial state
      await sendUpdate();

      // Send updates every second
      localInterval = setInterval(async () => {
        if (isClosed) {
          clearInterval(localInterval);
          return;
        }
        await sendUpdate();
      }, 1000);

      // Cleanup on connection close
      return () => {
        isClosed = true;
        clearInterval(localInterval);
      };
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
