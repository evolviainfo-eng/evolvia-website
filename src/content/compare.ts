/** "Kodėl Evolvia" — comparison table. Evolvia is always the last value. */

export const compareColumns = [
  "Wix / šablonas",
  "Pigus freelanceris",
  "Evolvia",
] as const;

export interface CompareRow {
  criterion: string;
  /** [Wix/šablonas, Pigus freelanceris, Evolvia] */
  values: [string, string, string];
}

export const compareRows: CompareRow[] = [
  {
    criterion: "Dizainas",
    values: ["Toks pat kaip tūkstančių kitų", "Kaip pasiseks", "Unikalus, pritaikytas tau"],
  },
  {
    criterion: "Pamatai prieš mokant",
    values: ["Ne", "Retai", "Taip — gyvą eskizą"],
  },
  {
    criterion: "Greitis ir Google",
    values: ["Lėta, sunkiai randama", "Priklauso", "Optimizuota nuo starto"],
  },
  {
    criterion: "Priežiūra po paleidimo",
    values: ["Tavo problema", "Dingsta", "Mes — €50/mėn"],
  },
  {
    criterion: "Kiek užtrunka",
    values: ["Savaitės tavo laiko", "Mėnesiai laukimo", "Kelios dienos"],
  },
];

export const compareKicker =
  "Tą patį darbą gali padaryti pigiau. Bet ne taip, kad atrodytum brangiai.";
