import "server-only";
import { getDictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";

/** Darbai — demonstration websites.
 *
 *  HONESTY IS THE POINT. None of these businesses exist. Every one of them is
 *  a working website Evolvia built to show what it can do, and every surface
 *  that shows one says so: the label here, the disclosure on /darbai, the
 *  browser-chrome URL (evolvia.lt/demo/…, never a fake .lt domain), and a
 *  permanent banner on the demo itself. They are also noindex — a fictional
 *  company must never turn up in search results looking real.
 *
 *  The portfolio artwork is not declared here: DemoSite derives it from the
 *  slug and language (`/work/shot-<slug>[-en].webp`), because it is a real
 *  screenshot of the real page rather than a hand-built mock that could
 *  drift from it. Those captures are the ONE colour moment on an otherwise
 *  monochrome site — the work carries colour, the chrome stays mono.
 *
 *  Words (sector, tagline, scope, feature) come from the dictionary; this
 *  file holds only what reads the same in every language.
 */

export interface Demo {
  name: string;
  /** URL slug — the live demo lives at /demo/{slug} (and /en/demo/{slug}). */
  slug: string;
  label: string;
  /** Real-data caption meta: sector + year read as editorial furniture. */
  sector: string;
  year: string;
  tagline: string;
  /** What the concept covers — shown as scope chips on /darbai. */
  scope: string[];
  /** The one interaction that actually works in the demo. Named plainly so
   *  the visitor knows what to go and try. */
  feature: string;
  /** What the fake browser chrome displays. Deliberately the real address of
   *  the demo — never "konstrukta.lt", which would imply a real company. */
  url: string;
  href: string;
  /** The portfolio captures, in the page's language. */
  shot: string;
  shotMobile: string;
}

type Slug = "konstrukta" | "fume" | "forma" | "skalsa";

const base: { slug: Slug; name: string; kind: "demo" | "concept"; year: string }[] =
  [
    { slug: "konstrukta", name: "Konstrukta", kind: "concept", year: "2026" },
    { slug: "fume", name: "Fumé", kind: "demo", year: "2026" },
    { slug: "forma", name: "Forma", kind: "demo", year: "2026" },
    { slug: "skalsa", name: "Skalsa", kind: "concept", year: "2026" },
  ];

export function getDemos(locale: Locale): Demo[] {
  const d = getDictionary(locale).demos;
  const suffix = locale === "lt" ? "" : `-${locale}`;
  return base.map((b) => {
    const href = localizePath(`/demo/${b.slug}`, locale);
    return {
      name: b.name,
      slug: b.slug,
      year: b.year,
      label: d.labels[b.kind],
      ...d.items[b.slug],
      url: `evolvia.lt${href}`,
      href,
      shot: `/work/shot-${b.slug}${suffix}.webp`,
      shotMobile: `/work/shot-${b.slug}${suffix}-m.webp`,
    };
  });
}

export const demoBySlug = (locale: Locale, slug: string) =>
  getDemos(locale).find((d) => d.slug === slug);
