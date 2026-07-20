import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "transfer.tryasp.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
