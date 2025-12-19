import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable server-side features for API routes and SSE
  // Note: Cloudflare Pages supports this via @cloudflare/next-on-pages
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.basemaps.cartocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'cartodb-basemaps-*.global.ssl.fastly.net',
      },
      {
        protocol: 'https',
        hostname: 'tile.openstreetmap.org',
      },
    ],
  },
  // Disable image optimization for map tiles
  experimental: {
    optimizePackageImports: ['leaflet'],
  },
};

export default nextConfig;
