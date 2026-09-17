import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  experimental: { globalNotFound: true },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
