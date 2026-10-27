import type { NextConfig } from "next";

// GitHub Pages serves a project repo under /<repo>; the deploy workflow passes
// that prefix in. A <username>.github.io repo is served from the root, so it's empty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
