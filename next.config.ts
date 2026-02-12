import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: '',
      //   port: '',
      //   pathname: '',
      // },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '2727',
        pathname: '/assets/images/**',
      },
    ],
  }
};

export default nextConfig;
