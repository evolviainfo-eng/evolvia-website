import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { EnquiryLink, Footer, Nav } from "@/components/site/Chrome";
import { Arrow, Chapter, External } from "@/components/site/ui/Primitives";
import { work } from "@/components/site/copy/work";
import { Device } from "./work/Device";
import s from "./Work.module.css";

/* /darbai. The order is the argument: the site a real company paid for and
   uses comes first, on its own band with its real domain in the window; the
   four demo sites follow, each labelled Demo or Koncepcija, each with its
   real first screen, what it is, what to try in it and the link to try it.
   Then one centred closing line with the enquiry.

   Motion: headlines fade up once (data-split), small text enters once
   (data-in), the demo rows rise with the scroll (data-scrub). The Minerda
   window is on the first screen, so it only fades in once (a scrubbed panel
   there would sit half revealed until the visitor scrolls). */

const PATH = "/darbai";

export function workMetadata(locale: Locale): Metadata {
  const c = work[locale];
  return pageMetadata({ locale, title: c.metaTitle, description: c.metaDescription, path: PATH });
}

export function Work({ locale }: { locale: Locale }) {
  const c = work[locale];
  const m = c.minerda;
  const en = locale === "en";
  const caseHref = localizePath("/darbai/minerda", locale);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: c.crumb, path: PATH }])} />
      <Nav path={PATH} />
      <main id="main">
        {/* ── Page head: fully left, Linear chapter grammar ── */}
        <section className={s.head} data-tone="dark" aria-labelledby="darbai-h1">
          <div className="wrap">
            <header className={`chapter ${s.chapterHead}`}>
              <h1 id="darbai-h1" className={`t-hero ${s.h1}`} data-split="now">
                {c.titleA} <span className="dim">{c.titleB}</span>
              </h1>
              <p className={`t-lead chapter-lead ${s.lead}`} data-in="">
                {c.lead}
              </p>
            </header>
          </div>
        </section>

        {/* ── Minerda: the client case ── */}
        <section className={`sec ${s.case}`} data-tone="dark" aria-labelledby="minerda-h">
          <div className="wrap">
            <a className={s.shot} href={caseHref} tabIndex={-1} aria-hidden="true" data-in="fade">
              <Device
                address="minerda.lt"
                ratio="16 / 9"
                phoneFirst
                eager
                desktop={{ src: "/site/minerda-top.webp", width: 1680, height: 1050, alt: m.altDesktop }}
                phone={{ src: "/site/minerda-top-m.webp", width: 600, height: 1300, alt: m.altPhone }}
              />
            </a>

            <div className={s.caseMeta}>
              <div className={s.caseName} data-in="">
                <p className={s.label}>{m.label}</p>
                <h2 id="minerda-h" className="t-h2">
                  {m.nameA} <span className="dim">{m.nameB}</span>
                </h2>
              </div>
              <div className={s.caseSide} data-in="">
                <p className="t-lead">{m.summary}</p>
                <div className={`actions ${s.caseActions}`}>
                  <a className="btn btn-primary btn-lg" href={caseHref}>
                    {m.caseLink}
                    <Arrow />
                  </a>
                  <a className={s.ext} href="https://minerda.lt" target="_blank" rel="noopener">
                    {m.open}
                    <External />
                    <span className="sr-only"> {m.newWindow}</span>
                  </a>
                </div>
              </div>
            </div>

            <ul className={s.facts} data-stagger="0.06">
              {m.facts.map((f) => (
                <li key={f.a} className={s.fact} data-in="">
                  {f.a} <span className="dim">{f.b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The four demo sites ── */}
        <section className={`sec ${s.demos}`} data-tone="dark" aria-labelledby="demos-h">
          <div className="wrap">
            <Chapter id="demos-h" a={c.demos.titleA} b={c.demos.titleB} lead={c.demos.lead} />

            <ol className={s.rows}>
              {c.demos.items.map((d) => {
                const href = localizePath(`/demo/${d.slug}`, locale);
                const shot = `/work/shot-${d.slug}${en ? "-en" : ""}`;
                const name = d.name.replace(/\.$/, "");
                return (
                  <li key={d.slug} className={s.row}>
                    <div className={s.text} data-in="">
                      <p className={s.label}>
                        {d.label} <span aria-hidden="true">·</span> {d.sector}
                      </p>
                      <h3 id={`demo-${d.slug}`} className={`t-h3 ${s.demoName}`}>
                        {d.name}
                      </h3>
                      <p className={s.tagline}>{d.tagline}</p>
                      <p className={s.try}>
                        {c.demos.tryLabel} <span className="dim">{d.feature}</span>
                      </p>
                      <ul className={s.scope}>
                        {d.scope.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                      <a className={`btn btn-ghost ${s.open}`} href={href}>
                        {c.demos.open} <span className={s.openName}>{name}</span>
                        <Arrow />
                      </a>
                    </div>
                    <a className={s.shot} href={href} tabIndex={-1} aria-hidden="true" data-scrub="">
                      <Device
                        address={`evolvia.lt${en ? "/en" : ""}/demo/${d.slug}`}
                        desktop={{ src: `${shot}.webp`, width: 1500, height: 938, alt: "" }}
                        phone={{ src: `${shot}-m.webp`, width: 360, height: 735, alt: "" }}
                      />
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ── Closing: fully centred ── */}
        <section className={`sec ${s.close}`} data-tone="dark" aria-labelledby="darbai-close">
          <div className="wrap">
            <h2 id="darbai-close" className={`t-h2 ${s.closeH}`} data-split="">
              <span className="ln">{c.close.lineA}</span> <span className="ln dim">{c.close.lineB}</span>
            </h2>
            <p className={`t-lead ${s.closeSub}`} data-in="">
              {c.close.sub}
            </p>
            <div className={`actions ${s.closeActions}`} data-in="">
              <EnquiryLink className="btn btn-primary btn-lg" />
              <a className="btn btn-ghost btn-lg" href={localizePath("/kainos", locale)}>
                {c.close.prices}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer path={PATH} />
    </>
  );
}
