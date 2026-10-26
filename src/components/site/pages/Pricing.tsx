import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { fill } from "@/i18n/fill";
import { localizePath, type Locale } from "@/i18n/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/content/schema";
import { EnquiryLink, Footer, Nav } from "@/components/site/Chrome";
import { Chapter, Tick } from "@/components/site/ui/Primitives";
import { pricingCopy } from "@/components/site/copy/pricing";
import { Closing, PageHead, Questions, TextLink } from "./pricing/Parts";
import { Amount, priceSet } from "./pricing/money";
import s from "./Pricing.module.css";

/* /kainos and /en/kainos.

   1. Head: the two-tone h1 and the lead, then the one plan as one flat
      panel: the figure, what it is, the enquiry at the left; everything
      included as hairline rows at the right. The figure is on the first
      screen of a 1440 x 700 laptop.
   2. After the first year: three years laid side by side on one hairline,
      what each costs and covers, and the sum. Arithmetic on prices.ts only.
   3. The comparison: every item of the offer in one table, what the
      one-off price covers and what carries on under the yearly fee.
   4. Larger websites and shops: priced by scope, and the four demos whose
      working feature is the kind of thing that changes the scope.
   5. Questions about price (faq.items 0, 1, 2, 5, 7).
   6. The closing line and the enquiry.

   Type: h1 .t-hero; the plan figure 72 to 112 px / 300; year figures
   40 to 56 px / 300; chapters .t-h2; rows 15 to 16 px. */

export function pricingMetadata(locale: Locale): Metadata {
  const p = getDictionary(locale).pages.pricing;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/kainos" });
}

const DEMOS = ["skalsa", "fume", "konstrukta", "forma"] as const;
const DEMO_NAME = { skalsa: "Skalsa", fume: "Fumé", konstrukta: "Konstrukta", forma: "Forma" } as const;
const DEMO_KIND = { skalsa: "concept", fume: "demo", konstrukta: "concept", forma: "demo" } as const;

type Cell = "yes" | "done" | "firstYear" | "none" | "yours" | "yoursAlways";
const TABLE: { row: "design" | "copy" | "launch" | "seo" | "phone" | "hosting" | "updates" | "support" | "monthly" | "files"; site: Cell; care: Cell }[] = [
  { row: "design", site: "yes", care: "done" },
  { row: "copy", site: "yes", care: "done" },
  { row: "launch", site: "yes", care: "done" },
  { row: "seo", site: "yes", care: "done" },
  { row: "phone", site: "yes", care: "done" },
  { row: "hosting", site: "firstYear", care: "yes" },
  { row: "updates", site: "firstYear", care: "yes" },
  { row: "support", site: "firstYear", care: "yes" },
  { row: "monthly", site: "none", care: "none" },
  { row: "files", site: "yours", care: "yoursAlways" },
];

export function Pricing({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const p = d.pages.pricing;
  const plan = d.pricing.plan;
  const larger = d.pricing.larger;
  const c = pricingCopy[locale];
  const price = priceSet(locale);
  const en = locale === "en";
  const faqs = c.faq.items.map((i) => d.faq.items[i]).filter(Boolean);
  const vars = { price: price.site.text, renewal: price.renewal.text, total: price.threeYears.text };
  const cols = c.compare.cols.map((col) => ({ name: col.name, note: fill(col.note, vars) }));

  const cell = (v: Cell) => {
    const strong = v === "yes" || v === "firstYear";
    return (
      <span className={strong ? s.cellYes : s.cellDim}>
        {strong ? <Tick /> : null}
        {c.compare[v]}
      </span>
    );
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceJsonLd(locale), breadcrumbJsonLd(locale, [{ name: p.crumb, path: "/kainos" }])]),
        }}
      />
      <Nav path="/kainos" />
      <main id="main" className={s.page}>
        {/* 1. Head and the plan */}
        <section className={`sec ${s.hero}`} data-tone="dark" aria-labelledby="kainos-h">
          <PageHead id="kainos-h" a={c.titleA} b={c.titleB} lead={p.lead} />
          <div className={`wrap ${s.planWrap}`}>
            <div className={`panel ${s.plan}`} data-in="fade">
              <div className={s.planMain}>
                <h2 className={s.planName}>{plan.name}</h2>
                <p className={s.figLine}>
                  <Amount m={price.site} className={s.fig} curClassName={s.cur} />
                </p>
                <p className={s.suffix}>{plan.priceSuffix}</p>
                <p className={s.summary}>{plan.summary}</p>
                <div className={s.planAction}>
                  <EnquiryLink className="btn btn-primary btn-lg" />
                </div>
                <p className={`tnum ${s.planNote}`}>
                  {d.pricing.renewal.label}: {fill(c.planRenewal, vars)}
                </p>
              </div>
              <div className={s.planList}>
                <h3 className={s.listHead}>{c.included}</h3>
                <ul>
                  {plan.includes.map((it) => (
                    <li key={it} className={s.inc}>
                      <Tick />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. After the first year */}
        <section id="po-pirmu-metu" className="sec" data-tone="dark" aria-labelledby="po-pirmu-metu-h">
          <div className="wrap">
            <Chapter id="po-pirmu-metu-h" a={`${c.years.a}.`} b={fill(c.years.b, vars)} lead={d.pricing.renewal.body} />
            <ol className={s.years} data-stagger="0.12">
              {c.years.cols.map((y, i) => (
                <li key={y.label} className={s.year} data-first={i === 0 ? "" : undefined} data-in>
                  <p className={s.yearLabel}>{y.label}</p>
                  <p className={s.yearFig}>
                    <Amount m={y.amount === "site" ? price.site : price.renewal} className={s.yearNum} curClassName={s.cur} />
                  </p>
                  <p className={s.yearBody}>{y.body}</p>
                </li>
              ))}
            </ol>
            <p className={s.total} data-in>
              <span className="tnum">{fill(c.years.total, vars)}</span> <span className="dim">{c.years.monthly}</span>
            </p>
          </div>
        </section>

        {/* 3. The comparison */}
        <section id="palyginimas" className="sec" data-tone="dark" aria-labelledby="palyginimas-h">
          <div className="wrap">
            <Chapter id="palyginimas-h" a={c.compare.a} b={c.compare.b} lead={c.compare.lead} />
            <div className={s.tableWrap} data-scrub>
              <table className={s.table}>
                <thead>
                  <tr>
                    <td className={s.corner} />
                    {cols.map((col) => (
                      <th key={col.name} scope="col">
                        <span className={s.colName}>{col.name}</span>
                        <span className={`tnum ${s.colNote}`}>{col.note}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((r) => (
                    <tr key={r.row}>
                      <th scope="row">{c.compare.rows[r.row]}</th>
                      <td data-col={cols[0].name}>{cell(r.site)}</td>
                      <td data-col={cols[1].name}>{cell(r.care)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. Larger websites and shops */}
        <section id="didesni" className="sec" data-tone="dark" aria-labelledby="didesni-h">
          <div className="wrap">
            <Chapter id="didesni-h" a={c.larger.a} b={c.larger.b} lead={larger.summary} />
            <div className={s.scope} data-in>
              <p className={s.scopePrice}>{larger.price}</p>
              <EnquiryLink className="btn btn-ghost btn-lg">{larger.cta}</EnquiryLink>
            </div>
            <p className={s.demosLead} data-in>
              {c.larger.demosLead}
            </p>
            <ul className={s.demos} data-stagger="0.08">
              {DEMOS.map((slug) => (
                <li key={slug} data-in>
                  <a className={s.demo} href={localizePath(`/demo/${slug}`, locale)}>
                    <span className={s.demoShot}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/work/shot-${slug}${en ? "-en" : ""}.webp`}
                        width={1500}
                        height={938}
                        alt={fill(d.demos.frameAlt, { name: DEMO_NAME[slug] })}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className={s.demoName}>
                      {DEMO_NAME[slug]} <span className="dim">{d.demos.labels[DEMO_KIND[slug]]}</span>
                    </span>
                    <span className={s.demoFeat}>{d.demos.items[slug].feature}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Questions about price */}
        <Questions
          id="klausimai"
          title={p.faqTitle}
          items={faqs}
          more={
            <>
              {p.faqMore} <TextLink href={localizePath("/duk", locale)}>{p.faqLink}</TextLink>.
            </>
          }
        />

        {/* 6. Closing */}
        <Closing
          id="pradzia"
          a={c.closing.a}
          b={c.closing.b}
          lead={c.closing.lead}
          actions={
            <>
              <EnquiryLink className="btn btn-primary btn-lg" />
              <a className="btn btn-ghost btn-lg" href={localizePath("/paslaugos", locale)}>
                {c.closing.services}
              </a>
            </>
          }
        />
      </main>
      <Footer path="/kainos" />
    </>
  );
}
