import type { NextConfig } from "next";

// Sur Vercel : site à la racine du domaine.
// Sur GitHub Pages : servi depuis /HakimPortfolio/, d'où le basePath.
const isGitHubPages = process.env.NODE_ENV === "production" && !process.env.VERCEL;
const basePath = isGitHubPages ? "/HakimPortfolio" : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages && { output: "export" as const, trailingSlash: true }),
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isGitHubPages,
  },
};

export default nextConfig;