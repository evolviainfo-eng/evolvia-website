"use client";

import { useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   Scroll effects, as one loop.

   Three behaviours, all driven by the same number: how far an element has
   travelled across the viewport, 0 at the moment it appears from below and
   1 when it leaves at the top.

     data-open    a frame opens. Its clip narrows in from both sides and
                  the photograph inside it settles from slightly too large.
                  This is the reveal a photograph deserves: it arrives as
                  an image, not as a box that faded in.

     data-para    the photograph inside a fixed-ratio frame drifts against
                  the page. One layer, a few percent, never on text.

     data-drift   a whole block travels a little slower than the page, so
                  two neighbouring columns do not move as one slab.

     data-num     a large figure settles: it arrives fractionally wide and
                  large and closes to its resting size. Used once.

   Everything is written as a custom property and consumed by CSS
   (globals.css, "scroll effects"), so a frame costs one style write and
   the browser does the compositing. Nothing here reads layout except the
   single getBoundingClientRect per tracked element per frame, and the
   loop only runs while at least one tracked element is on screen.

   Fail-to-visible: the resting value of every property is the finished
   state, so an element that is never observed, or a browser where this
   never runs, shows the final composition rather than an empty box.
   ───────────────────────────────────────────────────────────── */

const SEL = "[data-open],[data-para],[data-drift],[data-num],[data-grow]";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function Scrollfx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const live = new Set<HTMLElement>();
    let raf = 0;

    const frame = () => {
      const h = window.innerHeight;
      live.forEach((el) => {
        const r = el.getBoundingClientRect();
        // 0 as it comes in from below, 1 as it leaves at the top
        const p = clamp01((h - r.top) / (h + r.height));

        if (el.hasAttribute("data-open")) {
          el.style.setProperty("--open", easeOut(span(p, 0.06, 0.42)).toFixed(4));
        }
        if (el.hasAttribute("data-para") || el.hasAttribute("data-drift")) {
          // centred: -1 below the fold, +1 above it
          el.style.setProperty("--p", (p * 2 - 1).toFixed(4));
        }
        if (el.hasAttribute("data-grow")) {
          el.style.setProperty("--grow", easeOut(span(p, 0.12, 0.46)).toFixed(4));
        }
        if (el.hasAttribute("data-num")) {
          el.style.setProperty("--set", easeOut(span(p, 0.1, 0.5)).toFixed(4));
        }
      });
      raf = live.size ? requestAnimationFrame(frame) : 0;
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) live.add(el);
          else live.delete(el);
        });
        if (live.size && !raf) raf = requestAnimationFrame(frame);
      },
      { rootMargin: "20% 0px" },
    );

    const watch = () =>
      document.querySelectorAll<HTMLElement>(SEL).forEach((el) => io.observe(el));

    watch();
    // Full-page navigations only on this site, but a late image or a
    // client section can still mount after this effect runs.
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
