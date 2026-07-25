import { Body, Eyebrow, H2, HAIRLINE, Photo } from "./Type";

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

export function Wine() {
  return (
    <section
      id="vynas"
      className="mx-auto max-w-[1240px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8"
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
              className="flex items-baseline gap-4 border-b pb-2.5 font-[family-name:var(--font-fume-ui)] text-[0.64rem] uppercase tracking-[0.18em] text-[#9c948a]"
              style={{ borderColor: HAIRLINE }}
            >
              <span className="min-w-0 flex-1">Taurėmis ir buteliais</span>
              <span className="w-[54px] shrink-0 text-right">Taurė</span>
              <span className="w-[58px] shrink-0 text-right">Butelis</span>
            </div>

            <ul>
              {WINES.map((w) => (
                <li
                  key={w.n}
                  className="flex items-baseline gap-4 border-b border-[rgba(237,230,218,0.07)] py-4 last:border-b-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-[family-name:var(--font-fume-display)] text-[1.1rem] font-normal italic leading-[1.3] text-[#ede6da]">
                      {w.n}
                    </p>
                    <p className="mt-1.5 font-[family-name:var(--font-fume-ui)] text-[0.78rem] leading-[1.55] text-[#9c948a]">
                      {w.r}
                    </p>
                  </div>
                  {/* The column headings above are visual only — a screen
                      reader would otherwise read the two figures back to back
                      with no way to tell the glass price from the bottle. */}
                  <span className="w-[54px] shrink-0 text-right font-[family-name:var(--font-fume-ui)] text-[0.9rem] tabular-nums text-[rgba(237,230,218,0.88)]">
                    <span className="sr-only">Taurė: </span>
                    {w.g}&nbsp;€
                  </span>
                  <span className="w-[58px] shrink-0 text-right font-[family-name:var(--font-fume-ui)] text-[0.9rem] tabular-nums text-[rgba(237,230,218,0.88)]">
                    <span className="sr-only">Butelis: </span>
                    {w.b}&nbsp;€
                  </span>
                </li>
              ))}
            </ul>

            <p
              className="mt-6 border-t pt-5 font-[family-name:var(--font-fume-ui)] text-[0.76rem] leading-relaxed text-[#9c948a]"
              style={{ borderColor: HAIRLINE }}
            >
              Dešimt vietų prie baro laikome nerezervuotų — vien taurei vyno
              užeiti galima be išankstinio susitarimo.
            </p>
          </div>
        </div>

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="min-w-0 lg:col-span-5 lg:col-start-8"
        >
          <figure
            className="overflow-hidden bg-[#141210]"
            style={{ aspectRatio: "1200 / 800" }}
          >
            <Photo
              src="/demo/fume/wine.webp"
              w={1200}
              h={800}
              alt="Raudonas vynas pilamas į taurę prieblandoje"
              settle
              className="h-full w-full object-cover"
            />
          </figure>
          <figure
            className="ml-auto mt-[clamp(16px,2.5vw,28px)] w-[68%] overflow-hidden bg-[#141210]"
            style={{ aspectRatio: "1100 / 893" }}
          >
            <Photo
              src="/demo/fume/wine-studio.webp"
              w={1100}
              h={893}
              alt="Vyno pylimas į taurę švariame fone"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
