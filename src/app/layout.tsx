import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const siteUrl = "https://luciand.co";
const siteTitle = "LUCI&CO — AI sistemi za podjetja";
const siteDescription =
  "LUCI&CO gradi AI aplikacije, sisteme in avtomatizacije za podjetja, ki želijo delati hitreje, pametneje in z manj ročnega dela.";
const socialTitle = "LUCI&CO — podjetja preselimo v AI ero";
const socialDescription =
  "AI aplikacije, sistemi in avtomatizacije za podjetja, ki so prerasla ročno delo.";
const socialImage = "/og/luciand-og.png";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    url: siteUrl,
    siteName: "LUCI&CO",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "LUCI&CO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      className={`${inter.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
