// Extend Cloudflare environment types with custom bindings
declare global {
  interface CloudflareEnv {
    DB: D1Database;
    ANALYTICS: AnalyticsEngineDataset;
  }
}

export {};
