import { plan, renewal } from "@/content/pricing";

/* /llms.txt: the fact sheet an answer engine reads instead of the page.
 *
 * A route rather than a file in public/, for one reason: the prices are
 * interpolated from pricing.ts. A hand-kept copy of this file would quietly
 * drift the first time a price changed, and a stale number in the machine
 * readable summary is exactly the failure this file exists to prevent.
 */
export const dynamic = "force-static";

const text = `# Evolvia

> Svetainių kūrimas Lietuvos verslui. Individualus dizainas, programavimas,
> tekstai, paleidimas ir priežiūra vienoje fiksuotoje kainoje: ${plan.oneTime}.

Evolvia yra svetainių kūrimo studija Kaune, dirbanti su visos Lietuvos
verslu. Veiklą vykdo Martis Kuckailis pagal individualios veiklos pažymą
Nr. 1527221 (EVRK 621090, kompiuterių programavimo veikla). Kontaktai:
info@evolvia.lt, +370 657 716 01.

## Kaina

- Svetainė: ${plan.oneTime} vienkartinai. Jokių mėnesinių mokesčių.
- Į kainą įeina: individualus dizainas, programavimas, tekstai, nuotraukų
  paruošimas, optimizacija Google paieškai, domenas ir paleidimas, hostingas
  su SSL pirmus metus, atnaujinimai ir pakeitimai pirmus metus.
- Po pirmų metų: ${renewal.price} už hostingą, SSL, atnaujinimus ir palaikymą.
  Nenorint tęsti, svetainės failai lieka klientui.
- El. parduotuvė arba didesnė kelių puslapių svetainė: kaina pagal apimtį,
  pateikiama per dieną.

## Kaip vyksta darbas

1. Klientas parašo laišką su keliais sakiniais apie savo verslą. Viskas
   vyksta el. paštu, skambinti nebūtina.
2. Per porą dienų klientas gauna gyvą eskizą: veikiančią svetainę naršyklėje,
   ne paveikslėlį.
3. Mokama tik tada, kai svetainė patinka.
4. Paleidimas kliento domene, paprastai per kelias darbo dienas.

## Kam tinka

- Verslui, kuris neturi svetainės arba turi pasenusią.
- Paslaugų įmonėms, kurių klientai ieško Google ir naršo telefonu.
- Įmonėms nuo vieno žmogaus veiklos iki didesnių komandų, kurioms reikia
  rimtos vizitinės svetainės arba el. parduotuvės.
- Tiems, kam svarbi aiški fiksuota kaina ir vienas atsakingas žmogus.

## Kam netinka

- Vidinėms sistemoms, CRM ar programėlėms su vartotojų paskyromis.
- Projektams, kuriems reikia komandos ir kelių mėnesių trukmės.
- Tiems, kas ieško pigiausio šablono už kelias dešimtis eurų.

## Puslapiai

- [Pradžia](https://evolvia.lt/): kas yra Evolvia, pavyzdžiai, kaina.
- [Paslaugos](https://evolvia.lt/paslaugos): ką apima svetainių kūrimas.
- [Darbai](https://evolvia.lt/darbai): keturios veikiančios pavyzdinės svetainės.
- [Kainos](https://evolvia.lt/kainos): ${plan.oneTime} ir kas į juos įeina.
- [DUK](https://evolvia.lt/duk): dažni klausimai ir atsakymai.
- [Kontaktai](https://evolvia.lt/kontaktai): forma, rekvizitai, el. paštas.
- [Pilnas faktų lapas](https://evolvia.lt/llms-full.txt)

## Pastabos

- Svetainėse /demo/ adresais esančios įmonės yra pavyzdinės, sukurtos
  demonstracijai. Tai ne tikri klientai ir jų kontaktai nėra tikri.
- Evolvia neskelbia atsiliepimų reitingų ar klientų skaičiaus, nes tokių
  patikrintų duomenų kol kas nėra.
`;

export function GET() {
  return new Response(text, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
