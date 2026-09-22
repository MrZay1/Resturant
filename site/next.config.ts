import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  // Lets the dev server accept requests when you open it from another device
  // on your network (e.g. http://192.168.1.220:3000) instead of localhost.
  allowedDevOrigins: ["192.168.1.220", "localhost"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
