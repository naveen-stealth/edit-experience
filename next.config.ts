import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Shopify CDN + Entrupy/authentication provider assets, once wired up.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
    qualities: [40, 60, 75, 90, 100],
  },
};

export default nextConfig;
