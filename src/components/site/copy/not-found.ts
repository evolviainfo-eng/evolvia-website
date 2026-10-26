import { eur, gbp, PRICES_EUR, PRICES_GBP } from "@/i18n/prices";

/* Words of the one 404 page. It is a single static file served for every
   missing address in both languages, so both entries render and the head
   script in app/global-not-found.tsx shows the one the address asks for.
   Title, lead and buttons match pages.notFound in the dictionaries. */

type NotFoundCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  addressLabel: string;
  home: string;
  work: string;
  indexTitle: string;
  index: readonly { path: string; label: string; note: string }[];
};

const lt: NotFoundCopy = {
  metaTitle: "Puslapis nerastas · Evolvia",
  metaDescription: "Šio puslapio nėra arba jis buvo perkeltas.",
  title: "Šio puslapio nebėra.",
  lead: "Nuoroda pasenusi arba adresas neteisingas. Puslapio, kurio ieškote, nėra.",
  addressLabel: "Adresas",
  home: "Į pradžią",
  work: "Žiūrėti darbus",
  indexTitle: "Kur toliau",
  index: [
    { path: "/paslaugos", label: "Paslaugos", note: "Kas įeina į svetainę" },
    { path: "/darbai", label: "Darbai", note: "Minerda ir keturi pavyzdžiai" },
    { path: "/kainos", label: "Kainos", note: `${eur(PRICES_EUR.site)}, mokama vieną kartą` },
    { path: "/duk", label: "DUK", note: "Dažni klausimai" },
    { path: "/kontaktai", label: "Kontaktai", note: "Užklausa ir rekvizitai" },
  ],
};

const en: NotFoundCopy = {
  metaTitle: "Page not found · Evolvia",
  metaDescription: "This page does not exist or has moved.",
  title: "This page is no longer here.",
  lead: "The link is out of date or the address is wrong. The page you are looking for does not exist.",
  addressLabel: "Address",
  home: "Back to home",
  work: "See the work",
  indexTitle: "Where next",
  index: [
    { path: "/paslaugos", label: "Services", note: "What a website includes" },
    { path: "/darbai", label: "Work", note: "Minerda and four examples" },
    { path: "/kainos", label: "Pricing", note: `${gbp(PRICES_GBP.site)}, paid once` },
    { path: "/duk", label: "FAQ", note: "Common questions" },
    { path: "/kontaktai", label: "Contact", note: "Enquiry and business details" },
  ],
};

export const notFoundCopy = { lt, en } as const;
