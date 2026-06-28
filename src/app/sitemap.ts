import type { MetadataRoute } from "next";

import { languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://luciand.co/si",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: languageAlternates,
      },
    },
    {
      url: "https://luciand.co/en",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: languageAlternates,
      },
    },
  ];
}
