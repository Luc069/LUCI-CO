import type { CSSProperties, ReactNode } from "react";

interface ColorBendsTextProps {
  children: ReactNode;
  className?: string;
}

export function ColorBendsText({
  children,
  className = "",
}: ColorBendsTextProps) {
  const style = {
    backgroundImage:
      "linear-gradient(110deg, #2563eb 0%, #06b6d4 26%, #7c3aed 48%, #fb7185 68%, #f59e0b 84%, #2563eb 100%)",
  } satisfies CSSProperties;

  return (
    <span
      className={`inline whitespace-nowrap bg-size-[220%_100%] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
