"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* The staged first fold, and the window's scroll settle.

   Intro: starts on document.fonts.ready, the same moment the shared Motion
   engine starts the H1 line reveal (data-split="now"), so the order reads:
   H1 line 1, H1 line 2, sub 0.35, buttons 0.44, caption 0.50, stage 0.56
   (16 px rise, 0.9 s), and the window inside the stage brightens from 0.62
   to full opacity over 1.4 s. Opacity and position only, no blur.

   Items carry data-hi="<delay>". They are hidden by CSS only under
   html.js (set before paint unless reduced motion), with a 2.8 s CSS
   fallback, and marked data-hi-done when shown. Skipped for reduced
   motion, ?qa, and a page restored below the hero.

   Settle: the window starts lying back, rotateX(6deg) scale(0.97), and
   comes flat as the page scrolls its first 360 px (scrubbed on the window
   scroller, perspective 1600 px on the stage). Not a timed entrance: the
   scroll position owns it, and it is skipped for reduced motion. */
export function HeroIntro() {
  useEffect(() => {
    const root = document.getElementById("hero");
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-hi]"));
    const win = root.querySelector<HTMLElement>("[data-hi-win]");
    const finish = () => items.forEach((el) => el.setAttribute("data-hi-done", ""));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const qa = new URLSearchParams(window.location.search).has("qa");
    const below = window.scrollY > root.offsetHeight * 0.5;
    if (reduce || qa || !document.documentElement.classList.contains("js")) {
      finish();
      return;
    }

    gsap.registerPlugin(CustomEase, ScrollTrigger);
    let alive = true;

    /* Scroll settle, scrubbed. Created at once so a page restored lower
       down is already flat. */
    const settle = gsap.context(() => {
      if (!win) return;
      gsap.fromTo(
        win,
        { rotateX: 6, scale: 0.97, transformOrigin: "50% 100%" },
        {
          rotateX: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: 0, end: 360, scrub: 0.6 },
        },
      );
      // Leaving the fold: the window drifts up and fades out, the way an
      // Apple product shot leaves the screen, so the next chapter arrives
      // on a clean ground.
      gsap.fromTo(
        win,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -80, ease: "none", immediateRender: false, scrollTrigger: { trigger: root, start: 420, end: 1040, scrub: 0.6 } },
      );
      const copy = root.querySelector<HTMLElement>("h1")?.parentElement;
      if (copy) {
        gsap.fromTo(
          copy,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -40, ease: "none", immediateRender: false, scrollTrigger: { trigger: root, start: 120, end: 520, scrub: 0.6 } },
        );
      }
    }, root);

    let intro: gsap.Context | null = null;
    if (below) finish();
    else {
      document.fonts.ready.then(() => {
        if (!alive) return;
        intro = gsap.context(() => {
          const out = CustomEase.create("v6hOut", "0.16,1,0.3,1");
          const ui = CustomEase.create("v6hUi", "0.4,0,0.2,1");
          const tl = gsap.timeline({
            onComplete: () => {
              finish();
              gsap.set(items, { clearProps: "opacity,transform" });
            },
          });
          items.forEach((el) => {
            const at = parseFloat(el.dataset.hi || "0") || 0;
            if (el.dataset.hiKind === "stage") {
              tl.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: out }, at);
            } else {
              tl.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.9, ease: out }, at);
            }
          });
          if (win) tl.fromTo(win, { opacity: 0.62 }, { opacity: 1, duration: 1.4, ease: ui, clearProps: "opacity" }, 1.3);
        }, root);
      });
    }

    return () => {
      alive = false;
      intro?.revert();
      settle.revert();
      finish();
    };
  }, []);

  return null;
}
