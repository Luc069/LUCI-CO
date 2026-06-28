export type Locale = "si" | "en";

export const DEFAULT_LOCALE = "si" satisfies Locale;

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "si" || value === "en";
}
