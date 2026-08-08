import { AddToCart } from "./AddToCart";
import { PRODUCTS, eur } from "./data";

export function Catalog() {
  return (
    <section
      data-sk-sec="katalogas"
      className="relative border-t border-[rgba(36,30,25,0.13)]"
    >
      <span id="katalogas" aria-hidden="true" className="absolute -top-[30px]" />
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
        <div data-rise className="max-w-[52ch]">
          <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[#6E6257]">
            Katalogas
          </p>
          <h2
            className="mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.08] text-balance"
            style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
          >
            Šeši kvapai. Vienas vaškas.
          </h2>
          <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-[1.65] text-pretty text-[#6E6257]">
            Kvapą deriname taip, kad jis neužgožtų kambario, o tik pailgintų
            vakarą. Visos žvakės pilamos į perdirbamą stiklą — indą galima
            išplauti ir naudoti toliau.
          </p>
        </div>

        <ul className="mt-[clamp(40px,6vw,72px)] grid gap-x-6 gap-y-[clamp(40px,5vw,64px)] sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <li
              key={p.id}
              data-rise
              style={{ "--i": i % 3 } as React.CSSProperties}
              className="group flex min-w-0 flex-col"
            >
              <div className="overflow-hidden rounded-[10px] bg-[#F1EAE0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  decoding="async"
                  loading="lazy"
                  className="aspect-square h-auto w-full object-cover transition-[scale] duration-[var(--d-el)] ease-[var(--e-out)] group-hover:scale-[1.04]"
                />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3
                  className="min-w-0 text-[1.0625rem] leading-tight tracking-[-0.015em] break-words"
                  style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
                >
                  {p.name}
                </h3>
                <span className="shrink-0 text-[1rem] tabular-nums">
                  {eur(p.price)}
                </span>
              </div>

              <p className="mt-2 flex-1 max-w-[38ch] text-[0.9375rem] leading-[1.55] text-pretty text-[#6E6257]">
                {p.scent}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-4 border-t border-[rgba(36,30,25,0.13)] pt-5">
                <p className="text-[0.75rem] uppercase tracking-[0.14em] text-[#6E6257]">
                  {p.burn} val. · {p.weight} g
                </p>
                <AddToCart id={p.id} name={p.name} variant="quiet" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
