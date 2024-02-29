const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useDeploymentId: true,
    useDeploymentIdServerActions: true,
    serverActions: {
      bodySizeLimit: '3mb',
    },
    optimizePackageImports: ['@mindfulyze/ui', '@mindfulyze/editor', '@mindfulyze/utils'],
  },
  logging: {
    fetches: { fullUrl: true },
  },
  transpilePackages: ['@mindfulyze/ui', '@mindfulyze/editor', '@mindfulyze/utils'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

// module.exports = nextConfig
module.exports = withContentlayer(nextConfig)
