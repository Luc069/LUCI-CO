import type { Metadata } from "next";

import type { Locale } from "@/lib/locale";

const siteUrl = "https://luciand.co";
const siteName = "LUCI&CO";
const ogImageUrl = `${siteUrl}/og/luciand-og.png`;

export const languageAlternates = {
  sl: `${siteUrl}/si`,
  en: `${siteUrl}/en`,
  "x-default": `${siteUrl}/si`,
} as const;

export const localizedSeo = {
  si: {
    lang: "sl",
    canonical: `${siteUrl}/si`,
    title: "Custom AI sistemi za podjetja, ki so prerasla ročno delo | LUCI&CO",
    description:
      "Gradimo custom AI sisteme okoli tega, kako vaše podjetje dejansko dela. Manj ročnega dela, bolj jasni procesi in sistem, ki podjetju vrne čas.",
    openGraph: {
      title: "Custom AI sistemi, zgrajeni okoli vašega podjetja | LUCI&CO",
      description:
        "Ne dodajamo AI-ja na star način dela. Zgradimo custom sistem okoli realnega procesa podjetja.",
    },
    twitter: {
      title: "Custom AI sistemi za pametnejše delo | LUCI&CO",
      description:
        "Zgradimo sistem okoli realnega procesa podjetja — z manj ročnega dela, več jasnosti in več časa za rast.",
    },
  },
  en: {
    lang: "en",
    canonical: `${siteUrl}/en`,
    title:
      "Custom AI Systems for Companies That Have Outgrown Manual Work | LUCI&CO",
    description:
      "We build custom AI systems from the ground up around how your company actually works. Less manual work, clearer processes, and systems that give time back to the business.",
    openGraph: {
      title: "Custom AI Systems Built Around Your Business | LUCI&CO",
      description:
        "We don’t add AI on top of old workflows. We build custom systems around the way your company actually works.",
    },
    twitter: {
      title: "Custom AI Systems for Smarter Work | LUCI&CO",
      description:
        "We build systems around real business processes — with less manual work, more clarity, and more time to grow.",
    },
  },
} as const satisfies Record<
  Locale,
  {
    lang: "sl" | "en";
    canonical: string;
    title: string;
    description: string;
    openGraph: {
      title: string;
      description: string;
    };
    twitter: {
      title: string;
      description: string;
    };
  }
>;

export function createLocalizedMetadata(locale: Locale): Metadata {
  const seo = localizedSeo[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    manifest: "/site.webmanifest",
    alternates: {
      canonical: seo.canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: seo.canonical,
      siteName,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: [ogImageUrl],
    },
  };
}
