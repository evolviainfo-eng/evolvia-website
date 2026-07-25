import { Eyebrow, H2, HAIRLINE } from "./Type";

const HOURS = [
  { d: "Pirmadienis", h: "Nedirbame" },
  { d: "Antradienis–Ketvirtadienis", h: "17:00–23:00" },
  { d: "Penktadienis–Šeštadienis", h: "17:00–24:00" },
  { d: "Sekmadienis", h: "17:00–22:00" },
];

export function ContactFooter() {
  return (
    <footer
      id="kontaktai"
      className="border-t"
      style={{ borderColor: HAIRLINE }}
    >
      <div className="mx-auto max-w-[1240px] px-5 py-[clamp(64px,9vw,112px)] sm:px-8">
        <div className="grid gap-[clamp(36px,5vw,72px)] lg:grid-cols-12">
          <div data-rise className="min-w-0 lg:col-span-5">
            <Eyebrow>Kur mus rasti</Eyebrow>
            <H2 className="mt-6">Užupis, Vilnius</H2>

            <div
              className="mt-8 inline-flex rounded-[2px] border px-3 py-1.5 font-[family-name:var(--font-fume-ui)] text-[0.64rem] uppercase tracking-[0.2em] text-[#9c948a]"
              style={{ borderColor: HAIRLINE }}
            >
              Pavyzdiniai kontaktai
            </div>

            <address className="mt-5 not-italic">
              {/* Quarter only, no street or postcode. The phone is impossible
                  and the email is a .demo domain, but a house number on a real
                  Užupis street would resolve to somebody's actual building —
                  the one contact detail here a stranger could act on. */}
              <p className="font-[family-name:var(--font-fume-ui)] text-[0.95rem] leading-[1.9] text-[rgba(237,230,218,0.88)]">
                Užupis, Vilnius
              </p>
              <p className="mt-4 font-[family-name:var(--font-fume-ui)] text-[0.95rem] leading-[1.9]">
                <a
                  href="tel:+37060000000"
                  className="border-b text-[rgba(237,230,218,0.88)] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[#ede6da] hover:text-[#ede6da]"
                  style={{ borderColor: HAIRLINE }}
                >
                  +370 600 00000
                </a>
                <br />
                <a
                  href="mailto:labas@fume.demo"
                  className="break-words border-b text-[rgba(237,230,218,0.88)] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[#ede6da] hover:text-[#ede6da]"
                  style={{ borderColor: HAIRLINE }}
                >
                  labas@fume.demo
                </a>
              </p>
            </address>
          </div>

          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="min-w-0 lg:col-span-4 lg:col-start-7"
          >
            <p className="font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.26em] text-[#9c948a]">
              Darbo laikas
            </p>
            <table className="mt-6 w-full border-collapse font-[family-name:var(--font-fume-ui)] text-[0.85rem]">
              <caption className="sr-only">Fumé savaitės darbo laikas</caption>
              <tbody>
                {HOURS.map((r) => (
                  <tr
                    key={r.d}
                    className="border-b border-[rgba(237,230,218,0.07)] last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="min-w-0 py-3 pr-3 text-left font-normal text-[#9c948a]"
                    >
                      {r.d}
                    </th>
                    <td className="whitespace-nowrap py-3 text-right tabular-nums text-[rgba(237,230,218,0.88)]">
                      {r.h}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 font-[family-name:var(--font-fume-ui)] text-[0.78rem] leading-relaxed text-[#9c948a]">
              Virtuvė paskutinius užsakymus priima 22:30, sekmadieniais —
              21:30. Baras dirba iki uždarymo.
            </p>
          </div>

          <div
            data-rise
            style={{ "--i": 2 } as React.CSSProperties}
            className="min-w-0 lg:col-span-2 lg:col-start-11"
          >
            <p className="font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.26em] text-[#9c948a]">
              Naudinga žinoti
            </p>
            <ul className="mt-6 space-y-3 font-[family-name:var(--font-fume-ui)] text-[0.82rem] leading-relaxed text-[rgba(237,230,218,0.8)]">
              <li>Stalas — visam vakarui</li>
              <li>Prie baro rezervacijų nereikia</li>
              <li>Vaikams — pusporcijos</li>
              <li>Šuo prie baro laukiamas</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-[clamp(48px,7vw,88px)] flex flex-wrap items-baseline justify-between gap-4 border-t pt-7"
          style={{ borderColor: HAIRLINE }}
        >
          <span className="font-[family-name:var(--font-fume-display)] text-[1.5rem] font-light leading-none tracking-[0.02em] text-[#ede6da]">
            Fumé
          </span>
          <span className="font-[family-name:var(--font-fume-ui)] text-[0.74rem] text-[#9c948a]">
            Restoranas ir vyno baras · Vilnius
          </span>
        </div>
      </div>
    </footer>
  );
}
