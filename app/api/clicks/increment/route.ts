// POST endpoint for incrementing the click counter
export const dynamic = 'force-dynamic';

import { getClickCount, incrementClickCount } from '@/lib/clicksState';

export async function POST() {
  const clicks = incrementClickCount();

  return Response.json({
    success: true,
    clicks
  });
}

export async function GET() {
  return Response.json({ clicks: getClickCount() });
}
