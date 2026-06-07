/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals.push('canvas', 'jsdom');
    return config;
  },
};

module.exports = nextConfig;
