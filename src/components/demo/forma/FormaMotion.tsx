"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────────────────────────
   Forma's scroll motion: one thing only, the process track.

   TARQ's process section holds its title still while the steps travel
   sideways with the scroll. This is the page's one pinned section, built
   on a desktop with motion allowed and a viewport tall enough to hold it.
   The track follows the scroll 1:1 (scrub: true); the site's Lenis
   instance (lerp 0.1) is the only smoothing, and it already drives
   ScrollTrigger, so no second instance is created here.

   Everywhere else the page uses the site's single reveal observer
   (Choreo: `data-rise`), CSS transitions and hover states, which cost no
   scroll work at all.

   Without this (phone, tablet, reduced motion, no JS) the steps render as
   a native scroll-snap row (under 1024px) or a two-column grid (desktop),
   both complete in the server HTML. `data-pinned` is the switch between
   the two layouts, set here and removed on revert.
   ───────────────────────────────────────────────────────────── */

export function FormaMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".forma");
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)",
      () => {
        const sec = root.querySelector<HTMLElement>("[data-f-proc]");
        const stage = sec?.querySelector<HTMLElement>("[data-f-stage]");
        const track = sec?.querySelector<HTMLElement>("[data-f-track]");
        if (!sec || !stage || !track) return;

        sec.setAttribute("data-pinned", "");

        const distance = () =>
          Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /* Keep measurements honest: filtering the project index above or a
           late font swap changes the page height, and the pin would start at
           a stale position. Refresh only on a real change. */
        const main = root.querySelector("main");
        let lastH = main?.offsetHeight ?? 0;
        let timer = 0;
        const ro = new ResizeObserver(() => {
          const h = main?.offsetHeight ?? 0;
          if (Math.abs(h - lastH) < 2) return;
          lastH = h;
          window.clearTimeout(timer);
          timer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
        });
        if (main) ro.observe(main);
        let alive = true;
        document.fonts?.ready.then(() => {
          if (alive) ScrollTrigger.refresh();
        });
        ScrollTrigger.refresh();

        return () => {
          alive = false;
          ro.disconnect();
          window.clearTimeout(timer);
          sec.removeAttribute("data-pinned");
        };
      },
    );

    return () => mm.revert();
  }, []);

  return null;
}
