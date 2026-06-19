"use client";

import Image from "next/image";
import { useRef, type ReactNode, type Ref } from "react";
import {
  BriefcaseBusiness,
  Cpu,
  Lightbulb,
  TriangleAlert,
  Workflow,
} from "lucide-react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

type BeamNodeProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

function BeamNode({
  children,
  className,
  icon,
  ref,
}: BeamNodeProps & { ref: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-10 flex h-12 min-w-20 items-center justify-center rounded-[8px] border border-[#dce3ec] bg-white/92 px-3 text-sm font-semibold text-black/72 shadow-sm backdrop-blur-sm sm:h-14 sm:min-w-28 sm:px-4 sm:text-base",
        className
      )}
    >
      {icon ? (
        <span className="mr-2 flex size-4 shrink-0 items-center justify-center text-black/80 sm:size-[18px]">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </div>
  );
}

const nodeIconClassName = "size-4 stroke-[2] sm:size-[18px]";

function DesktopBeamStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const ideaRef = useRef<HTMLDivElement>(null);
  const luciRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);

  const inputBeamProps = {
    containerRef,
    toRef: luciRef,
    duration: 4.2,
    pathColor: "rgba(15, 23, 42, 0.28)",
    pathOpacity: 0.16,
    pathWidth: 1.4,
    gradientStartColor: "#ff8a3d",
    gradientStopColor: "#635bff",
  };

  return (
    <div
      ref={containerRef}
      className="relative hidden h-[500px] w-full max-w-full overflow-hidden md:block lg:h-[560px]"
    >
      <BeamNode
        ref={businessRef}
        className="left-[5%] top-[11%]"
        icon={<BriefcaseBusiness className={nodeIconClassName} />}
      >
        Business
      </BeamNode>
      <BeamNode
        ref={processRef}
        className="left-[5%] top-[34%]"
        icon={<Workflow className={nodeIconClassName} />}
      >
        Procesi
      </BeamNode>
      <BeamNode
        ref={problemRef}
        className="left-[5%] top-[57%]"
        icon={<TriangleAlert className={nodeIconClassName} />}
      >
        Problem
      </BeamNode>
      <BeamNode
        ref={ideaRef}
        className="left-[5%] top-[80%]"
        icon={<Lightbulb className={nodeIconClassName} />}
      >
        Ideja
      </BeamNode>

      <BeamNode
        ref={luciRef}
        className="left-1/2 top-1/2 h-16 min-w-36 -translate-x-1/2 -translate-y-1/2 border-black/10 bg-black text-white"
      >
        <Image
          src="/assets/luci-and-co-logo-white.svg"
          alt="LUCI&CO"
          width={625}
          height={93}
          className="h-6 w-auto max-w-28"
        />
      </BeamNode>

      <BeamNode
        ref={systemRef}
        className="right-[5%] top-1/2 h-16 min-w-32 -translate-y-1/2 border-[#cfd7e3] bg-white text-black"
        icon={<Cpu className={nodeIconClassName} />}
      >
        AI sistem
      </BeamNode>

      <AnimatedBeam fromRef={businessRef} curvature={80} delay={0} {...inputBeamProps} />
      <AnimatedBeam fromRef={processRef} curvature={24} delay={0.5} {...inputBeamProps} />
      <AnimatedBeam fromRef={problemRef} curvature={-24} delay={1} {...inputBeamProps} />
      <AnimatedBeam fromRef={ideaRef} curvature={-80} delay={1.5} {...inputBeamProps} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={luciRef}
        toRef={systemRef}
        curvature={0}
        duration={4.2}
        delay={2}
        pathColor="rgba(15, 23, 42, 0.28)"
        pathOpacity={0.16}
        pathWidth={1.7}
        gradientStartColor="#635bff"
        gradientStopColor="#18b6cf"
      />
    </div>
  );
}

function MobileBeamStage() {
  const businessRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const ideaRef = useRef<HTMLDivElement>(null);
  const luciRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-[360px] w-full max-w-full overflow-hidden md:hidden">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M 25 13 C 30 28, 40 46, 50 59"
          stroke="rgba(15, 23, 42, 0.16)"
          strokeLinecap="round"
          strokeWidth="0.55"
        />
        <path
          d="M 75 13 C 70 28, 60 46, 50 59"
          stroke="rgba(15, 23, 42, 0.16)"
          strokeLinecap="round"
          strokeWidth="0.55"
        />
        <path
          d="M 25 33 C 32 43, 40 53, 50 59"
          stroke="rgba(15, 23, 42, 0.14)"
          strokeLinecap="round"
          strokeWidth="0.5"
        />
        <path
          d="M 75 33 C 68 43, 60 53, 50 59"
          stroke="rgba(15, 23, 42, 0.14)"
          strokeLinecap="round"
          strokeWidth="0.5"
        />
        <path
          d="M 50 59 C 50 67, 50 75, 50 83"
          stroke="rgba(99, 91, 255, 0.2)"
          strokeLinecap="round"
          strokeWidth="0.65"
        />
      </svg>

      <BeamNode
        ref={businessRef}
        className="left-[4%] top-[7%] h-11 w-[42%] min-w-0 px-2 text-xs"
        icon={<BriefcaseBusiness className={nodeIconClassName} />}
      >
        Business
      </BeamNode>
      <BeamNode
        ref={processRef}
        className="right-[4%] top-[7%] h-11 w-[42%] min-w-0 px-2 text-xs"
        icon={<Workflow className={nodeIconClassName} />}
      >
        Procesi
      </BeamNode>
      <BeamNode
        ref={problemRef}
        className="left-[4%] top-[27%] h-11 w-[42%] min-w-0 px-2 text-xs"
        icon={<TriangleAlert className={nodeIconClassName} />}
      >
        Problem
      </BeamNode>
      <BeamNode
        ref={ideaRef}
        className="right-[4%] top-[27%] h-11 w-[42%] min-w-0 px-2 text-xs"
        icon={<Lightbulb className={nodeIconClassName} />}
      >
        Ideja
      </BeamNode>

      <BeamNode
        ref={luciRef}
        className="left-1/2 top-[59%] h-14 w-36 min-w-0 -translate-x-1/2 -translate-y-1/2 border-black/10 bg-black px-4 text-white"
      >
        <Image
          src="/assets/luci-and-co-logo-white.svg"
          alt="LUCI&CO"
          width={625}
          height={93}
          className="h-5 w-auto max-w-28"
        />
      </BeamNode>

      <BeamNode
        ref={systemRef}
        className="left-1/2 top-[83%] h-12 w-32 min-w-0 -translate-x-1/2 -translate-y-1/2 border-[#cfd7e3] bg-white px-3 text-xs text-black"
        icon={<Cpu className={nodeIconClassName} />}
      >
        AI sistem
      </BeamNode>
    </div>
  );
}

export function AiBeamVisual() {
  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden">
      <MobileBeamStage />
      <DesktopBeamStage />
    </div>
  );
}
