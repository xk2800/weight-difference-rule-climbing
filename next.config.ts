// next.config.ts
import type { NextConfig } from "next";
import withPWA from "next-pwa";

// Initialize PWA configuration
const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* Your existing Next.js config options here */
};

// Export the combined configuration
export default pwaConfig(nextConfig);