import { PhoneCall } from "lucide-react";

import { CalendlyModalButton } from "@/components/calendly/calendly-modal";
import { Marquee } from "@/components/ui/marquee";
import type { Locale } from "@/lib/locale";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Marko Novak",
    username: "@marko.novak",
    body: {
      si: "Prišli smo s procesom, ki je bil razbit na več strani. Odšli smo s sistemom, ki ga ekipa dejansko uporablja.",
      en: "We came in with a process that was scattered across too many places. We left with a system our team actually uses.",
    },
    img: "https://avatar.vercel.sh/marko-novak",
  },
  {
    name: "Tina Kovač",
    username: "@tina.kovac",
    body: {
      si: "Najboljša stvar ni bila samo tehnologija. Bila je jasnost, kaj sploh moramo zgraditi.",
      en: "The best part wasn’t just the technology. It was the clarity on what actually needed to be built.",
    },
    img: "https://avatar.vercel.sh/tina-kovac",
  },
  {
    name: "Andrej Horvat",
    username: "@andrej.horvat",
    body: {
      si: "Nismo potrebovali še enega orodja. Potrebovali smo sistem okoli našega načina dela.",
      en: "We didn’t need another tool. We needed a system built around the way we work.",
    },
    img: "https://avatar.vercel.sh/andrej-horvat",
  },
  {
    name: "Sara Krajnc",
    username: "@sara.krajnc",
    body: {
      si: "Prvič smo imeli občutek, da nekdo razume naš proces, preden začne govoriti o rešitvi.",
      en: "For the first time, we felt like someone understood our process before talking about the solution.",
    },
    img: "https://avatar.vercel.sh/sara-krajnc",
  },
  {
    name: "Petra Gorenc",
    username: "@petra.gorenc",
    body: {
      si: "Veliko stvari smo prej držali v glavah. Zdaj ima delo veliko bolj jasen tok.",
      en: "A lot of our work used to live in people’s heads. Now it has a much clearer flow.",
    },
    img: "https://avatar.vercel.sh/petra-gorenc",
  },
  {
    name: "Gašper Vidmar",
    username: "@gasper.vidmar",
    body: {
      si: "Prišli smo z idejo. LUCI&CO jo je spremenil v sistem, ki ga lahko vsak dan uporabljamo.",
      en: "We came in with an idea. LUCI&CO turned it into a system we can use every day.",
    },
    img: "https://avatar.vercel.sh/gasper-vidmar",
  },
  {
    name: "Nina Repič",
    username: "@nina.repic",
    body: {
      si: "Nismo vedeli točno, kaj potrebujemo. Vedeli smo samo, da trenutni način dela ne zdrži več.",
      en: "We didn’t know exactly what we needed. We just knew our current way of working couldn’t hold anymore.",
    },
    img: "https://avatar.vercel.sh/nina-repic",
  },
  {
    name: "Žan Kocjan",
    username: "@zan.kocjan",
    body: {
      si: "Sistem nam ni samo prihranil časa. Spremenil je način, kako ekipa razmišlja o delu.",
      en: "The system didn’t just save us time. It changed how our team thinks about the work.",
    },
    img: "https://avatar.vercel.sh/zan-kocjan",
  },
  {
    name: "Iva Prevc",
    username: "@iva.prevc",
    body: {
      si: "Namesto da vsak teden popravljamo isti problem, ga zdaj sistem reši v ozadju.",
      en: "Instead of fixing the same problem every week, the system now handles it in the background.",
    },
    img: "https://avatar.vercel.sh/iva-prevc",
  },
  {
    name: "Domen Šuštar",
    username: "@domen.sustar",
    body: {
      si: "LUCI&CO ni prišel z generično rešitvijo. Sistem je bil zgrajen okoli našega poslovanja.",
      en: "LUCI&CO didn’t come in with a generic solution. The system was built around our business.",
    },
    img: "https://avatar.vercel.sh/domen-sustar",
  },
  {
    name: "Anja Tomšič",
    username: "@anja.tomsic",
    body: {
      si: "Ekipa zdaj manj časa izgublja z vprašanji, kaj je naslednji korak. Sistem to pokaže sam.",
      en: "The team now spends less time asking what the next step is. The system shows it automatically.",
    },
    img: "https://avatar.vercel.sh/anja-tomsic",
  },
  {
    name: "Nejc Kastelic",
    username: "@nejc.kastelic",
    body: {
      si: "Ni bilo občutka, da kupujemo “AI”. Imeli smo občutek, da končno gradimo sistem, ki ga naše podjetje potrebuje.",
      en: "It didn’t feel like we were buying “AI.” It felt like we were finally building the system our company needed.",
    },
    img: "https://avatar.vercel.sh/nejc-kastelic",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const finalCtaCopy = {
  si: {
    button: "Rezervirajte brezplačen pogovor",
    headline:
      "Nekdo vam je nekoč rekel, da se v vašem poslu pač tako dela.",
    subheadline: "Mi zgradimo sistem, ki to spremeni.",
  },
  en: {
    button: "Book a free call",
    headline: "Someone once told you this is just how your business works.",
    subheadline: "We build the system that changes that.",
  },
} satisfies Record<
  Locale,
  {
    button: string;
    headline: string;
    subheadline: string;
  }
>;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function ReviewCard({
  body,
  locale,
  name,
  username,
}: (typeof reviews)[number] & { locale: Locale }) {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 transition-colors",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black font-sans text-xs font-semibold text-white">
          {getInitials(name)}
        </div>
        <div className="flex flex-col">
          <figcaption className="font-sans text-sm font-medium text-black">
            {name}
          </figcaption>
          <p className="font-sans text-xs font-medium text-black/40">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 font-sans text-sm leading-[1.42] text-black/70">
        {body[locale]}
      </blockquote>
    </figure>
  );
}

export function FinalCtaSection({ locale = "si" }: { locale?: Locale }) {
  const copy = finalCtaCopy[locale];

  return (
    <div className="mx-auto overflow-hidden border-x-0 border-[#e6ebf1] py-16 md:border-x md:py-20 lg:max-w-7xl lg:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center sm:px-10 lg:px-16">
        <p className="font-heading text-3xl font-extrabold leading-[1.08] tracking-normal text-black sm:text-4xl lg:text-5xl">
          {copy.headline}
        </p>

        <p className="mt-5 max-w-2xl font-sans text-xl font-medium leading-[1.35] text-black/68 sm:text-2xl">
          {copy.subheadline}
        </p>

        <div className="mt-8 flex">
          <CalendlyModalButton
            size="lg"
            className="font-sans text-sm font-medium [--speed:5s]"
          >
            <PhoneCall className="size-4" aria-hidden="true" />
            {copy.button}
          </CalendlyModalButton>
        </div>
      </div>

      <div className="relative mt-14 flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee
          pauseOnHover
          className="p-0 [--duration:42s]"
          aria-label="Mnenja strank"
        >
          {firstRow.map((review) => (
            <ReviewCard key={review.username} locale={locale} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="mt-4 p-0 [--duration:42s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} locale={locale} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" />
      </div>
    </div>
  );
}
