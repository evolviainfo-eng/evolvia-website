/** "Kaip dirbame" — 4 steps. Step 2 is the trust hook (see-it-live).
 *
 *  Step 1 used to promise a 15-minute phone call. There is no call — the whole
 *  thing runs over email by preference, and saying otherwise put a promise on
 *  the site nobody was going to keep. */

export interface ProcessStep {
  title: string;
  body: string;
  lead?: boolean;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Užklausa el. paštu",
    body: "Parašote, ką veikiate ir ko reikia. Be skambučių ir susitikimų — viskas vyksta laiškais.",
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
