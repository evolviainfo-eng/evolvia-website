import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { Footer, Nav } from "./Chrome";
import { Hero } from "./sections/Hero";
import { Included } from "./sections/Included";
import { Works } from "./sections/Works";
import { Minerda } from "./sections/Minerda";
import { Price } from "./sections/Price";
import { Faq } from "./sections/Faq";
import { Cta } from "./sections/Cta";

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

export function Home({ locale }: { locale: Locale }) {
  return (
    <>
      <Nav path="/" />
      <main id="main">
        <Hero locale={locale} />
        <Included locale={locale} />
        <Works locale={locale} />
        <Minerda locale={locale} />
        <Price locale={locale} />
        <Faq locale={locale} />
        <Cta locale={locale} />
      </main>
      <Footer path="/" />
    </>
  );
}
