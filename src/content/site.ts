/** Global site data: contact details + primary navigation. */

export const site = {
  name: "evolvia.",
  tagline: "web design",
  email: "evolvia.info@gmail.com",
  location: "Kaunas, Lietuva",
  year: 2026,
  /** Production URL — used for canonical, OG, sitemap, robots. */
  url: "https://evolvia.lt",
  /** Formspree form id (the part after /f/ in the endpoint). Empty = the
   *  contact form falls back to opening the visitor's mail app (mailto). */
  formspreeId: "mzdljkzb",
} as const;

export const navLinks = [
  { label: "Paslaugos", href: "#paslaugos" },
  { label: "Procesas", href: "#procesas" },
  { label: "Darbai", href: "#darbai" },
  { label: "Kainos", href: "#kainos" },
] as const;
