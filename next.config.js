/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = nextConfig;

module.exports = {
    nextConfig,
    experimental: {
      appDir: true,
    },
    async redirects() {
      return [];
    },
    async rewrites() {
      return [];
    },
    async headers() {
      return [];
    },
  };