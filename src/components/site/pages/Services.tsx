import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { fill } from "@/i18n/fill";
import { localizePath, type Locale } from "@/i18n/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/content/schema";
import { EnquiryLink, Footer, Nav } from "@/components/site/Chrome";
import { Chapter, Status, Tick, Toggle, Window } from "@/components/site/ui/Primitives";
import { servicesCopy } from "@/components/site/copy/services";
import { Closing, PageHead, Questions, TextLink } from "./pricing/Parts";
import { priceSet } from "./pricing/money";
import s from "./Services.module.css";

/* /paslaugos and /en/paslaugos.

   1. Head: the two-tone h1, the lead, the enquiry and the price link, and
      under them the client's live site (minerda.lt) in a window: the
      service, start to launch, as one real result.
   2. What we do: the chapter, then four rows that alternate sides, each a
      claim from pages.services.items beside the real thing it is about:
      a demo's first screen, the client's search result and phone view,
      the launch checklist, the maintenance switches.
   3. The process: the four real steps in order, the second one marked as
      the point before which nothing is paid.
   4. Who it is for: the chapter at the left, the four fits as large rows.
   5. Questions about the work (four answers from faq.items).
   6. The closing line and the enquiry.

   Type: h1 .t-hero, chapters .t-h2, row titles .t-h3, bodies 16 px,
   panel UI 13 to 15 px. */

export function servicesMetadata(locale: Locale): Metadata {
  const p = getDictionary(locale).pages.services;
  return pageMetadata({ locale, title: p.metaTitle, description: p.metaDescription, path: "/paslaugos" });
}

export function Services({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const p = d.pages.services;
  const c = servicesCopy[locale];
  const price = priceSet(locale);
  const en = locale === "en";
  const faqs = c.faq.items.map((i) => d.faq.items[i]).filter(Boolean);
  const [design, search, launch, care] = p.items;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceJsonLd(locale), breadcrumbJsonLd(locale, [{ name: p.crumb, path: "/paslaugos" }])]),
        }}
      />
      <Nav path="/paslaugos" />
      <main id="main" className={s.page}>
        {/* 1. Head */}
        <section className={`sec ${s.hero}`} data-tone="dark" aria-labelledby="paslaugos-h">
          <PageHead
            id="paslaugos-h"
            a={c.titleA}
            b={c.titleB}
            lead={p.lead}
            actions={
              <>
                <EnquiryLink className="btn btn-primary btn-lg" />
                <a className="btn btn-ghost btn-lg" href={localizePath("/kainos", locale)}>
                  {c.pricing}
                </a>
              </>
            }
          />
          <figure className={`wrap ${s.shot}`}>
            <div data-in="fade">
              <Window address="minerda.lt" className={s.shotWin}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={s.shotImg}
                  src="/site/minerda-top.webp"
                  width={1680}
                  height={1050}
                  alt={d.minerda.homeAlt}
                  fetchPriority="high"
                  decoding="async"
                />
              </Window>
            </div>
            <figcaption className={s.caption} data-in>
              {c.shotCaption} <TextLink href={localizePath("/darbai/minerda", locale)}>{c.shotLink}</TextLink>
            </figcaption>
          </figure>
        </section>

        {/* 2. What we do */}
        <section id="ka-darome" className="sec" data-tone="dark" aria-labelledby="ka-darome-h" data-live-root>
          <div className="wrap">
            <Chapter id="ka-darome-h" a={c.what.a} b={c.what.b} lead={c.what.lead} />
            <div className={s.rows}>
              <article className={s.row}>
                <div className={s.text} data-in>
                  <h3 className={`t-h3 ${s.rowTitle}`}>{design.title}</h3>
                  <p className={s.body}>{design.body}</p>
                  <a className={`${s.more} arrow`} href={localizePath("/demo/fume", locale)}>
                    {c.design.open}{" "}
                  </a>
                </div>
                <div className={s.visual} data-scrub>
                  <Window address={c.design.address} tag={c.design.tag}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={s.shotImg}
                      src={en ? "/work/shot-fume-en.webp" : "/work/shot-fume.webp"}
                      width={1500}
                      height={938}
                      alt={fill(d.demos.frameAlt, { name: "Fumé" })}
                      loading="lazy"
                      decoding="async"
                    />
                  </Window>
                </div>
              </article>

              <article className={`${s.row} ${s.flip}`}>
                <div className={s.text} data-in>
                  <h3 className={`t-h3 ${s.rowTitle}`}>{search.title}</h3>
                  <p className={s.body}>{search.body}</p>
                </div>
                <div className={`${s.visual} ${s.search}`} data-scrub>
                  <div className={`panel ${s.snip}`}>
                    <p className={s.snipLabel}>{c.search.label}</p>
                    <div className={s.snipHead}>
                      <span className={s.fav} aria-hidden="true" />
                      <span className={s.snipSite}>
                        <span>Minerda</span>
                        <span className={s.snipUrl}>https://minerda.lt</span>
                      </span>
                    </div>
                    <p className={s.snipTitle} lang="lt">
                      Minerda | Įlenkimų šalinimas be dažymo Kaune
                    </p>
                    <p className={s.snipDesc}>{c.search.description}</p>
                    <ul className={s.checks}>
                      {c.search.checks.map((t) => (
                        <li key={t}>
                          <Tick />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={s.phone}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/site/minerda-top-m.webp"
                      width={600}
                      height={1300}
                      alt={c.search.phoneAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </article>

              <article className={s.row}>
                <div className={s.text} data-in>
                  <h3 className={`t-h3 ${s.rowTitle}`}>{launch.title}</h3>
                  <p className={s.body}>{launch.body}</p>
                </div>
                <div className={s.visual} data-scrub>
                  <Window address={c.launch.address}>
                    <div className={s.list}>
                      <p className={s.listTitle}>{c.launch.title}</p>
                      <ul>
                        {c.launch.rows.map((r) => (
                          <li key={r} className={s.listRow}>
                            <Status state="done" />
                            <span className={s.listLabel}>{r}</span>
                            <span className={s.listEnd}>{c.launch.done}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Window>
                </div>
              </article>

              <article className={`${s.row} ${s.flip}`}>
                <div className={s.text} data-in>
                  <h3 className={`t-h3 ${s.rowTitle}`}>{care.title}</h3>
                  <p className={s.body}>{care.body}</p>
                </div>
                <div className={s.visual} data-scrub>
                  <div className={`panel ${s.list} ${s.care}`}>
                    <p className={s.listTitle}>{c.care.title}</p>
                    <ul>
                      {c.care.rows.map((r) => (
                        <li key={r} className={s.listRow}>
                          <span className={s.listLabel}>{r}</span>
                          <Toggle on />
                        </li>
                      ))}
                    </ul>
                    <dl className={s.careFoot}>
                      <div>
                        <dt>{c.care.firstYear}</dt>
                        <dd>{c.care.included}</dd>
                      </div>
                      <div>
                        <dt>{c.care.later}</dt>
                        <dd className="tnum">{fill(c.care.perYear, { renewal: price.renewal.text })}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Process */}
        <section id="procesas" className="sec" data-tone="dark" aria-labelledby="procesas-h">
          <div className="wrap">
            <Chapter id="procesas-h" a={c.process.a} b={c.process.b} lead={d.process.lead} />
            <ol className={s.steps} data-stagger="0.1">
              {d.process.steps.map((st, i) => (
                <li key={st.title} className={s.step} data-lead={st.lead ? "" : undefined} data-in>
                  <span className={`tnum ${s.stepNo}`}>{i + 1}</span>
                  <h3 className={s.stepTitle}>{st.title}</h3>
                  <p className={s.stepBody}>{i === 1 ? c.process.step2 : st.body}</p>
                  {st.lead ? <p className={s.stepNote}>{c.process.payNote}</p> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Who it is for */}
        <section id="kam-tinka" className="sec" data-tone="dark" aria-labelledby="kam-tinka-h">
          <div className={`wrap ${s.fits}`}>
            <div className={s.fitsSide}>
              <h2 id="kam-tinka-h" className="t-h2" data-split>
                {p.fitsTitle}. <span className="dim">{c.fits.b}</span>
              </h2>
              <p className={`t-lead ${s.fitsLead}`} data-in>
                {c.fits.lead}
              </p>
            </div>
            <ul className={s.fitList} data-stagger="0.08">
              {p.fits.map((f) => (
                <li key={f} className={s.fit} data-in>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Questions */}
        <Questions
          id="klausimai"
          title={c.faq.a}
          items={faqs}
          more={
            <>
              {c.faq.more} <TextLink href={localizePath("/duk", locale)}>{c.faq.link}</TextLink>.
            </>
          }
        />

        {/* 6. Closing */}
        <Closing
          id="pradzia"
          a={c.closing.a}
          b={c.closing.b}
          lead={fill(c.closing.price, { price: price.site.text })}
          actions={
            <>
              <EnquiryLink className="btn btn-primary btn-lg" />
              <a className="btn btn-ghost btn-lg" href={localizePath("/kainos", locale)}>
                {c.closing.pricing}
              </a>
            </>
          }
        />
      </main>
      <Footer path="/paslaugos" />
    </>
  );
}
