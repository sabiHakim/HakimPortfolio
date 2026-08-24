import type { NextConfig } from "next";

// Le site est publié sur https://sabihakim.github.io/HakimPortfolio/ (pas de domaine
// personnalisé), donc GitHub Pages le sert depuis un sous-chemin : sans basePath,
// toutes les ressources en chemin absolu (/favicon.ico, /cv_Hakim.pdf, ...) 404ent.
// Actif uniquement au build de prod : en dev, on veut rester sur localhost:3000/.
const basePath = process.env.NODE_ENV === "production" ? "/HakimPortfolio" : "";

const nextConfig: NextConfig = {
  output: "export",           // ← C'EST TOUT CE QU'IL FAUT
  trailingSlash: true,        // évite les 404 sur GitHub Pages
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
