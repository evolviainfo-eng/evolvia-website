import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceJsonLd } from "@/content/schema";
import { getDictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/kainos";

export function pricingMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).pages.pricing;
  return pageMetadata({
    locale,
    title: t.metaTitle,
    description: t.metaDescription,
    path: PATH,
  });
}

/** The three price-related questions, inlined as crawlable text. */
function PricingFaq({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.pages.pricing;
  const items = d.faq.items;
  const priceFaq = [items[0], items[1], items[5]];
  return (
    <Section tone="light">
      <Container>
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <h2 className="t-h2 max-w-[14ch]">{t.faqTitle}</h2>
            <p className="t-body mt-5 max-w-[34ch]">
              {t.faqMore}{" "}
              <a
                href={localizePath("/duk", locale)}
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                {t.faqLink}
              </a>
              .
            </p>
          </Reveal>
          <div>
            {priceFaq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="border-t border-border py-7">
                  <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em] text-text">
                    {item.q}
                  </h3>
                  <p className="t-body mt-3 max-w-[58ch]">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function PricingView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.pages.pricing;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.crumb, path: PATH }])} />
      <JsonLd data={serviceJsonLd(locale)} />
      <Nav locale={locale} path={PATH} t={d.nav} theme={d.theme} />
      <main id="main">
        <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <Pricing
          locale={locale}
          contactHref={localizePath("/kontaktai", locale)}
          standalone
        />
        <PricingFaq locale={locale} />
        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
