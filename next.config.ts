/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",   // ✅ generates static HTML in /out automatically
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
