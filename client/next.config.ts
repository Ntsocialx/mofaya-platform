import path from "node:path";
import type { NextConfig } from "next";

// Pin the monorepo root; a stray lockfile higher up (Desktop/) otherwise wins root inference.
const monorepoRoot = path.join(__dirname, "..");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: monorepoRoot,
  turbopack: { root: monorepoRoot },
};

export default nextConfig;
