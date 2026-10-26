import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { EnquiryLink, Footer, Nav } from "@/components/site/Chrome";
import { Arrow, Chapter, External, Window } from "@/components/site/ui/Primitives";
import { MINERDA_RESULTS, minerdaCase } from "@/components/site/copy/minerda-case";
import { Device } from "./work/Device";
import s from "./MinerdaCase.module.css";

/* /darbai/minerda: the full case, written to be checkable rather than
   impressive. Every screenshot is the client's real page with its nav,
   phone number and address cropped away; the search lines and the sitemap
   are what minerda.lt serves. No metric appears that nobody measured.

   Sections: head (back link, h1, lead), the live home page on desktop and
   phone with the facts under it, the brief and what was built, the real
   pages, how the pages present themselves to search, the result. Left
   chapters throughout; the closing result is the one centred section. */

const PATH = "/darbai/minerda";
const SITE = "https://minerda.lt";

export function minerdaCaseMetadata(locale: Locale): Metadata {
  const c = minerdaCase[locale];
  return pageMetadata({ locale, title: c.metaTitle, description: c.metaDescription, path: PATH });
}

export function MinerdaCase({ locale }: { locale: Locale }) {
  const c = minerdaCase[locale];
  const workHref = localizePath("/darbai", locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: c.crumbWork, path: "/darbai" },
          { name: "Minerda", path: PATH },
        ])}
      />
      <Nav path={PATH} />
      <main id="main">
        {/* ── Head ── */}
        <section className={s.head} data-tone="dark" aria-labelledby="minerda-h1">
          <div className="wrap">
            <a className={s.back} href={workHref}>
              <Arrow />
              {c.back}
            </a>
            <h1 id="minerda-h1" className={`t-hero ${s.h1}`} data-split="now">
              {c.titleA} <span className="dim">{c.titleB}</span>
            </h1>
            <p className={`t-lead ${s.lead}`} data-in="">
              {c.lead}
            </p>
          </div>
        </section>

        {/* ── The live home page ── */}
        <div className={s.hero} data-tone="dark">
          <div className="wrap">
            <figure className={s.heroFig}>
              <a className={s.shot} href={SITE} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true" data-in="fade">
                <Device
                  address="minerda.lt"
                  ratio="16 / 9"
                  phoneFirst
                  eager
                  desktop={{ src: "/site/minerda-top.webp", width: 1680, height: 1050, alt: c.altDesktop }}
                  phone={{ src: "/site/minerda-top-m.webp", width: 600, height: 1300, alt: c.altPhone }}
                />
              </a>
              <figcaption className={s.caption} data-in="">
                {c.heroCaption}
              </figcaption>
            </figure>

            <dl className={s.facts} data-stagger="0.06">
              {c.facts.map((f) => (
                <div key={f.k} className={s.fact} data-in="">
                  <dt>{f.k}</dt>
                  <dd>
                    {f.href ? (
                      <a className={s.factLink} href={f.href} target="_blank" rel="noopener">
                        {f.v}
                        <External />
                        <span className="sr-only"> {c.newWindow}</span>
                      </a>
                    ) : (
                      f.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Brief and what was built ── */}
        <section className="sec" data-tone="dark" aria-labelledby="brief-h">
          <div className="wrap">
            <Chapter id="brief-h" a={c.brief.titleA} b={c.brief.titleB} lead={c.brief.lead} />

            <div className={s.built}>
              <div className={s.builtHead} data-in="">
                <h3 className="t-h3">{c.built.title}</h3>
                <p className={s.builtLead}>{c.built.lead}</p>
              </div>
              <ol className={s.list} data-stagger="0.05">
                {c.built.items.map((w) => (
                  <li key={w.title} className={s.item} data-in="">
                    <h4 className={s.itemTitle}>{w.title}</h4>
                    <p className={s.itemDetail}>{w.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── The real pages ── */}
        <section className="sec" data-tone="dark" aria-labelledby="pages-h">
          <div className="wrap">
            <Chapter id="pages-h" a={c.pages.titleA} b={c.pages.titleB} lead={c.pages.lead} />

            <div className={s.pages}>
              {[
                {
                  key: "article",
                  path: "/straipsniai/meninis-lyginimas/",
                  src: "/img/darbai/minerda/straipsnis-be-nav.webp",
                  ...c.pages.article,
                },
                { key: "faq", path: "/duk/", src: "/img/darbai/minerda/duk-be-nav.webp", ...c.pages.faq },
              ].map((p) => (
                <figure key={p.key} className={s.page} data-scrub="">
                  <a className={s.shot} href={`${SITE}${p.path}`} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true">
                    <Device
                      address={`minerda.lt${p.path}`}
                      ratio="16 / 10"
                      zoomOnPhone
                      desktop={{ src: p.src, width: 1500, height: 844, alt: p.alt }}
                    />
                  </a>
                  <figcaption className={s.pageCap}>
                    <span>{p.caption}</span>
                    <a className={s.pageLink} href={`${SITE}${p.path}`} target="_blank" rel="noopener">
                      {c.pages.open}
                      <span className="sr-only"> minerda.lt{p.path} {c.newWindow}</span>
                      <External />
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── In search ── */}
        <section className="sec" data-tone="dark" aria-labelledby="search-h">
          <div className="wrap">
            <Chapter id="search-h" a={c.search.titleA} b={c.search.titleB} lead={c.search.lead} />

            <div className={`${s.search} ${s.searchSolo}`}>
              <div className={`panel ${s.results}`} data-scrub="">
                <ol className={s.resultList} aria-label={c.search.resultsLabel} lang="lt">
                  {MINERDA_RESULTS.map((r) => (
                    <li key={r.title} className={s.result}>
                      <p className={s.rSite}>
                        <span className={s.fav} aria-hidden="true" />
                        <span className={s.rHost}>
                          <span className={s.rName}>Minerda</span>
                          <span className={s.rUrl}>
                            https://minerda.lt{r.path ? ` › ${r.path}` : ""}
                          </span>
                        </span>
                      </p>
                      <p className={s.rTitle}>{r.title}</p>
                      <p className={s.rDesc}>{r.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          </div>
        </section>

        {/* ── Result: fully centred ── */}
        <section className={`sec ${s.closing}`} data-tone="dark" aria-labelledby="result-h">
          <div className="wrap">
            <h2 id="result-h" className={`t-statement ${s.statement}`} data-words="">
              {c.result.a} <span className="dim">{c.result.b}</span>
            </h2>
            <div className={`actions ${s.resultActions}`} data-in="">
              <EnquiryLink className="btn btn-primary btn-lg" />
              <a className="btn btn-ghost btn-lg" href={SITE} target="_blank" rel="noopener">
                {c.result.open}
                <External />
                <span className="sr-only"> {c.newWindow}</span>
              </a>
            </div>
            <a className={s.all} href={workHref} data-in="">
              {c.result.all}
              <Arrow />
            </a>
          </div>
        </section>
      </main>
      <Footer path={PATH} />
    </>
  );
}
