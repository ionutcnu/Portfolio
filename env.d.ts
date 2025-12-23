/// <reference types="@cloudflare/workers-types" />

declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database;
  }
}
