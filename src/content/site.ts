/** Global site data: contact details + primary navigation. */

export const site = {
  name: "evolvia.",
  tagline: "svetainių kūrimas",
  /** The person behind the business, and the registration that proves it.
   *  Shown in the footer, on /kontaktai and in the structured data.
   *  The taxpayer code printed beside it on the same certificate is
   *  deliberately NOT here: it identifies a person, not a business, and has
   *  no place on a public page. */
  legalName: "Martis Kuckailis",
  activityNo: "1527221",
  activitySince: "2026-06-23",
  nace: "621090",
  naceLabel: "Kita kompiuterių programavimo veikla",
  linkedin: "https://www.linkedin.com/in/martis-kuckailis-47241236a",
  email: "info@evolvia.lt",
  phone: "+370 657 716 01",
  /** tel: href — no spaces, they break some dialers */
  phoneHref: "+37065771601",
  location: "Kaunas, Lietuva",
  year: 2026,
  /** Production URL — used for canonical, OG, sitemap, robots. */
  url: "https://evolvia.lt",
  /** Formspree form id (the part after /f/ in the endpoint). Empty = the
   *  contact form falls back to opening the visitor's mail app (mailto). */
  formspreeId: "mzdljkzb",
} as const;

/** Real routes (separate pages for SEO). The homepage keeps its in-page
 *  anchors for its own CTAs, but navigation links point at the pages. */
export const navLinks = [
  { label: "Paslaugos", href: "/paslaugos" },
  { label: "Darbai", href: "/darbai" },
  { label: "Kainos", href: "/kainos" },
  { label: "DUK", href: "/duk" },
] as const;

/** Every indexable page — single source of truth for sitemap + footer. */
export const pages = [
  { label: "Pradžia", path: "/" },
  { label: "Paslaugos", path: "/paslaugos" },
  { label: "Darbai", path: "/darbai" },
  { label: "Kainos", path: "/kainos" },
  { label: "DUK", path: "/duk" },
  { label: "Kontaktai", path: "/kontaktai" },
] as const;
