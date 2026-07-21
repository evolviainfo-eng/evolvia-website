/** Kainos — one website, two EQUAL payment options side by side,
 *  plus the e-shop / larger-site tier as a separate band below.
 *  No fake discounts, no timers, no invented claims. */

export interface PayOption {
  id: string;
  /** Small mode label above the name, e.g. "Mokate dalimis". */
  mode: string;
  name: string;
  oneTime: string;
  /** Second line under the price, e.g. "+ €50 / mėn" or "be mėnesinio mokesčio". */
  priceSuffix: string;
  summary: string;
  includes: string[];
  cta: { label: string; href: string };
}

/** The two equal options for the standard website. */
export const payOptions: PayOption[] = [
  {
    id: "prieziura",
    mode: "Mažesnė pradžia",
    name: "Su priežiūra",
    oneTime: "€150",
    priceSuffix: "vienkartinis + €50 / mėn",
    summary:
      "Sumokate mažiau iš karto, o toliau viskuo rūpinamės mes — svetainė visada gyva ir atnaujinta.",
    includes: [
      "Dizainas ir programavimas",
      "Paleidimas ir perkėlimas į domeną",
      "Hostingas ir palaikymas",
      "Atnaujinimai ir smulkūs pakeitimai",
    ],
    cta: { label: "Pradėti", href: "#kontaktai" },
  },
  {
    id: "vienkartinis",
    mode: "Viskas iš karto",
    name: "Vienkartinis",
    oneTime: "€400",
    priceSuffix: "vienkartinis · be mėnesinio mokesčio",
    summary:
      "Viena kaina, jokių mėnesinių įsipareigojimų. Ta pati svetainė, o pirmų metų hostingas jau įskaičiuotas.",
    includes: [
      "Dizainas ir programavimas",
      "Paleidimas ir perkėlimas į domeną",
      "Hostingas pirmus metus įskaičiuotas",
      "Jokių mėnesinių mokesčių",
    ],
    cta: { label: "Pradėti", href: "#kontaktai" },
  },
];

/** The step-up tier — always shown below the two equal options. */
export const shopTier = {
  name: "El. parduotuvė / didesnė svetainė",
  oneTime: "€600",
  priceSuffix: "vienkartinis + €100 / mėn",
  summary:
    "Kelių puslapių svetainė arba el. parduotuvė su pilnu funkcionalumu augančiam verslui.",
  cta: { label: "Susisiekti", href: "#kontaktai" },
} as const;

export const pricingNote =
  "Abu planai — ta pati svetainė: tas pats dizainas, greitis ir kokybė. Skiriasi tik mokėjimo būdas. Mėnesinis mokestis apima hostingą, atnaujinimus, palaikymą ir smulkius pakeitimus.";
