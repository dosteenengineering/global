import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/solutions/:id/:service",
        destination: "/solutions/:service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
