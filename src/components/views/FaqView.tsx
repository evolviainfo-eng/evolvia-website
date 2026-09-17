import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/content/schema";
import { getDictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/duk";

export function faqMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).pages.faq;
  return pageMetadata({
    locale,
    title: t.metaTitle,
    description: t.metaDescription,
    path: PATH,
  });
}

export function FaqView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.pages.faq;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.crumb, path: PATH }])} />
      <JsonLd data={faqJsonLd(locale)} />
      <Nav locale={locale} path={PATH} t={d.nav} theme={d.theme} />
      <main id="main">
        <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <Faq
          t={d.faq}
          standalone
          contactHref={localizePath("/kontaktai", locale)}
        />
        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
