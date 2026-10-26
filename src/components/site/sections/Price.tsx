import { EnquiryLink } from "@/components/site/Chrome";
import { Arrow } from "@/components/site/ui/Primitives";
import { localeInfo, localizePath, type Locale } from "@/i18n/config";
import { currencyFor, pricesFor } from "@/i18n/prices";
import { price } from "@/components/site/copy/price";
import s from "./Price.module.css";

/** The currency symbol and the whole number, as Intl writes them for the
 *  page's language (lt-LT: "400 €", en-GB: "£350"). The design sets the
 *  symbol raised and lighter in front of the figure in both languages, so
 *  only the parts are taken from Intl, not their order. */
function parts(value: number, locale: Locale) {
  const f = new Intl.NumberFormat(localeInfo[locale].intl, {
    style: "currency",
    currency: currencyFor[locale],
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).formatToParts(value);
  const symbol = f.find((p) => p.type === "currency")?.value ?? "";
  const num = f
    .filter((p) => p.type === "integer" || p.type === "group")
    .map((p) => p.value)
    .join("");
  return { symbol, num };
}

/** A figure with the currency sign raised and set lighter, the same
 *  treatment at every size so the page quotes money in one voice. */
function Amount({ value, locale, className }: { value: number; locale: Locale; className: string }) {
  const { symbol, num } = parts(value, locale);
  return (
    <span className={`tnum ${className}`}>
      <span className={s.cur}>{symbol}</span>
      {num}
    </span>
  );
}

/** Kaina. Centred, dark, typographic, no card. Read top to bottom like a
 *  printed price sheet: the chapter, the figure rising out of a black veil
 *  (data-scrub inside .emerge), one statement of everything included whose
 *  words brighten with the scroll (data-words), a two-figure comparison
 *  whose hairline draws between the halves as they arrive (data-in, the
 *  rule's hidden state is a zero scale), two notes, the enquiry button and
 *  a quiet link to the pricing page. Figures from src/i18n/prices.ts. */
export function Price({ locale = "lt" }: { locale?: Locale } = {}) {
  const c = price[locale];
  const p = pricesFor[locale];
  return (
    <section id="kaina" className="sec" data-tone="dark" aria-labelledby="kaina-h">
      <div className="wrap">
        <header className={s.head}>
          <h2 id="kaina-h" className={`t-h2 ${s.title}`} data-split>
            {c.titleA} <span className="dim">{c.titleB}</span>
          </h2>
        </header>

        <div className={s.emerge}>
          <div className={s.figure} data-scrub>
            <p className={s.figLine}>
              <Amount value={p.site} locale={locale} className={s.fig} />
            </p>
            <p className={s.once}>{c.once}</p>
          </div>
        </div>

        <p className={`t-statement ${s.statement}`} data-words>
          {c.statementA} <span className="dim">{c.statementB}</span>
        </p>

        <div className={s.compare} data-stagger="0.12">
          <div className={s.half} data-in>
            <p className={s.label}>{c.firstYear}</p>
            <p className={s.valueLine}>
              <Amount value={0} locale={locale} className={s.value} />
            </p>
            <p className={s.note}>{c.firstYearNote}</p>
          </div>
          <span className={s.rule} aria-hidden="true" data-in />
          <div className={s.half} data-in>
            <p className={s.label}>{c.later}</p>
            <p className={s.valueLine}>
              <Amount value={p.renewalPerYear} locale={locale} className={s.value} />
            </p>
            <p className={s.note}>{c.laterNote}</p>
          </div>
        </div>

        <div className={s.lines}>
          <p className={s.line} data-in>
            {c.filesA} <span className="dim">{c.filesB}</span>
          </p>
          <p className={s.line} data-in>
            {c.largerA} <span className="dim">{c.largerB}</span>
          </p>
        </div>

        <div className={s.action} data-in>
          <EnquiryLink className="btn btn-primary btn-lg" />
          <a className={s.more} href={localizePath("/kainos", locale)}>
            {c.more}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
