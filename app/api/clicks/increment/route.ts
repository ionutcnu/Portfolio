// POST endpoint for incrementing the click counter with Cloudflare D1
export const dynamic = 'force-dynamic';

import { createCounterService, getClientIP } from '@/lib/d1-counter';

export async function POST(request: Request) {
  // @ts-ignore - Cloudflare binding
  const db = process.env.DB as D1Database | undefined;
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

  // Increment counter
  const clicks = await counter.increment('global-clicks');

  return Response.json({
    success: true,
    clicks,
  });
}

export async function GET() {
  // @ts-ignore - Cloudflare binding
  const db = process.env.DB as D1Database | undefined;
  const counter = createCounterService(db);

  const clicks = await counter.getCount('global-clicks');
  return Response.json({ clicks });
}
