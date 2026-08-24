
import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
// import Cursor from "./components/Cursor";
import { SmoothScroll } from "./components/SmoothScroll";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${bebasNeue.variable} bg-black text-white overflow-x-hidden font-sans`}
      >
        <SmoothScroll>
          <Header />
          {/* <Cursor /> */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
