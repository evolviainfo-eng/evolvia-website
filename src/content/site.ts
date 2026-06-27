/** Global site data: contact details + primary navigation. */

export const site = {
  name: "evolvia.",
  tagline: "web design",
  email: "evolvia.info@gmail.com",
  location: "Kaunas, Lietuva",
  year: 2026,
} as const;

export const navLinks = [
  { label: "Paslaugos", href: "#paslaugos" },
  { label: "Procesas", href: "#procesas" },
  { label: "Darbai", href: "#darbai" },
  { label: "Kainos", href: "#kainos" },
] as const;
