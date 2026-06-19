import Image from "next/image";

export function SiteFooter() {
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
            AI sistemi, aplikacije in avtomatizacije za podjetja, ki so
            prerasla ročno delo.
          </p>
        </div>
      </div>

      <div className="grid gap-4 border-t border-[#e6ebf1] px-6 py-5 sm:px-10 md:grid-cols-[1fr_auto] lg:px-16">
        <p className="font-sans text-sm font-medium text-black/45">© 2026 LUCI&CO</p>
        <address className="max-w-2xl font-sans text-xs font-medium not-italic leading-[1.55] text-black/45 md:text-right">
          <p>LUCI &amp; CO, računalniške in druge storitve, Lucian Horvat s.p.</p>
          <p>Sedež: Štihova ulica 13, 1000 Ljubljana</p>
          <p>
            E-pošta:{" "}
            <a
              href="mailto:contact@luciand.co"
              className="transition-colors hover:text-[#635bff]"
            >
              contact@luciand.co
            </a>
          </p>
          <p>
            Telefon:{" "}
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
