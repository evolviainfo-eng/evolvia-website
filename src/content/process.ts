/** "Kaip dirbame" — 4 steps. Step 2 is the trust hook (see-it-live). */

export interface ProcessStep {
  title: string;
  body: string;
  lead?: boolean;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Trumpas pokalbis",
    body: "Suprantame jūsų verslą ir tikslus. 15 minučių.",
  },
  {
    title: "Gyvas eskizas",
    body: "Per kelias dienas matote realią svetainę gyvai, ne paveikslėlį. Tik tada sprendžiate.",
    lead: true,
  },
  {
    title: "Apmokėjimas ir paleidimas",
    body: "Patvirtinus — perkeliame į jūsų domeną ir paleidžiame.",
  },
  {
    title: "Priežiūra",
    body: "Hostingas, atnaujinimai ir palaikymas. Jums nereikia nieko galvoti.",
  },
];
