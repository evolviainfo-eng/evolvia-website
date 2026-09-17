import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SiteFrame, FrameHint } from "@/components/ui/SiteFrame";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { getMinerda, minerdaShots } from "@/content/cases";
import { getDictionary } from "@/i18n";
import { fill } from "@/i18n/fill";
import { localizePath, type Locale } from "@/i18n/config";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

/* /darbai/minerda — the full case.
 *
 * Written to be checkable rather than impressive. Every fact on this page has
 * a source: the delivered items are the pages the live site actually serves,
 * and the screenshots are captures of that site rather than mockups of it.
 * minerda.lt exists only in Lithuanian, so the captures are the same on the
 * English page.
 *
 * There are no visitor numbers, no percentages and no conversion figures,
 * because nobody measured any. Inventing one would be the only thing on this
 * page a reader could catch us on.
 */

const PATH = "/darbai/minerda";

export function minerdaMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).pages.minerda;
  return pageMetadata({
    locale,
    title: t.metaTitle,
    description: t.metaDescription,
    path: PATH,
  });
}

export function MinerdaView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.pages.minerda;
  const m = d.minerda;
  const c = getMinerda(locale);

  /* Four facts, and deliberately no fifth. A launch date and a delivery time
     were here and came out: a term reads as a promise about the next project
     rather than a fact about this one. */
  const facts = [
    { label: t.facts.client, value: `${c.name}, ${c.legalName}` },
    { label: t.facts.business, value: c.sector },
    { label: t.facts.city, value: c.city },
    { label: t.facts.address, value: c.domain },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.crumbWork, path: "/darbai" },
          { name: c.name, path: PATH },
        ])}
      />
      <Nav locale={locale} path={PATH} t={d.nav} theme={d.theme} />
      <main id="main">
        {/* ── Heading ──────────────────────────────────────────── */}
        <div className="bg-bg text-text">
          <Container>
            <Reveal className="pt-[clamp(128px,16vh,168px)]">
              <nav aria-label={t.breadcrumbNav}>
                <a
                  href={localizePath("/darbai", locale)}
                  className="t-eyebrow transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                >
                  {t.crumbWork}
                </a>
              </nav>
              <h1 className="t-display mt-4 max-w-[20ch] text-balance">
                {t.title}
              </h1>
              <p className="t-body mt-6 max-w-[60ch] text-pretty">
                {c.summary}
              </p>
            </Reveal>
          </Container>
        </div>

        {/* ── The live site ────────────────────────────────────── */}
        <Section tone="light" className="pt-[clamp(40px,6vw,72px)]">
          <Container>
            <Reveal>
              <SiteFrame
                src={minerdaShots.home}
                alt={m.homeAlt}
                url={c.domain}
                href={c.url}
                ratioClass="aspect-[16/10]"
                eager
                sizes="(min-width: 1120px) 1072px, 100vw"
                overlay={
                  <FrameHint>{fill(m.openDomain, { domain: c.domain })}</FrameHint>
                }
              />
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-[clamp(40px,6vw,72px)] grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col gap-1 border-t border-border py-4"
                  >
                    <dt className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-text-muted">
                      {f.label}
                    </dt>
                    <dd className="text-[0.9375rem] leading-snug text-text">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </Section>

        {/* ── Situation ────────────────────────────────────────── */}
        <Section tone="secondary">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <h2 className="t-h3">{t.situation}</h2>
              </Reveal>
              <Reveal delay={0.07} className="lg:col-span-8">
                <p className="t-body max-w-[60ch] text-pretty text-[1.0625rem] text-text">
                  {c.situation}
                </p>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ── What was done ────────────────────────────────────── */}
        <Section tone="light">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <h2 className="t-h3">{t.did}</h2>
                <p className="t-body mt-4 max-w-[34ch] text-[0.9375rem]">
                  {t.didLead}
                </p>
              </Reveal>

              <Reveal delay={0.07} className="lg:col-span-8">
                <ol className="flex flex-col">
                  {c.work.map((w) => (
                    <li
                      key={w.title}
                      className="row-hover border-t border-border py-5 last:border-b"
                    >
                      <div>
                        <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em]">
                          {w.title}
                        </h3>
                        <p className="mt-1.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-text-muted">
                          {w.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ── Articles and FAQ ─────────────────────────────────── */}
        <Section tone="secondary">
          <Container>
            <Reveal className="max-w-[640px]">
              <h2 className="t-h3">{t.articles}</h2>
              <p className="t-body mt-4 max-w-[56ch] text-pretty text-[1.0625rem]">
                {t.articlesLead}
              </p>
            </Reveal>

            <div className="mt-[clamp(40px,6vw,72px)] grid gap-10 md:grid-cols-2 md:gap-8">
              <Reveal>
                <figure>
                  <SiteFrame
                    src={minerdaShots.article}
                    alt={t.articleAlt}
                    url={`${c.domain}/straipsniai/meninis-lyginimas/`}
                    href={`${c.url}/straipsniai/meninis-lyginimas/`}
                    ratioClass="aspect-[16/10]"
                    sizes="(min-width: 768px) 520px, 100vw"
                    overlay={<FrameHint>{t.open}</FrameHint>}
                  />
                  <figcaption className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted">
                    {t.articleCaption}
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.07}>
                <figure>
                  <SiteFrame
                    src={minerdaShots.faq}
                    alt={t.faqAlt}
                    url={`${c.domain}/duk/`}
                    href={`${c.url}/duk/`}
                    ratioClass="aspect-[16/10]"
                    sizes="(min-width: 768px) 520px, 100vw"
                    overlay={<FrameHint>{t.open}</FrameHint>}
                  />
                  <figcaption className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted">
                    {t.faqCaption}
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ── Result ───────────────────────────────────────────── */}
        <Section tone="light">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <h2 className="t-h3">{t.result}</h2>
              </Reveal>
              <Reveal delay={0.07} className="lg:col-span-8">
                <p className="t-body max-w-[56ch] text-pretty text-[1.0625rem] text-text">
                  {c.result}
                </p>

                {/* The client's testimonial goes here once the client gives
                    one. Deliberately nothing is rendered until then: an empty
                    frame with a promise would be worse than no frame. */}

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener"
                    className="press inline-flex h-12 w-fit items-center gap-2.5 rounded-pill bg-accent px-6 text-[0.9375rem] font-medium text-accent-text transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0"
                  >
                    {fill(m.openDomain, { domain: c.domain })}
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path d="M4.5 2H10v5.5" />
                      <path d="M10 2 2.5 9.5" />
                    </svg>
                  </a>
                  <a
                    href={localizePath("/darbai", locale)}
                    className="inline-flex h-12 items-center rounded-pill border border-border px-6 text-[0.9375rem] font-medium text-text transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-text"
                  >
                    {t.allWork}
                  </a>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
