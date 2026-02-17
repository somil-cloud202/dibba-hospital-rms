/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/confidential',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
