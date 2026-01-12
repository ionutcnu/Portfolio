// GET endpoint for visitor statistics
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createVisitorService } from '@/lib/visitors';
import { getCached } from '@/lib/cache';

export const revalidate = 300; // ISR: 5 minute cache

export async function GET() {
  try {
    // Use KV cache with 5-minute TTL
    const stats = await getCached(
      {
        key: 'visitors:stats:v1',
        ttl: 300, // 5 minutes
        staleWhileRevalidate: 600, // Serve stale for up to 10 minutes total
      },
      async () => {
        const { env } = await getCloudflareContext({ async: true });
        const db = env.DB as D1Database;
        const visitors = createVisitorService(db);

        // Use batched query (1 query instead of 2)
        return await visitors.getBatchedStats();
      }
    );

    return Response.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Failed to fetch visitor stats:', error);
    return Response.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
