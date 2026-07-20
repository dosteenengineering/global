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
  experimental:{
    serverActions:{
      bodySizeLimit:'20mb'
    }
  }
};

export default nextConfig;
