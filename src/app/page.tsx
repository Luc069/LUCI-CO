import Image from "next/image";
import { PhoneCall } from "lucide-react";

import {
  ContactModalButton,
  ContactModalProvider,
} from "@/components/sections/contact/contact-modal";
import { FinalCtaSection } from "@/components/sections/cta/final-cta-section";
import { SiteFooter } from "@/components/sections/footer/site-footer";
import { ShapeGridHeroVisual } from "@/components/sections/hero/shape-grid-hero-visual";
import { AiBuildSection } from "@/components/sections/process/ai-build-section";
import { FinalOutcomeSection } from "@/components/sections/process/final-outcome-section";
import { ProcessIntroSection } from "@/components/sections/process/process-intro-section";
import { LandingSection } from "@/components/landing-section";
import { SiteNavbar } from "@/components/site-navbar";
import { SmoothScrollLink } from "@/components/smooth-scroll-link";
import { BlurFade } from "@/components/ui/blur-fade";
import { ColorBendsText } from "@/components/ui/color-bends-text";
import { Marquee } from "@/components/ui/marquee";
import { MorphingText } from "@/components/ui/morphing-text";
import { RainbowButton } from "@/components/ui/rainbow-button";

const subtitleTexts = [
  "Karkoli to zahteva.",
  "Ti poveš. Mi zgradimo.",
  "Začne se z enim pogovorom.",
  "Dokler ne teče samo.",
];

const companyWallItems = [
  {
    alt: "Akrapovič",
    height: 185,
    src: "/company-logos/akrapovic.png",
    width: 820,
  },
  {
    alt: "Zavarovalnica Triglav",
    height: 608,
    src: "/company-logos/triglav.png",
    width: 1920,
  },
  {
    alt: "Petrol",
    height: 426,
    src: "/company-logos/petrol.jpg",
    width: 1418,
  },
  {
    alt: "Krka",
    height: 289,
    src: "/company-logos/krka.png",
    width: 960,
  },
  {
    alt: "Telekom Slovenije",
    height: 256,
    src: "/company-logos/telekom-slovenije.png",
    width: 1920,
  },
  {
    alt: "GEN-I",
    height: 417,
    src: "/company-logos/gen-i.png",
    width: 800,
  },
];

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "LUCI & CO, računalniške in druge storitve, Lucian Horvat s.p.",
  alternateName: "LUCI&CO",
  url: "https://luciand.co",
  email: "contact@luciand.co",
  telephone: "+38631734397",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Štihova ulica 13",
    postalCode: "1000",
    addressLocality: "Ljubljana",
    addressCountry: "SI",
  },
};

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <SiteNavbar />

      <ContactModalProvider>
        <main className="relative z-10 flex flex-col">
          <div className="px-0 md:px-6">
            <LandingSection className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-transparent">
              <div className="relative mx-auto flex min-h-[calc(100svh-76px)] max-w-7xl flex-col overflow-hidden border-x-0 border-[#e6ebf1] md:border-x">
                <div className="relative z-10 flex min-h-[calc(100svh-76px-98px)] shrink-0 items-center justify-center overflow-hidden px-6 py-12 text-left sm:px-10 sm:py-16 lg:px-16">
                  <ShapeGridHeroVisual />
                  <div className="relative z-10 w-full">
                    <BlurFade className="w-full" duration={0.55} offset={12}>
                      <div className="flex w-full justify-start">
                        <div className="w-full max-w-[54rem] text-left">
                          <h1 className="w-full text-balance font-heading text-4xl font-extrabold leading-[1.02] tracking-normal text-black sm:text-6xl lg:text-7xl">
                            Podjetja preselimo v{" "}
                            <ColorBendsText>AI ero</ColorBendsText>
                            .
                          </h1>
                          <MorphingText
                            texts={subtitleTexts}
                            cooldownTime={3.2}
                            morphTime={0.85}
                            className="mx-0 mt-4 h-9 max-w-2xl text-left font-sans text-lg font-medium leading-9 text-black/60 sm:h-10 sm:text-xl sm:leading-10 md:h-10 lg:h-10 lg:text-xl"
                          />
                          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <ContactModalButton
                              size="lg"
                              className="font-sans text-sm font-medium [--speed:5s]"
                            >
                              <PhoneCall className="size-4" aria-hidden="true" />
                              Rezervirajte pogovor
                            </ContactModalButton>
                            <RainbowButton
                              asChild
                              size="lg"
                              variant="outline"
                              className="font-sans text-sm font-medium [--speed:5s]"
                            >
                              <SmoothScrollLink href="#kako-delamo">
                                Poglejte, kako delamo
                              </SmoothScrollLink>
                            </RainbowButton>
                          </div>
                        </div>
                      </div>
                    </BlurFade>
                  </div>
                </div>

                <div className="relative z-10 flex min-h-[98px] items-center border-y border-[#e6ebf1]">
                  <Marquee
                    pauseOnHover
                    repeat={3}
                    className="p-0 [--duration:34s] [--gap:4rem] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
                    aria-label="Company wall"
                  >
                    {companyWallItems.map((item) => (
                      <span
                        key={item.src}
                        className="flex h-10 w-44 items-center justify-center"
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          className="max-h-8 w-auto max-w-36 object-contain opacity-45 grayscale transition duration-300 hover:opacity-75 hover:grayscale-0"
                        />
                      </span>
                    ))}
                  </Marquee>
                </div>
              </div>
            </LandingSection>
          </div>

          <div className="bg-white px-0 md:px-6">
            <LandingSection className="min-h-0">
              <ProcessIntroSection />
            </LandingSection>

            <LandingSection className="min-h-0">
              <AiBuildSection />
            </LandingSection>

            <LandingSection className="min-h-0">
              <FinalOutcomeSection />
            </LandingSection>

            <LandingSection className="min-h-0">
              <FinalCtaSection />
            </LandingSection>

            <div className="border-t border-[#e6ebf1] md:-mx-6 md:px-6">
              <SiteFooter />
            </div>
          </div>
        </main>
      </ContactModalProvider>
    </div>
  );
}
