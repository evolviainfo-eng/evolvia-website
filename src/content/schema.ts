import { faqItems } from "@/content/faq";
import { plan, renewal, largerProjects } from "@/content/pricing";
import { site } from "@/content/site";

/* ─────────────────────────────────────────────────────────────
   Structured data, generated from the content, never retyped.

   Two audiences read this and neither of them reads the page: Google,
   which builds the result snippet from it, and the answer engines
   (ChatGPT, Claude, Perplexity, AI Overviews), which decide from it
   whether there is a real, identifiable business here worth naming.
   That is why the registration, the languages and the area served are
   in here alongside the price.

   Every fact is imported. The first time a price changes in pricing.ts
   and not here, a search result quotes a number the site does not
   charge, and that is worse than having no structured data at all.
   ───────────────────────────────────────────────────────────── */

const SITE_URL = site.url;

/** "€400" → "400". Prices are authored for humans; Offer wants a bare
 *  number and a separate currency. Read it back rather than maintain two. */
const amount = (price: string) => price.replace(/\D/g, "");

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Evolvia",
  legalName: site.legalName,
  description:
    "Evolvia kuria svetaines Lietuvos verslui. Individualus dizainas, programavimas, tekstai, paleidimas ir priežiūra vienoje fiksuotoje kainoje.",
  url: SITE_URL,
  email: site.email,
  telephone: site.phone,
  inLanguage: "lt-LT",
  founder: {
    "@type": "Person",
    name: site.legalName,
    jobTitle: "Svetainių kūrėjas",
    sameAs: [site.linkedin],
  },
  sameAs: [site.linkedin],
  foundingDate: site.activitySince,
  identifier: {
    "@type": "PropertyValue",
    name: "Individualios veiklos pažyma",
    value: site.activityNo,
  },
  isicV4: site.nace,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kaunas",
    addressCountry: "LT",
  },
  areaServed: [
    { "@type": "Country", name: "Lietuva" },
    { "@type": "City", name: "Kaunas" },
    { "@type": "City", name: "Vilnius" },
    { "@type": "City", name: "Klaipėda" },
    { "@type": "City", name: "Šiauliai" },
    { "@type": "City", name: "Panevėžys" },
  ],
  knowsAbout: [
    "Svetainių kūrimas",
    "Interneto svetainių dizainas",
    "El. parduotuvių kūrimas",
    "SEO optimizacija",
    "Svetainių hostingas ir priežiūra",
  ],
  knowsLanguage: ["lt", "en"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    telephone: site.phone,
    availableLanguage: ["Lithuanian", "English"],
    areaServed: "LT",
  },
  priceRange: "€400",
};

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Evolvia",
  inLanguage: "lt-LT",
  publisher: { "@id": `${SITE_URL}/#business` },
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Svetainių kūrimas",
  serviceType: "Svetainių kūrimas",
  description:
    "Svetainių kūrimas Lietuvos verslui: individualus dizainas, programavimas, tekstai, optimizacija Google paieškai, paleidimas ir pirmi metai priežiūros.",
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: { "@type": "Country", name: "Lietuva" },
  url: `${SITE_URL}/kainos`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kainos",
    itemListElement: [
      {
        "@type": "Offer",
        name: plan.name,
        price: amount(plan.oneTime),
        priceCurrency: "EUR",
        description: `${plan.oneTime} ${plan.priceSuffix} ${plan.summary} Po pirmų metų priežiūra ${renewal.price}.`,
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: "Svetainės sukūrimas",
          description: plan.includes.join(". ") + ".",
        },
      },
      {
        "@type": "Offer",
        name: renewal.label,
        price: amount(renewal.price),
        priceCurrency: "EUR",
        description: renewal.body,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: largerProjects.name,
        description: `${largerProjects.price}. ${largerProjects.summary}`,
        availability: "https://schema.org/InStock",
      },
    ],
  },
};
