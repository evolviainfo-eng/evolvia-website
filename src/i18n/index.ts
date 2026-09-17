import "server-only";
import type { Locale } from "@/i18n/config";
import { lt, type Dictionary } from "@/i18n/dictionaries/lt";
import { en } from "@/i18n/dictionaries/en";

/* Server-side access to the site dictionary.
 *
 * Both languages are imported statically: the whole site is prerendered, so
 * there is no request to be lazy for, and the dictionaries never reach the
 * browser as a module. Client components receive the slice they render as a
 * prop from their server parent, in the page's language only. The
 * `server-only` import turns an accidental client import into a build error
 * instead of two languages quietly shipping in a bundle. */

const dictionaries: Record<Locale, Dictionary> = { lt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export { locales, defaultLocale, localizePath, localeInfo } from "@/i18n/config";
export type { Locale } from "@/i18n/config";
