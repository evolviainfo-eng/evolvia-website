/* /darbai: the real client case first, then the four demo sites. Facts
   only (evolvia-facts.md, dictionaries pages.work, demos, demoNote): every
   demo is labelled Demo or Koncepcija / Concept and none is presented as a
   client commission. Minerda's phone number and street address never
   appear. */

export type DemoSlug = "konstrukta" | "fume" | "forma" | "skalsa";

type WorkCopy = {
  metaTitle: string;
  metaDescription: string;
  crumb: string;
  titleA: string;
  titleB: string;
  lead: string;
  minerda: {
    label: string;
    nameA: string;
    nameB: string;
    summary: string;
    facts: ReadonlyArray<{ a: string; b: string }>;
    caseLink: string;
    open: string;
    newWindow: string;
    altDesktop: string;
    altPhone: string;
  };
  demos: {
    titleA: string;
    titleB: string;
    lead: string;
    tryLabel: string;
    open: string;
    items: ReadonlyArray<{
      slug: DemoSlug;
      name: string;
      label: string;
      sector: string;
      tagline: string;
      feature: string;
      scope: readonly string[];
    }>;
  };
  close: { lineA: string; lineB: string; sub: string; prices: string };
};

const lt: WorkCopy = {
  metaTitle: "Darbai",
  metaDescription:
    "Minerda: svetainė Kauno kėbulo studijai, veikianti kliento serveryje ir randama Google. Šalia keturios pavyzdinės svetainės, kurias galite atidaryti ir išbandyti.",
  crumb: "Darbai",
  titleA: "Darbai.",
  titleB: "Viena kliento svetainė ir keturios, kurias galite išbandyti.",
  lead: "Minerda yra gyva svetainė: ją naudoja Kauno kėbulo studija, ji veikia kliento serveryje ir yra randama Google. Po ja keturi pavyzdžiai, kuriuos galite atidaryti ir paspaudinėti.",
  minerda: {
    label: "Kliento darbas, Kaunas",
    nameA: "Minerda.",
    nameB: "Įlenkimų šalinimas be dažymo.",
    summary:
      "Veikianti įmonė be svetainės. Svetainė nuo nulio, keturi straipsniai, DUK puslapis, struktūriniai duomenys ir paleidimas kliento serveryje su galiojančiu SSL.",
    facts: [
      { a: "Svetainė nuo nulio.", b: "Be šablono ir be konstruktoriaus." },
      { a: "Keturi straipsniai ir DUK.", b: "Kiekvienas puslapis savo adresu." },
      { a: "Užklausų forma.", b: "Užklausa ateina į įmonės el. paštą." },
      { a: "Randama Google.", b: "Search Console prijungta, puslapiai suindeksuoti." },
    ],
    caseLink: "Visas projektas",
    open: "Atidaryti minerda.lt",
    newWindow: "(atsidaro naujame lange)",
    altDesktop: "minerda.lt kompiuteryje: įlenkimų šalinimas be dažymo Kaune",
    altPhone: "minerda.lt telefone",
  },
  demos: {
    titleA: "Keturios svetainės,",
    titleB: "kurias galite išbandyti.",
    lead: "Tai pavyzdinės svetainės, ne klientų užsakymai. Kiekviena turi veikiančią funkciją: atidarykite ir paspaudinėkite patys. Tokios kokybės ir tikėkitės.",
    tryLabel: "Ką išbandyti.",
    open: "Atidaryti",
    items: [
      {
        slug: "konstrukta",
        name: "Konstrukta.",
        label: "Koncepcija",
        sector: "Statybos bendrovė",
        tagline: "Statybų bendrovės svetainė: tvirta, struktūruota ir įtikinama nuo pirmo ekrano.",
        feature: "Veikianti sąmatos skaičiuoklė.",
        scope: ["Vizitinė svetainė", "Projektų galerija", "Sąmatos skaičiuoklė"],
      },
      {
        slug: "fume",
        name: "Fumé.",
        label: "Demo",
        sector: "Restoranas ir vyno baras Užupyje",
        tagline: "Trisdešimt keturių vietų restoranas su meniu ir stalo rezervacija. Atmosfera juntama dar prieš atveriant duris.",
        feature: "Veikianti stalo rezervacija.",
        scope: ["Meniu", "Stalo rezervacija", "Atmosferos fotografija"],
      },
      {
        slug: "forma",
        name: "Forma.",
        label: "Demo",
        sector: "Interjero architektūros studija Vilniuje",
        tagline: "Interjero studijos portfolio: projektų indeksas, kuriame darbai kalba patys.",
        feature: "Filtruojamas projektų indeksas su galerija.",
        scope: ["Portfolio", "Projektų filtras", "Galerija"],
      },
      {
        slug: "skalsa",
        name: "Skalsa.",
        label: "Koncepcija",
        sector: "Rankų darbo žvakių el. parduotuvė",
        tagline: "Katalogas, krepšelis ir apmokėjimas vienoje švarioje sistemoje.",
        feature: "Veikiantis krepšelis ir užsakymo eiga.",
        scope: ["Prekių katalogas", "Krepšelis", "Užsakymo eiga"],
      },
    ],
  },
  close: {
    lineA: "Pamatote svetainę gyvai.",
    lineB: "Tik tada mokate.",
    sub: "Parašykite kelis sakinius apie savo verslą. Gausite gyvą eskizą, kurį atidarysite taip pat, kaip šias svetaines.",
    prices: "Žiūrėti kainas",
  },
};

const en: WorkCopy = {
  metaTitle: "Work",
  metaDescription:
    "Minerda: a website for a car body studio in Kaunas, running on the client's server and found on Google. Alongside it, four sample websites you can open and try.",
  crumb: "Work",
  titleA: "Work.",
  titleB: "One client website and four you can try out.",
  lead: "Minerda is a live website: a car body studio in Kaunas uses it, it runs on the client's server and it is found on Google. Below it are four examples you can open and click through.",
  minerda: {
    label: "Client work, Kaunas",
    nameA: "Minerda.",
    nameB: "Paintless dent repair.",
    summary:
      "An established business with no website. A site built from scratch, four articles, an FAQ page, structured data and a launch on the client's server with valid SSL.",
    facts: [
      { a: "Built from scratch.", b: "No template and no site builder." },
      { a: "Four articles and an FAQ.", b: "Every page at its own address." },
      { a: "An enquiry form.", b: "Enquiries land in the company inbox." },
      { a: "Found on Google.", b: "Search Console connected, pages indexed." },
    ],
    caseLink: "The full case",
    open: "Open minerda.lt",
    newWindow: "(opens in a new window)",
    altDesktop: "minerda.lt on a computer: paintless dent repair in Kaunas",
    altPhone: "minerda.lt on a phone",
  },
  demos: {
    titleA: "Four websites",
    titleB: "you can try out.",
    lead: "These are sample websites, not client commissions. Each one has a working feature: open it and click through yourself. This is the level of quality to expect.",
    tryLabel: "What to try.",
    open: "Open",
    items: [
      {
        slug: "konstrukta",
        name: "Konstrukta.",
        label: "Concept",
        sector: "Construction company",
        tagline: "A construction company website: solid, structured and convincing from the first screen.",
        feature: "A working estimate calculator.",
        scope: ["Brochure website", "Project gallery", "Estimate calculator"],
      },
      {
        slug: "fume",
        name: "Fumé.",
        label: "Demo",
        sector: "Restaurant and wine bar in Užupis, Vilnius",
        tagline: "A 34-seat restaurant with a menu and table booking. You feel the atmosphere before you open the door.",
        feature: "Working table booking.",
        scope: ["Menu", "Table booking", "Atmosphere photography"],
      },
      {
        slug: "forma",
        name: "Forma.",
        label: "Demo",
        sector: "Interior architecture studio in Vilnius",
        tagline: "An interior studio portfolio: a project index where the work speaks for itself.",
        feature: "A filterable project index with a gallery.",
        scope: ["Portfolio", "Project filter", "Gallery"],
      },
      {
        slug: "skalsa",
        name: "Skalsa.",
        label: "Concept",
        sector: "Online shop for handmade candles",
        tagline: "Catalogue, basket and checkout in one clean system.",
        feature: "A working basket and checkout flow.",
        scope: ["Product catalogue", "Basket", "Checkout flow"],
      },
    ],
  },
  close: {
    lineA: "See it live.",
    lineB: "Only then do you pay.",
    sub: "Write a few sentences about your business. You get a live draft that you can open just like these websites.",
    prices: "See pricing",
  },
};

export const work = { lt, en };
