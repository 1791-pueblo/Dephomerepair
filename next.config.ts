import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The internal lead-qualifier tool stays reachable but is kept out of search results.
  async headers() {
    return [
      {
        source: '/lead-qualifier',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/user-attachments/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/1791-pueblo/Dephomerepair/**',
      },
    ],
  },
};

export default nextConfig;
