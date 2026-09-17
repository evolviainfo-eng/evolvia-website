import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SiteFrame, FrameHint } from "@/components/ui/SiteFrame";
import { DemoNote } from "@/components/ui/DemoNote";
import { JsonLd } from "@/components/ui/JsonLd";
import { getMinerda, minerdaShots } from "@/content/cases";
import { getDictionary } from "@/i18n";
import { fill } from "@/i18n/fill";
import { localizePath, type Locale } from "@/i18n/config";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

/* /darbai — the client work first, the examples after.
 *
 * The order is the argument. A visitor who lands here should meet the site
 * somebody paid for before the ones built to demonstrate, and the two are kept
 * visually separate: the case sits on its own band with the real domain in its
 * chrome, the examples keep their disclosure and their evolvia.lt/demo/…
 * addresses. Nothing here counts the work or apologises for the count.
 */

const PATH = "/darbai";

export function workMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).pages.work;
  return pageMetadata({
    locale,
    title: t.metaTitle,
    description: t.metaDescription,
    path: PATH,
  });
}

export function WorkView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.pages.work;
  const m = d.minerda;
  const c = getMinerda(locale);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.crumb, path: PATH }])} />
      <Nav locale={locale} path={PATH} t={d.nav} theme={d.theme} />
      <main id="main">
        <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        {/* ── Minerda ──────────────────────────────────────────── */}
        <Section tone="secondary" className="pt-[clamp(40px,6vw,72px)]">
          <Container>
            <figure className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
              <Reveal className="min-w-0 lg:col-span-8">
                <SiteFrame
                  src={minerdaShots.home}
                  alt={m.homeAlt}
                  url={c.domain}
                  href={c.url}
                  ratioClass="aspect-[16/10]"
                  eager
                  sizes="(min-width: 1120px) 700px, 100vw"
                  overlay={
                    <FrameHint>
                      {fill(m.openDomain, { domain: c.domain })}
                    </FrameHint>
                  }
                />
              </Reveal>

              <Reveal
                delay={0.14}
                className="flex min-w-0 flex-col lg:col-span-4"
              >
                <figcaption>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2 className="text-[1.25rem] font-medium tracking-[-0.015em]">
                      {c.name}
                    </h2>
                    <span className="rounded-pill border border-text px-2.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-text">
                      {t.clientChip}
                    </span>
                  </div>

                  <p className="t-body mt-4 max-w-[44ch] text-[0.9375rem]">
                    {c.summary}
                  </p>

                  <p className="mt-5 text-[0.8125rem] uppercase tracking-[0.1em] text-text-muted">
                    {c.sector} <span aria-hidden="true">·</span> {c.city}
                  </p>

                  <a
                    href={localizePath(`/darbai/${c.slug}`, locale)}
                    className="press mt-7 inline-flex h-12 w-fit items-center gap-2.5 rounded-pill bg-accent px-6 text-[0.9375rem] font-medium text-accent-text transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0"
                  >
                    {m.viewProject}
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path d="M2.5 6h7" />
                      <path d="M6.5 2.5 10 6l-3.5 3.5" />
                    </svg>
                  </a>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener"
                    className="group mt-4 inline-flex w-fit items-center gap-2 text-[0.875rem] font-medium text-text"
                  >
                    <span className="relative">
                      {fill(m.openDomain, { domain: c.domain })}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-text transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-x-0"
                      />
                    </span>
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3 transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path d="M4.5 2H10v5.5" />
                      <path d="M10 2 2.5 9.5" />
                    </svg>
                  </a>
                </figcaption>
              </Reveal>
            </figure>
          </Container>
        </Section>

        {/* ── Examples ─────────────────────────────────────────── */}
        <Section tone="light" className="pb-0">
          <Container>
            <Reveal className="max-w-[680px]">
              <Eyebrow>{t.examplesEyebrow}</Eyebrow>
              <h2 className="t-h2 mt-4">{t.examplesTitle}</h2>
              <DemoNote locale={locale} className="mt-6" />
            </Reveal>
          </Container>
        </Section>
        <WorkShowcase locale={locale} />

        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
