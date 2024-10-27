/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configure image optimization
  images: {
    unoptimized: true,
  },

  // Add environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Configure redirects
  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
