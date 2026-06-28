"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { PopupModal } from "react-calendly";

import {
  RainbowButton,
  type RainbowButtonProps,
} from "@/components/ui/rainbow-button";

const calendlyUrl = "https://calendly.com/contact-luciand/30min";

const CalendlyModalContext = createContext<(() => void) | null>(null);

export function CalendlyModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const rootElement =
    typeof document === "undefined" ? null : document.body;

  return (
    <CalendlyModalContext.Provider value={() => setOpen(true)}>
      {children}
      {rootElement ? (
        <PopupModal
          url={calendlyUrl}
          open={open}
          rootElement={rootElement}
          onModalClose={() => setOpen(false)}
        />
      ) : null}
    </CalendlyModalContext.Provider>
  );
}

export function CalendlyModalButton({
  children,
  onClick,
  type = "button",
  ...props
}: RainbowButtonProps) {
  const openCalendlyModal = useContext(CalendlyModalContext);

  return (
    <RainbowButton
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openCalendlyModal?.();
        }
      }}
      {...props}
    >
      {children}
    </RainbowButton>
  );
}
