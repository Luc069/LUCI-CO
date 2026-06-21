import { PhoneCall } from "lucide-react";

import { ContactModalButton } from "@/components/sections/contact/contact-modal";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Marko Novak",
    username: "@marko.novak",
    body: "Prišel sem z idejo, odšel z sistemom ki dela namesto mene. Nisem pričakoval da bo tako hitro.",
    img: "https://avatar.vercel.sh/marko-novak",
  },
  {
    name: "Tina Kovač",
    username: "@tina.kovac",
    body: "Imeli smo Excel tabele za vse. Zdaj imamo CRM ki nam sam pove kaj narediti naslednje. Razlika je ogromna.",
    img: "https://avatar.vercel.sh/tina-kovac",
  },
  {
    name: "Andrej Horvat",
    username: "@andrej.horvat",
    body: "Skeptičen sem bil. Zdaj ne vem kako smo prej sploh delali brez tega.",
    img: "https://avatar.vercel.sh/andrej-horvat",
  },
  {
    name: "Sara Krajnc",
    username: "@sara.krajnc",
    body: "Luci&Co ni samo razvil sistem — razumel je naš business bolje kot smo ga mi sami.",
    img: "https://avatar.vercel.sh/sara-krajnc",
  },
  {
    name: "Blaž Zupan",
    username: "@blaz.zupan",
    body: "Prihranili smo 3 zaposlene. Denar gre zdaj tja kjer je pomemben.",
    img: "https://avatar.vercel.sh/blaz-zupan",
  },
  {
    name: "Maja Štefan",
    username: "@maja.stefan",
    body: "Nisem tech oseba. Sploh nisem vedela kaj točno rabim. Oni so ugotovili namesto mene.",
    img: "https://avatar.vercel.sh/maja-stefan",
  },
  {
    name: "Rok Mlinar",
    username: "@rok.mlinar",
    body: "V treh tednih smo avtomatizirali proces ki nas je jemal 20 ur na teden. 20 ur.",
    img: "https://avatar.vercel.sh/rok-mlinar",
  },
  {
    name: "Katja Prezelj",
    username: "@katja.prezelj",
    body: "Konkurenca nas je prehitevala. Zdaj je obratno.",
    img: "https://avatar.vercel.sh/katja-prezelj",
  },
  {
    name: "Luka Benedičič",
    username: "@luka.benedicic",
    body: "Mislil sem da je AI za velika podjetja. Zmotil sem se.",
    img: "https://avatar.vercel.sh/luka-benedicic",
  },
  {
    name: "Petra Gorenc",
    username: "@petra.gorenc",
    body: "Od prvega sestanka do implementacije — vse je teklo brez stresa. Rezultat pa je presekel pričakovanja.",
    img: "https://avatar.vercel.sh/petra-gorenc",
  },
  {
    name: "Gašper Vidmar",
    username: "@gasper.vidmar",
    body: "Imeli smo idejo za app že leta. V dveh mesecih je bil živ.",
    img: "https://avatar.vercel.sh/gasper-vidmar",
  },
  {
    name: "Anja Tomšič",
    username: "@anja.tomsic",
    body: "Naši prodajalci zdaj porabijo čas za prodajo, ne za administrativno delo. To je sprememba ki se pozna.",
    img: "https://avatar.vercel.sh/anja-tomsic",
  },
  {
    name: "Nejc Kastelic",
    username: "@nejc.kastelic",
    body: "Niso prišli s paketi in ceniki. Prišli so z vprašanji. To je bila razlika.",
    img: "https://avatar.vercel.sh/nejc-kastelic",
  },
  {
    name: "Vesna Oblak",
    username: "@vesna.oblak",
    body: "Sistem ki so ga zgradili pozna naš business bolje kot novi zaposleni po šestih mesecih.",
    img: "https://avatar.vercel.sh/vesna-oblak",
  },
  {
    name: "Miha Jereb",
    username: "@miha.jereb",
    body: "Cenitve ki so nam vzele cel dan — zdaj trajajo minuto. Dobesedno.",
    img: "https://avatar.vercel.sh/miha-jereb",
  },
  {
    name: "Špela Koren",
    username: "@spela.koren",
    body: "Prvič sem imela občutek da tech podjetje razume zakaj delamo kar delamo, ne samo kako.",
    img: "https://avatar.vercel.sh/spela-koren",
  },
  {
    name: "Domen Šuštar",
    username: "@domen.sustar",
    body: "ROI smo videli v prvem mesecu. Nisem pričakoval tako hitro.",
    img: "https://avatar.vercel.sh/domen-sustar",
  },
  {
    name: "Nina Repič",
    username: "@nina.repic",
    body: "Vsak teden odkrijemo novo stvar ki jo sistem dela namesto nas. Še vedno nas preseneti.",
    img: "https://avatar.vercel.sh/nina-repic",
  },
  {
    name: "Žan Kocjan",
    username: "@zan.kocjan",
    body: "Preprosto — naše podjetje deluje pametneje. Ne trše.",
    img: "https://avatar.vercel.sh/zan-kocjan",
  },
  {
    name: "Iva Prevc",
    username: "@iva.prevc",
    body: "Rekli so mi da mi bodo spremenili način dela. Nisem verjela. Zdaj priporočam vsem.",
    img: "https://avatar.vercel.sh/iva-prevc",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function ReviewCard({ body, name, username }: (typeof reviews)[number]) {
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
        {body}
      </blockquote>
    </figure>
  );
}

export function FinalCtaSection() {
  return (
    <div className="mx-auto overflow-hidden border-x-0 border-[#e6ebf1] py-16 md:border-x md:py-20 lg:max-w-7xl lg:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center sm:px-10 lg:px-16">
        <p className="font-heading text-3xl font-extrabold leading-[1.08] tracking-normal text-black sm:text-4xl lg:text-5xl">
          Nekoč ti je nekdo rekel da se v tvojem poslu nažalost pač tako dela.
        </p>

        <p className="mt-5 max-w-2xl font-sans text-xl font-medium leading-[1.35] text-black/68 sm:text-2xl">
          Mi to spremenimo.
        </p>

        <div className="mt-8 flex">
          <ContactModalButton
            size="lg"
            className="font-sans text-sm font-medium [--speed:5s]"
          >
            <PhoneCall className="size-4" aria-hidden="true" />
            Rezervirajte pogovor
          </ContactModalButton>
        </div>
      </div>

      <div className="relative mt-14 flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee
          pauseOnHover
          className="p-0 [--duration:42s]"
          aria-label="Mnenja strank"
        >
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="mt-4 p-0 [--duration:42s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" />
      </div>
    </div>
  );
}
