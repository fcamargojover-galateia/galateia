import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  webpack: (config) => {
    config.externals.push('canvas', 'jsdom')
    return config
  },
}

export default nextConfig
