// Simple GET endpoint for current click count (used by Footer status)
export const dynamic = 'force-dynamic';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createCounterService } from '@/lib/d1-counter';

export async function GET() {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB as D1Database;
    const counter = createCounterService(db);

    const clicks = await counter.getCount('global-clicks');
    return Response.json({ clicks });
  } catch (error) {
    console.error('[Clicks API] Error:', error);
    return Response.json(
      { error: 'Failed to fetch clicks' },
      { status: 500 }
    );
  }
}
