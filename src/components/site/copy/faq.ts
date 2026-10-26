/* Home, FAQ: the chapter lead around the e-mail address. The questions and
   answers come from the site dictionary (getDictionary(locale).faq). */

type FaqCopy = { before: string; after: string };

const lt: FaqCopy = {
  before: "Nerandate atsakymo? Parašykite",
  after: ", atsakysime per dieną.",
};

const en: FaqCopy = {
  before: "Can't find an answer? Write to",
  after: " and we will reply within a day.",
};

export const faq = { lt, en };
