/** Darbai — demonstration websites.
 *
 *  HONESTY IS THE POINT. None of these businesses exist. Every one of them is
 *  a working website Evolvia built to show what it can do, and every surface
 *  that shows one says so: the label here, the disclosure on /darbai, the
 *  browser-chrome URL (evolvia.lt/demo/…, never a fake .lt domain), and a
 *  permanent banner on the demo itself. They are also noindex — a fictional
 *  company must never turn up in search results looking real.
 *
 *  The portfolio artwork is no longer declared here: DemoSite derives it from
 *  the slug (`/work/shot-<slug>.webp`), because it is now a real screenshot of
 *  the real page rather than a hand-built mock that could drift from it.
 *  Those captures are the ONE colour moment on an otherwise monochrome site —
 *  the work carries colour, the chrome stays mono.
 */

export interface Demo {
  name: string;
  /** URL slug — the live demo lives at /demo/{slug}. */
  slug: string;
  label: "Demo" | "Koncepcija";
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
}

export const demos: Demo[] = [
  {
    name: "Konstrukta",
    slug: "konstrukta",
    label: "Koncepcija",
    sector: "Statybos bendrovė",
    year: "2026",
    tagline:
      "Statybų bendrovės svetainė — tvirta, struktūruota ir įtikinama nuo pirmo ekrano.",
    scope: ["Vizitinė svetainė", "Projektų galerija", "Sąmatos skaičiuoklė"],
    feature: "Veikianti sąmatos skaičiuoklė",
    url: "evolvia.lt/demo/konstrukta",
    href: "/demo/konstrukta",
  },
  {
    name: "Fumé",
    slug: "fume",
    label: "Demo",
    sector: "Restoranas · vyno baras",
    year: "2026",
    tagline:
      "Restoranas su stalo rezervacija ir meniu — atmosfera juntama dar prieš atveriant duris.",
    scope: ["Meniu", "Stalo rezervacija", "Atmosferos fotografija"],
    feature: "Veikianti stalo rezervacija",
    url: "evolvia.lt/demo/fume",
    href: "/demo/fume",
  },
  {
    name: "Forma",
    slug: "forma",
    label: "Demo",
    sector: "Interjero studija",
    year: "2026",
    tagline:
      "Interjero studijos portfolio — projektų indeksas, kuriame darbai kalba patys.",
    scope: ["Portfolio", "Projektų filtras", "Galerija"],
    feature: "Filtruojamas projektų indeksas",
    url: "evolvia.lt/demo/forma",
    href: "/demo/forma",
  },
  {
    name: "Skalsa",
    slug: "skalsa",
    label: "Koncepcija",
    sector: "El. parduotuvė",
    year: "2026",
    tagline:
      "Rankų darbo žvakių el. parduotuvė — katalogas, krepšelis ir apmokėjimas vienoje švarioje sistemoje.",
    scope: ["Prekių katalogas", "Krepšelis", "Užsakymo eiga"],
    feature: "Veikiantis krepšelis",
    url: "evolvia.lt/demo/skalsa",
    href: "/demo/skalsa",
  },
];

export const demoBySlug = (slug: string) => demos.find((d) => d.slug === slug);
