
import type { Metadata, Viewport } from "next";
import { Oswald, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import CursorGlow from "./components/CursorGlow";
import { SmoothScroll } from "./components/SmoothScroll";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-oswald",
});

const siteUrl = "https://sabihakim.github.io/HakimPortfolio";
const title = "Hakim Sabi — Développeur Fullstack";
const description =
  "Portfolio de RAKOTOALIMANANA Ny Harijaona Hakim Sabi, développeur fullstack basé à Madagascar. Next.js, React, Laravel, Spring Boot — sites, ERP et applications web sur mesure.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Hakim Sabi",
  },
  description,
  keywords: [
    "Hakim Sabi",
    "Rakotoalimanana",
    "développeur fullstack",
    "développeur web Madagascar",
    "Next.js",
    "React",
    "Laravel",
    "Spring Boot",
    "portfolio développeur",
  ],
  authors: [{ name: "RAKOTOALIMANANA Ny Harijaona Hakim Sabi" }],
  creator: "Hakim Sabi",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Hakim Sabi — Portfolio",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: `${siteUrl}/icon`,
    apple: `${siteUrl}/apple-icon`,
  },
};

export const viewport: Viewport = {
  themeColor: "#090a0b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${oswald.variable} bg-background text-foreground overflow-x-hidden font-sans`}
      >
        <CursorGlow />
        <SmoothScroll>
          <Header />
          <div className="relative z-10 animate-page-in">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
