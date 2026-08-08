"use client";

import { useEffect, useState } from "react";
import { HAIRLINE } from "./Type";

const LINKS = [
  { href: "#meniu", label: "Meniu" },
  { href: "#vynas", label: "Vynas" },
  { href: "#erdve", label: "Erdvė" },
  { href: "#kontaktai", label: "Kontaktai" },
];

const IDS = LINKS.map((l) => l.href.slice(1));

/** Sticky, but offset below Evolvia's honesty bar (--demo-bar-h) so the two
 *  never overlap. No hamburger: on small screens the links collapse to the one
 *  action that matters.
 *
 *  Two pieces of state, both cheap. Over the hero the bar is nothing but its
 *  own type — the photograph is dark enough to carry it — and it only takes on
 *  a surface once the page has actually moved. The blur is applied with it,
 *  never before: `backdrop-filter` over a transparent bar would smear a band
 *  across the top of the hero photograph.
 *
 *  The current section is read from a 4%-tall band across the middle of the
 *  viewport, so the underline changes over exactly when the eye does. */
export function Nav() {
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
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
      aria-label="Pagrindinė navigacija"
      /* The material arrives on lift, same as the site header: at the top of
         a demo there is nothing behind the bar worth blurring. */
      className={`sticky z-50 transition-opacity duration-[var(--d-ui)] ease-[var(--e-out)] ${
        lifted ? "chrome" : "bg-transparent"
      }`}
      style={{ top: "var(--demo-bar-h)" }}
    >
      <div className="mx-auto flex h-[58px] max-w-[1240px] items-center gap-4 px-5 sm:h-[66px] sm:px-8">
        <a
          href="#top"
          className="shrink-0 font-[family-name:var(--font-fume-display)] text-[1.25rem] font-light leading-none tracking-[0.02em] text-[#ede6da] transition-opacity duration-[var(--d-tap)] ease-[var(--e-out)] hover:opacity-70 active:opacity-100"
        >
          Fumé
        </a>

        <ul className="ml-auto hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const on = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={on ? "location" : undefined}
                  className={`fume-navlink font-[family-name:var(--font-fume-ui)] text-[0.8125rem] tracking-[0.04em] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#ede6da] ${
                    on ? "text-[#ede6da]" : "text-[#9c948a]"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#rezervacija"
          className="ml-auto inline-flex h-9 shrink-0 items-center rounded-[2px] border px-4 font-[family-name:var(--font-fume-ui)] text-[0.8125rem] tracking-[0.06em] text-[#ede6da] transition-[border-color,background-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:border-[#ede6da] hover:bg-[rgba(237,230,218,0.06)] active:translate-y-0 md:ml-8"
          style={{ borderColor: HAIRLINE }}
        >
          Rezervuoti
        </a>
      </div>
    </nav>
  );
}
