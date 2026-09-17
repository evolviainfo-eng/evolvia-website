import type { Locale } from "@/i18n/config";
import {
  konstruktaLt,
  type KonstruktaCopy,
} from "@/i18n/dictionaries/lt/konstrukta";
import { konstruktaEn } from "@/i18n/dictionaries/en/konstrukta";

/* The Konstrukta demo's words in both languages. Server components get
   `locale` as a prop from KonstruktaPage; client components read it with
   useLocale(). Either way they pick their words here. */

export const konstruktaCopy: Record<Locale, KonstruktaCopy> = {
  lt: konstruktaLt,
  en: konstruktaEn,
};

export function getKonstruktaCopy(locale: Locale) {
  return konstruktaCopy[locale];
}
