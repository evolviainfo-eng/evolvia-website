import { localeInfo, type Locale } from "@/i18n/config";
import { currencyFor, pricesFor } from "@/i18n/prices";

/* Money for /kainos and /paslaugos. The figures come from prices.ts (EUR on
   the Lithuanian site, GBP on the English one); Intl supplies the symbol and
   the digits for the page's locale. The symbol always leads ("€400",
   "£350"), the way the rest of the site quotes money. */

export type Money = { symbol: string; number: string; text: string };

export function money(locale: Locale, amount: number): Money {
  const parts = new Intl.NumberFormat(localeInfo[locale].intl, {
    style: "currency",
    currency: currencyFor[locale],
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).formatToParts(amount);
  const symbol = parts.find((p) => p.type === "currency")?.value ?? "";
  const number = parts
    .filter((p) => p.type === "integer" || p.type === "group")
    .map((p) => p.value)
    .join("");
  return { symbol, number, text: `${symbol}${number}` };
}

/** The site price, the yearly renewal and the cost of three years. */
export function priceSet(locale: Locale) {
  const p = pricesFor[locale];
  return {
    site: money(locale, p.site),
    renewal: money(locale, p.renewalPerYear),
    threeYears: money(locale, p.site + 2 * p.renewalPerYear),
  };
}

/** A figure with the currency symbol raised and set lighter. */
export function Amount({ m, className, curClassName }: { m: Money; className?: string; curClassName?: string }) {
  return (
    <span className={`tnum ${className ?? ""}`}>
      <span className={curClassName}>{m.symbol}</span>
      {m.number}
    </span>
  );
}
