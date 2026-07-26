/** "Kaip dirbame" — 4 steps. Step 2 is the trust hook (see-it-live).
 *
 *  Step 1 used to promise a scheduled 15-minute call, which does not happen —
 *  enquiries arrive by email. It briefly over-corrected into "no calls at
 *  all", which was equally untrue: a call is fine, it is just not the way in.
 *  The line now says where things start and leaves the rest open. */

export interface ProcessStep {
  title: string;
  body: string;
  lead?: boolean;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Užklausa el. paštu",
    body: "Parašote, ką veikiate ir ko reikia — užtenka kelių sakinių. Norite aptarti balsu? Taip pat galima.",
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
