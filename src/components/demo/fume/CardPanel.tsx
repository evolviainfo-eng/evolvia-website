"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { FumeCopy } from "@/i18n/dictionaries/lt/fume";
import { getFumeCopy } from "./copy";
import { Arrow, DISPLAY, UI } from "./Type";

/** "Šio vakaro kortelė": the page's one signature move.
 *
 *  The whole menu as a printed card (Da Maria's ruled frame and hairlines,
 *  in Fumé's charcoal and copper) handed over from the right, after
 *  Studenterkilden's dinner-menu panel:
 *
 *    scrim     fades in, 0.4s (out 0.3s)
 *    panel     clip-path inset(0 0 0 100%) to inset(0), 0.575s power3.out
 *    lines     every line of the card rises out of its own mask,
 *              translateY(110%) to 0, 0.75s power3.out, starting at 0.35s
 *              with 0.35s of stagger spread across all of them
 *    hairlines draw scaleX 0 to 1 from the centre, 0.6s, from 0.45s,
 *              0.06s apart
 *    close     Esc, the scrim or the close button: the panel wipes back to
 *              inset(0 0 0 100%) in 0.5s power3.in
 *
 *  All of it is CSS transitions on clip-path, transform and opacity, keyed
 *  on data-phase (FumePage's scope CSS, `.fc`). The per-line delays are
 *  computed here and written into the server HTML as --d, so the browser has
 *  nothing to measure or split at open time. Under reduced motion the
 *  transitions are removed: the card simply appears and disappears.
 *
 *  It opens from any link to #kortele (the hero, the nav, the short card in
 *  the menu section): one capturing click listener on window catches them
 *  before the site's smooth-scroll anchor handler would. Without JS the same
 *  links jump to this card, which MenuSection's <noscript> rules set inline
 *  in the page.
 *
 *  While open: role="dialog" with aria-modal, focus trapped inside, page
 *  scroll locked (SmoothScroll sees the lock and stops Lenis), focus handed
 *  back to the link that opened it. */

type Phase = "closed" | "open" | "closing";

const LINE_START = 0.35;
const LINE_SPREAD = 0.35;
const RULE_START = 0.45;
const RULE_STEP = 0.06;
const CLOSE_MS = 520;

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Line and hairline indexes, in reading order. Pure: the same copy always
 *  gives the same delays, on the server and in the browser. */
function layout(menu: FumeCopy["menu"]) {
  let line = 0;
  let rule = 0;
  const head = { label: line++, title: line++, rule: rule++ };
  const courses = menu.courses.map((c) => ({
    title: line++,
    note: line++,
    items: c.items.map(() => ({ row: line++, desc: line++ })),
    rule: rule++,
  }));
  const foot = { note: line++, book: line++ };
  return { head, courses, foot, lines: line };
}

const delay = (s: number) => ({ "--d": `${s.toFixed(3)}s` }) as CSSProperties;

/** One masked line. `as` keeps the markup valid inside headings and lists. */
function Line({
  d,
  children,
  className = "",
  maskClassName = "",
  as: Tag = "span",
}: {
  d: CSSProperties;
  children: ReactNode;
  className?: string;
  /** Room inside the mask, e.g. so a focus ring is not clipped. */
  maskClassName?: string;
  as?: "span" | "div";
}) {
  return (
    <Tag className={`fc-m ${maskClassName}`}>
      <Tag className={`fc-l ${className}`} style={d}>
        {children}
      </Tag>
    </Tag>
  );
}

/* True only in a hydrated browser. Without JS the card is set inline in the
   page (MenuSection's <noscript> rules), so it must not be hidden from
   assistive tech there; once the script runs it is a closed dialog. */
const noop = () => () => {};
function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CardPanel() {
  const { menu, card, price } = getFumeCopy(useLocale());
  const L = layout(menu);
  const lineD = (i: number) =>
    delay(LINE_START + (L.lines > 1 ? (i * LINE_SPREAD) / (L.lines - 1) : 0));
  const ruleD = (j: number) => delay(RULE_START + j * RULE_STEP);

  const [phase, setPhase] = useState<Phase>("closed");
  const hydrated = useHydrated();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const close = useCallback((returnFocus = true) => {
    setPhase((p) =>
      p === "open" ? (prefersReduced() ? "closed" : "closing") : p,
    );
    if (returnFocus) trigger.current?.focus({ preventScroll: true });
  }, []);

  /* Every link to #kortele opens the card. Capturing on window runs before
     SmoothScroll's anchor handler on document, which would otherwise try to
     scroll to a fixed element. Modified clicks are left to the browser. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href="#kortele"]');
      if (!link) return;
      e.preventDefault();
      e.stopPropagation();
      trigger.current = link as HTMLElement;
      setPhase("open");
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  /* Open: lock the page, trap focus, close on Esc. */
  useEffect(() => {
    if (phase !== "open") return;
    const panel = panelRef.current;
    if (!panel) return;

    const root = document.documentElement;
    const barWidth = window.innerWidth - root.clientWidth;
    const prevOverflow = root.style.overflow;
    const prevPadding = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (barWidth > 0) root.style.paddingRight = `${barWidth}px`;

    const focusTimer = window.setTimeout(
      () => closeRef.current?.focus({ preventScroll: true }),
      60,
    );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active ? panel.contains(active) : false;
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPadding;
    };
  }, [phase, close]);

  /* Closing: once the wipe has finished, the card is hidden again and its
     lines and hairlines drop back to their start, ready for the next open. */
  useEffect(() => {
    if (phase !== "closing") return;
    const t = window.setTimeout(() => setPhase("closed"), CLOSE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  /* "Rezervuoti stalą" inside the card: close it, then travel to the form
     once the page is unlocked (Lenis ignores scrollTo while stopped). */
  const toBooking = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    close(false);
    const go = () => {
      const target = document.getElementById("rezervacija");
      if (!target) return;
      const lenis = (
        window as unknown as {
          __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void };
        }
      ).__lenis;
      if (lenis) lenis.scrollTo(target, { duration: 1.1 });
      else target.scrollIntoView();
      target
        .querySelector<HTMLElement>('[tabindex="-1"]')
        ?.focus({ preventScroll: true });
    };
    window.requestAnimationFrame(() => window.requestAnimationFrame(go));
  };

  const open = phase !== "closed";

  return (
    <div
      id="kortele"
      className="fc"
      data-phase={phase}
      role={open ? "dialog" : undefined}
      aria-modal={phase === "open" ? true : undefined}
      aria-labelledby="kortele-title"
      aria-hidden={hydrated && !open ? true : undefined}
      inert={hydrated && !open}
    >
      <div aria-hidden className="fc-scrim" onClick={() => close()} />

      <div ref={panelRef} className="fc-panel" data-lenis-prevent>
        <div className="fume-frame m-3 min-h-[calc(100%-24px)] px-5 pb-14 pt-16 sm:m-5 sm:min-h-[calc(100%-40px)] sm:px-[clamp(36px,4.4vw,72px)] sm:pt-20">
          <button
            ref={closeRef}
            type="button"
            onClick={() => close()}
            aria-label={card.close}
            className="fc-close absolute right-2 top-2 grid h-11 w-11 place-items-center text-[#efe7dc] transition-opacity duration-300 hover:opacity-70 sm:right-4 sm:top-4"
          >
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path d="M3 3l14 14M17 3 3 17" />
            </svg>
          </button>

          <header className="text-center">
            <p className="fume-label">
              <Line d={lineD(L.head.label)}>{menu.eyebrow}</Line>
            </p>
            <h2
              id="kortele-title"
              className="fume-h2 mt-4 text-[clamp(1.5rem,2.4vw,2.125rem)]"
            >
              <Line d={lineD(L.head.title)}>{card.title}</Line>
            </h2>
            <span
              aria-hidden
              className="fc-r mx-auto mt-8 w-full"
              style={ruleD(L.head.rule)}
            />
          </header>

          {menu.courses.map((course, ci) => {
            const at = L.courses[ci];
            return (
              <section key={course.title} className="pt-10">
                <h3 className="fume-label text-center text-[0.9375rem] text-[#efe7dc]">
                  <Line d={lineD(at.title)}>{course.title}</Line>
                </h3>
                <p
                  className={`${DISPLAY} mt-1 text-center text-[1.125rem] italic text-[#c4b8a9]`}
                >
                  <Line d={lineD(at.note)}>{course.note}</Line>
                </p>

                <ul className="mt-6 space-y-4">
                  {course.items.map((it, ii) => (
                    <li key={it.n} className="min-w-0">
                      <Line as="div" d={lineD(at.items[ii].row)}>
                        <span className="flex items-baseline gap-x-3">
                          <span
                            className={`${DISPLAY} min-w-0 text-[1.1875rem] font-medium leading-[1.3] text-[#efe7dc]`}
                          >
                            {it.n}
                          </span>
                          <span
                            aria-hidden
                            className="fume-leader min-w-[1.5rem] flex-1"
                          />
                          <span
                            className={`${DISPLAY} shrink-0 text-right text-[1.1875rem] font-medium leading-[1.3] tabular-nums text-[#efe7dc]`}
                          >
                            {price(it.p)}
                          </span>
                        </span>
                      </Line>
                      <Line
                        as="div"
                        d={lineD(at.items[ii].desc)}
                        className={`${UI} mt-0.5 max-w-[44ch] text-[0.875rem] leading-[1.55] text-[#b9ad9f]`}
                      >
                        {it.d}
                      </Line>
                    </li>
                  ))}
                </ul>

                <span
                  aria-hidden
                  className="fc-r mx-auto mt-10 w-full"
                  style={ruleD(at.rule)}
                />
              </section>
            );
          })}

          <footer className="pt-10 text-center">
            <Line
              as="div"
              d={lineD(L.foot.note)}
              className={`${UI} mx-auto max-w-[46ch] text-pretty text-[0.875rem] leading-[1.65] text-[#b9ad9f]`}
            >
              {menu.footnote}
            </Line>
            <div className="mt-6">
              <Line as="div" d={lineD(L.foot.book)} maskClassName="fc-m--room">
                <a
                  href="#rezervacija"
                  onClick={toBooking}
                  className="fume-btn fume-btn--cu"
                >
                  <span>{card.book}</span>
                  <Arrow />
                </a>
              </Line>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
