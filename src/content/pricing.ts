/** Kainos — two tiers, the €300 plan first (featured) and the €600 plan after.
 *  Only the €300 tier is emphasised. No fake discounts, no timers. */

export interface PricingTier {
  name: string;
  badge?: string;
  oneTime: string;
  monthly: string;
  summary: string;
  includes: string[];
  cta: { label: string; href: string };
  featured: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Svetainė",
    badge: "Populiariausias",
    oneTime: "€300",
    monthly: "€50 / mėn",
    summary:
      "Viena profesionali svetainė, paruošta parduoti. Idealu daugumai verslų.",
    includes: [
      "Dizainas",
      "Programavimas",
      "Paleidimas",
      "Perkėlimas į domeną",
    ],
    cta: { label: "Pradėti", href: "#kontaktai" },
    featured: true,
  },
  {
    name: "Verslo svetainė",
    oneTime: "€600",
    monthly: "€100 / mėn",
    summary:
      "Kelių puslapių svetainė arba el. parduotuvė. Pilnas funkcionalumas augančiam verslui.",
    includes: [
      "Dizainas",
      "Programavimas",
      "El. parduotuvė / keli puslapiai",
      "Paleidimas",
    ],
    cta: { label: "Susisiekti", href: "#kontaktai" },
    featured: false,
  },
];

export const pricingNote =
  "Mėnesinis mokestis abiem planams: hostingas, atnaujinimai, palaikymas ir smulkūs pakeitimai.";
