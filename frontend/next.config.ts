import type { NextConfig } from 'next';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_DOMAIN_NAME ?? '127.0.0.1',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
