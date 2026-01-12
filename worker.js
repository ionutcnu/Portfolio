/**
 * Custom Cloudflare Worker - JavaScript version
 * Implements OpenNext custom worker pattern with Durable Objects
 * Reference: https://opennext.js.org/cloudflare/howtos/custom-worker
 */

// Import CounterDO class
import { CounterDO as CounterDOClass } from './durable-objects/CounterDO.ts';

// Import OpenNext generated worker
import opennextHandler from './.open-next/worker.js';

// Export custom Durable Object
export const CounterDO = CounterDOClass;

// Re-export OpenNext built-in Durable Objects
export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from './.open-next/worker.js';

// Custom fetch handler with WebSocket support
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle WebSocket upgrade requests BEFORE passing to Next.js
    // Next.js API routes don't support protocol upgrades
    if (url.pathname === '/api/clicks/ws' && request.headers.get('Upgrade') === 'websocket') {
      try {
        // Get Durable Object stub
        const id = env.COUNTER_DO.idFromName('global-counter');
        const stub = env.COUNTER_DO.get(id);

        // Forward WebSocket upgrade to Durable Object
        return await stub.fetch(request);
      } catch (error) {
        console.error('[Worker] WebSocket upgrade failed:', error);
        return new Response('WebSocket upgrade failed: ' + error.message, {
          status: 500,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }

    // All other requests go to Next.js via OpenNext
    return opennextHandler.fetch(request, env, ctx);
  }
};
