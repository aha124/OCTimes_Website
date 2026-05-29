import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://octimesquartet.com";
const SITE_DESCRIPTION =
  "Four voices, twenty-plus years, one long shared trip. OC Times: 2008 International Quartet Champions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OC Times Quartet",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "OC Times Quartet",
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: "OC Times Quartet",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "OC Times Quartet",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
