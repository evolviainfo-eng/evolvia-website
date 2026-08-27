/** Kainos — one website, one price.
 *
 *  €400 once. The first year (hosting, SSL, updates, support) is inside that
 *  price; after it, €50 a year keeps the site running. Larger sites and
 *  e-shops are quoted by scope, with no number invented here.
 *
 *  No fake discounts, no timers, no invented claims. Every figure on the site
 *  is derived from this file, including the structured data in schema.ts. */

export const plan = {
  name: "Svetainė",
  oneTime: "€400",
  priceSuffix: "vienkartinis mokestis. Jokių mėnesinių.",
  summary:
    "Viena kaina už visą darbą: dizainą, programavimą, tekstus, paleidimą ir pirmus metus priežiūros.",
  includes: [
    "Individualus dizainas ir programavimas",
    "Tekstai ir nuotraukų paruošimas",
    "Domenas, paleidimas ir perkėlimas",
    "Optimizacija Google paieškai",
    "Pritaikyta telefonui ir planšetei",
    "Hostingas ir SSL pirmus metus",
    "Atnaujinimai ir pakeitimai pirmus metus",
  ],
  cta: { label: "Pradėti", href: "#kontaktai" },
} as const;

/** What happens after the first year. Shown as one quiet line, not a plan. */
export const renewal = {
  price: "€50 / metus",
  label: "Po pirmų metų",
  body: "Hostingas, SSL, atnaujinimai ir palaikymas toliau kainuoja €50 per metus. Nenorite tęsti, svetainės failai lieka jūsų.",
} as const;

/** Larger sites and e-shops: quoted by scope, never guessed in advance. */
export const largerProjects = {
  name: "El. parduotuvė arba didesnė svetainė",
  price: "Kaina pagal apimtį",
  summary:
    "Daug puslapių, katalogas, krepšelis, rezervacijos ar kalbų versijos. Parašykite, ko reikia, ir gausite tikslią kainą per dieną.",
  cta: { label: "Aptarti projektą", href: "#kontaktai" },
} as const;

export const pricingNote =
  "Kaina fiksuota prieš pradedant darbą. Pirmiausia pamatote svetainę gyvai, mokate tik tada, kai ji jums patinka.";
