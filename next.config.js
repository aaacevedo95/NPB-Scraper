const isProd = process.env.NODE_ENV === "production";

// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

// Configuration options for Next.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export", // Enable static export (required for GitHub Pages)
  basePath: isProd ? "/your-repo-name" : "",
  assetPrefix: isProd ? "/your-repo-name/" : "",
};

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig);
