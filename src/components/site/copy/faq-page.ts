/* Words of /duk around the questions themselves. The questions and answers
   come from getDictionary(locale).faq.items (the same text the FAQPage
   structured data carries); here they are only grouped, by their index in
   that list. An index missing from every group falls into the last one, so
   a new question can never disappear from the page. */

type Group = { id: string; title: string; note: string; items: readonly number[] };

type FaqPageCopy = {
  titleDim: string;
  groups: readonly Group[];
  closing: {
    title: string;
    titleDim: string;
    lead: string;
    pricing: string;
    reach: string;
  };
};

const lt: FaqPageCopy = {
  titleDim: "Atsakymai prieš pradedant.",
  groups: [
    {
      id: "kaina",
      title: "Kaina ir sąskaita",
      note: "Kiek kainuoja, kas įeina ir kas lieka po pirmų metų.",
      items: [0, 1, 7],
    },
    {
      id: "pradzia",
      title: "Prieš pradedant",
      note: "Kam tinka, ko reikia iš jūsų ir kada pamatote svetainę.",
      items: [8, 4, 2, 3],
    },
    {
      id: "prieziura",
      title: "Po paleidimo",
      note: "Kas rūpinasi svetaine ir kaip ji randama Google.",
      items: [5, 6],
    },
  ],
  closing: {
    title: "Neradote atsakymo?",
    titleDim: "Parašykite.",
    lead: "Keli sakiniai apie jūsų verslą ir ko ieškote. Atsakysime per dieną.",
    pricing: "Žiūrėti kainas",
    reach: "Arba tiesiai",
  },
};

const en: FaqPageCopy = {
  titleDim: "Answers before you start.",
  groups: [
    {
      id: "kaina",
      title: "Price and invoicing",
      note: "What it costs, what is included and what happens after the first year.",
      items: [0, 1, 7],
    },
    {
      id: "pradzia",
      title: "Before you start",
      note: "Who it is for, what we need from you and when you see the site.",
      items: [8, 4, 2, 3],
    },
    {
      id: "prieziura",
      title: "After launch",
      note: "Who looks after the site and how people find it on Google.",
      items: [5, 6],
    },
  ],
  closing: {
    title: "Still have a question?",
    titleDim: "Write to us.",
    lead: "A few sentences about your business and what you need. We will reply within a day.",
    pricing: "See pricing",
    reach: "Or directly",
  },
};

export const faqPageCopy = { lt, en } as const;
