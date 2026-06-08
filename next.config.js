/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  webpack: (config) => {
    config.externals.push('canvas', 'jsdom')
    return config
  },
}
module.exports = nextConfig
