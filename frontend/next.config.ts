import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN_NAME! ?? 'localhost'],
  },
};

export default nextConfig;
