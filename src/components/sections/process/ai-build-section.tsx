import Image from "next/image";

export function AiBuildSection() {
  return (
    <div id="kaj-gradimo" className="mx-auto grid max-w-7xl scroll-mt-6 min-w-0 border-x-0 border-b border-[#e6ebf1] md:border-x lg:grid-cols-2">
      <div className="order-2 flex min-w-0 items-center overflow-hidden px-6 py-6 sm:px-10 md:py-8 lg:order-1 lg:border-r lg:border-[#e6ebf1] lg:px-16 lg:py-10">
        <div className="relative flex w-full min-w-0 max-w-full items-center justify-center overflow-hidden">
          <Image
            src="/assets/agreement-execution-design.png"
            alt="AI agreement and execution visual"
            width={1254}
            height={1254}
            className="h-auto w-full max-w-[520px] object-contain"
          />
        </div>
      </div>

      <div className="order-1 flex min-w-0 items-center border-b border-[#e6ebf1] px-6 py-10 sm:px-10 md:py-12 lg:order-2 lg:border-b-0 lg:px-16 lg:py-14">
        <div className="max-w-2xl text-left">
          <p className="font-heading text-4xl font-extrabold leading-[1.05] tracking-normal text-black sm:text-5xl lg:text-6xl">
            Skupaj ugotovimo kje AI naredi največjo razliko —
          </p>

          <div className="mt-8 space-y-6 font-sans text-xl font-medium leading-[1.35] text-black/68 sm:text-2xl">
            <p>kaj avtomatizirati, kaj zgraditi, kaj spremeniti.</p>
            <p className="font-semibold text-black/78">Potem to naredimo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
