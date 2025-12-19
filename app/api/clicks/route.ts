// Server-Sent Events endpoint for real-time click counter
export const dynamic = 'force-dynamic';

let globalClicks = 750362; // Starting count (inspired by Nyx)

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      let isClosed = false;

      const sendUpdate = () => {
        // Check if controller is still open before sending
        if (!isClosed) {
          try {
            const data = `data: ${JSON.stringify({ clicks: globalClicks, timestamp: Date.now() })}\n\n`;
            controller.enqueue(encoder.encode(data));
          } catch (error) {
            // Controller is closed, stop sending
            isClosed = true;
          }
        }
      };

      // Send initial state
      sendUpdate();

      // Simulate global clicks from other visitors (every 3-5 seconds)
      const interval = setInterval(() => {
        if (isClosed) {
          clearInterval(interval);
          return;
        }
        // Random increment between 1-8 clicks
        globalClicks += Math.floor(Math.random() * 8) + 1;
        sendUpdate();
      }, Math.floor(Math.random() * 2000) + 3000); // 3-5 seconds

      // Cleanup on connection close
      return () => {
        isClosed = true;
        clearInterval(interval);
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
