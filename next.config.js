/** @type {import('next').NextConfig} */

const isGithubPages = process.env.NODE_ENV === 'production';
const repoName = 'koushik_portfolio'; // 🔁 change this to your repo name

const nextConfig = {
  output: 'export', 
  reactStrictMode: true,
  trailingSlash: true, // Required for static export to work properly on GitHub Pages

  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',

  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
      },
    };
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
};

module.exports = nextConfig;
