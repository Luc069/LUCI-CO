import Image from "next/image";

import type { Locale } from "@/lib/locale";

const footerCopy = {
  si: {
    addressLabel: "Sedež:",
    emailLabel: "E-pošta:",
    phoneLabel: "Telefon:",
    tagline:
      "Custom AI sistemi za podjetja, ki so prerasla ročno delo in improvizirane procese.",
  },
  en: {
    addressLabel: "Registered office:",
    emailLabel: "Email:",
    phoneLabel: "Phone:",
    tagline:
      "Custom AI systems for companies that have outgrown manual work and improvised processes.",
  },
} satisfies Record<
  Locale,
  {
    addressLabel: string;
    emailLabel: string;
    phoneLabel: string;
    tagline: string;
  }
>;

export function SiteFooter({ locale = "si" }: { locale?: Locale }) {
  const copy = footerCopy[locale];

  return (
    <footer className="mx-auto max-w-7xl border-x-0 border-b border-[#e6ebf1] bg-white md:border-x">
      <div className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <a href="#" aria-label="LUCI&CO home" className="inline-flex items-center">
            <Image
              src="/luci-and-co-logo.svg"
              alt="LUCI&CO"
              width={625}
              height={93}
              className="h-[26px] w-auto"
            />
          </a>
          <p className="mt-5 max-w-lg font-sans text-base font-medium leading-[1.45] text-black/60">
            {copy.tagline}
          </p>
        </div>
      </div>

      <div className="grid gap-4 px-6 py-5 sm:px-10 md:grid-cols-[1fr_auto] lg:px-16">
        <p className="font-sans text-sm font-medium text-black/45">© 2026 LUCI&CO</p>
        <address className="max-w-2xl font-sans text-xs font-medium not-italic leading-[1.55] text-black/45 md:text-right">
          <p>LUCI &amp; CO, računalniške in druge storitve, Lucian Horvat s.p.</p>
          <p>{copy.addressLabel} Štihova ulica 13, 1000 Ljubljana</p>
          <p>
            {copy.emailLabel}{" "}
            <a
              href="mailto:contact@luciand.co"
              className="transition-colors hover:text-[#635bff]"
            >
              contact@luciand.co
            </a>
          </p>
          <p>
            {copy.phoneLabel}{" "}
            <a
              href="tel:+38631734397"
              className="transition-colors hover:text-[#635bff]"
            >
              +386 31 734 397
            </a>
          </p>
        </address>
      </div>
    </footer>
  );
}
