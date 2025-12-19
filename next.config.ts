import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable server-side features for API routes and SSE
  // Note: Cloudflare Pages supports this via @cloudflare/next-on-pages

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
