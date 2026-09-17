import type { Locale } from "@/i18n/config";
import { formaLt, type FormaCopy } from "@/i18n/dictionaries/lt/forma";
import { formaEn } from "@/i18n/dictionaries/en/forma";

/* Forma's words in both languages. Server components get `locale` as a prop
   from FormaPage; client components read it with useLocale(). Both pick
   their copy here. */
export const formaCopy: Record<Locale, FormaCopy> = { lt: formaLt, en: formaEn };

export function getFormaCopy(locale: Locale): FormaCopy {
  return formaCopy[locale];
}
