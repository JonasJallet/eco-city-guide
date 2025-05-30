/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/projects/eco-city-guide/demo",
        destination: "/home",
      },
      {
        source: "/api/:path*",
        destination: "http://back-end:4000/:path*", // Proxy to Backend
      },
    ];
  },
};
module.exports = nextConfig;
