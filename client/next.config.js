/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, './*'),
      };
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
};
  
module.exports = nextConfig