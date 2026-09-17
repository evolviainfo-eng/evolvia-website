import type { Locale } from "@/i18n/config";
import { fumeEn } from "@/i18n/dictionaries/en/fume";
import { fumeLt, type FumeCopy } from "@/i18n/dictionaries/lt/fume";

/* The Fumé demo's words in each language. Server components call
 * getFumeCopy(locale) with the page's locale; client components take the
 * locale from useLocale(). The dictionaries hold functions (prices, dates,
 * plurals), so client components import them here rather than receiving
 * them as props. */

export const fumeCopy = { lt: fumeLt, en: fumeEn } satisfies Record<
  Locale,
  FumeCopy
>;

export function getFumeCopy(locale: Locale) {
  return fumeCopy[locale];
}
