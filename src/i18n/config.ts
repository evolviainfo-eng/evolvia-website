/* ─────────────────────────────────────────────────────────────
   Languages.

   Lithuanian is the default and lives at the root (/kainos). Every other
   language gets a prefix (/en/kainos) and keeps the SAME path after it, so
   switching language never has to look anything up: strip or add the prefix
   and you are on the same page.

   There is no Accept-Language sniffing and no redirect on a first visit.
   The only redirect is the remembered-choice one in RootShell, and it only
   ever fires on "/".
   ───────────────────────────────────────────────────────────── */

export const locales = ["lt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "lt";

/** localStorage key for the visitor's explicit choice. Written only when a
 *  flag is clicked, read only by the "/" redirect. */
export const LANG_STORAGE_KEY = "lang";

export const localeInfo: Record<
  Locale,
  {
    /** <html lang>. British English, because the copy is. */
    htmlLang: string;
    /** hreflang value. Plain "en" so the English pages answer every English
     *  searcher, not only the ones Google places in the UK. */
    hreflang: string;
    ogLocale: string;
    /** For Intl number and date formatting. */
    intl: string;
    /** The language's own name for itself, used as the switch label. */
    name: string;
  }
> = {
  lt: {
    htmlLang: "lt",
    hreflang: "lt",
    ogLocale: "lt_LT",
    intl: "lt-LT",
    name: "Lietuvių",
  },
  en: {
    htmlLang: "en-GB",
    hreflang: "en",
    ogLocale: "en_GB",
    intl: "en-GB",
    name: "English",
  },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Moves a site path into a language.
 *
 *    localizePath("/kainos", "en")      → "/en/kainos"
 *    localizePath("/", "en")            → "/en"
 *    localizePath("/#kontaktai", "en")  → "/en#kontaktai"
 *    localizePath("/kainos", "lt")      → "/kainos"
 *
 *  Anything that is not a root-relative path (a bare "#anchor", mailto:,
 *  tel:, an absolute URL) is returned untouched. */
export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === defaultLocale) return path;
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const rest = cut === -1 ? "" : path.slice(cut);
  return (pathname === "/" ? `/${locale}` : `/${locale}${pathname}`) + rest;
}

/** The inverse: which language a pathname is in, and the path without the
 *  prefix. "/en/kainos" → { locale: "en", path: "/kainos" }. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (pathname === `/${locale}` || pathname === `/${locale}/`) {
      return { locale, path: "/" };
    }
    if (pathname.startsWith(`/${locale}/`)) {
      return { locale, path: pathname.slice(locale.length + 1) };
    }
  }
  return { locale: defaultLocale, path: pathname || "/" };
}
