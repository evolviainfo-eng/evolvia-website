/** Darbai — the real client work.
 *
 *  Separate from `demos.ts` on purpose, and the separation is the whole point
 *  of the section. A demo is a site Evolvia built to show what it can do; a
 *  case is a site a real company paid for, uses, and is found by. They must
 *  never share a component, a label or a browser-chrome address, because the
 *  moment they look alike the honest disclosure on the demos stops meaning
 *  anything.
 *
 *  Everything below traces to something checkable: the delivered items are the
 *  pages minerda.lt actually serves, the structured data is what those pages
 *  actually contain. No metric appears here that nobody measured, so there are
 *  no visitor counts and no conversion figures.
 *
 *  No dates and no delivery times either. A term reads as a promise about the
 *  next project rather than a fact about this one, and a launch date starts
 *  ageing the work the day after it ships.
 */

export interface CaseStudy {
  slug: string;
  /** Company name as the client writes it. */
  name: string;
  legalName: string;
  sector: string;
  city: string;
  /** The live site. Shown in the browser chrome, so it is the real domain. */
  domain: string;
  url: string;
  /** One line for the homepage band. */
  summary: string;
  /** Where the client started. */
  situation: string;
  /** Everything delivered. Plain rows, not icon cards. */
  work: { title: string; detail: string }[];
  result: string;
}

export const minerda: CaseStudy = {
  slug: "minerda",
  name: "Minerda",
  legalName: "M. Bakanovo IDV",
  sector: "Įlenkimų šalinimas be dažymo, kėbulo priežiūra",
  city: "Kaunas",
  domain: "minerda.lt",
  url: "https://minerda.lt",
  summary:
    "Veikianti įmonė be svetainės. Svetainė nuo nulio, keturi straipsniai, DUK puslapis, struktūriniai duomenys ir paleidimas kliento serveryje su galiojančiu SSL.",
  situation:
    "Minerda šalina automobilių kėbulo įlenkimus be dažymo, poliruoja kėbulą ir dengia keramine nanodanga. Įmonė dirbo ir turėjo klientų, bet savo svetainės neturėjo: darbų nuotraukos ir atsiliepimai gyveno tik socialiniuose tinkluose, o adreso, kurį galima duoti klientui arba įrašyti į Google, nebuvo.",
  work: [
    {
      title: "Svetainė nuo nulio",
      detail:
        "Struktūra, tekstai, nuotraukų paruošimas ir kodas. Be šablono ir be konstruktoriaus.",
    },
    {
      title: "Keturi straipsniai paieškai",
      detail:
        "Meninis lyginimas, kėbulo poliravimas, nanodanga, žibintų poliravimas. Kiekvienas savo adresu.",
    },
    {
      title: "Atskiras DUK puslapis",
      detail:
        "Klausimai ir atsakymai atskirame puslapyje, o ne bloke svetainės apačioje.",
    },
    {
      title: "Struktūriniai duomenys",
      detail:
        "JSON-LD, sitemap.xml ir robots.txt, kad paieškos sistemos suprastų, kas yra kiekviename puslapyje.",
    },
    {
      title: "Užklausų forma",
      detail: "Užpildyta užklausa ateina tiesiai į įmonės el. paštą.",
    },
    {
      title: "Paleidimas kliento serveryje",
      detail:
        "Svetainė gyvena kliento nuosavame hostinge su galiojančiu SSL sertifikatu.",
    },
    {
      title: "Google Search Console",
      detail: "Svetainė prijungta, puslapiai indeksuoti.",
    },
  ],
  result:
    "minerda.lt veikia kliento serveryje ir yra randama Google. Svetainę galite atidaryti ir apžiūrėti patys.",
};

/** The captures. Real screenshots of the live site at 1440px, taken from the
 *  production domain and downscaled from a 2x master. Never a mockup. */
export const minerdaShots = {
  home: "/img/darbai/minerda/pagrindinis.webp",
  homeMobile: "/img/darbai/minerda/pagrindinis-m.webp",
  article: "/img/darbai/minerda/straipsnis.webp",
  faq: "/img/darbai/minerda/duk.webp",
} as const;
