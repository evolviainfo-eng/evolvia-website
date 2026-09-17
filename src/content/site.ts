/** Global site data: the facts that read the same in every language.
 *  Anything a visitor reads as words lives in the dictionaries
 *  (src/i18n/dictionaries), not here. */

export const site = {
  name: "evolvia.",
  /** The person behind the business, and the registration that proves it.
   *  Shown in the footer, on /kontaktai and in the structured data.
   *  The taxpayer code printed beside it on the same certificate is
   *  deliberately NOT here: it identifies a person, not a business, and has
   *  no place on a public page. */
  legalName: "Martis Kuckailis",
  activityNo: "1527221",
  activitySince: "2026-06-23",
  nace: "621090",
  linkedin: "https://www.linkedin.com/in/martis-kuckailis-47241236a",
  email: "info@evolvia.lt",
  /** International format on every language version. */
  phone: "+370 657 716 01",
  /** tel: href — no spaces, they break some dialers */
  phoneHref: "+37065771601",
  year: 2026,
  /** Production URL — used for canonical, hreflang, OG, sitemap, robots. */
  url: "https://evolvia.lt",
  /** Formspree form id (the part after /f/ in the endpoint). Empty = the
   *  contact form falls back to opening the visitor's mail app (mailto). */
  formspreeId: "mzdljkzb",
} as const;

/** Every indexable page, as a language-neutral path. The English copy of
 *  each lives at the same path under /en. Single source for the sitemap. */
export const indexablePaths = [
  "/",
  "/paslaugos",
  "/darbai",
  "/darbai/minerda",
  "/kainos",
  "/duk",
  "/kontaktai",
] as const;

/** Absolute URL for a root-relative path. The home page is the bare origin,
 *  exactly as it has always been canonicalised. */
export function absoluteUrl(path: string): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}
