import { Body, Eyebrow, H2, HAIRLINE, Rule, Shot } from "./Type";

const FACTS = [
  { k: "34", v: "vietos salėje" },
  { k: "~120", v: "pozicijų vyno kortelėje" },
  { k: "17:00", v: "atsidaro durys" },
];

export function Intro() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-[var(--sec)] sm:px-8">
      <div className="grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <div data-rise>
            <Eyebrow>Užupis, Vilnius</Eyebrow>
            <H2 className="mt-6">
              Vakaras, kuris
              <br />
              neskuba.
            </H2>
          </div>

          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-7 space-y-5"
          >
            <Body className="max-w-[46ch]">
              Fumé — mažas restoranas su vyno baru senojoje Užupio kalvio
              dirbtuvėje. Trisdešimt keturios vietos, viena atviros ugnies
              virtuvė ir vienas serviravimas per vakarą: rezervuotas stalas
              lieka jūsų iki uždarymo.
            </Body>
            <Body className="max-w-[46ch]">
              Meniu keičiasi pagal sezoną ir pagal tai, ką tą savaitę atveža
              ūkininkai. Nerasite jo išspausdinto metams į priekį — tai ne
              kortelė, o pokalbis su tuo, kas šiuo metu geriausia.
            </Body>

            <dl
              style={{ borderColor: HAIRLINE }}
              className="!mt-10 grid grid-cols-3 gap-x-4 gap-y-4 border-t pt-6"
            >
              {FACTS.map((f, i) => (
                <div
                  key={f.k}
                  style={{ borderColor: HAIRLINE }}
                  className={`min-w-0 ${i > 0 ? "sm:border-l sm:pl-5" : ""}`}
                >
                  <dt className="font-[family-name:var(--font-fume-display)] text-[clamp(1.5rem,3vw,1.875rem)] font-light leading-none tabular-nums text-[#ede6da]">
                    {f.k}
                  </dt>
                  <dd className="mt-2 font-[family-name:var(--font-fume-ui)] text-[0.8125rem] leading-[1.5] text-[#9c948a]">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <Shot
          className="lg:col-span-6 lg:col-start-7"
          src="/demo/fume/room-hall.webp"
          w={1400}
          h={933}
          alt="Padengta Fumé salė šiltoje vakaro šviesoje"
          rise={1}
          settle
        />
      </div>

      <Rule className="mt-[var(--gap)]" />
    </section>
  );
}
