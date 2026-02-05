/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
