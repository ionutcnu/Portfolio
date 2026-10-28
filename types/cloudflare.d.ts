// Extend Cloudflare environment types with custom bindings
declare global {
  interface CloudflareEnv {
    DB: D1Database;
    KV: KVNamespace;
    ANALYTICS: AnalyticsEngineDataset;
    COUNTER_DO: DurableObjectNamespace;
    WEATHER_API_KEY: string;
    CONTACT_RATE_LIMITER: RateLimit;
    CONTACT_ORIGIN: string;
    TURNSTILE_SITE_KEY: string;
    TURNSTILE_SECRET_KEY: string;
    CONTACT_TO_EMAIL: string;
    CONTACT_FROM_EMAIL: string;
    RESEND_API_KEY: string;
    COUNTER_BROADCAST_SECRET?: string;
  }
}

export {};
