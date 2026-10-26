/* /kainos: the words this page adds to the dictionary. The plan, the
   renewal, the larger-project offer and the FAQ answers come from
   src/i18n/dictionaries (pricing, pages.pricing, faq, demos); this module
   holds the page's own headings, the three-year view and the comparison.
   {price}, {renewal} and {total} are filled from prices.ts. Every row of
   the comparison restates the offer; nothing is added to it. */

export const pricingCopy = {
  lt: {
    titleA: "Aiški kaina.",
    titleB: "Jokių staigmenų.",
    included: "Į kainą įeina",
    planRenewal: "{renewal} per metus už hostingą, SSL, atnaujinimus ir palaikymą.",
    years: {
      a: "Po pirmų metų",
      b: "{renewal} per metus.",
      cols: [
        { label: "Pirmi metai", amount: "site", body: "Svetainė ir pirmi metai priežiūros." },
        { label: "Antri metai", amount: "renewal", body: "Hostingas, SSL, atnaujinimai ir palaikymas." },
        { label: "Treti metai", amount: "renewal", body: "Tas pats. Arba nutraukiate, ir failai lieka jūsų." },
      ],
      total: "Per trejus metus iš viso {total}.",
      monthly: "Mėnesinių mokesčių nėra.",
    },
    compare: {
      a: "Už ką mokate.",
      b: "Ir kas lieka jūsų.",
      lead: "Kas įeina į svetainės kainą ir kas tęsiasi už metinį mokestį. Viskas, kas čia parašyta, ir nieko daugiau.",
      cols: [
        { name: "Svetainė", note: "{price} vieną kartą" },
        { name: "Priežiūra", note: "{renewal} per metus" },
      ],
      yes: "Įeina",
      done: "Jau padaryta",
      firstYear: "Pirmi metai",
      none: "Nėra",
      yours: "Jūsų",
      yoursAlways: "Jūsų, net nutraukus",
      rows: {
        design: "Individualus dizainas ir programavimas",
        copy: "Tekstai ir nuotraukų paruošimas",
        launch: "Domenas, paleidimas ir perkėlimas",
        seo: "Optimizacija Google paieškai",
        phone: "Pritaikyta telefonui ir planšetei",
        hosting: "Hostingas ir SSL",
        updates: "Atnaujinimai ir pakeitimai",
        support: "Palaikymas",
        monthly: "Mėnesiniai mokesčiai",
        files: "Svetainės failai",
      },
    },
    larger: {
      a: "Didesnė svetainė",
      b: "ar el. parduotuvė?",
      demosLead: "Taip atrodo funkcijos, kurios keičia apimtį. Kiekvieną pavyzdį galite atidaryti ir išbandyti.",
    },
    faq: {
      /** Indexes into faq.items: price, after the first year, see before
       *  paying, who looks after it, invoice. */
      items: [0, 1, 2, 5, 7],
    },
    closing: {
      a: "Pamatote svetainę gyvai.",
      b: "Tik tada mokate.",
      lead: "Parašykite kelis sakinius apie savo verslą. Kaina sutariama prieš pradedant darbą ir nesikeičia.",
      services: "Kas įeina į darbą",
    },
  },
  en: {
    titleA: "A clear price.",
    titleB: "No surprises.",
    included: "Included in the price",
    planRenewal: "{renewal} a year for hosting, SSL, updates and support.",
    years: {
      a: "After the first year",
      b: "{renewal} a year.",
      cols: [
        { label: "First year", amount: "site", body: "The website and the first year of maintenance." },
        { label: "Second year", amount: "renewal", body: "Hosting, SSL, updates and support." },
        { label: "Third year", amount: "renewal", body: "The same. Or you stop, and the files stay yours." },
      ],
      total: "{total} in total over three years.",
      monthly: "No monthly fees.",
    },
    compare: {
      a: "What you pay for.",
      b: "And what stays yours.",
      lead: "What the website price covers and what carries on under the yearly fee. Everything written here, and nothing more.",
      cols: [
        { name: "Website", note: "{price}, paid once" },
        { name: "Maintenance", note: "{renewal} a year" },
      ],
      yes: "Included",
      done: "Already done",
      firstYear: "First year",
      none: "None",
      yours: "Yours",
      yoursAlways: "Yours, even if you stop",
      rows: {
        design: "Bespoke design and development",
        copy: "Copywriting and photo preparation",
        launch: "Domain, launch and migration",
        seo: "Optimisation for Google search",
        phone: "Built for phones and tablets",
        hosting: "Hosting and SSL",
        updates: "Updates and changes",
        support: "Support",
        monthly: "Monthly fees",
        files: "The website files",
      },
    },
    larger: {
      a: "A larger website",
      b: "or an online shop?",
      demosLead: "This is what the features that change the scope look like. You can open and try every example.",
    },
    faq: {
      items: [0, 1, 2, 5, 7],
    },
    closing: {
      a: "You see your site live.",
      b: "Only then do you pay.",
      lead: "Write a few sentences about your business. The price is agreed before any work starts, and it does not change.",
      services: "What the work includes",
    },
  },
};

export type PricingCopy = (typeof pricingCopy)["lt"];
const _en: PricingCopy = pricingCopy.en;
void _en;
