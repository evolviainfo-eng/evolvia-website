/** Darbai — demonstration sites (honest: labeled Demo / Koncepcija, not real
 *  clients). They show design capability until real cases exist. */

export type DemoVariant = "architecture" | "restaurant" | "interior";

export interface Demo {
  name: string;
  label: "Demo" | "Koncepcija";
  tagline: string;
  variant: DemoVariant;
  image: string;
  url: string;
}

export const demos: Demo[] = [
  {
    name: "Konstrukta",
    label: "Koncepcija",
    tagline:
      "Statybų bendrovės svetainė — tvirta, struktūruota ir įtikinama nuo pirmo ekrano.",
    variant: "architecture",
    image: "/work/demo-architecture.jpg",
    url: "konstrukta.lt",
  },
  {
    name: "Fumé",
    label: "Demo",
    tagline: "Restoranas su stalo rezervacija ir meniu.",
    variant: "restaurant",
    image: "/work/demo-restaurant.jpg",
    url: "fume.lt",
  },
  {
    name: "Forma",
    label: "Demo",
    tagline: "Interjero studijos portfolio.",
    variant: "interior",
    image: "/work/demo-interior.jpg",
    url: "forma.lt",
  },
];
