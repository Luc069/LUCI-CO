import type { Metadata } from "next";

import { createLocalizedMetadata } from "@/lib/seo";
import { HomePage } from "../home-page";

export const metadata: Metadata = createLocalizedMetadata("en");

export default function EnglishHome() {
  return <HomePage locale="en" />;
}
