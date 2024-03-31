/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    experimental: {
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
      config.ignoreWarnings = [
        { module: /node_modules\/node-fetch\/lib\/index\.js/ },
        { file: /node_modules\/node-fetch\/lib\/index\.js/ },
      ]
      return config
    }
};
  
module.exports = nextConfig