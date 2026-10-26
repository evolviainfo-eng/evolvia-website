/* Home, Price: the words around the figures. The figures themselves come
   from src/i18n/prices.ts (EUR on the Lithuanian site, GBP on the English
   one) and are never written here. */

type PriceCopy = {
  titleA: string;
  titleB: string;
  once: string;
  statementA: string;
  statementB: string;
  firstYear: string;
  firstYearNote: string;
  later: string;
  laterNote: string;
  filesA: string;
  filesB: string;
  largerA: string;
  largerB: string;
  /** The quiet link to the pricing page. */
  more: string;
};

const lt: PriceCopy = {
  titleA: "Viena kaina.",
  titleB: "Mokama vieną kartą.",
  once: "vieną kartą",
  statementA: "Į kainą įeina dizainas ir programavimas, tekstai ir nuotraukos, domenas ir paleidimas,",
  statementB: "Google paieška, pritaikymas telefonui, talpinimas, SSL ir atnaujinimai pirmus metus.",
  firstYear: "Pirmi metai",
  firstYearNote: "papildomų mokesčių",
  later: "Nuo antrų metų",
  laterNote: "per metus už talpinimą, SSL, atnaujinimus ir pagalbą",
  filesA: "Failai lieka jūsų.",
  filesB: "Jei nuspręsite nebetęsti priežiūros, svetainės failai lieka jums.",
  largerA: "Didesnė svetainė ar el. parduotuvė?",
  largerB: "Kaina pagal apimtį, tiksli sąmata per dieną.",
  more: "Kainos išsamiau",
};

const en: PriceCopy = {
  titleA: "One price.",
  titleB: "Paid once.",
  once: "paid once",
  statementA: "The price covers design and development, copy and photos, the domain and the launch,",
  statementB: "Google search, the phone layout, hosting, SSL and updates for the first year.",
  firstYear: "First year",
  firstYearNote: "in extra fees",
  later: "From the second year",
  laterNote: "a year for hosting, SSL, updates and support",
  filesA: "The files stay yours.",
  filesB: "If you decide to stop the maintenance, the website files stay with you.",
  largerA: "A larger website or an online shop?",
  largerB: "Priced by scope, with an exact quote within a day.",
  more: "Pricing in detail",
};

export const price = { lt, en };
