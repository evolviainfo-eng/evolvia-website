import { AddToCart } from "./AddToCart";
import { PRODUCTS, eur } from "./data";

/* Pirmas katalogo įrašas keliauja ir į nuotraukos kortelę — kaina ir
   pavadinimas imami iš to paties šaltinio, todėl nesusimaišys. */
const FEATURED = PRODUCTS[0];

const FACTS = ["Sojų vaškas", "45 val. degimo", "Liejama Vilniuje"];

export function Hero() {
  return (
    <section className="relative">
      <span id="virsus" aria-hidden="true" className="absolute -top-[30px]" />
      <div className="mx-auto max-w-[1180px] px-5 pb-[clamp(56px,7vw,96px)] pt-[clamp(52px,7vw,96px)] sm:px-8">
        <div className="grid gap-y-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-x-16">
          <div className="min-w-0">
            <p
              data-rise
              className="text-[0.75rem] uppercase tracking-[0.16em] text-[#6E6257]"
            >
              Rankų darbo žvakės · liejame Vilniuje
            </p>
            <h1
              className="mt-5 text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.035em] text-balance text-[#241E19]"
              style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
            >
              <span
                data-line
                style={{ "--i": 1 } as React.CSSProperties}
                className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
              >
                <span>Vakaras, kuris</span>
              </span>
              <span
                data-line
                style={{ "--i": 2 } as React.CSSProperties}
                className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
              >
                <span>kvepia namais.</span>
              </span>
            </h1>
          </div>

          <div
            data-rise
            style={{ "--i": 3 } as React.CSSProperties}
            className="min-w-0 lg:pb-2"
          >
            <p className="max-w-[46ch] text-[1.0625rem] leading-[1.65] text-pretty text-[#6E6257]">
              Sojų vaškas, medvilninis dagtis ir perdirbtas stiklas. Liejame
              mažomis partijomis, todėl žvakė dega ilgai, tolygiai ir be aitraus
              dūmo.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#katalogas"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-[#241E19] pl-7 pr-6 text-[0.9375rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:bg-[#3A3129] active:translate-y-0"
              >
                Apsipirkti
                <Arrow />
              </a>
              <a
                href="#dirbtuve"
                className="inline-flex h-12 items-center rounded-full border border-[rgba(36,30,25,0.13)] px-7 text-[0.9375rem] text-[#241E19] transition-[background-color,border-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:border-[rgba(36,30,25,0.34)] hover:bg-[#F1EAE0] active:translate-y-0"
              >
                Kaip liejame
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[rgba(36,30,25,0.13)] pt-5 text-[0.75rem] uppercase tracking-[0.14em] text-[#6E6257]">
              {FACTS.map((f, i) => (
                <li key={f} className="flex items-center gap-5">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-3 w-px bg-[rgba(36,30,25,0.13)] sm:block"
                    />
                  )}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-rise
          style={{ "--i": 4, "--rise-y": "28px" } as React.CSSProperties}
          className="relative mt-[clamp(36px,5vw,64px)] overflow-hidden rounded-[10px] bg-[#F1EAE0]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-settle
            src="/demo/skalsa/hero.webp"
            alt="Trys degančios sojų vaško žvakės ant medinio stalo"
            width={1800}
            height={1286}
            decoding="async"
            loading="eager"
            fetchPriority="high"
            className="aspect-[7/5] h-auto w-full object-cover md:aspect-[16/9]"
          />

          {/* Greitas kelias į krepšelį tiesiai iš nuotraukos — tas pats
              mygtukas, ta pati kaina kaip kataloge. */}
          <div className="absolute bottom-5 left-5 right-5 hidden max-w-[21rem] items-center justify-between gap-4 rounded-[10px] border border-[rgba(36,30,25,0.13)] bg-[#FAF6F0]/94 px-5 py-4 backdrop-blur-[6px] md:flex">
            <div className="min-w-0">
              <p
                className="truncate text-[0.9375rem] leading-tight tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
              >
                {FEATURED.name}
              </p>
              <p className="mt-1 text-[0.8125rem] tabular-nums text-[#6E6257]">
                {eur(FEATURED.price)} · {FEATURED.burn} val.
              </p>
            </div>
            <AddToCart id={FEATURED.id} name={FEATURED.name} variant="quiet" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Rodyklė, kuri paspaudžiant pastumiama — mygtuko atsakas, ne dekoras. */
function Arrow() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-x-[3px]"
    >
      <path
        d="M1 5h11.4M8.7 1.2 12.5 5 8.7 8.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
