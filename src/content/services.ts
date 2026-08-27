/** "Ką gaunate" — the three claims. Each one is carried by a live artefact in
 *  src/components/sections/features/, not by an icon: the section proves the
 *  claim instead of illustrating it, so there is nothing here to key a glyph
 *  to. (The icon set that used to be keyed from here went with the rewrite.) */

export interface Service {
  title: string;
  body: string;
}

export const services: Service[] = [
  {
    title: "Modernus dizainas",
    body: "Švarus, brangiai atrodantis dizainas, pritaikytas jūsų verslui. Ne šablonas.",
  },
  {
    title: "Greita ir matoma Google",
    body: "Greitai kraunasi, optimizuota paieškai. Klientai jus randa.",
  },
  {
    title: "Telefonui pritaikyta",
    body: "Tobula bet kuriame ekrane, o dauguma klientų naršo telefonu.",
  },
];
