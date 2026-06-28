import Image from "next/image";

import type { Locale } from "@/lib/locale";

const finalOutcomeCopy = {
  si: {
    body: "Manj ročnega dela. Manj izgubljenega časa. Več prostora za rast.",
    emphasis: "Z boljšim sistemom.",
    headline: "Na koncu vaše podjetje deluje hitreje, pametneje.",
  },
  en: {
    body: "Less manual work. Less lost time. More room to grow.",
    emphasis: "With a better system.",
    headline: "In the end, your company runs faster and smarter.",
  },
} satisfies Record<
  Locale,
  {
    body: string;
    emphasis: string;
    headline: string;
  }
>;

export function FinalOutcomeSection({ locale = "si" }: { locale?: Locale }) {
  const copy = finalOutcomeCopy[locale];

  return (
    <div id="rezultat" className="mx-auto grid max-w-7xl scroll-mt-6 min-w-0 border-x-0 border-b border-[#e6ebf1] md:border-x lg:grid-cols-2">
      <div className="flex min-w-0 items-center border-b border-[#e6ebf1] px-6 py-10 sm:px-10 md:py-12 lg:border-b-0 lg:border-r lg:px-16 lg:py-14">
        <div className="max-w-2xl text-left">
          <p className="font-heading text-4xl font-extrabold leading-[1.05] tracking-normal text-black sm:text-5xl lg:text-6xl">
            {copy.headline}
          </p>

          <div className="mt-8 space-y-6 font-sans text-xl font-medium leading-[1.35] text-black/68 sm:text-2xl">
            <p>{copy.body}</p>
            <p className="font-semibold text-black/78">{copy.emphasis}</p>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 items-center justify-center overflow-hidden px-6 py-6 sm:px-10 md:py-8 lg:px-16 lg:py-10">
        <div className="relative w-full max-w-[640px]">
          <Image
            src="/assets/final-outcome-growth.png"
            alt="Business growth outcome visual"
            width={1254}
            height={1254}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
