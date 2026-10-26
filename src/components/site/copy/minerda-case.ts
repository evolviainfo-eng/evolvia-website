/* /darbai/minerda: the full case. Facts only (evolvia-facts.md, the
   dictionaries' minerda and pages.minerda). No visitor numbers, rankings,
   dates or durations: nobody measured any. The client's phone number and
   street address never appear, not in words and not in a screenshot.

   The search titles and descriptions are the ones minerda.lt's pages carry
   (fetched from the live pages). The client writes its titles with a long
   dash; here it is a plain hyphen, and the home description stops before
   the address and phone. minerda.lt is Lithuanian only, so these lines stay
   Lithuanian on the English page. */

type Result = { path: string; title: string; desc: string };

type MinerdaCaseCopy = {
  metaTitle: string;
  metaDescription: string;
  crumbWork: string;
  back: string;
  titleA: string;
  titleB: string;
  lead: string;
  facts: ReadonlyArray<{ k: string; v: string; href?: string }>;
  newWindow: string;
  altDesktop: string;
  altPhone: string;
  heroCaption: string;
  brief: { titleA: string; titleB: string; lead: string };
  built: { title: string; lead: string; items: ReadonlyArray<{ title: string; detail: string }> };
  pages: {
    titleA: string;
    titleB: string;
    lead: string;
    article: { alt: string; caption: string };
    faq: { alt: string; caption: string };
    open: string;
  };
  search: {
    titleA: string;
    titleB: string;
    lead: string;
    resultsLabel: string;
    sitemapLabel: string;
    sitemapCaption: string;
  };
  result: { a: string; b: string; open: string; all: string };
};

/** The client's own words, the same in both languages. */
export const MINERDA_RESULTS: readonly Result[] = [
  {
    path: "",
    title: "Minerda | Įlenkimų šalinimas be dažymo Kaune",
    desc: "Minerda, automobilių kėbulo studija Kaune. Meninis lyginimas (PDR) be dažymo, kėbulo poliravimas ir keraminė nanodanga.",
  },
  {
    path: "straipsniai › meninis-lyginimas",
    title: "Meninis lyginimas - profesionalus automobilių įlenkimų lyginimas be dažymo",
    desc: "Meninis lyginimas - tai modernus automobilio kėbulo įlenkimų šalinimo būdas, leidžiantis daugeliu atvejų atkurti pažeistos detalės formą be glaistymo ir dažymo.",
  },
  {
    path: "straipsniai › nanodanga",
    title: "Nanodanga - keraminė ir grafeno kėbulo apsauga",
    desc: "Nanodanga - tai skysta apsauginė danga, kuri užtepta ant lako sukietėja ir sudaro ploną, kietą ir vandenį atstumiantį sluoksnį.",
  },
  {
    path: "duk",
    title: "Dažniausiai užduodami klausimai | Minerda",
    desc: "Atsakymai apie meninį lyginimą ir PDR: durelių, sparno, kapoto ir krušos įlenkimų lyginimas be dažymo, žymės, terminai ir kaina. Minerda, Kaunas.",
  },
];

const lt: MinerdaCaseCopy = {
  metaTitle: "Minerda: svetainė įlenkimų šalinimo studijai Kaune",
  metaDescription:
    "Kaip Kauno kėbulo studija Minerda gavo svetainę nuo nulio: keturi straipsniai, DUK puslapis, struktūriniai duomenys, užklausų forma ir paleidimas kliento serveryje su galiojančiu SSL.",
  crumbWork: "Darbai",
  back: "Visi darbai",
  titleA: "Minerda.",
  titleB: "Svetainė įlenkimų šalinimo studijai Kaune.",
  lead: "Veikianti įmonė be svetainės. Svetainė nuo nulio, keturi straipsniai, DUK puslapis, struktūriniai duomenys ir paleidimas kliento serveryje su galiojančiu SSL.",
  facts: [
    { k: "Klientas", v: "Minerda" },
    { k: "Veikla", v: "Įlenkimų šalinimas be dažymo, kėbulo priežiūra" },
    { k: "Miestas", v: "Kaunas" },
    { k: "Svetainė", v: "minerda.lt", href: "https://minerda.lt" },
  ],
  newWindow: "(atsidaro naujame lange)",
  altDesktop: "minerda.lt pagrindinis puslapis kompiuteryje",
  altPhone: "minerda.lt pagrindinis puslapis telefone",
  heroCaption: "Pagrindinis puslapis: antraštė „Įlenkimų šalinimas be dažymo Kaune“ ir mygtukas „Įvertinti pagal nuotrauką“.",
  brief: {
    titleA: "Užduotis.",
    titleB: "Įmonė be savo adreso internete.",
    lead: "Minerda šalina automobilių kėbulo įlenkimus be dažymo, poliruoja kėbulą ir dengia keramine nanodanga. Įmonė dirbo ir turėjo klientų, bet savo svetainės neturėjo: darbų nuotraukos ir atsiliepimai gyveno tik socialiniuose tinkluose, o adreso, kurį galima duoti klientui arba įrašyti į Google, nebuvo.",
  },
  built: {
    title: "Ką padarėme.",
    lead: "Viskas, kas sudaro veikiančią svetainę, o ne tik pirmą ekraną.",
    items: [
      { title: "Svetainė nuo nulio", detail: "Struktūra, tekstai, nuotraukų paruošimas ir kodas. Be šablono ir be konstruktoriaus." },
      { title: "Keturi straipsniai paieškai", detail: "Meninis lyginimas, kėbulo poliravimas, nanodanga, žibintų poliravimas. Kiekvienas savo adresu." },
      { title: "Atskiras DUK puslapis", detail: "Klausimai ir atsakymai atskirame puslapyje, o ne bloke svetainės apačioje." },
      { title: "Struktūriniai duomenys", detail: "JSON-LD, sitemap.xml ir robots.txt, kad paieškos sistemos suprastų, kas yra kiekviename puslapyje." },
      { title: "Užklausų forma", detail: "Užpildyta užklausa ateina tiesiai į įmonės el. paštą." },
      { title: "Paleidimas kliento serveryje", detail: "Svetainė gyvena kliento nuosavame hostinge su galiojančiu SSL sertifikatu." },
      { title: "Google Search Console", detail: "Svetainė prijungta, puslapiai suindeksuoti." },
    ],
  },
  pages: {
    titleA: "Tikri puslapiai.",
    titleB: "Kiekvienas savo adresu.",
    lead: "Keturi straipsniai ir DUK puslapis atsako į klausimus, kuriuos žmonės užduoda dar prieš skambindami. Kiekvienas jų yra atskiras puslapis su savo adresu, tad gali būti randamas atskirai.",
    article: {
      alt: "Minerda straipsnis apie meninį lyginimą",
      caption: "Vienas iš keturių straipsnių. Kiti trys: kėbulo poliravimas, nanodanga, žibintų poliravimas.",
    },
    faq: {
      alt: "Minerda DUK puslapis",
      caption: "DUK puslapis su struktūriniais duomenimis, kad klausimai būtų suprantami ir paieškos sistemoms.",
    },
    open: "Atidaryti",
  },
  search: {
    titleA: "Paieškoje.",
    titleB: "Kiekvienas puslapis prisistato pats.",
    lead: "Pavadinimai ir aprašymai, kuriuos minerda.lt puslapiai pateikia paieškos sistemoms. Svetainė prijungta prie Google Search Console, puslapiai suindeksuoti.",
    resultsLabel: "minerda.lt puslapių pavadinimai ir aprašymai paieškai",
    sitemapLabel: "minerda.lt svetainės žemėlapis",
    sitemapCaption: "Aštuoni puslapiai, kiekvienas su savo adresu.",
  },
  result: {
    a: "minerda.lt veikia kliento serveryje ir yra randama Google.",
    b: "Svetainę galite atidaryti ir apžiūrėti patys.",
    open: "Atidaryti minerda.lt",
    all: "Visi darbai",
  },
};

const en: MinerdaCaseCopy = {
  metaTitle: "Minerda: a website for a dent repair studio in Kaunas",
  metaDescription:
    "How Minerda, a car body studio in Kaunas, got a website from scratch: four articles, an FAQ page, structured data, an enquiry form and a launch on the client's server with valid SSL.",
  crumbWork: "Work",
  back: "All work",
  titleA: "Minerda.",
  titleB: "A website for a dent repair studio in Kaunas.",
  lead: "An established business with no website. A site built from scratch, four articles, an FAQ page, structured data and a launch on the client's server with valid SSL.",
  facts: [
    { k: "Client", v: "Minerda" },
    { k: "Business", v: "Paintless dent repair, bodywork care" },
    { k: "City", v: "Kaunas, Lithuania" },
    { k: "Website", v: "minerda.lt", href: "https://minerda.lt" },
  ],
  newWindow: "(opens in a new window)",
  altDesktop: "The minerda.lt home page on a computer",
  altPhone: "The minerda.lt home page on a phone",
  heroCaption: "The home page, in Lithuanian: the headline “Įlenkimų šalinimas be dažymo Kaune” (paintless dent repair in Kaunas) and the button “Įvertinti pagal nuotrauką” (get a quote from a photo).",
  brief: {
    titleA: "The brief.",
    titleB: "A business with no address online.",
    lead: "Minerda removes dents from car bodywork without repainting, polishes paintwork and applies ceramic nano-coating. The business was up and running and had customers, but no website of its own: photos of its work and its reviews lived only on social media, and there was no address to give a customer or enter into Google.",
  },
  built: {
    title: "What we built.",
    lead: "Everything that makes a working website, not just the first screen.",
    items: [
      { title: "A website from scratch", detail: "Structure, copy, photo preparation and code. No template and no site builder." },
      { title: "Four articles for search", detail: "Paintless dent repair, body polishing, nano-coating and headlight polishing. Each at its own address." },
      { title: "A separate FAQ page", detail: "Questions and answers on a page of their own, not in a block at the bottom of the site." },
      { title: "Structured data", detail: "JSON-LD, sitemap.xml and robots.txt, so search engines understand what is on each page." },
      { title: "An enquiry form", detail: "A completed enquiry goes straight to the company's inbox." },
      { title: "Launch on the client's server", detail: "The website runs on the client's own hosting with a valid SSL certificate." },
      { title: "Google Search Console", detail: "The site is connected and its pages are indexed." },
    ],
  },
  pages: {
    titleA: "The real pages.",
    titleB: "Each at its own address.",
    lead: "Four articles and an FAQ page answer the questions people ask before they pick up the phone. Each is a separate page with its own address, so each can be found on its own. The site is in Lithuanian.",
    article: {
      alt: "Minerda article on paintless dent repair",
      caption: "One of the four articles. The other three: body polishing, nano-coating and headlight polishing.",
    },
    faq: {
      alt: "Minerda FAQ page",
      caption: "The FAQ page, with structured data so that search engines can read the questions too.",
    },
    open: "Open",
  },
  search: {
    titleA: "In search.",
    titleB: "Every page introduces itself.",
    lead: "The titles and descriptions minerda.lt's pages give search engines, in the client's Lithuanian. The site is connected to Google Search Console and its pages are indexed.",
    resultsLabel: "Search titles and descriptions of minerda.lt pages",
    sitemapLabel: "The minerda.lt sitemap",
    sitemapCaption: "Eight pages, each at its own address.",
  },
  result: {
    a: "minerda.lt runs on the client's server and is found on Google.",
    b: "You can open the website and look around yourself.",
    open: "Open minerda.lt",
    all: "All work",
  },
};

export const minerdaCase = { lt, en };
