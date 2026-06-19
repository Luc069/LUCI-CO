import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type LandingSectionProps = ComponentPropsWithoutRef<"section">;

export function LandingSection({ className, ...props }: LandingSectionProps) {
  return (
    <section
      className={cn(
        "min-h-svh bg-white",
        className
      )}
      {...props}
    />
  );
}
