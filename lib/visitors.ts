// Visitor Tracking Service with D1
// Tracks unique visitors by session ID

interface VisitorService {
  trackVisitor(sessionId: string): Promise<void>;
  getTotalVisitors(): Promise<number>;
  getTodayVisitors(): Promise<number>;
}

// In-memory fallback for development
class InMemoryVisitors implements VisitorService {
  private visitors = new Set<string>();
  private todayVisitors = new Set<string>();
  private lastReset = new Date().toDateString();

  async trackVisitor(sessionId: string): Promise<void> {
    const today = new Date().toDateString();

    // Reset today's count if it's a new day
    if (today !== this.lastReset) {
      this.todayVisitors.clear();
      this.lastReset = today;
    }

    this.visitors.add(sessionId);
    this.todayVisitors.add(sessionId);
  }

  async getTotalVisitors(): Promise<number> {
    return this.visitors.size;
  }

  async getTodayVisitors(): Promise<number> {
    return this.todayVisitors.size;
  }
}

// D1 Database Visitor Tracking (production)
class D1Visitors implements VisitorService {
  constructor(private db: D1Database) {}

  async trackVisitor(sessionId: string): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Insert or update visitor record
    await this.db
      .prepare(`
        INSERT INTO visitors (session_id, first_visit, last_visit, visit_date)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(session_id) DO UPDATE SET
          last_visit = ?,
          visit_date = ?
      `)
      .bind(sessionId, now, now, today, now, today)
      .run();
  }

  async getTotalVisitors(): Promise<number> {
    const result = await this.db
      .prepare('SELECT COUNT(DISTINCT session_id) as count FROM visitors')
      .first<{ count: number }>();

    return result?.count || 0;
  }

  async getTodayVisitors(): Promise<number> {
    const today = new Date().toISOString().split('T')[0];

    const result = await this.db
      .prepare('SELECT COUNT(DISTINCT session_id) as count FROM visitors WHERE visit_date = ?')
      .bind(today)
      .first<{ count: number }>();

    return result?.count || 0;
  }
}

// Factory function
export function createVisitorService(db?: D1Database): VisitorService {
  if (db) {
    return new D1Visitors(db);
  }
  console.warn('[Visitors] D1 database not available, using in-memory fallback');
  return new InMemoryVisitors();
}

// Helper to get or create session ID
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';

  let sessionId = localStorage.getItem('analytics-session-id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('analytics-session-id', sessionId);
  }
  return sessionId;
}
