"use client";

import type { AnchorHTMLAttributes } from "react";

type SmoothScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: `#${string}`;
};

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function SmoothScrollLink({
  href,
  onClick,
  ...props
}: SmoothScrollLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        event.preventDefault();
        scrollToSection(href.slice(1));
      }}
      {...props}
    />
  );
}
