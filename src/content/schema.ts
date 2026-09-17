import "server-only";
import { absoluteUrl, site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { fill } from "@/i18n/fill";
import { localeInfo, localizePath, type Locale } from "@/i18n/config";
import { currencyFor, pricesFor } from "@/i18n/prices";

/* ─────────────────────────────────────────────────────────────
   Structured data, generated from the content, never retyped.

   Two audiences read this and neither of them reads the page: Google,
   which builds the result snippet from it, and the answer engines
   (ChatGPT, Claude, Perplexity, AI Overviews), which decide from it
   whether there is a real, identifiable business here worth naming.
   That is why the registration, the languages and the area served are
   in here alongside the price.

   Every fact is imported. The first time a price changes in prices.ts
   and not here, a search result quotes a number the site does not
   charge, and that is worse than having no structured data at all.
   Each language gets its own copy: the English pages quote pounds and
   English descriptions, the Lithuanian pages euros and Lithuanian.
   ───────────────────────────────────────────────────────────── */

const SITE_URL = site.url;
const BUSINESS_ID = `${SITE_URL}/#business`;

export function businessJsonLd(locale: Locale) {
  const s = getDictionary(locale).schema;
  const currency = currencyFor[locale];
  const prices = pricesFor[locale];
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: "Evolvia",
    legalName: site.legalName,
    description: s.businessDescription,
    url: absoluteUrl(localizePath("/", locale)),
    email: site.email,
    telephone: site.phone,
    inLanguage: localeInfo[locale].intl,
    founder: {
      "@type": "Person",
      name: site.legalName,
      jobTitle: s.jobTitle,
      sameAs: [site.linkedin],
    },
    sameAs: [site.linkedin],
    foundingDate: site.activitySince,
    identifier: {
      "@type": "PropertyValue",
      name: s.certificate,
      value: site.activityNo,
    },
    isicV4: site.nace,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kaunas",
      addressCountry: "LT",
    },
    areaServed: [
      { "@type": "Country", name: s.country },
      { "@type": "City", name: "Kaunas" },
      { "@type": "City", name: "Vilnius" },
      { "@type": "City", name: "Klaipėda" },
      { "@type": "City", name: "Šiauliai" },
      { "@type": "City", name: "Panevėžys" },
    ],
    knowsAbout: s.knowsAbout,
    knowsLanguage: ["lt", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone,
      availableLanguage: s.languages,
      areaServed: "LT",
    },
    priceRange: `${currency === "GBP" ? "£" : "€"}${prices.site}`,
  };
}

export function webSiteJsonLd(locale: Locale) {
  const home = absoluteUrl(localizePath("/", locale));
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${home}/#website`,
    url: home,
    name: "Evolvia",
    inLanguage: localeInfo[locale].intl,
    publisher: { "@id": BUSINESS_ID },
  };
}

export function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeInfo[locale].intl,
    mainEntity: getDictionary(locale).faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceJsonLd(locale: Locale) {
  const d = getDictionary(locale);
  const { plan, renewal, larger } = d.pricing;
  const currency = currencyFor[locale];
  const prices = pricesFor[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.schema.serviceName,
    serviceType: d.schema.serviceName,
    description: d.schema.serviceDescription,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: d.schema.country },
    url: absoluteUrl(localizePath("/kainos", locale)),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: d.schema.catalogName,
      itemListElement: [
        {
          "@type": "Offer",
          name: plan.name,
          price: String(prices.site),
          priceCurrency: currency,
          description: `${plan.price} ${plan.priceSuffix} ${plan.summary} ${fill(d.schema.renewalSuffix, { price: renewal.price })}`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: d.schema.siteOffered,
            description: plan.includes.join(". ") + ".",
          },
        },
        {
          "@type": "Offer",
          name: renewal.label,
          price: String(prices.renewalPerYear),
          priceCurrency: currency,
          description: renewal.body,
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: larger.name,
          description: `${larger.price}. ${larger.summary}`,
          availability: "https://schema.org/InStock",
        },
      ],
    },
  };
}
