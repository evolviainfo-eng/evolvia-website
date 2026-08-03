import { AddToCart, Check } from "./AddToCart";
import { BUNDLES, eur } from "./data";

export function Bundles() {
  return (
    <section data-sk-sec="rinkiniai" className="relative bg-[#F1EAE0]">
      <span id="rinkiniai" aria-hidden="true" className="absolute -top-[30px]" />
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
        <div data-rise className="max-w-[50ch]">
          <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[#6E6257]">
            Rinkiniai
          </p>
          <h2
            className="mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-balance"
            style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
          >
            Kai reikia dovanos, o ne prekės.
          </h2>
        </div>

        <div className="mt-[clamp(40px,6vw,72px)] grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="min-w-0 overflow-hidden rounded-[10px] bg-[#FAF6F0]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-settle
              src="/demo/skalsa/flat.webp"
              alt="Žvakių asortimentas, degtukai ir lininis maišelis iš viršaus"
              width={1300}
              height={1242}
              decoding="async"
              loading="lazy"
              className="aspect-[13/12] h-auto w-full object-cover"
            />
          </div>

          <ul className="grid min-w-0 gap-6">
            {BUNDLES.map((b, i) => (
              <li
                key={b.id}
                data-rise
                style={{ "--i": i + 2 } as React.CSSProperties}
                className="min-w-0 rounded-[10px] border border-[rgba(36,30,25,0.13)] bg-[#FAF6F0] p-6 transition-[border-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:border-[rgba(36,30,25,0.34)] sm:p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className="min-w-0 text-[1.375rem] leading-tight tracking-[-0.02em] break-words"
                    style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
                  >
                    {b.name}
                  </h3>
                  <div className="shrink-0 text-right">
                    <span className="block text-[1.125rem] tabular-nums">
                      {eur(b.price)}
                    </span>
                    {b.note && (
                      <span className="mt-1 block text-[0.75rem] tabular-nums text-[#6E6257]">
                        {b.note}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-[1.6] text-pretty text-[#6E6257]">
                  {b.lead}
                </p>

                <ul className="mt-6 border-t border-[rgba(36,30,25,0.13)] pt-4">
                  {b.contains.map((c) => (
                    <li
                      key={c}
                      className="flex items-baseline gap-3 py-1.5 text-[0.9375rem] text-[#241E19]"
                    >
                      <span aria-hidden="true" className="mt-[2px] text-[#B4562F]">
                        <Check size={11} />
                      </span>
                      <span className="min-w-0 break-words">{c}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <AddToCart id={b.id} name={b.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
