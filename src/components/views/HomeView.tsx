import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { TrustStatement } from "@/components/sections/TrustStatement";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Work } from "@/components/sections/Work";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceJsonLd } from "@/content/schema";
import { getDemos } from "@/content/demos";
import { getDictionary, type Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

/** Only what a demo frame needs, so the hero (a client component) is not
 *  handed every demo description on the site. */
export function demoFrameLabels(d: Dictionary) {
  const { open, frameLabel, frameAlt } = d.demos;
  return { open, frameLabel, frameAlt };
}

export function homeMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  return pageMetadata({
    locale,
    title: d.meta.title,
    absoluteTitle: true,
    description: d.meta.description,
    shareDescription: d.meta.shareDescription,
    path: "/",
  });
}

export function HomeView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const demos = getDemos(locale);
  /* The e-shop: the one demo the work section below does not already
     lead with, so the first frame on the page is a site you can open. */
  const heroDemo = demos.find((demo) => demo.slug === "skalsa") ?? demos[0];

  return (
    <>
      <JsonLd data={serviceJsonLd(locale)} />
      <Nav locale={locale} path="/" t={d.nav} theme={d.theme} />
      <main id="main">
        <Hero t={d.hero} demo={heroDemo} demoLabels={demoFrameLabels(d)} />
        <Process locale={locale} />
        <TrustStatement t={d.trust} />
        <CaseStudy locale={locale} />
        <Work locale={locale} />
        <Pricing locale={locale} />
        <Faq t={d.faq} />
        <FinalCta t={d.contact} privacy={d.privacy} location={d.location} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
