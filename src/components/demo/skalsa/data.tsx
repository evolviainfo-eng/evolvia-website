import { localeInfo, type Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";

/** Skalsa — katalogo duomenys.
 *
 *  Išgalvota dirbtuvė. Kainos, kvapai ir degimo trukmės yra pavyzdiniai —
 *  bendri visiems komponentams, kad krepšelis ir katalogas visada sutaptų.
 *
 *  Čia gyvena tik tai, kas nuo kalbos nepriklauso: id, kainos, trukmės,
 *  svoriai ir nuotraukos. Pavadinimai, kvapų aprašai ir alt tekstai yra
 *  žodyne (i18n/dictionaries/{lt,en}/skalsa.ts) po tuo pačiu id, o
 *  getProducts(), getBundles() ir getCatalog() juos sujungia vienai kalbai.
 */

type ProductId = "p-1" | "p-2" | "p-3" | "p-4" | "p-5" | "p-6";
type BundleId = "b-1" | "b-2";

interface ProductData {
  id: ProductId;
  /** Degimo trukmė valandomis. */
  burn: number;
  /** Neto svoris gramais. */
  weight: number;
  price: number;
  img: string;
  w: number;
  h: number;
}

export interface Product extends ProductData {
  name: string;
  /** Trumpas kvapo aprašas — viena eilutė po pavadinimu. */
  scent: string;
  alt: string;
}

interface BundleData {
  id: BundleId;
  price: number;
}

export interface Bundle extends BundleData {
  name: string;
  lead: string;
  contains: string[];
  /** Papildoma eilutė po kaina (pvz. kiek kainuotų perkant atskirai). */
  note?: string;
  /** Rinkinio aprašas krepšelyje. */
  meta: string;
  alt: string;
}

export const PRODUCTS: ProductData[] = [
  {
    id: "p-1",
    burn: 45,
    weight: 220,
    price: 24,
    img: "/demo/skalsa/p-1.webp",
    w: 900,
    h: 900,
  },
  {
    id: "p-2",
    burn: 38,
    weight: 190,
    price: 21,
    img: "/demo/skalsa/p-2.webp",
    w: 900,
    h: 900,
  },
  {
    id: "p-3",
    burn: 45,
    weight: 220,
    price: 23,
    img: "/demo/skalsa/p-3.webp",
    w: 900,
    h: 900,
  },
  {
    id: "p-4",
    burn: 55,
    weight: 260,
    price: 29,
    img: "/demo/skalsa/p-4.webp",
    w: 900,
    h: 898,
  },
  {
    id: "p-5",
    burn: 30,
    weight: 160,
    price: 17,
    img: "/demo/skalsa/p-5.webp",
    w: 900,
    h: 900,
  },
  {
    id: "p-6",
    burn: 45,
    weight: 220,
    price: 25,
    img: "/demo/skalsa/p-6.webp",
    w: 900,
    h: 900,
  },
];

export const BUNDLES: BundleData[] = [
  { id: "b-1", price: 62 },
  { id: "b-2", price: 54 },
];

/** The candles in one language: numbers from here, words from the
 *  dictionary entry with the same id. */
export function getProducts(locale: Locale): Product[] {
  const words = getSkalsaCopy(locale).products;
  return PRODUCTS.map((p) => ({ ...p, ...words[p.id] }));
}

/** The bundles in one language, the same way. */
export function getBundles(locale: Locale): Bundle[] {
  const words = getSkalsaCopy(locale).bundles.items;
  return BUNDLES.map((b) => ({ ...b, ...words[b.id] }));
}

/** Nemokamo pristatymo riba ir mokestis mažesniems užsakymams (eurais). */
export const FREE_SHIPPING_FROM = 40;
export const SHIPPING_FEE = 3.5;

export interface CartItemDef {
  price: number;
  img: string;
  w: number;
  h: number;
}

/** Vienas žodynas krepšeliui: ir žvakės, ir rinkiniai. Be žodžių, todėl
 *  ShopProvider kainas skaičiuoja nepriklausomai nuo kalbos; krepšelio
 *  stalčius žodžius prideda per getCatalog(). */
export const CATALOG: Record<string, CartItemDef> = {
  ...Object.fromEntries(
    PRODUCTS.map((p): [string, CartItemDef] => [
      p.id,
      {
        price: p.price,
        img: p.img,
        w: p.w,
        h: p.h,
      },
    ]),
  ),
  "b-1": {
    price: 62,
    img: "/demo/skalsa/flat.webp",
    w: 1300,
    h: 1242,
  },
  "b-2": {
    price: 54,
    img: "/demo/skalsa/flat.webp",
    w: 1300,
    h: 1242,
  },
};

export interface CartItem extends CartItemDef {
  name: string;
  meta: string;
  alt: string;
}

/** The basket's catalogue in one language: CATALOG plus each item's name,
 *  its short description line and its image alt text. */
export function getCatalog(locale: Locale): Record<string, CartItem> {
  const t = getSkalsaCopy(locale);
  const items: Record<string, CartItem> = {};
  for (const p of getProducts(locale)) {
    items[p.id] = {
      ...CATALOG[p.id],
      name: p.name,
      meta: t.units.specs(p.burn, p.weight),
      alt: p.alt,
    };
  }
  for (const b of getBundles(locale)) {
    items[b.id] = {
      ...CATALOG[b.id],
      name: b.name,
      meta: b.meta,
      alt: b.alt,
    };
  }
  return items;
}

/** 24 → „24,00 €“ (lt), "€24.00" (en).
 *
 *  The Lithuanian format is kept exactly as it always was (no thousands
 *  separator). English leads with the symbol, as British shops write it. */
export function eur(value: number, locale: Locale): string {
  if (locale === "en") {
    return `€${value.toLocaleString(localeInfo.en.intl, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `${value.toFixed(2).replace(".", ",")} €`;
}
