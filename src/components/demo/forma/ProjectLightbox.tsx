"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  HAIR,
  MUTED,
  SERIF,
  T_BODY,
  T_META,
  T_NUM,
} from "@/components/demo/forma/tokens";

export type FormaProjectKind = "butas" | "namas" | "komercine";

export interface FormaProject {
  id: string;
  title: string;
  kind: FormaProjectKind;
  kindLabel: string;
  area: string;
  year: string;
  place: string;
  scope: string;
  note: string;
  src: string;
  w: number;
  h: number;
  alt: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Keys that would scroll the page behind the dialog. Arrow left/right are
 *  handled separately — they navigate the gallery. */
const SCROLL_KEYS = new Set([
  " ",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  "ArrowUp",
  "ArrowDown",
]);

const FOCUSABLE =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

/** Every control in here is the same object: a paper disc that fills with ink.
 *  Stated once so the close, the arrows and any future control cannot drift
 *  apart. Size and shape only carry a colour that no call site overrides. */
const CONTROL =
  "pointer-events-auto inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[rgba(26,25,23,0.18)] transition-[background-color,color,border-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[#1A1917] hover:bg-[#1A1917] hover:text-[#F4F1EC] active:translate-y-px disabled:pointer-events-none disabled:border-[rgba(26,25,23,0.10)] disabled:text-[rgba(26,25,23,0.28)]";

/** Full-screen project view.
 *
 *  The only place in this demo that uses `--e-mass`: the panel travels the
 *  whole viewport, so the heavier curve is earned. Everything else on the page
 *  stays on `--e-out`.
 *
 *  Scroll lock: Lenis owns the page scroll and its instance is not exposed, so
 *  toggling `overflow:hidden` would clamp the scroll position to 0 and drop the
 *  visitor at the top of the page on close. Instead the wheel/touch stream is
 *  swallowed in the capture phase (before Lenis' own window listener sees it)
 *  and `data-lenis-prevent` keeps Lenis out of the overlay entirely. Nothing
 *  moves, nothing is restored, nothing can jump.
 */
export function ProjectLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: FormaProject[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const titleId = useId();

  const project = items[index];
  const many = items.length > 1;

  const requestClose = useCallback(() => setLeaving(true), []);

  const go = useCallback(
    (delta: number) => {
      if (!many) return;
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, many, onNavigate],
  );

  /* enter — two frames so the closed state is painted before it transitions */
  useEffect(() => {
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setShown(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, []);

  /* leave — unmount only once the panel has finished travelling */
  useEffect(() => {
    if (!leaving) return;
    const el = panelRef.current;
    if (!el) {
      onClose();
      return;
    }
    // transitionend bubbles — a button's own hover transition finishing must
    // not be mistaken for the panel having left
    const done = (e: TransitionEvent) => {
      if (e.target !== el || e.propertyName !== "opacity") return;
      onClose();
    };
    el.addEventListener("transitionend", done);
    // safety net: under reduced motion the transition collapses to ~0ms and
    // fires normally, but a suppressed transition must never strand the dialog
    const fallback = window.setTimeout(onClose, 700);
    return () => {
      el.removeEventListener("transitionend", done);
      window.clearTimeout(fallback);
    };
  }, [leaving, onClose]);

  /* focus starts inside the dialog */
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  /* Warm the neighbours. A gallery that flashes paper between two pictures
     reads as a slideshow; decoding the next and previous frames while the
     visitor is still looking at this one removes that entirely, and costs
     nothing on a page that has already fetched the thumbnails. */
  useEffect(() => {
    if (items.length < 2) return;
    const next = items[(index + 1) % items.length];
    const prev = items[(index - 1 + items.length) % items.length];
    for (const it of Array.from(new Set([next, prev]))) {
      const img = new Image();
      img.decoding = "async";
      img.src = it.src;
    }
  }, [index, items]);

  /* scroll lock. One exception: the height-capped project note, which on a
     short viewport is the only thing in here with its own overflow. It is
     marked `data-lb-scroll` so the capture-phase lock lets that gesture reach
     it; `overscroll-contain` on the element stops the chain at its own edges,
     so the page still cannot move. */
  useEffect(() => {
    const inOwnScroller = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      const el = target.closest<HTMLElement>("[data-lb-scroll]");
      return !!el && el.scrollHeight > el.clientHeight;
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // leave pinch-zoom alone
      if (inOwnScroller(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return; // leave pinch-zoom alone
      if (inOwnScroller(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchmove", onTouchMove, true);
    };
  }, []);

  /* keyboard: escape, arrows, focus trap, dead scroll keys */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
        return;
      }
      if (SCROLL_KEYS.has(e.key)) {
        e.preventDefault();
        return;
      }
      if (e.key !== "Tab") return;

      const root = panelRef.current;
      if (!root) return;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = !!active && root.contains(active);
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [go, requestClose]);

  if (!project) return null;

  const active = shown && !leaving;

  const panelStyle: CSSProperties = {
    paddingTop: "var(--demo-bar-h)",
    opacity: active ? 1 : 0,
    transform: active ? "none" : "translate3d(0, 3vh, 0) scale(0.985)",
    transitionProperty: "opacity, transform",
    transitionDuration: "var(--d-el)",
    transitionTimingFunction: "var(--e-mass)",
  };

  return (
    <div
      className="fixed inset-0 z-[150]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
    >
      <div
        aria-hidden="true"
        onClick={requestClose}
        className="absolute inset-0 bg-[rgba(244,241,236,0.97)] backdrop-blur-[8px] transition-opacity duration-[var(--d-ui)] ease-[var(--e-out)]"
        style={{ opacity: active ? 1 : 0 }}
      />

      {/* The panel sits on top of the backdrop, so it is transparent to the
          pointer and only its real parts opt back in — that way a click on any
          empty area of the overlay reaches the backdrop and closes. */}
      <div
        ref={panelRef}
        style={panelStyle}
        className="pointer-events-none relative flex h-full w-full flex-col text-[#1A1917]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4">
          <span
            className={`pointer-events-auto ${T_NUM}`}
            style={{ color: MUTED }}
          >
            {pad(index + 1)} / {pad(items.length)}
          </span>

          {/* The film strip. It is the only place the whole filtered set is
              visible at once, so it doubles as the position indicator and as
              the way back to a picture already seen. */}
          {many && (
            <div
              role="group"
              aria-label="Peržiūros kadrai"
              className="pointer-events-auto hidden items-center gap-1.5 sm:flex"
            >
              {items.map((it, i) => {
                const on = i === index;
                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => onNavigate(i)}
                    aria-current={on ? "true" : undefined}
                    aria-label={`Rodyti projektą ${it.title}`}
                    className="group inline-flex h-8 items-center px-0.5"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-[2px] transition-[width,background-color] duration-[var(--d-ui)] ease-[var(--e-out)] ${
                        on
                          ? "w-8 bg-[#1A1917]"
                          : "w-4 bg-[rgba(26,25,23,0.28)] group-hover:bg-[rgba(26,25,23,0.6)]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          <button
            ref={closeRef}
            type="button"
            onClick={requestClose}
            aria-label="Uždaryti projekto peržiūrą"
            className={`${CONTROL} gap-2.5 px-4 text-[0.82rem] tracking-[0.04em]`}
          >
            <span className="hidden sm:inline">Uždaryti</span>
            <span aria-hidden="true" className="text-[1.05rem] leading-none">
              ✕
            </span>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center px-5 sm:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={project.id}
            src={project.src}
            width={project.w}
            height={project.h}
            alt={project.alt}
            decoding="async"
            loading="eager"
            /* `min()` and not a bare natural width: this has to cap the upscale
               on a tall display AND stay inside the container at 375px, where
               a flat `max-width: 1400px` would blow the document out. */
            style={{
              maxWidth: `min(100%, ${project.w}px)`,
              maxHeight: `min(100%, ${project.h}px)`,
            }}
            className="forma-plate-in pointer-events-auto w-auto object-contain"
          />
        </div>

        <div className="shrink-0 px-5 pb-6 pt-5 sm:px-8">
          <div
            className="mx-auto flex w-full max-w-[1240px] flex-col gap-5 border-t pt-5 sm:flex-row sm:items-end sm:justify-between"
            style={{ borderColor: HAIR }}
          >
            <div className="pointer-events-auto min-w-0">
              <h2
                id={titleId}
                style={SERIF}
                className="text-[clamp(1.5rem,3.2vw,2.1rem)] font-normal leading-[1.1] tracking-[-0.015em] text-balance"
              >
                {project.title}
              </h2>
              <p
                className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 ${T_META}`}
                style={{ color: MUTED }}
              >
                <span>{project.kindLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{project.area}</span>
                <span aria-hidden="true">·</span>
                <span>{project.place}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </p>
              {/* The note is the only prose this feature carries, and the grid
                  above shows it nowhere — so it renders at every width. Short
                  viewports are handled by bounding it, not by hiding it; the
                  image row is `flex-1 min-h-0` and gives the height back. */}
              <p
                data-lb-scroll
                className={`mt-3 max-h-[26vh] max-w-[58ch] overflow-y-auto overscroll-contain ${T_BODY}`}
                style={{ color: MUTED }}
              >
                {project.note}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2.5">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={!many}
                aria-label="Ankstesnis projektas"
                className={`${CONTROL} w-11 text-[1rem] leading-none`}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={!many}
                aria-label="Kitas projektas"
                className={`${CONTROL} w-11 text-[1rem] leading-none`}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
