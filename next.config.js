const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  basePath: isProd ? "/NPB-Scraper" : "",
  assetPrefix: isProd ? "/NPB-Scraper/" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = withPWA(nextConfig);
