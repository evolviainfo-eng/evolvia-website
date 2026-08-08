"use client";

import { useEffect, useState } from "react";
import { useShop } from "./ShopProvider";

/* Aktyvi ir užvesta nuoroda naudoja tą patį brūkšnį — būsena atrodo kaip
   gestas, kurį pelė ką tik padarė. Mastelis nurodomas iškviečiant, kad
   dvi taisyklės tam pačiam `after:scale-x` niekada nesivaržytų. */
const NAV =
  "relative inline-block py-1 text-[0.875rem] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-[#241E19] after:transition-transform after:duration-[var(--d-ui)] after:ease-[var(--e-out)] hover:text-[#241E19] hover:after:scale-x-100";

const LINKS = [
  { href: "#katalogas", id: "katalogas", label: "Katalogas" },
  { href: "#rinkiniai", id: "rinkiniai", label: "Rinkiniai" },
  { href: "#dirbtuve", id: "dirbtuve", label: "Dirbtuvė" },
  { href: "#pristatymas", id: "pristatymas", label: "Pristatymas" },
];

/** Lipni mini-antraštė. Sėdi tiksliai po Evolvia sąžiningumo juosta.
 *
 *  Du dalykai seka slinkimą viename klausytojuje: ar antraštė jau atsiplėšusi
 *  nuo puslapio viršaus (tada gauna šešėlį) ir kuri sekcija šiuo metu po ja.
 *  Aktyvi nuoroda pasižymi ta pačia linija, kurią hover'is nubrėžia — būsena
 *  ir gestas sutampa, todėl nieko naujo mokytis nereikia.
 */
export function SiteHeader() {
  const { count, openCart } = useShop();
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setStuck(window.scrollY > 8);
      const mid = window.innerHeight * 0.34;
      let current = "";
      document.querySelectorAll<HTMLElement>("[data-sk-sec]").forEach((el) => {
        if (el.getBoundingClientRect().top <= mid) current = el.dataset.skSec ?? "";
      });
      setActive(current);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      /* The separation is the scroll edge and a shadow, not a rule — the
         `.chrome` fade does the work the border used to do. */
      className={`chrome sticky z-[90] transition-[box-shadow] duration-[var(--d-ui)] ease-[var(--e-out)] ${
        stuck ? "shadow-[0_10px_30px_-24px_rgba(36,30,25,0.7)]" : "shadow-none"
      }`}
      style={{ top: "var(--demo-bar-h)" }}
    >
      <div className="mx-auto flex h-[58px] max-w-[1180px] items-center gap-4 px-5 sm:h-[66px] sm:gap-8 sm:px-8">
        <a
          href="#virsus"
          className="shrink-0 text-[1.22rem] leading-none tracking-[-0.01em] text-[#241E19] sm:text-[1.32rem]"
          style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
        >
          Skalsa
        </a>

        <nav aria-label="Pagrindinė" className="hidden min-w-0 flex-1 md:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`${NAV} ${
                    active === l.id
                      ? "text-[#241E19] after:scale-x-100"
                      : "text-[#6E6257] after:scale-x-0"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <span className="hidden text-[0.8125rem] text-[#6E6257] lg:inline">
            Nemokamas pristatymas nuo 40 €
          </span>
          <button
            type="button"
            onClick={openCart}
            aria-label={
              count > 0
                ? `Atidaryti krepšelį — prekių: ${count}`
                : "Atidaryti krepšelį — tuščias"
            }
            className="group press inline-flex h-10 items-center gap-2.5 rounded-full border border-[rgba(36,30,25,0.13)] bg-[#FAF6F0] pl-3.5 pr-2.5 text-[0.875rem] text-[#241E19] transition-[background-color,border-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:border-[rgba(36,30,25,0.34)] hover:bg-[#F1EAE0] active:translate-y-0"
          >
            <Bag />
            <span className="hidden sm:inline">Krepšelis</span>
            {/* `key` pririštas prie skaičiaus: pasikeitus jam ženkliukas
                persimontuoja ir krūpteli. Jokios būsenos tam nereikia. */}
            <span
              key={count}
              aria-hidden="true"
              className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[0.75rem] tabular-nums transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] ${
                count > 0
                  ? "sk-pop bg-[#B4562F] text-[#FAF6F0]"
                  : "bg-[#F1EAE0] text-[#6E6257]"
              }`}
            >
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

/** Krepšelio ženklas — piešiamas, nes šriftuose tokio rašmens nėra. */
function Bag() {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 opacity-70 transition-opacity duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:opacity-100"
    >
      <path
        d="M1.6 5.2h11.8l-.9 9.2H2.5L1.6 5.2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M5.1 6.9V4.3a2.4 2.4 0 0 1 4.8 0v2.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
