// POST endpoint for incrementing the click counter with Cloudflare D1
export const dynamic = 'force-dynamic';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createCounterService, getClientIP } from '@/lib/d1-counter';
import { createAnalyticsService, type ClickEventData } from '@/lib/analytics';

export async function POST(request: Request) {
  const env = getCloudflareContext().env;
  const db = env.DB as D1Database;
  const analytics = env.ANALYTICS as AnalyticsEngineDataset;

  const counter = createCounterService(db);

  // Rate limiting
  const ip = getClientIP(request);
  const allowed = await counter.checkRateLimit(ip);

  if (!allowed) {
    return Response.json(
      { error: 'Rate limit exceeded. Max 30 requests per 10 seconds.' },
      { status: 429 }
    );
  }

  // Parse client data (optional - client can send metadata)
  let clientData: ClickEventData = {};
  try {
    const body = await request.json();
    clientData = body as ClickEventData;
  } catch {
    // No body or invalid JSON - that's fine, track without client data
  }

  // Track analytics (comprehensive data, doesn't pollute D1)
  const cfContext = getCloudflareContext();
  const analyticsService = createAnalyticsService(analytics, request, cfContext.cf);
  if (analyticsService) {
    await analyticsService.trackClick(clientData);
  }

  // Increment counter (only counter in D1, keeping it clean)
  const clicks = await counter.increment('global-clicks');

  return Response.json({
    success: true,
    clicks,
  });
}

export async function GET() {
  const db = getCloudflareContext().env.DB as D1Database;
  const counter = createCounterService(db);

  const clicks = await counter.getCount('global-clicks');
  return Response.json({ clicks });
}
