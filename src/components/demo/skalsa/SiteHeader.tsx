"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getSkalsaCopy } from "./copy";
import { useShop } from "./ShopProvider";

/* Nuorodų tekstai žodyne, po tuo pačiu `id`. */
const LINKS = [
  { href: "#katalogas", id: "katalogas" },
  { href: "#rinkiniai", id: "rinkiniai" },
  { href: "#dirbtuve", id: "dirbtuve" },
  { href: "#pristatymas", id: "pristatymas" },
] as const;

const NAV =
  "sk-nav inline-flex h-11 items-center px-2 underline-offset-[.3em] decoration-1 transition-opacity duration-150 hover:underline xl:px-3";

/** The shop's header: a real bar on the ground colour, never a strip
 *  floating over photographs. Left: the four section links (only
 *  "Katalogas" below 1280 px). Centre: the wordmark in the serif, always
 *  brown on the ground. Right: the basket, the one solid brown button,
 *  with its count.
 *
 *  It takes its own height (--sk-head) so nothing ever sits under it, and
 *  it gets out of the way while reading: it slides up on scroll down and
 *  comes back on any scroll up, near the top, or when focus enters it.
 *  One passive scroll listener (rAF-throttled), removed on unmount; the
 *  slide is a transform, and under reduced motion it simply jumps. */
export function SiteHeader() {
  const { count, openCart } = useShop();
  const locale = useLocale();
  const t = getSkalsaCopy(locale).header;
  const [hidden, setHidden] = useState(false);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    let last = window.scrollY;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - last;
      if (Math.abs(dy) < 6) return;
      const focused = bar.current?.contains(document.activeElement) ?? false;
      setHidden(dy > 0 && y > 240 && !focused);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    const onFocus = () => setHidden(false);
    const header = bar.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    header?.addEventListener("focusin", onFocus);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      header?.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <header
      ref={bar}
      className={`sticky z-[90] h-[var(--sk-head)] border-b border-[rgba(90,42,30,0.12)] bg-[#F2EFEA] text-[#5A2A1E] transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none ${
        hidden ? "-translate-y-[calc(100%+var(--demo-bar-h))]" : "translate-y-0"
      }`}
      style={{ top: "var(--demo-bar-h)" }}
    >
      <div className="relative flex h-full items-center justify-between gap-4 px-[30px] lg:px-[60px]">
        <nav aria-label={t.navLabel} className="-ml-2 flex min-w-0 items-center">
          <a href="#katalogas" className={`${NAV} xl:hidden`}>
            {t.links.katalogas}
          </a>
          <ul className="hidden items-center xl:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={NAV}>
                  {t.links[l.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#virsus"
          aria-label="Skalsa"
          className="sk-serif absolute left-1/2 top-1/2 inline-flex h-11 -translate-x-1/2 -translate-y-1/2 items-center px-2 text-[1.625rem] leading-none transition-opacity duration-150 hover:opacity-70 lg:text-[1.875rem]"
        >
          Skalsa
        </a>

        <button
          type="button"
          onClick={openCart}
          aria-label={t.openBasket(count)}
          className="sk-solid h-11 gap-2.5 px-4"
        >
          <span className="sm:hidden">
            <Bag />
          </span>
          <span className="hidden sm:inline">{t.basket}</span>
          {/* `key` pririštas prie skaičiaus: pasikeitus jam skaičius
              persimontuoja ir krūpteli. Jokios būsenos tam nereikia. */}
          <span
            key={count}
            aria-hidden="true"
            className={`inline-block min-w-[1ch] text-center tabular-nums ${count > 0 ? "sk-pop" : ""}`}
          >
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}

/** Krepšelio ženklas, piešiamas, nes šriftuose tokio rašmens nėra. */
function Bag() {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="block shrink-0"
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
