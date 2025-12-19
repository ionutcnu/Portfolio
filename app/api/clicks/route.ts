// Server-Sent Events endpoint for real-time click counter
export const dynamic = 'force-dynamic';

import { getClickCount, setClickCount } from '@/lib/clicksState';

// Centralized interval to prevent race conditions
let globalInterval: NodeJS.Timeout | null = null;
let connectionCount = 0;

function startGlobalUpdater() {
  if (globalInterval) return; // Already running

  globalInterval = setInterval(() => {
    // Random increment between 1-8 clicks to simulate other visitors
    const currentCount = getClickCount();
    setClickCount(currentCount + Math.floor(Math.random() * 8) + 1);
  }, Math.floor(Math.random() * 2000) + 3000); // 3-5 seconds
}

function stopGlobalUpdater() {
  if (globalInterval) {
    clearInterval(globalInterval);
    globalInterval = null;
  }
}

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      connectionCount++;
      startGlobalUpdater();

      let isClosed = false;
      let localInterval: NodeJS.Timeout;

      const sendUpdate = () => {
        if (!isClosed) {
          try {
            const data = `data: ${JSON.stringify({
              clicks: getClickCount(),
              timestamp: Date.now()
            })}\n\n`;
            controller.enqueue(encoder.encode(data));
          } catch (error) {
            isClosed = true;
          }
        }
      };

      // Send initial state
      sendUpdate();

      // Send updates periodically
      localInterval = setInterval(() => {
        if (isClosed) {
          clearInterval(localInterval);
          return;
        }
        sendUpdate();
      }, 1000);

      // Cleanup on connection close
      return () => {
        isClosed = true;
        clearInterval(localInterval);
        connectionCount--;

        // Stop global updater if no active connections
        if (connectionCount === 0) {
          stopGlobalUpdater();
        }
      };
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable buffering for Nginx
    },
  });
}
