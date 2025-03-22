import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        hostname: "fastly.picsum.photos",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
