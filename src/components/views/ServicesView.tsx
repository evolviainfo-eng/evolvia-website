import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/paslaugos";

export function servicesMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).pages.services;
  return pageMetadata({
    locale,
    title: t.metaTitle,
    description: t.metaDescription,
    path: PATH,
  });
}

export function ServicesView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.pages.services;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t.crumb, path: PATH }])} />
      <Nav locale={locale} path={PATH} t={d.nav} theme={d.theme} />
      <main id="main">
        <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <ServiceDetail locale={locale} />
        <Process locale={locale} />
        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
