import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";
const IMAGE_SERVER_HOST = process.env.IMAGE_SERVER_HOST || "localhost"

const localRemotePatterns: RemotePattern[] = [
  {
    protocol: 'http',
    hostname: IMAGE_SERVER_HOST,
    port: '3001',
    pathname: '/images/**',
  },
  {
    protocol: 'http',
    hostname: IMAGE_SERVER_HOST,
    port: '3000',
    pathname: '/images/**',
  },
  {
    protocol: 'http',
    hostname: IMAGE_SERVER_HOST,
    port: '2700',
    pathname: '/images/**',
  },
  {
    protocol: 'https',
    hostname: IMAGE_SERVER_HOST,
    pathname: '/images/**',
  }
]

const productionRemotePatterns: RemotePattern[] = [
  {
    protocol: 'https',
    hostname: IMAGE_SERVER_HOST,
    pathname: '/images/**',
  }
];

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: process.env.NODE_ENV === "development" ? localRemotePatterns : productionRemotePatterns,
    // Configure device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
