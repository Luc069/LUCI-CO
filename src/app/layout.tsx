import { Geist, Inter } from "next/font/google";
import { headers } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/locale";
import { createLocalizedMetadata, localizedSeo } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata = createLocalizedMetadata(DEFAULT_LOCALE);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get("x-luci-locale");
  const locale: Locale = isLocale(localeHeader) ? localeHeader : DEFAULT_LOCALE;

  return (
    <html
      lang={localizedSeo[locale].lang}
      className={`${inter.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
