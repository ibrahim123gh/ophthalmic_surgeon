import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.drbachirabiad.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.drbachirabiad.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "https://api.drbachirabiad.com/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
