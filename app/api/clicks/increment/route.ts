// POST endpoint for incrementing the click counter
export const dynamic = 'force-dynamic';

// Import the global counter (shared with SSE route)
// Note: In production, this should use a database or Redis
let clicks = 750362;

export async function POST() {
  clicks++;

  return Response.json({
    success: true,
    clicks
  });
}

export async function GET() {
  return Response.json({ clicks });
}
