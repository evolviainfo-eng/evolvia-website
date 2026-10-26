import { eur, gbp, pricesFor } from "@/i18n/prices";

/* Words of the home "what is included" section: the statement, the four
   bento cells and the strings inside their live mini UIs. Prices come from
   i18n/prices.ts: euros for lt, pounds for en. The search snippet shows
   Minerda's real Google result, which is in Lithuanian in both languages. */

const LT = pricesFor.lt;
const EN = pricesFor.en;

type Cell = { key: "dizainas" | "telefonas" | "paieska" | "paleidimas"; title: string; desc: string };

export type IncludedCopy = {
  lead: string;
  rest: string;
  cells: readonly [Cell, Cell, Cell, Cell];
  phone: { name: string; tag: string; src: string; alt: string };
  launch: { rows: readonly { label: string; chip?: string; value?: string }[]; year1: string; later: string };
};

const lt: IncludedCopy = {
  lead: `Viena svetainė už ${eur(LT.site)}, mokama vieną kartą.`,
  rest: "Dizainas ir programavimas, tekstai ir nuotraukos, domenas ir paleidimas, Google paieška, talpinimas ir atnaujinimai pirmus metus.",
  cells: [
    { key: "dizainas", title: "Individualus dizainas ir programavimas", desc: "Kiekviena svetainė kuriama nuo nulio, ne iš šablono." },
    { key: "telefonas", title: "Telefonui ir planšetei", desc: "Tas pats turinys, sudėliotas kiekvienam ekranui." },
    { key: "paieska", title: "Google paieškai", desc: "Pavadinimai, aprašymai ir struktūriniai duomenys kiekviename puslapyje." },
    {
      key: "paleidimas",
      title: "Paleidimas jūsų domene",
      desc: `Domenas, SSL ir Google Search Console prijungiami prieš atiduodant. Vėliau ${eur(LT.renewalPerYear)} per metus, failai lieka jūsų.`,
    },
  ],
  phone: { name: "Konstrukta", tag: "Koncepcija", src: "/work/shot-konstrukta-m.webp", alt: "Konstrukta koncepcija telefono ekrane" },
  launch: {
    rows: [
      { label: "Domenas", chip: "jūsų-domenas.lt", value: "nukreiptas" },
      { label: "SSL sertifikatas", value: "Galioja" },
      { label: "Google Search Console", value: "Prijungta" },
      { label: "Svetainė paleista" },
    ],
    year1: "Pirmi metai: įskaičiuota",
    later: `Toliau: ${eur(LT.renewalPerYear)} per metus`,
  },
};

const en: IncludedCopy = {
  lead: `One website for ${gbp(EN.site)}, paid once.`,
  rest: "Design and code, copy and photos, domain and launch, Google search, plus hosting and updates for the first year.",
  cells: [
    { key: "dizainas", title: "Bespoke design and code", desc: "Every website is built from scratch, never from a template." },
    { key: "telefonas", title: "Made for phone and tablet", desc: "The same content, laid out for every screen." },
    { key: "paieska", title: "Ready for Google search", desc: "Titles, descriptions and structured data on every page." },
    {
      key: "paleidimas",
      title: "Launched on your domain",
      desc: `Domain, SSL and Google Search Console are connected before handover. After that ${gbp(EN.renewalPerYear)} a year, and the files stay yours.`,
    },
  ],
  phone: { name: "Konstrukta", tag: "Concept", src: "/work/shot-konstrukta-en-m.webp", alt: "The Konstrukta concept on a phone screen" },
  launch: {
    rows: [
      { label: "Domain", chip: "your-domain.com", value: "connected" },
      { label: "SSL certificate", value: "Valid" },
      { label: "Google Search Console", value: "Connected" },
      { label: "Website live" },
    ],
    year1: "First year: included",
    later: `After that: ${gbp(EN.renewalPerYear)} a year`,
  },
};

export const included = { lt, en } as const;
