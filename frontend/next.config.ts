import type { NextConfig } from 'next';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol:
          process.env.NEXT_PUBLIC_ENABLED_PROTO === 'https' ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_DOMAIN_NAME ?? '127.0.0.1',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
