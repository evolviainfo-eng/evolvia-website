import type { Locale } from "@/i18n/config";
import { skalsaLt, type SkalsaCopy } from "@/i18n/dictionaries/lt/skalsa";
import { skalsaEn } from "@/i18n/dictionaries/en/skalsa";

/** The Skalsa demo's words in both languages.
 *
 *  Server components pass their `locale` prop in; client components read it
 *  with useLocale(). The client parts (basket, header, meter) import this
 *  module too, so both dictionaries ship in the demo's bundle. They are a
 *  few kilobytes, and some entries are functions, which could not be handed
 *  from a server component to a client one as props anyway. */
export const skalsaCopy: Record<Locale, SkalsaCopy> = {
  lt: skalsaLt,
  en: skalsaEn,
};

export function getSkalsaCopy(locale: Locale): SkalsaCopy {
  return skalsaCopy[locale];
}
