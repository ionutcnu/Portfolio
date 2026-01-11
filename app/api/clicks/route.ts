// Server-Sent Events endpoint for real-time click counter with Cloudflare KV
export const dynamic = 'force-dynamic';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createCounterService } from '@/lib/d1-counter';

const KV_UPDATE_KEY = 'clicks:last-update';

export async function GET() {
  const { env } = await getCloudflareContext();
  const db = env.DB as D1Database;
  const kv = env.KV as KVNamespace;
  const counter = createCounterService(db);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let isClosed = false;
      let localInterval: ReturnType<typeof setInterval>;
      let lastTimestamp = 0;

      const sendUpdate = async () => {
        if (isClosed) return;

        try {
          // Read from KV instead of D1 (much faster, < 1ms vs 50-100ms)
          const update = await kv.get(KV_UPDATE_KEY, { type: 'json' }) as { count: number; timestamp: number } | null;

          if (update) {
            // Only send update if data actually changed
            if (update.timestamp > lastTimestamp) {
              lastTimestamp = update.timestamp;
              const data = `data: ${JSON.stringify({
                clicks: update.count,
                timestamp: update.timestamp,
              })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          } else {
            // Fallback to D1 if KV is empty (first run)
            const clicks = await counter.getCount('global-clicks');
            const data = `data: ${JSON.stringify({
              clicks,
              timestamp: Date.now(),
            })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        } catch (error) {
          console.error('[SSE] Error sending update:', error);
          isClosed = true;
          controller.close();
        }
      };

      // Send initial state
      await sendUpdate();

      // Check KV for updates every 2 seconds (not D1!)
      // KV read = ~0.1ms CPU vs D1 query = 50-100ms CPU
      localInterval = setInterval(async () => {
        if (isClosed) {
          clearInterval(localInterval);
          return;
        }
        await sendUpdate();
      }, 2000); // Increased from 1s to 2s

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
