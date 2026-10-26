/* Home, Works: the four demo sites. Facts only (evolvia-facts.md): every
   demo is labelled Demo or Koncepcija / Concept, and none is presented as
   a client commission. */

export type DemoSlug = "konstrukta" | "fume" | "forma" | "skalsa";

type WorksCopy = {
  titleA: string;
  titleB: string;
  statementA: string;
  statementB: string;
  /** The quiet link to the full work page. */
  more: string;
  demos: ReadonlyArray<{ slug: DemoSlug; name: string; caption: string; tag: string }>;
};

const lt: WorksCopy = {
  titleA: "Keturios svetainės,",
  titleB: "kurias galite išbandyti.",
  statementA: "Kiekviena su veikiančia funkcija.",
  statementB: "Demonstracinės svetainės, ne klientų užsakymai.",
  more: "Visi darbai",
  demos: [
    { slug: "konstrukta", name: "Konstrukta.", caption: "Statybos įmonė su sąmatos skaičiuokle.", tag: "Koncepcija" },
    { slug: "fume", name: "Fumé.", caption: "Restoranas ir vyno baras su stalo rezervacija.", tag: "Demo" },
    { slug: "forma", name: "Forma.", caption: "Interjero studija su projektų filtru.", tag: "Demo" },
    { slug: "skalsa", name: "Skalsa.", caption: "Žvakių parduotuvė su krepšeliu.", tag: "Koncepcija" },
  ],
};

const en: WorksCopy = {
  titleA: "Four websites",
  titleB: "you can try out.",
  statementA: "Each one has a working feature.",
  statementB: "Sample websites, not client commissions.",
  more: "All work",
  demos: [
    { slug: "konstrukta", name: "Konstrukta.", caption: "A builder with an estimate calculator.", tag: "Concept" },
    { slug: "fume", name: "Fumé.", caption: "A restaurant and wine bar with table booking.", tag: "Demo" },
    { slug: "forma", name: "Forma.", caption: "An interior studio with a project filter.", tag: "Demo" },
    { slug: "skalsa", name: "Skalsa.", caption: "A candle shop with a basket and checkout.", tag: "Concept" },
  ],
};

export const works = { lt, en };
