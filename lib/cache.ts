// Cloudflare KV cache utility with stale-while-revalidate support
import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface CacheOptions {
  key: string;
  ttl: number; // seconds
  staleWhileRevalidate?: number; // seconds
}

interface CachedData<T> {
  data: T;
  timestamp: number;
}

/**
 * Get data from KV cache or fetch fresh data
 * Implements stale-while-revalidate pattern for optimal performance
 */
export async function getCached<T>(
  options: CacheOptions,
  fetcher: () => Promise<T>
): Promise<T> {
  const { key, ttl, staleWhileRevalidate = 0 } = options;

  try {
    const { env } = await getCloudflareContext({ async: true });

    if (!env.KV) {
      console.warn('[Cache] KV binding not available, fetching fresh data');
      return await fetcher();
    }

    // Try to get cached data
    const cached = await env.KV.get(key, { type: 'json' }) as CachedData<T> | null;

    if (cached && cached.data) {
      const age = Date.now() - cached.timestamp;
      const freshUntil = ttl * 1000;
      const staleUntil = (ttl + staleWhileRevalidate) * 1000;

      // Data is fresh - return immediately
      if (age < freshUntil) {
        return cached.data;
      }

      // Data is stale but within revalidate window
      if (staleWhileRevalidate > 0 && age < staleUntil) {
        // Return stale data immediately, revalidate in background
        fetcher()
          .then((fresh) => {
            env.KV.put(
              key,
              JSON.stringify({
                data: fresh,
                timestamp: Date.now(),
              }),
              { expirationTtl: ttl + staleWhileRevalidate }
            ).catch((error) => {
              console.error('[Cache] Failed to update cache:', error);
            });
          })
          .catch((error) => {
            console.error('[Cache] Background revalidation failed:', error);
          });

        return cached.data;
      }
    }

    // No cache or expired - fetch fresh data
    const fresh = await fetcher();

    // Store in KV (fire-and-forget, don't block response)
    env.KV.put(
      key,
      JSON.stringify({
        data: fresh,
        timestamp: Date.now(),
      }),
      { expirationTtl: ttl + staleWhileRevalidate }
    ).catch((error) => {
      console.error('[Cache] Failed to cache data:', error);
    });

    return fresh;
  } catch (error) {
    console.error('[Cache] Error in getCached:', error);
    // Fallback to fetching fresh data
    return await fetcher();
  }
}

/**
 * Invalidate a cache entry
 */
export async function invalidateCache(key: string): Promise<void> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (env.KV) {
      await env.KV.delete(key);
    }
  } catch (error) {
    console.error('[Cache] Failed to invalidate cache:', error);
  }
}

/**
 * Set a value in KV cache
 */
export async function setCache<T>(
  key: string,
  data: T,
  ttl: number
): Promise<void> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (env.KV) {
      await env.KV.put(
        key,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        }),
        { expirationTtl: ttl }
      );
    }
  } catch (error) {
    console.error('[Cache] Failed to set cache:', error);
  }
}

/**
 * Get a value from KV cache
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env.KV) return null;

    const cached = await env.KV.get(key, { type: 'json' }) as CachedData<T> | null;
    return cached?.data || null;
  } catch (error) {
    console.error('[Cache] Failed to get cache:', error);
    return null;
  }
}
