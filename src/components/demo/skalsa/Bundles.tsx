import { AddToCart } from "./AddToCart";
import { BUNDLES, eur } from "./data";

export function Bundles() {
  return (
    <section className="relative bg-[#F1EAE0]">
      <span id="rinkiniai" aria-hidden="true" className="absolute -top-[30px]" />
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
        <div data-rise className="max-w-[50ch]">
          <p className="text-[0.76rem] uppercase tracking-[0.14em] text-[#6E6257]">
            Rinkiniai
          </p>
          <h2
            className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
          >
            Kai reikia dovanos, o ne prekės.
          </h2>
        </div>

        <div className="mt-[clamp(36px,5vw,64px)] grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="min-w-0 overflow-hidden rounded-[10px] bg-[#FAF6F0]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demo/skalsa/flat.webp"
              alt="Žvakių asortimentas, degtukai ir lininis maišelis iš viršaus"
              width={1300}
              height={1242}
              decoding="async"
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </div>

          <ul className="grid min-w-0 gap-6">
            {BUNDLES.map((b, i) => (
              <li
                key={b.id}
                data-rise
                style={{ "--i": i + 2 } as React.CSSProperties}
                className="min-w-0 rounded-[10px] border border-[rgba(36,30,25,0.13)] bg-[#FAF6F0] p-6 sm:p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className="min-w-0 text-[1.35rem] leading-tight tracking-[-0.02em] break-words"
                    style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
                  >
                    {b.name}
                  </h3>
                  <span className="shrink-0 text-[1.1rem] tabular-nums">
                    {eur(b.price)}
                  </span>
                </div>

                <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-[1.6] text-[#6E6257]">
                  {b.lead}
                </p>

                <ul className="mt-5 border-t border-[rgba(36,30,25,0.13)] pt-4">
                  {b.contains.map((c) => (
                    <li
                      key={c}
                      className="flex gap-3 py-1.5 text-[0.9rem] text-[#241E19]"
                    >
                      <span aria-hidden="true" className="text-[#6E6257]">
                        —
                      </span>
                      <span className="min-w-0 break-words">{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <AddToCart id={b.id} name={b.name} />
                  {b.note && (
                    <span className="text-[0.8rem] text-[#6E6257]">{b.note}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
