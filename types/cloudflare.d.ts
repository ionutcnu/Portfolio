// Extend Cloudflare environment types with custom bindings
declare global {
  interface CloudflareEnv {
    DB: D1Database;
    ANALYTICS: AnalyticsEngineDataset;
    WEATHER_API_KEY: string;
  }
}

export {};
