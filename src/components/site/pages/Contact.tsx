import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Footer, Nav } from "../Chrome";
import { EnquiryForm } from "../enquiry/EnquiryForm";
import { contact } from "../copy/contact";
import s from "./Contact.module.css";

const PATH = "/kontaktai";

export function contactMetadata(locale: Locale): Metadata {
  const c = contact[locale];
  return pageMetadata({ locale, title: c.metaTitle, description: c.metaDescription, path: PATH });
}

/** /kontaktai: the enquiry form is the page. Left, the headline, the
 *  promise and the direct contacts; right, the form on one flat slab
 *  (#uzklausa, where every enquiry button lands without JavaScript).
 *  Below, the privacy notice (#privatumas) as plain index rows. */
export function Contact({ locale }: { locale: Locale }) {
  const c = contact[locale];
  const p = c.privacy;
  const crumbs = breadcrumbJsonLd(locale, [{ name: c.crumb, path: PATH }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <Nav path={PATH} />
      <main id="main">
        <section className={s.top} data-tone="dark" aria-labelledby="kontaktai-h">
          <div className={`wrap ${s.grid}`}>
            <div className={s.side}>
              <header className={s.intro}>
                <h1 id="kontaktai-h" className={s.h1} data-split="now">
                  {c.title} <span className="dim">{c.titleDim}</span>
                </h1>
                <p className={`t-lead ${s.lead}`} data-in>
                  {c.lead}
                </p>
              </header>

              <section className={s.details} aria-labelledby="kontaktai-det" data-in>
                <h2 id="kontaktai-det" className={s.detTitle}>
                  {c.detailsTitle}
                </h2>
                <dl className={s.list}>
                  <div>
                    <dt>{c.labels.email}</dt>
                    <dd>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>{c.labels.phone}</dt>
                    <dd>
                      <a className="tnum" href={`tel:${site.phoneHref}`}>
                        {site.phone}
                      </a>
                      <span className={s.sub}>{c.callNote}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>{c.labels.city}</dt>
                    <dd>{c.city}</dd>
                  </div>
                  <div>
                    <dt>{c.labels.registration}</dt>
                    <dd>
                      {c.registration}
                      <span className={s.sub}>{c.note}</span>
                    </dd>
                  </div>
                </dl>
              </section>
            </div>

            <div id="uzklausa" className={s.slab} role="region" aria-label={c.formLabel}>
              <EnquiryForm variant="page" />
            </div>
          </div>
        </section>

        <section id="privatumas" className={`sec ${s.privacy}`} data-tone="dark" aria-labelledby="privatumas-h">
          <div className="wrap">
            <header className="chapter">
              <h2 id="privatumas-h" className="t-h2" data-split>
                {p.title}
              </h2>
              <p className="t-lead chapter-lead" data-in>
                {p.lead}
              </p>
            </header>
            <dl className={s.rows}>
              <div className={s.row} data-in>
                <dt>{p.controllerTerm}</dt>
                <dd>
                  {p.controllerBody} <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              {p.rows.map((r) => (
                <div key={r.term} className={s.row} data-in>
                  <dt>{r.term}</dt>
                  <dd>{r.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer path={PATH} />
    </>
  );
}
