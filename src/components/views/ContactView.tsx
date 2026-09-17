import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { CopyLine } from "@/components/ui/CopyLine";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { fill } from "@/i18n/fill";
import type { Locale } from "@/i18n/config";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/kontaktai";

export function contactMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).pages.contact;
  return pageMetadata({
    locale,
    title: t.metaTitle,
    description: t.metaDescription,
    path: PATH,
  });
}

/* The details somebody looks for before transferring the fee to a stranger.
   The registration number, not the personal code sitting beside it on the
   same certificate: one identifies the business, the other identifies a
   person and does not belong on a public page. */
function Details({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.pages.contact;
  const details: { label: string; value: string; href?: string }[] = [
    { label: t.labels.email, value: site.email, href: `mailto:${site.email}` },
    { label: t.labels.phone, value: site.phone, href: `tel:${site.phoneHref}` },
    { label: t.labels.city, value: d.location },
    { label: t.labels.owner, value: site.legalName },
    {
      label: t.labels.registration,
      value: fill(t.registrationValue, {
        no: site.activityNo,
        nace: site.nace,
      }),
    },
  ];

  return (
    <Section tone="secondary">
      <Container>
        <Reveal className="mx-auto max-w-[720px]">
          <h2 className="t-h3">{t.detailsTitle}</h2>
          <dl className="mt-8">
            {details.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-t border-border py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="w-[190px] shrink-0 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-text-muted">
                  {row.label}
                </dt>
                <dd className="text-[1.0625rem] text-text">
                  {row.href ? (
                    <CopyLine
                      value={row.value}
                      href={row.href}
                      labels={d.copyLine}
                    />
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="t-body mt-8 max-w-[58ch] text-[0.9375rem]">{t.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.pages.contact;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.crumb, path: PATH }])} />
      <Nav locale={locale} path={PATH} t={d.nav} theme={d.theme} />
      <main id="main">
        <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <FinalCta
          t={d.contact}
          privacy={d.privacy}
          location={d.location}
          standalone
        />
        <Details locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
