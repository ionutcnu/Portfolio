// Cloudflare D1 Counter Service with Rate Limiting
// Supports both D1 database (production) and in-memory fallback (dev)

interface CounterService {
  getCount(id: string): Promise<number>;
  increment(id: string): Promise<number>;
  checkRateLimit(ip: string): Promise<boolean>;
}

// In-memory fallback for development (when D1 is not available)
class InMemoryCounter implements CounterService {
  private counters = new Map<string, number>();
  private rateLimits = new Map<string, { requests: number; windowStart: number }>();

  async getCount(id: string): Promise<number> {
    return this.counters.get(id) || 750950; // Default starting value
  }

  async increment(id: string): Promise<number> {
    const current = await this.getCount(id);
    const newValue = current + 1;
    this.counters.set(id, newValue);
    return newValue;
  }

  async checkRateLimit(ip: string): Promise<boolean> {
    const now = Date.now();
    const windowDuration = 10000; // 10 seconds
    const maxRequests = 30;

    const limit = this.rateLimits.get(ip);

    if (!limit || now - limit.windowStart > windowDuration) {
      // New window
      this.rateLimits.set(ip, { requests: 1, windowStart: now });
      return true;
    }

    if (limit.requests >= maxRequests) {
      return false;
    }

    limit.requests++;
    return true;
  }
}

// D1 Database Counter (production)
class D1Counter implements CounterService {
  constructor(private db: D1Database) {}

  async getCount(id: string): Promise<number> {
    const result = await this.db
      .prepare('SELECT value FROM counters WHERE id = ?')
      .bind(id)
      .first<{ value: number }>();

    return result?.value || 0;
  }

  async increment(id: string): Promise<number> {
    const now = Math.floor(Date.now() / 1000);

    // Increment or initialize counter
    await this.db
      .prepare(`
        INSERT INTO counters (id, value, created_at, updated_at)
        VALUES (?, 1, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          value = value + 1,
          updated_at = ?
      `)
      .bind(id, now, now, now)
      .run();

    // Get updated value
    return await this.getCount(id);
  }

  async checkRateLimit(ip: string): Promise<boolean> {
    const now = Math.floor(Date.now() / 1000);
    const windowDuration = 10; // 10 seconds
    const maxRequests = 30;

    // Clean up old rate limit entries
    await this.db
      .prepare('DELETE FROM rate_limits WHERE window_start < ?')
      .bind(now - windowDuration)
      .run();

    // Ensure a row exists for this IP in the current window (atomic initialization)
    await this.db
      .prepare('INSERT OR IGNORE INTO rate_limits (ip, requests, window_start) VALUES (?, 0, ?)')
      .bind(ip, now)
      .run();

    // Atomically increment if under limit (prevents race condition)
    // This single UPDATE checks IP, window validity, and request limit in one atomic operation
    const result = await this.db
      .prepare(`
        UPDATE rate_limits
        SET requests = requests + 1
        WHERE ip = ?
          AND window_start >= ?
          AND requests < ?
      `)
      .bind(ip, now - windowDuration, maxRequests)
      .run();

    // If the UPDATE affected a row, the request is allowed
    // If 0 rows changed, either limit exceeded or window expired
    return (result.meta?.changes ?? 0) > 0;
  }
}

// Factory function to create the appropriate counter service
export function createCounterService(db?: D1Database): CounterService {
  if (db) {
    return new D1Counter(db);
  }
  console.warn('[Counter] D1 database not available, using in-memory fallback');
  return new InMemoryCounter();
}

// Helper to extract client IP from request
export function getClientIP(request: Request): string {
  // Try Cloudflare headers first
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;

  // Fallback to x-forwarded-for
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }

  // Fallback to x-real-ip
  const xRealIP = request.headers.get('x-real-ip');
  if (xRealIP) return xRealIP;

  // Default fallback
  return 'unknown';
}
