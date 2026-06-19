"use client";

import ShapeGrid from "@/components/sections/hero/react-bits-shape-grid";

export function ShapeGridHeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="shape-grid-hero-visual pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
    >
      <div className="shape-grid-hero-visual__canvas">
        <ShapeGrid
          borderColor="rgba(15, 23, 42, 0.085)"
          direction="diagonal"
          hoverFillColor="rgba(82, 39, 255, 0.08)"
          shape="square"
          speed={0.18}
          squareSize={54}
        />
      </div>
    </div>
  );
}
