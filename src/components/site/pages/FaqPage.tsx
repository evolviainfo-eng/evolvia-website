import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/content/schema";
import { site } from "@/content/site";
import { EnquiryLink, Footer, Nav } from "@/components/site/Chrome";
import { faqPageCopy } from "@/components/site/copy/faq-page";
import s from "./FaqPage.module.css";

/* /duk and /en/duk.

   Every question of faq.items, in three groups (copy/faq-page.ts). Each
   group is a row in the Linear chapter grammar: the group title sticky in
   the left third, the questions as hairline rows in the right two thirds.
   Each question is a native <details>, so it opens with the keyboard,
   reads to a screen reader as a disclosure, works without JavaScript and is
   found by the browser's find-in-page. Answers open with a 0.3 s height
   transition where the browser supports ::details-content. The page closes
   with the enquiry. */

export function faqPageMetadata(locale: Locale): Metadata {
  const p = getDictionary(locale).pages.faq;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/duk" });
}

type Item = { q: string; a: string };

function grouped(locale: Locale) {
  const items: readonly Item[] = getDictionary(locale).faq.items;
  const groups = faqPageCopy[locale].groups.map((g) => ({ ...g, list: [] as Item[] }));
  const used = new Set<number>();
  groups.forEach((g, gi) =>
    g.items.forEach((i) => {
      if (items[i] && !used.has(i)) {
        groups[gi].list.push(items[i]);
        used.add(i);
      }
    }),
  );
  items.forEach((it, i) => {
    if (!used.has(i)) groups[groups.length - 1].list.push(it);
  });
  return groups.filter((g) => g.list.length > 0);
}

export function FaqPage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const p = d.pages.faq;
  const c = faqPageCopy[locale];
  const groups = grouped(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd(locale), breadcrumbJsonLd(locale, [{ name: p.crumb, path: "/duk" }])]),
        }}
      />
      <Nav path="/duk" />
      <main id="main">
        <header className={`sec ${s.head}`} data-tone="dark">
          <div className="wrap">
            <h1 className={`t-hero ${s.title}`} data-split="now">
              <span className="ln">{p.title}</span> <span className="ln dim">{c.titleDim}</span>
            </h1>
            <p className={`t-lead ${s.lead}`} data-in>
              {p.lead}
            </p>
          </div>
        </header>

        <div className={`sec ${s.groups}`} data-tone="dark">
          {groups.map((g, gi) => (
            <section key={g.id} id={g.id} className={`wrap ${s.grid}`} aria-labelledby={`${g.id}-h`}>
              <div className={s.side}>
                <div className={s.sticky}>
                  <h2 id={`${g.id}-h`} className={`t-h3 ${s.gTitle}`} data-split>
                    {g.title}
                  </h2>
                  <p className={s.gNote} data-in>
                    {g.note}
                  </p>
                </div>
              </div>
              <div className={s.list} data-stagger="0.05">
                {g.list.map((it, i) => (
                  <details key={it.q} className={s.item} data-in open={gi === 0 && i === 0 ? true : undefined}>
                    <summary className={s.q}>
                      <span className={s.qt}>{it.q}</span>
                      <span className={s.pm} aria-hidden="true">
                        <svg viewBox="0 0 12 12">
                          <path d="M6 1.5 V10.5 M1.5 6 H10.5" />
                        </svg>
                      </span>
                    </summary>
                    <div className={s.answer}>
                      <p className={s.a}>{it.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className={`sec ${s.close}`} data-tone="dark" aria-labelledby="duk-close-h">
          <div className="wrap">
            <div className={`chapter ${s.closeIn}`}>
              <h2 id="duk-close-h" className="t-h2" data-split>
                {c.closing.title} <span className="dim">{c.closing.titleDim}</span>
              </h2>
              <div className={s.closeSide}>
                <p className="t-lead" data-in>
                  {c.closing.lead}
                </p>
                <div className={`actions ${s.actions}`} data-in>
                  <EnquiryLink className="btn btn-primary btn-lg" />
                  <a className="btn btn-ghost btn-lg" href={localizePath("/kainos", locale)}>
                    {c.closing.pricing}
                  </a>
                </div>
                <p className={`t-small ${s.reach}`} data-in>
                  {c.closing.reach}{" "}
                  <a className={s.link} href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  <span className={s.sep} aria-hidden="true">
                    /
                  </span>
                  <a className={s.link} href={`tel:${site.phoneHref}`}>
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer path="/duk" />
    </>
  );
}
