import { Body, Eyebrow, H2, HAIRLINE, Note, Shot } from "./Type";

const WINES = [
  {
    n: "Nerello Mascalese",
    r: "Etna Rosso · Sicilija, Italija",
    g: 9,
    b: 46,
  },
  { n: "Riesling Trocken", r: "Mozelis · Vokietija", g: 8, b: 39 },
  {
    n: "Chenin Blanc",
    r: "Savennières, Luara · Prancūzija",
    g: 10,
    b: 52,
  },
  { n: "Blaufränkisch", r: "Burgenlandas · Austrija", g: 8, b: 42 },
  { n: "Tempranillo Reserva", r: "Rioja Alta · Ispanija", g: 9, b: 48 },
];

const PRICE_COL =
  "w-[3.4rem] shrink-0 text-right font-[family-name:var(--font-fume-display)] text-[1.0625rem] leading-[1.3] tabular-nums";

export function Wine() {
  return (
    <section
      id="vynas"
      className="mx-auto max-w-[1240px] px-5 py-[var(--sec)] sm:px-8"
    >
      <div className="grid items-start gap-[clamp(36px,5vw,72px)] lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-6">
          <div data-rise>
            <Eyebrow>Vyno kortelė</Eyebrow>
            <H2 className="mt-6">
              Apie 120 pozicijų.
              <br />
              Štai penkios.
            </H2>
            <Body className="mt-5 max-w-[46ch]">
              Kortelė sukasi apie mažus šeimos vynuogynus ir mažas partijas.
              Visą sąrašą rasite prie stalo — arba tiesiog paklauskite, ką
              atidarėme šįvakar.
            </Body>
          </div>

          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-10"
          >
            <div
              className="flex items-baseline gap-x-3 border-b pb-2.5 font-[family-name:var(--font-fume-ui)] text-[0.6875rem] uppercase tracking-[0.18em] text-[#9c948a]"
              style={{ borderColor: HAIRLINE }}
            >
              <span className="min-w-0 flex-1">Taurėmis ir buteliais</span>
              <span className="w-[3.4rem] shrink-0 text-right">Taurė</span>
              <span className="w-[3.4rem] shrink-0 text-right">Butelis</span>
            </div>

            <ul>
              {WINES.map((w) => (
                <li
                  key={w.n}
                  style={{ borderColor: HAIRLINE }}
                  className="fume-row -mx-2 border-b px-2 py-4 last:border-b-0"
                >
                  <p className="flex items-baseline gap-x-3">
                    <span className="min-w-0 flex-1 font-[family-name:var(--font-fume-display)] text-[1.0625rem] italic leading-[1.3] text-[#ede6da]">
                      {w.n}
                    </span>
                    {/* The column headings above are visual only — a screen
                        reader would otherwise read the two figures back to back
                        with no way to tell the glass price from the bottle. */}
                    <span
                      className={`${PRICE_COL} text-[rgba(237,230,218,0.9)]`}
                    >
                      <span className="sr-only">Taurė: </span>
                      {w.g}&nbsp;€
                    </span>
                    <span
                      className={`${PRICE_COL} text-[rgba(237,230,218,0.9)]`}
                    >
                      <span className="sr-only">Butelis: </span>
                      {w.b}&nbsp;€
                    </span>
                  </p>
                  <p className="mt-1.5 max-w-[46ch] font-[family-name:var(--font-fume-ui)] text-[0.8125rem] leading-[1.6] text-[#9c948a]">
                    {w.r}
                  </p>
                </li>
              ))}
            </ul>

            <div
              style={{ borderColor: HAIRLINE }}
              className="mt-6 border-t pt-5"
            >
              <Note>
                Dešimt vietų prie baro laikome nerezervuotų — vien taurei vyno
                užeiti galima be išankstinio susitarimo.
              </Note>
            </div>
          </div>
        </div>

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="min-w-0 lg:col-span-5 lg:col-start-8"
        >
          <Shot
            src="/demo/fume/wine.webp"
            w={1200}
            h={800}
            alt="Raudonas vynas pilamas į taurę prieblandoje"
            settle
          />
          <Shot
            className="ml-auto mt-[clamp(16px,2.5vw,28px)] w-[68%]"
            src="/demo/fume/wine-studio.webp"
            w={1100}
            h={893}
            ratio="5 / 4"
            alt="Vyno pylimas į taurę švariame fone"
          />
        </div>
      </div>
    </section>
  );
}
