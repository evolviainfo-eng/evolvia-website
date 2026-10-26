import type { Locale } from "@/i18n/config";

/* Words of the frame every page shares: nav, phone sheet, footer, skip
   link. Paths are language-neutral; localizePath() adds the /en prefix. */
export const chrome = {
  lt: {
    skip: "Pereiti prie turinio",
    home: "evolvia. Į pradžią",
    mainNav: "Pagrindinė navigacija",
    links: [
      { label: "Paslaugos", path: "/paslaugos" },
      { label: "Darbai", path: "/darbai" },
      { label: "Kainos", path: "/kainos" },
      { label: "DUK", path: "/duk" },
      { label: "Kontaktai", path: "/kontaktai" },
    ],
    cta: "Parašyti užklausą",
    menu: "Meniu",
    close: "Uždaryti",
    language: "Kalba",
    other: { code: "EN", label: "English", lang: "en" as Locale },
    tagline: "Svetainės Lietuvos verslui.",
    footSite: "Svetainė",
    footDemos: "Pavyzdžiai",
    footContact: "Kontaktai",
    city: "Kaunas, Lietuva",
    privacy: "Privatumas",
    registration: "Martis Kuckailis, individuali veikla Nr. 1527221",
    homeLabel: "Pradžia",
    demoTags: { koncepcija: "Koncepcija", demo: "Demo" },
  },
  en: {
    skip: "Skip to content",
    home: "evolvia. Home",
    mainNav: "Main navigation",
    links: [
      { label: "Services", path: "/paslaugos" },
      { label: "Work", path: "/darbai" },
      { label: "Pricing", path: "/kainos" },
      { label: "FAQ", path: "/duk" },
      { label: "Contact", path: "/kontaktai" },
    ],
    cta: "Send an enquiry",
    menu: "Menu",
    close: "Close",
    language: "Language",
    other: { code: "LT", label: "Lietuvių", lang: "lt" as Locale },
    tagline: "Websites for businesses.",
    footSite: "Site",
    footDemos: "Examples",
    footContact: "Contact",
    city: "Kaunas, Lithuania",
    privacy: "Privacy",
    registration: "Martis Kuckailis, self-employed, certificate No. 1527221",
    homeLabel: "Home",
    demoTags: { koncepcija: "Concept", demo: "Demo" },
  },
} as const;

export type ChromeCopy = (typeof chrome)["lt"] | (typeof chrome)["en"];
