/** Global site data: contact details + primary navigation. */

export const site = {
  name: "evolvia.",
  tagline: "web design",
  email: "info@evolvia.lt",
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
