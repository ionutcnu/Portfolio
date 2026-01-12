/**
 * Durable Object for managing WebSocket connections for real-time counter updates
 *
 * This eliminates KV polling by using true server push via WebSocket.
 * Each connected client receives instant updates when the counter changes.
 */

interface CloudflareEnv {
  DB: D1Database;
  COUNTER_BROADCAST_SECRET?: string;
}

export class CounterDO implements DurableObject {
  private state: DurableObjectState;
  private env: CloudflareEnv;
  private sessions: Set<WebSocket>;
  private lastCount: number = 0;
  private lastTimestamp: number = 0;
  private initialized: boolean = false;

  constructor(state: DurableObjectState, env: CloudflareEnv) {
    this.state = state;
    this.env = env;
    this.sessions = new Set();
  }

  /**
   * Handle incoming requests to the Durable Object
   */
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Handle WebSocket upgrade requests
    if (request.headers.get('Upgrade')?.toLowerCase().trim() === 'websocket') {
      return this.handleWebSocketUpgrade(request);
    }

    // Handle broadcast requests (from increment API)
    if (request.method === 'POST' && url.pathname === '/broadcast') {
      return this.handleBroadcast(request);
    }

    // Health check
    if (request.method === 'GET' && url.pathname === '/health') {
      return new Response(JSON.stringify({
        connections: this.sessions.size,
        status: 'healthy'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not found', { status: 404 });
  }

  /**
   * Upgrade HTTP connection to WebSocket
   */
  private async handleWebSocketUpgrade(request: Request): Promise<Response> {
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    // Accept the WebSocket connection
    server.accept();

    // Add to active sessions
    this.sessions.add(server);

    // Send current count immediately on connection
    try {
      let currentCount = this.lastCount;
      let currentTimestamp = this.lastTimestamp;

      // If we don't have cached data, fetch from D1
      if (!this.initialized) {
        const db = this.env.DB as D1Database;
        const result = await db.prepare('SELECT value FROM counters WHERE id = ?')
          .bind('global-clicks')
          .first() as { value: number } | null;

        currentCount = result?.value || 0;
        currentTimestamp = Date.now();

        // Cache for future connections
        this.lastCount = currentCount;
        this.lastTimestamp = currentTimestamp;
        this.initialized = true;
      }

      // Send initial state to new client
      if (server.readyState === WebSocket.OPEN) {
        server.send(JSON.stringify({
          clicks: currentCount,
          timestamp: currentTimestamp
        }));
      }
    } catch (error) {
      console.error('[CounterDO] Failed to send initial state:', error);
      // Don't fail the connection, client will use fallback
    }

    // Handle disconnect
    server.addEventListener('close', () => {
      this.sessions.delete(server);
      console.log(`[CounterDO] Client disconnected. Active: ${this.sessions.size}`);
    });

    server.addEventListener('error', () => {
      console.error('[CounterDO] WebSocket error occurred');
      this.sessions.delete(server);
    });

    console.log(`[CounterDO] Client connected. Active: ${this.sessions.size}`);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  /**
   * Broadcast counter update to all connected clients
   */
  private async handleBroadcast(request: Request): Promise<Response> {
    try {
      // Validate authentication header (internal API calls only)
      const authHeader = request.headers.get('X-Counter-Secret');
      const expectedSecret = this.env.COUNTER_BROADCAST_SECRET || 'internal-only';

      if (authHeader !== expectedSecret) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Unauthorized'
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { clicks, timestamp } = await request.json() as { clicks: number; timestamp: number };

      // Update cached count
      this.lastCount = clicks;
      this.lastTimestamp = timestamp;

      const message = JSON.stringify({ clicks, timestamp });
      let successCount = 0;
      let failCount = 0;

      // Broadcast to all connected WebSocket clients
      for (const ws of this.sessions) {
        try {
          // Only send if connection is fully open (not connecting/closing/closed)
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
            successCount++;
          } else if (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
            // Clean up closed/closing connections
            this.sessions.delete(ws);
            failCount++;
          }
          // Skip CONNECTING state - will receive next broadcast when open
        } catch (error) {
          console.error('[CounterDO] Failed to send to client:', error);
          this.sessions.delete(ws);
          failCount++;
        }
      }

      console.log(`[CounterDO] Broadcast: ${successCount} sent, ${failCount} failed, ${this.sessions.size} active`);

      return new Response(JSON.stringify({
        success: true,
        sent: successCount,
        failed: failCount,
        active: this.sessions.size
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('[CounterDO] Broadcast error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: String(error)
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}
