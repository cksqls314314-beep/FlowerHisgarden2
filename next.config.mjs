import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid invalid experimental flags
  experimental: {},
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(process.cwd()),
    };
    return config;
  },
};

export default nextConfig;
