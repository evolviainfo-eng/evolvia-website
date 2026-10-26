"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getFumeCopy } from "./copy";
import { DISPLAY, HAIRLINE, RULE } from "./Type";

/** `key` picks the link's word from the copy, `id` is the section that
 *  underlines it. "Meniu" opens the menu card (CardPanel catches every
 *  href="#kortele"); without JS it jumps to the same card in the page. */
const LINKS = [
  { href: "#kortele", id: "meniu", key: "menu" },
  { href: "#vynas", id: "vynas", key: "wine" },
  { href: "#erdve", id: "erdve", key: "space" },
  { href: "#kontaktai", id: "kontaktai", key: "contact" },
] as const;

const IDS = LINKS.map((l) => l.id);

/** Zimmerl's bar: a monogram in a thin copper ring on the left, the four
 *  links in small spaced capitals in the middle, the copper booking button
 *  on the right. Fixed under Evolvia's honesty bar (--demo-bar-h).
 *
 *  Over the hero it is only its own type; once the page has moved it takes
 *  the charcoal ground and a copper hairline (no backdrop blur). It slides
 *  away on the way down and comes back after 30px on the way up
 *  (Studenterkilden: out in 1s, back in 0.35s), and never hides near the top,
 *  under reduced motion, or while a link inside it has focus.
 *
 *  On a phone the four links collapse to the one that matters there, the
 *  menu card, beside the booking button. */
export function Nav() {
  const copy = getFumeCopy(useLocale()).nav;
  const [lifted, setLifted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let last = window.scrollY;
    let up = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      setLifted(y > 24);
      if (reduce || y < 160) {
        up = 0;
        setHidden(false);
        return;
      }
      if (dy > 0) {
        up = 0;
        setHidden(true);
      } else if (dy < 0) {
        up -= dy;
        if (up > 30) setHidden(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = IDS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => n !== null,
    );
    if (nodes.length === 0) return;

    const shown = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) shown.add(e.target.id);
          else shown.delete(e.target.id);
        }
        setActive(IDS.find((id) => shown.has(id)) ?? null);
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label={copy.label}
      data-hidden={hidden || undefined}
      className={`fume-nav fixed inset-x-0 z-50 border-b ${
        lifted ? "bg-[#1b1714]" : "bg-transparent"
      }`}
      style={{
        top: "var(--demo-bar-h)",
        borderColor: lifted ? HAIRLINE : "transparent",
      }}
    >
      <div className="mx-auto grid h-[64px] max-w-[1240px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:h-[76px] sm:px-8">
        <a
          href="#top"
          aria-label="Fumé"
          className={`${DISPLAY} grid h-11 w-11 place-items-center rounded-full border text-[1.375rem] font-light leading-none text-[#efe7dc] transition-opacity duration-300 hover:opacity-75`}
          style={{ borderColor: RULE }}
        >
          <span aria-hidden className="translate-y-[-1px]">
            F
          </span>
        </a>

        <ul className="hidden items-center justify-center gap-[clamp(28px,3vw,48px)] lg:flex">
          {LINKS.map((l) => {
            const on = active === l.id;
            return (
              <li key={l.key}>
                <a
                  href={l.href}
                  aria-current={on ? "location" : undefined}
                  className={`fume-navlink fume-label fume-link transition-colors duration-300 ${
                    on ? "text-[#efe7dc]" : ""
                  }`}
                >
                  {copy.links[l.key]}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="col-start-3 flex items-center gap-4 sm:gap-6">
          <a
            href="#kortele"
            className="fume-label fume-link inline-flex h-11 items-center transition-colors duration-300 lg:hidden"
          >
            {copy.links.menu}
          </a>
          <a href="#rezervacija" className="fume-btn fume-btn--cu fume-btn--sm">
            <span>{copy.book}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
