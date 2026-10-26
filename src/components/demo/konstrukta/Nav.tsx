"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getKonstruktaCopy } from "./copy";

/** The sections the links jump to, in order. Labels live in the dictionary
 *  under the same ids. */
const LINKS = ["paslaugos", "objektai", "eiga", "samata", "kontaktai"] as const;

const EASE = "cubic-bezier(.4,0,.6,1)";

/** Haven's header. Three parts:
 *
 *  - Logo top-left and the estimate link top-right (768px and up). They sit
 *    at the top of the document and scroll away with it.
 *  - A light grey bar, centred, fixed under Evolvia's honesty bar: "Menu"
 *    and two hairlines. It is the only thing that stays. Opening it unfolds
 *    a panel downward from the bar (clip-path), the two lines cross.
 *  - Below 768px the bar spans the gutter and carries the logo too; the
 *    menu opens as a full-screen sheet and the page behind it stops.
 *
 *  Escape, a link, or a click outside closes it. */
export function KonstruktaNav() {
  const copy = getKonstruktaCopy(useLocale());
  const c = copy.nav;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  /* "top": at the top of the page, the bar alone (Haven's opening).
     "shown": scrolled, coming back up: bar on a white strip with a hairline.
     "hidden": scrolling down: bar and strip slide away so nothing covers
     the content. */
  const [mode, setMode] = useState<"top" | "shown" | "hidden">("top");

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const read = () => {
      raf = 0;
      const y = window.scrollY;
      const d = y - last;
      if (y < 24) setMode("top");
      else if (d > 6) setMode("hidden");
      else if (d < -6) setMode("shown");
      if (Math.abs(d) > 6 || y < 24) last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const phone = window.matchMedia("(max-width: 767px)").matches;
    /* The phone sheet covers the page, so the page stops scrolling. The
       site's smooth scroller watches this lock and pauses itself. */
    if (phone) html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      if (phone) html.style.overflow = "";
    };
  }, [open]);

  /* A link was chosen. The scroll lock comes off synchronously, before the
     smooth scroller's own click handler runs, so the jump is not swallowed
     by a stopped scroller. */
  const pick = () => {
    document.documentElement.style.overflow = "";
    setOpen(false);
  };

  return (
    <>
      {/* Logo and estimate link: in the document, so they scroll away. */}
      <header
        className="absolute inset-x-0 z-30 hidden md:block"
        style={{ top: "var(--demo-bar-h)" }}
      >
        <div className="mx-auto flex h-[88px] w-full max-w-[1760px] items-center justify-between px-[var(--k-g)]">
          <a
            href="#top"
            className="text-[1.375rem] font-medium leading-none tracking-[-0.03em] text-[#0C388D] transition-opacity duration-[var(--d-tap)] ease-[var(--e-out)] hover:opacity-70"
          >
            Konstrukta
          </a>
          <a href="#samata" className="k-link">
            {copy.hero.primary}
          </a>
        </div>
      </header>

      {/* The white strip behind the bar once the page has scrolled: the
          bar never floats over text or a photograph. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 z-40 h-[80px] border-b border-[#E2E2E2] bg-[#FFFFFF] motion-reduce:transition-none md:h-[92px]"
        style={{
          top: "var(--demo-bar-h)",
          opacity: mode === "shown" ? 1 : 0,
          transform: mode === "hidden" ? "translateY(-100%)" : "none",
          transition: `transform .45s ${EASE}, opacity .3s ${EASE}`,
        }}
      />

      {/* The fixed bar and its panel. */}
      <div
        ref={barRef}
        className="fixed left-[var(--k-g)] right-[var(--k-g)] z-50 top-[calc(var(--demo-bar-h)+18px)] motion-reduce:transition-none md:left-1/2 md:right-auto md:top-[calc(var(--demo-bar-h)+24px)] md:w-[320px] md:-ml-[160px] lg:-ml-[198px] lg:w-[396px]"
        style={{
          transform:
            mode === "hidden" && !open
              ? "translateY(calc(-100% - 32px))"
              : "none",
          transition: `transform .45s ${EASE}`,
        }}
      >
        <nav aria-label={c.label}>
          <div className="relative z-10 flex h-11 items-center rounded-[4px] bg-[#F5F5F5]">
            <a
              href="#top"
              onClick={pick}
              className="pl-4 text-[1.0625rem] font-medium leading-none tracking-[-0.03em] text-[#0C388D] md:hidden"
            >
              Konstrukta
            </a>
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="ml-auto flex h-full min-w-0 items-center gap-6 px-4 text-[0.9375rem] leading-none text-[#111111] md:ml-0 md:w-full md:justify-between"
            >
              <span>{c.menu}</span>
              <span aria-hidden className="relative block h-[7px] w-10 md:w-[60px]">
                <span
                  className="absolute left-0 top-0 block h-px w-full bg-[#111111] motion-reduce:transition-none"
                  style={{
                    transform: open
                      ? "translateY(3px) rotate(10deg)"
                      : "none",
                    transition: `transform .45s ${EASE}`,
                  }}
                />
                <span
                  className="absolute bottom-0 left-0 block h-px w-full bg-[#111111] motion-reduce:transition-none"
                  style={{
                    transform: open
                      ? "translateY(-3px) rotate(-10deg)"
                      : "none",
                    transition: `transform .45s ${EASE}`,
                  }}
                />
              </span>
            </button>
          </div>

          {/* Panel. Desktop: unfolds under the bar, the bar's own width.
              Phone: a full-screen sheet behind the bar. Hidden with
              visibility once closed, so its links leave the tab order. */}
          <div
            id={panelId}
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 top-[var(--demo-bar-h)] overflow-y-auto bg-[#F5F5F5] px-[var(--k-g)] pb-10 pt-[88px] motion-reduce:transition-none md:absolute md:inset-x-0 md:bottom-auto md:top-[calc(100%-4px)] md:rounded-b-[4px] md:px-4 md:pb-5 md:pt-4"
            style={{
              clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
              visibility: open ? "visible" : "hidden",
              transition: open
                ? `clip-path .5s ${EASE}`
                : `clip-path .4s ${EASE}, visibility 0s linear .4s`,
            }}
          >
            <ul className="border-t border-[#E2E2E2]">
              {LINKS.map((id, i) => (
                <li
                  key={id}
                  className="border-b border-[#E2E2E2] motion-reduce:transition-none"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(10px)",
                    transition: `opacity .4s ${EASE} ${open ? 0.12 + i * 0.05 : 0}s, transform .4s ${EASE} ${open ? 0.12 + i * 0.05 : 0}s`,
                  }}
                >
                  <a
                    href={`#${id}`}
                    onClick={pick}
                    className="flex min-h-12 items-center py-3 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-[#111111] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:text-[#0C388D] md:min-h-11 md:py-2 md:text-[1.375rem]"
                  >
                    {c.links[id]}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#samata"
              onClick={pick}
              className="k-btn mt-8 w-full md:mt-5"
            >
              {c.ctaLong}
              <span aria-hidden className="k-arrow">
                →
              </span>
            </a>
            <p className="mt-6 text-[0.875rem] leading-[1.5] text-[#5E5E5E] md:hidden">
              {copy.footer.contacts}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
