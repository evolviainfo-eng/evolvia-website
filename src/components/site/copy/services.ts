/* /paslaugos: the words this page adds to the dictionary. The service
   items, the process steps, the fits and the FAQ answers come from
   src/i18n/dictionaries (pages.services, process, faq); this module holds
   the page's own headings, the captions of the drawn panels and the
   closing. {price} and {renewal} are filled from prices.ts. No dates or
   durations: the facts give none. */

export const servicesCopy = {
  lt: {
    titleA: "Svetainių kūrimas",
    titleB: "nuo pradžios iki paleidimo.",
    pricing: "Žiūrėti kainas",
    shotCaption: "minerda.lt: kliento svetainė, sukurta nuo nulio ir paleista kliento serveryje.",
    shotLink: "Apie projektą",
    what: {
      a: "Viskas vienose rankose.",
      b: "Nuo eskizo iki priežiūros.",
      lead: "Vienas žmogus atsako už dizainą, kodą, tekstus, paleidimą ir tai, kas būna po jo. Nereikia derinti dizainerio, programuotojo ir hostingo.",
    },
    design: {
      address: "evolvia.lt/demo/fume",
      tag: "Demo",
      open: "Atidaryti Fumé demo",
    },
    search: {
      label: "Paieškos rezultatas",
      description: "Automobilių kėbulo studija Kaune. Meninis lyginimas (PDR) be dažymo, kėbulo poliravimas ir keraminė nanodanga.",
      checks: ["Pavadinimai ir aprašymai", "Struktūriniai duomenys", "sitemap.xml ir robots.txt", "Greitas krovimasis telefone"],
      phoneAlt: "Minerda svetainė telefone",
    },
    launch: {
      address: "jūsų-domenas.lt",
      title: "Paleidimas",
      rows: [
        "Domenas prijungtas",
        "SSL sertifikatas galioja",
        "Turinys perkeltas",
        "Google Search Console prijungta",
        "Puslapiai pateikti indeksuoti",
      ],
      done: "Atlikta",
    },
    care: {
      title: "Priežiūra",
      rows: ["Hostingas", "SSL sertifikatas", "Atnaujinimai", "Pakeitimai pagal jūsų laišką", "Palaikymas"],
      firstYear: "Pirmi metai",
      included: "Įskaičiuota",
      later: "Nuo antrų metų",
      perYear: "{renewal} / metus",
    },
    process: {
      a: "Kaip vyksta darbas.",
      b: "Keturi žingsniai.",
      /** Step 2 without the "within a few days" of the dictionary. */
      step2: "Matote realią svetainę gyvai, ne paveikslėlį. Tik tada sprendžiate.",
      payNote: "Iki šio žingsnio nemokate nieko.",
    },
    fits: {
      b: "Ir kam labiausiai.",
      lead: "Dažniausiai tai statybų, interjero, autopaslaugų, grožio ir kitų paslaugų įmonės, kurios neturi svetainės arba turi pasenusią.",
    },
    faq: {
      a: "Klausimai apie darbą.",
      more: "Daugiau atsakymų rasite",
      link: "DUK puslapyje",
      /** Indexes into faq.items: see before paying, what to prepare, who
       *  looks after it, Google. */
      items: [2, 4, 5, 6],
    },
    closing: {
      a: "Pamatote svetainę gyvai.",
      b: "Tik tada mokate.",
      price: "Svetainė kainuoja {price}, mokama vieną kartą.",
      pricing: "Žiūrėti kainas",
    },
  },
  en: {
    titleA: "Web design,",
    titleB: "from start to launch.",
    pricing: "See pricing",
    shotCaption: "minerda.lt: a client's website, built from scratch and launched on the client's own server.",
    shotLink: "About the project",
    what: {
      a: "One pair of hands.",
      b: "From the draft to maintenance.",
      lead: "One person is responsible for the design, the code, the copy, the launch and everything after it. No designer, developer and host to coordinate.",
    },
    design: {
      address: "evolvia.lt/en/demo/fume",
      tag: "Demo",
      open: "Open the Fumé demo",
    },
    search: {
      label: "Search result",
      description: "Car body studio in Kaunas. Paintless dent repair (PDR), body polishing and ceramic coating.",
      checks: ["Titles and descriptions", "Structured data", "sitemap.xml and robots.txt", "Fast loading on a phone"],
      phoneAlt: "The Minerda website on a phone",
    },
    launch: {
      address: "your-domain.com",
      title: "Launch",
      rows: [
        "Domain connected",
        "SSL certificate valid",
        "Content migrated",
        "Google Search Console connected",
        "Pages submitted for indexing",
      ],
      done: "Done",
    },
    care: {
      title: "Maintenance",
      rows: ["Hosting", "SSL certificate", "Updates", "Changes by email", "Support"],
      firstYear: "First year",
      included: "Included",
      later: "From the second year",
      perYear: "{renewal} / year",
    },
    process: {
      a: "How the work runs.",
      b: "Four steps.",
      step2: "You see a real website, live, not a picture. Only then do you decide.",
      payNote: "Nothing to pay up to this point.",
    },
    fits: {
      b: "And who it suits best.",
      lead: "Most are in construction, interiors, car services, beauty and other services, and either have no website or have an outdated one.",
    },
    faq: {
      a: "Questions about the work.",
      more: "You will find more answers on the",
      link: "FAQ page",
      items: [2, 4, 5, 6],
    },
    closing: {
      a: "You see your site live.",
      b: "Only then do you pay.",
      price: "A website costs {price}, paid once.",
      pricing: "See pricing",
    },
  },
};

export type ServicesCopy = (typeof servicesCopy)["lt"];
const _en: ServicesCopy = servicesCopy.en;
void _en;
