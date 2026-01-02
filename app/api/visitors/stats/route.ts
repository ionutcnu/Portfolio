// GET endpoint for visitor statistics
export const dynamic = 'force-dynamic';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createVisitorService } from '@/lib/visitors';

export async function GET() {
  try {
    const env = getCloudflareContext().env;
    const db = env.DB as D1Database;
    const visitors = createVisitorService(db);

    const [total, today] = await Promise.all([
      visitors.getTotalVisitors(),
      visitors.getTodayVisitors(),
    ]);

    return Response.json({
      total,
      today,
    });
  } catch (error) {
    console.error('Failed to fetch visitor stats:', error);
    return Response.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
