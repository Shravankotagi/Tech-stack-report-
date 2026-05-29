import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  serverExternalPackages: ['@prisma/client'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'enlightlab.com' },
    ],
  },
}

export default nextConfig