import { faqItems } from "@/content/faq";
import { payOptions, shopTier } from "@/content/pricing";

/* ─────────────────────────────────────────────────────────────
   Structured data, generated from the content — never retyped.

   Both of these already existed, and both were written out by hand
   a second time: the FAQ inside duk/page.tsx, the three prices
   inside kainos/page.tsx. They happened to agree with the source
   when checked, but "happened to agree" is the whole problem — the
   first time a price changes in pricing.ts and not here, a search
   result quotes a number the site does not charge. That is worse
   than having no structured data at all.

   One definition, derived from the files that own the facts.
   ───────────────────────────────────────────────────────────── */

const SITE_URL = "https://evolvia.lt";
const PROVIDER = { "@type": "ProfessionalService", name: "Evolvia" } as const;

/** "€150" → "150". Prices are authored for humans; Offer wants a bare
 *  number and a separate currency. Read it back rather than maintain two. */
const amount = (price: string) => price.replace(/\D/g, "");

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
  serviceType: "Web design",
  provider: PROVIDER,
  areaServed: "Lietuva",
  offers: [
    ...payOptions.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: amount(o.oneTime),
      priceCurrency: "EUR",
      description: `${o.oneTime} ${o.priceSuffix}. ${o.summary}`,
      availability: "https://schema.org/InStock",
    })),
    {
      "@type": "Offer",
      name: shopTier.name,
      price: amount(shopTier.oneTime),
      priceCurrency: "EUR",
      description: `${shopTier.oneTime} ${shopTier.priceSuffix}.`,
      availability: "https://schema.org/InStock",
    },
  ],
  url: `${SITE_URL}/kainos`,
};
