
import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
// Type-only/side-effect CSS import: suppress missing type declarations
// @ts-expect-error: Cannot find module or type declarations for side-effect import of './globals.css'
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

export const metadata: Metadata = {
  title: "Hakim - Portfolio",
  description: "Développeur ",
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
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
