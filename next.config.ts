import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, '.');
    return config;
  }
};

export default nextConfig;
