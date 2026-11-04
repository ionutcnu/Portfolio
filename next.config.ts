import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
    ];
  },
  // Enable server-side features for API routes and SSE
  // Note: Cloudflare Pages supports this via @cloudflare/next-on-pages
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "a.basemaps.cartocdn.com",
      },
      {
        protocol: "https",
        hostname: "b.basemaps.cartocdn.com",
      },
      {
        protocol: "https",
        hostname: "c.basemaps.cartocdn.com",
      },
      {
        protocol: "https",
        hostname: "d.basemaps.cartocdn.com",
      },
      {
        protocol: "https",
        hostname: "cartodb-basemaps-*.global.ssl.fastly.net",
      },
      {
        protocol: "https",
        hostname: "tile.openstreetmap.org",
      },
    ],
  },
  // Disable image optimization for map tiles
  experimental: {
    optimizePackageImports: ["leaflet"],
  },
};

export default nextConfig;
