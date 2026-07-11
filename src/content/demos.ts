/** Darbai — demonstration sites (honest: labeled Demo / Koncepcija, not real
 *  clients). They show design capability until real cases exist.
 *  NOTE: the demo "screenshots" are the ONE colour moment on an otherwise
 *  monochrome site — the work carries colour, the chrome stays mono. */

export type DemoVariant = "architecture" | "restaurant" | "interior" | "shop";

export interface Demo {
  name: string;
  label: "Demo" | "Koncepcija";
  /** Real-data caption meta: sector + year read as editorial furniture. */
  sector: string;
  year: string;
  tagline: string;
  /** What the concept covers — shown as scope chips on /darbai. */
  scope: string[];
  variant: DemoVariant;
  image: string;
  /** Optional secondary image (used by the shop product row). */
  imageAlt?: string;
  url: string;
}

export const demos: Demo[] = [
  {
    name: "Konstrukta",
    label: "Koncepcija",
    sector: "Statybos bendrovė",
    year: "2026",
    tagline:
      "Statybų bendrovės svetainė — tvirta, struktūruota ir įtikinama nuo pirmo ekrano.",
    scope: ["Vizitinė svetainė", "Projektų galerija", "Užklausos forma"],
    variant: "architecture",
    image: "/work/demo-architecture.jpg",
    url: "konstrukta.lt",
  },
  {
    name: "Fumé",
    label: "Demo",
    sector: "Restoranas · vyno baras",
    year: "2026",
    tagline:
      "Restoranas su stalo rezervacija ir meniu — atmosfera juntama dar prieš atveriant duris.",
    scope: ["Meniu", "Stalo rezervacija", "Atmosferos fotografija"],
    variant: "restaurant",
    image: "/work/demo-restaurant.jpg",
    url: "fume.lt",
  },
  {
    name: "Forma",
    label: "Demo",
    sector: "Interjero studija",
    year: "2026",
    tagline:
      "Interjero studijos portfolio — projektų indeksas, kuriame darbai kalba patys.",
    scope: ["Portfolio", "Projektų indeksas", "Užklausos"],
    variant: "interior",
    image: "/work/demo-interior.jpg",
    url: "forma.lt",
  },
  {
    name: "Skalsa",
    label: "Koncepcija",
    sector: "El. parduotuvė",
    year: "2026",
    tagline:
      "Rankų darbo žvakių el. parduotuvė — katalogas, krepšelis ir apmokėjimas vienoje švarioje sistemoje.",
    scope: ["Prekių katalogas", "Krepšelis", "Apmokėjimas"],
    variant: "shop",
    image: "/work/demo-shop.jpg",
    imageAlt: "/work/demo-shop-b.jpg",
    url: "skalsa.lt",
  },
];
