import { AiBeamVisual } from "@/components/sections/process/ai-beam-visual";
import type { Locale } from "@/lib/locale";

const processIntroCopy = {
  si: {
    body: [
      "Kje se delo ponavlja. Kje se izgublja čas. Kje informacije niso povezane. Kateri proces je prerasel tabele, maile ali ročne korake.",
      "Lahko pridete s problemom, procesom ali idejo, ki jo želite spremeniti v delujoč sistem.",
    ],
    headline: "Najprej razumemo, kako vaše podjetje dejansko dela.",
  },
  en: {
    body: [
      "Where work repeats. Where time gets lost. Where information is disconnected. Which process has outgrown spreadsheets, emails, or manual steps.",
      "You can come with a problem, a process, or an idea you want to turn into a working system.",
    ],
    headline: "First, we understand how your company actually works.",
  },
} satisfies Record<Locale, { body: string[]; headline: string }>;

export function ProcessIntroSection({ locale = "si" }: { locale?: Locale }) {
  const copy = processIntroCopy[locale];

  return (
    <div id="kako-delamo" className="mx-auto grid max-w-7xl scroll-mt-6 min-w-0 border-x-0 border-b border-[#e6ebf1] md:border-x lg:grid-cols-2">
      <div className="flex min-w-0 items-center border-b border-[#e6ebf1] px-6 py-10 sm:px-10 md:py-12 lg:border-b-0 lg:border-r lg:px-16 lg:py-14">
        <div className="max-w-2xl">
          <p className="font-heading text-4xl font-extrabold leading-[1.05] tracking-normal text-black sm:text-5xl lg:text-6xl">
            {copy.headline}
          </p>

          <div className="mt-8 space-y-6 font-sans text-xl font-medium leading-[1.35] text-black/68 sm:text-2xl">
            {copy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-w-0 items-center overflow-hidden px-6 py-6 sm:px-10 md:py-8 lg:px-16 lg:py-10">
        <AiBeamVisual locale={locale} />
      </div>
    </div>
  );
}
