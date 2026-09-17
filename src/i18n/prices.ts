import type { Locale } from "@/i18n/config";

/* ─────────────────────────────────────────────────────────────
   Every price the site quotes, one constant per currency.

   The Lithuanian site charges in euros. The English site quotes the same
   offer in pounds, and PRICES_GBP is the only place those pounds live:
   the pricing section, the FAQ answers, the page descriptions, the
   structured data and /en/llms.txt all read from it. Change a figure
   here and nothing else needs touching.

   The GBP figures are rounded conversions of the euro prices, set as a
   starting point. They are business decisions, not exchange rates, so
   set them to whatever you actually want to charge.
   ───────────────────────────────────────────────────────────── */

export const PRICES_EUR = {
  /** The website, paid once. Includes the first year of maintenance. */
  site: 400,
  /** Hosting, SSL, updates and support from the second year on. */
  renewalPerYear: 50,
} as const;

export const PRICES_GBP = {
  /** The website, paid once. Includes the first year of maintenance. */
  site: 350,
  /** Hosting, SSL, updates and support from the second year on. */
  renewalPerYear: 45,
} as const;

export type PriceList = { site: number; renewalPerYear: number };

export const currencyFor: Record<Locale, "EUR" | "GBP"> = {
  lt: "EUR",
  en: "GBP",
};

export const pricesFor: Record<Locale, PriceList> = {
  lt: PRICES_EUR,
  en: PRICES_GBP,
};

/** 400 → "€400". The symbol leads, as the Lithuanian copy has always
 *  written it. Whole numbers only, so no decimal separator to localise. */
export const eur = (amount: number) => `€${amount}`;

/** 350 → "£350". */
export const gbp = (amount: number) => `£${amount}`;
