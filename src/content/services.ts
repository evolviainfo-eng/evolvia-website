/** "Ką gaunate" feature cards. Icons are keyed to a custom SVG set. */

export type ServiceIcon = "design" | "speed" | "mobile";

export interface Service {
  icon: ServiceIcon;
  title: string;
  body: string;
}

export const services: Service[] = [
  {
    icon: "design",
    title: "Modernus dizainas",
    body: "Švarus, brangiai atrodantis dizainas, pritaikytas jūsų verslui. Ne šablonas.",
  },
  {
    icon: "speed",
    title: "Greita ir matoma Google",
    body: "Greitai kraunasi, optimizuota paieškai. Klientai jus randa.",
  },
  {
    icon: "mobile",
    title: "Telefonui pritaikyta",
    body: "Tobula bet kuriame ekrane — dauguma klientų naršo telefonu.",
  },
];
