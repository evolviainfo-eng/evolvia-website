"use client";

import { useShop } from "./ShopProvider";

const LINKS = [
  { href: "#katalogas", label: "Katalogas" },
  { href: "#rinkiniai", label: "Rinkiniai" },
  { href: "#dirbtuve", label: "Dirbtuvė" },
  { href: "#pristatymas", label: "Pristatymas" },
];

/** Lipni mini-antraštė. Sėdi tiksliai po Evolvia sąžiningumo juosta. */
export function SiteHeader() {
  const { count, openCart } = useShop();

  return (
    <header
      className="sticky z-[90] border-b border-[rgba(36,30,25,0.13)] bg-[#FAF6F0]/92 backdrop-blur-[10px]"
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
                  className="inline-block py-1 text-[0.88rem] text-[#6E6257] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#241E19]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <span className="hidden text-[0.8rem] text-[#6E6257] lg:inline">
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
            className="inline-flex h-10 items-center gap-2.5 rounded-full border border-[rgba(36,30,25,0.13)] bg-[#FAF6F0] pl-4 pr-2.5 text-[0.86rem] text-[#241E19] transition-[translate,border-color] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:border-[rgba(36,30,25,0.3)]"
          >
            Krepšelis
            <span
              aria-hidden="true"
              className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[0.74rem] tabular-nums transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] ${
                count > 0
                  ? "bg-[#B4562F] text-[#FAF6F0]"
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
