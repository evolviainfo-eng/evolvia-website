import { CONTAINER } from "./ui";

const FACTS = ["Nuo 2009", "Kaunas ir apskritis", "40 objektų", "12 žmonių komanda"];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/demo/konstrukta/hero.webp"
        width={1800}
        height={1199}
        alt="Statybos aikštelė vakare: apšviestas besistatančio pastato karkasas ir kranas"
        decoding="async"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg,rgba(18,19,22,0.84) 0%,rgba(18,19,22,0.44) 34%,rgba(18,19,22,0.72) 72%,rgba(18,19,22,0.96) 100%)",
        }}
      />

      <div
        className={`${CONTAINER} flex min-h-[clamp(540px,78vh,840px)] flex-col justify-end pb-[clamp(36px,5vw,60px)] pt-[clamp(96px,16vw,180px)]`}
      >
        {/* No max-width here. `24ch` used to sit on this wrapper, where the
            `ch` unit resolves against the DIV's 16px font — 220px — which
            crushed a 70px headline into four short lines. The <br/> below
            already sets the break; the measure needs no help. */}
        <div data-rise>
          <p className="knst-mono text-[0.66rem] uppercase tracking-[0.22em] text-[#9A9791] sm:text-[0.7rem]">
            Generalinis rangovas · Kaunas
          </p>
          <h1 className="mt-6 text-[clamp(2.35rem,6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-[#E7E5E1]">
            Statome tai,
            <br />
            kas išlieka.
          </h1>
        </div>

        <p
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-7 max-w-[54ch] text-[1.02rem] leading-[1.6] text-[rgba(231,229,225,0.76)] sm:text-[1.08rem]"
        >
          Karkasinė ir mūrinė statyba, renovacija, vidaus apdaila. Vienas
          rangovas, vienas grafikas — nuo iškasos iki statybos užbaigimo akto.
        </p>

        <div
          data-rise
          style={{ "--i": 2 } as React.CSSProperties}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#samata"
            className="inline-flex h-12 items-center justify-center bg-[#E8B14C] px-7 text-[0.92rem] font-semibold tracking-[0.005em] text-[#121316] transition-[translate,background-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:bg-[#F2BE5F]"
          >
            Skaičiuoti sąmatą
          </a>
          <a
            href="#objektai"
            className="inline-flex h-12 items-center justify-center border border-white/[0.22] px-7 text-[0.92rem] text-[#E7E5E1] transition-[translate,border-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:border-white/60"
          >
            Peržiūrėti objektus
          </a>
        </div>
      </div>

      <div
        data-rise
        style={{ "--i": 3 } as React.CSSProperties}
        className="border-t border-white/[0.11]"
      >
        <ul
          className={`${CONTAINER} flex flex-wrap items-center gap-x-5 gap-y-1.5 py-3.5 sm:gap-x-8`}
        >
          {FACTS.map((f, i) => (
            <li
              key={f}
              className="knst-mono flex items-center gap-5 text-[0.64rem] uppercase tracking-[0.16em] text-[#9A9791] sm:gap-8 sm:text-[0.69rem]"
            >
              {i > 0 ? (
                <span aria-hidden className="hidden text-white/20 sm:inline">
                  ·
                </span>
              ) : null}
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
