import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",           // ← C'EST TOUT CE QU'IL FAUT
  trailingSlash: true,        // évite les 404 sur GitHub Pages
  images: {
    unoptimized: true         // obligatoire en mode statique
  },
};

export default nextConfig;
