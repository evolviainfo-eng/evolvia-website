/* Home, Minerda: the real client case. Facts only (evolvia-facts.md). The
   screenshots are of the client's Lithuanian site, so the English alt text
   says what they show without translating the client's words. */

type MinerdaCopy = {
  titleA: string;
  titleB: string;
  lead: string;
  captions: ReadonlyArray<{ a: string; b: string }>;
  altDesktop: string;
  altPhone: string;
  client: string;
  /** The quiet link to the full case page. */
  caseLink: string;
  open: string;
  newWindow: string;
};

const lt: MinerdaCopy = {
  titleA: "Minerda.",
  titleB: "Nuo nulio iki\u00a0paieškos.",
  lead: "Kėbulo studija Kaune, kuri neturėjo svetainės. Dabar yra randama Google ir priima užklausas per savo svetainę, veikiančią jos pačios serveryje.",
  captions: [
    { a: "Svetainė nuo nulio.", b: "Struktūra, tekstai, nuotraukų paruošimas ir kodas, be šablono." },
    { a: "Darbas kalba pats.", b: "Prieš ir po palyginimai iš tikrų jų darbų." },
    { a: "Randama Google.", b: "Keturi straipsniai paieškai, DUK puslapis, Search Console prijungta, puslapiai suindeksuoti." },
    { a: "Veikia kliento serveryje.", b: "Su galiojančiu SSL ir užklausų forma į įmonės el. paštą." },
  ],
  altDesktop: "minerda.lt kompiuteryje: įlenkimų šalinimas be dažymo Kaune",
  altPhone: "minerda.lt telefone",
  client: "minerda.lt · Klientas",
  caseLink: "Visas projektas",
  open: "Atidaryti minerda.lt",
  newWindow: "(atsidaro naujame lange)",
};

const en: MinerdaCopy = {
  titleA: "Minerda.",
  titleB: "From nothing to\u00a0search.",
  lead: "A paintless dent repair studio in Kaunas that had no website. Now it is found on Google and takes enquiries through a website of its own, running on its own server.",
  captions: [
    { a: "A website from scratch.", b: "Structure, copy, photo preparation and code, no template." },
    { a: "The work speaks for itself.", b: "Before and after comparisons from their real jobs." },
    { a: "Found on Google.", b: "Four articles for search, an FAQ page, Search Console connected, pages indexed." },
    { a: "Runs on the client's server.", b: "With valid SSL and an enquiry form that lands in the company inbox." },
  ],
  altDesktop: "minerda.lt on a computer: paintless dent repair in Kaunas",
  altPhone: "minerda.lt on a phone",
  client: "minerda.lt · Client",
  caseLink: "The full case",
  open: "Open minerda.lt",
  newWindow: "(opens in a new window)",
};

export const minerda = { lt, en };
