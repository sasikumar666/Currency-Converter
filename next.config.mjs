/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Currency-Converter',
  assetPrefix: '/Currency-Converter/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
