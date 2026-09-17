import "server-only";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Darbai — the real client work.
 *
 *  Separate from `demos.ts` on purpose, and the separation is the whole point
 *  of the section. A demo is a site Evolvia built to show what it can do; a
 *  case is a site a real company paid for, uses, and is found by. They must
 *  never share a component, a label or a browser-chrome address, because the
 *  moment they look alike the honest disclosure on the demos stops meaning
 *  anything.
 *
 *  Everything below traces to something checkable: the delivered items are the
 *  pages minerda.lt actually serves, the structured data is what those pages
 *  actually contain. No metric appears here that nobody measured, so there are
 *  no visitor counts and no conversion figures.
 *
 *  No dates and no delivery times either. A term reads as a promise about the
 *  next project rather than a fact about this one, and a launch date starts
 *  ageing the work the day after it ships.
 *
 *  The words (sector, summary, situation, work, result) are in the
 *  dictionary under `minerda`; the facts that do not translate are here.
 */

export interface CaseStudy {
  slug: string;
  /** Company name as the client writes it. */
  name: string;
  legalName: string;
  sector: string;
  city: string;
  /** The live site. Shown in the browser chrome, so it is the real domain. */
  domain: string;
  url: string;
  /** One line for the homepage band. */
  summary: string;
  /** Where the client started. */
  situation: string;
  /** Everything delivered. Plain rows, not icon cards. */
  work: { title: string; detail: string }[];
  result: string;
}

export function getMinerda(locale: Locale): CaseStudy {
  const t = getDictionary(locale).minerda;
  return {
    slug: "minerda",
    name: "Minerda",
    legalName: "M. Bakanovo IDV",
    city: "Kaunas",
    domain: "minerda.lt",
    url: "https://minerda.lt",
    sector: t.sector,
    summary: t.summary,
    situation: t.situation,
    work: t.work,
    result: t.result,
  };
}

/** The captures. Real screenshots of the live site at 1440px, taken from the
 *  production domain and downscaled from a 2x master. Never a mockup.
 *  minerda.lt is a Lithuanian-only site, so these are the same on /en. */
export const minerdaShots = {
  home: "/img/darbai/minerda/pagrindinis.webp",
  homeMobile: "/img/darbai/minerda/pagrindinis-m.webp",
  article: "/img/darbai/minerda/straipsnis.webp",
  faq: "/img/darbai/minerda/duk.webp",
} as const;
