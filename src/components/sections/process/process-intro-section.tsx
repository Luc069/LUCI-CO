import { AiBeamVisual } from "@/components/sections/process/ai-beam-visual";

export function ProcessIntroSection() {
  return (
    <div id="kako-delamo" className="mx-auto grid max-w-7xl scroll-mt-6 min-w-0 border-x-0 border-b border-[#e6ebf1] md:border-x lg:grid-cols-2">
      <div className="flex min-w-0 items-center border-b border-[#e6ebf1] px-6 py-10 sm:px-10 md:py-12 lg:border-b-0 lg:border-r lg:px-16 lg:py-14">
        <div className="max-w-2xl">
          <p className="font-heading text-4xl font-extrabold leading-[1.05] tracking-normal text-black sm:text-5xl lg:text-6xl">
            Prideš in nam predstaviš svoj business.
          </p>

          <div className="mt-8 space-y-6 font-sans text-xl font-medium leading-[1.35] text-black/68 sm:text-2xl">
            <p>
              Kako delaš, kje izgubiš čas, kaj te jezi, kam hočeš priti.
            </p>
            <p>
              Ali pa prineseš idejo ki jo imaš že v glavi.
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 items-center overflow-hidden px-6 py-6 sm:px-10 md:py-8 lg:px-16 lg:py-10">
        <AiBeamVisual />
      </div>
    </div>
  );
}
