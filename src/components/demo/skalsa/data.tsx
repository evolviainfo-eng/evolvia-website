/** Skalsa — katalogo duomenys.
 *
 *  Išgalvota dirbtuvė. Kainos, kvapai ir degimo trukmės yra pavyzdiniai —
 *  bendri visiems komponentams, kad krepšelis ir katalogas visada sutaptų.
 */

export interface Product {
  id: string;
  name: string;
  /** Trumpas kvapo aprašas — viena eilutė po pavadinimu. */
  scent: string;
  /** Degimo trukmė valandomis. */
  burn: number;
  /** Neto svoris gramais. */
  weight: number;
  price: number;
  img: string;
  w: number;
  h: number;
  alt: string;
}

export interface Bundle {
  id: string;
  name: string;
  lead: string;
  contains: string[];
  price: number;
  /** Papildoma eilutė po kaina (pvz. kiek kainuotų perkant atskirai). */
  note?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "p-1",
    name: "Gintaras ir kedras",
    scent: "Sakinga, šilta, su dūmo užuomina",
    burn: 45,
    weight: 220,
    price: 24,
    img: "/demo/skalsa/p-1.webp",
    w: 900,
    h: 900,
    alt: "Gintaro spalvos stiklainio žvakė prieblandoje",
  },
  {
    id: "p-2",
    name: "Pievų šienas",
    scent: "Sausa žolė, ramunės, vasaros pabaiga",
    burn: 38,
    weight: 190,
    price: 21,
    img: "/demo/skalsa/p-2.webp",
    w: 900,
    h: 900,
    alt: "Etiketuota žvakė ant lininio audinio",
  },
  {
    id: "p-3",
    name: "Levandos ir vanilė",
    scent: "Minkšta, migdanti, be muilo natos",
    burn: 45,
    weight: 220,
    price: 23,
    img: "/demo/skalsa/p-3.webp",
    w: 900,
    h: 900,
    alt: "Levandų kvapo žvakė su džiovintais žiedais",
  },
  {
    id: "p-4",
    name: "Sakai ir dūmas",
    scent: "Pušynas po lietaus, tolimas laužas",
    burn: 55,
    weight: 260,
    price: 29,
    img: "/demo/skalsa/p-4.webp",
    w: 900,
    h: 898,
    alt: "Du stiklainiai makrame laikikliuose",
  },
  {
    id: "p-5",
    name: "Rytinė kava",
    scent: "Šviežiai malta, su pieno saldumu",
    burn: 30,
    weight: 160,
    price: 17,
    img: "/demo/skalsa/p-5.webp",
    w: 900,
    h: 900,
    alt: "Nedidelė žvakė ant medinio padėklo",
  },
  {
    id: "p-6",
    name: "Figa ir juodasis serbentas",
    scent: "Žalia, sultinga, šiek tiek rūgštoka",
    burn: 45,
    weight: 220,
    price: 25,
    img: "/demo/skalsa/p-6.webp",
    w: 900,
    h: 900,
    alt: "Dvi žvakės šalia keramikinio dubens",
  },
];

export const BUNDLES: Bundle[] = [
  {
    id: "b-1",
    name: "Vakaro trio",
    lead: "Trys kvapai vienai savaitei — nuo šiltos pradžios iki ramaus galo.",
    contains: ["Gintaras ir kedras", "Pievų šienas", "Levandos ir vanilė"],
    price: 62,
    note: "Atskirai 68,00 €",
  },
  {
    id: "b-2",
    name: "Dovanų dėžutė",
    lead: "Supakuota taip, kad nieko nebereikėtų daryti — tik įteikti.",
    contains: [
      "Sakai ir dūmas",
      "Rytinė kava",
      "Ilgi degtukai medinėje dėžutėje",
      "Lininis maišelis ir ranka rašyta kortelė",
    ],
    price: 54,
  },
];

/** Nemokamo pristatymo riba ir mokestis mažesniems užsakymams (eurais). */
export const FREE_SHIPPING_FROM = 40;
export const SHIPPING_FEE = 3.5;

export interface CartItemDef {
  name: string;
  meta: string;
  price: number;
  img: string;
  w: number;
  h: number;
  alt: string;
}

/** Vienas žodynas krepšeliui: ir žvakės, ir rinkiniai. */
export const CATALOG: Record<string, CartItemDef> = {
  ...Object.fromEntries(
    PRODUCTS.map((p): [string, CartItemDef] => [
      p.id,
      {
        name: p.name,
        meta: `${p.burn} val. · ${p.weight} g`,
        price: p.price,
        img: p.img,
        w: p.w,
        h: p.h,
        alt: p.alt,
      },
    ]),
  ),
  "b-1": {
    name: "Vakaro trio",
    meta: "Rinkinys · 3 žvakės",
    price: 62,
    img: "/demo/skalsa/flat.webp",
    w: 1300,
    h: 1242,
    alt: "Žvakių asortimentas iš viršaus",
  },
  "b-2": {
    name: "Dovanų dėžutė",
    meta: "Rinkinys · 2 žvakės ir priedai",
    price: 54,
    img: "/demo/skalsa/flat.webp",
    w: 1300,
    h: 1242,
    alt: "Žvakių asortimentas iš viršaus",
  },
};

/** 24 → „24,00 €“ */
export function eur(value: number): string {
  return `${value.toFixed(2).replace(".", ",")} €`;
}
