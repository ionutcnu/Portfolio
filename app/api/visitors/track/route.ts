// POST endpoint for tracking visitor sessions
export const dynamic = 'force-dynamic';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createVisitorService } from '@/lib/visitors';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { sessionId?: string };
    const { sessionId } = body;

    if (!sessionId || typeof sessionId !== 'string') {
      return Response.json(
        { error: 'Valid session ID required' },
        { status: 400 }
      );
    }

    const env = getCloudflareContext().env;
    const db = env.DB as D1Database;
    const visitors = createVisitorService(db);

    await visitors.trackVisitor(sessionId);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to track visitor:', error);
    return Response.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}
