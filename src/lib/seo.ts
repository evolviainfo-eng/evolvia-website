import type { Metadata } from "next";
import { absoluteUrl } from "@/content/site";
import { getDictionary } from "@/i18n";
import {
  defaultLocale,
  localeInfo,
  localizePath,
  locales,
  type Locale,
} from "@/i18n/config";

const OG_IMAGE = {
  url: "/brand/lockup-dark.png",
  width: 1600,
  height: 900,
} as const;

/** hreflang alternates for a language-neutral path: one entry per language
 *  plus x-default, which points at the Lithuanian original. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeInfo[locale].hreflang] = absoluteUrl(
      localizePath(path, locale),
    );
  }
  languages["x-default"] = absoluteUrl(localizePath(path, defaultLocale));
  return languages;
}

/** BreadcrumbList structured data. `trail` excludes the home crumb, which is
 *  always first. Paths are language-neutral. */
export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  const home = getDictionary(locale).crumbs.home;
  const items = [{ name: home, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(localizePath(item.path, locale)),
    })),
  };
}

/** Full per-page metadata: title (templated in the layout), description,
 *  self-canonical, hreflang alternates and complete OG/Twitter blocks.
 *  openGraph merges shallowly in Next, so images must be respecified here or
 *  they'd be lost. `path` is language-neutral ("/kainos"). */
export function pageMetadata({
  locale,
  title,
  description,
  path,
  absoluteTitle = false,
  shareDescription = description,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  /** true when `title` already carries the brand (the home page). */
  absoluteTitle?: boolean;
  /** A shorter line for the share card, where it differs. */
  shareDescription?: string;
}): Metadata {
  const d = getDictionary(locale);
  const url = absoluteUrl(localizePath(path, locale));
  const fullTitle = absoluteTitle ? title : `${title} · Evolvia`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: fullTitle,
      description: shareDescription,
      url,
      siteName: "Evolvia",
      locale: localeInfo[locale].ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeInfo[l].ogLocale),
      type: "website",
      images: [{ ...OG_IMAGE, alt: d.meta.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: shareDescription,
      images: [OG_IMAGE.url],
    },
  };
}

/** Layout-level defaults: the title template, the site description and the
 *  share card, for pages that set nothing of their own. No canonical here —
 *  a canonical inherited from the layout would point every page that forgot
 *  its own at the home page. */
export function rootMetadata(locale: Locale): Metadata {
  const d = getDictionary(locale);
  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: {
      default: d.meta.title,
      template: "%s · Evolvia",
    },
    description: d.meta.description,
    keywords: d.meta.keywords,
    authors: [{ name: "Evolvia" }],
    openGraph: {
      title: d.meta.title,
      description: d.meta.shareDescription,
      url: absoluteUrl(localizePath("/", locale)),
      siteName: "Evolvia",
      locale: localeInfo[locale].ogLocale,
      type: "website",
      images: [{ ...OG_IMAGE, alt: d.meta.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.shareDescription,
      images: [OG_IMAGE.url],
    },
  };
}
