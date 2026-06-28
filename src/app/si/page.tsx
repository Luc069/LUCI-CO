import type { Metadata } from "next";

import { createLocalizedMetadata } from "@/lib/seo";
import { HomePage } from "../home-page";

export const metadata: Metadata = createLocalizedMetadata("si");

export default function SlovenianHome() {
  return <HomePage locale="si" />;
}
