import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image only optimizes images from hosts we explicitly allow.
    // The demo photos come from Pexels. When you host your own product
    // photos (or use a CDN), add that hostname here instead.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;