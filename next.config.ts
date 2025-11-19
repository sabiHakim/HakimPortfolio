import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isGithubPages ? "/hakim_portfolio" : "",  // ← LA LIGNE MAGIQUE
  basePath: isGithubPages ? "/hakim_portfolio" : "",     // ← ET CELLE-LÀ
};

export default nextConfig;
