"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/* ─────────────────────────────────────────────────────────────
   Konstrukta motion, in one place. Haven's grammar: nothing loops, nothing
   auto-plays, every move is either one reveal or tied to the scroll.

   The server components only mark elements with data attributes; this
   island reads them once and builds everything inside one gsap.context
   plus one gsap.matchMedia, so a single cleanup reverts all of it. Lenis
   and its ScrollTrigger sync live in the site shell (lerp 0.1); scrubs here
   use `scrub: true` and let Lenis do the smoothing.

     data-k-fit       the hero wordmark, fitted to the gutters (always, also
                      under reduced motion: it is layout, not motion)
     data-k-lines     heading / paragraph rising line by line, once: 24px
                      and opacity, 0.8 s, sine.inOut (≈ cubic-bezier(.4,0,
                      .6,1)), 0.08 s apart. Children marked data-k-line are
                      used as the lines; otherwise SplitText makes them and
                      is reverted when the reveal ends.
     data-k-expand    hero photograph: clip-path from the gutters to full
                      bleed while it rises into view, image 1.12 to 1.
     data-k-flank     the signature: box scale ~0.18 to 1 (0.4 to 1 on a
                      phone), image 1.15 to 1, across the sticky stage.
     data-k-settle    image 1.08 to 1 while its frame crosses the screen.
     data-k-drift     desktop only: the right project column drifts 120px
                      against the left one.

   Animated properties: transform, opacity, clip-path. No filter anywhere.
   Reduced motion: only the wordmark fit runs; the CSS hidden states are
   scoped to html[data-choreo], which is never set under reduced motion,
   so the page is its final, visible self.
   ───────────────────────────────────────────────────────────── */

const HEADINGS = new Set(["H1", "H2", "H3"]);

/** A CSS length custom property in px ("44px" → 44). */
const cssPx = (el: Element, name: string) =>
  parseFloat(getComputedStyle(el).getPropertyValue(name)) || 0;

export function KonstruktaMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".knst");
    if (!root) return;
    let alive = true;

    /* ── Wordmark fit ───────────────────────────────────────────────
       One read, one write. The CSS already shifts the word left by 0.05em
       (the K's side bearing), so the fitted width adds that back and the
       letters land flush on both gutters. Re-fitted only when the box
       width changes, never on its own height change. */
    const mark = root.querySelector<HTMLElement>("[data-k-fit]");
    const box = mark?.parentElement ?? null;
    let lastW = -1;
    /* The ink, not the advance box: canvas TextMetrics give the real left
       bearing of the K and the right edge of the a, so the letters land on
       the gutters to the pixel. Falls back to the advance box (with the
       CSS -0.05em shift) where canvas letter-spacing is missing. */
    const ctx2d = document.createElement("canvas").getContext("2d");
    const fit = () => {
      if (!mark || !box) return;
      const w = box.clientWidth;
      const cs = getComputedStyle(mark);
      const fs = parseFloat(cs.fontSize);
      if (!w || !fs) return;
      lastW = w;
      if (ctx2d && "letterSpacing" in ctx2d) {
        ctx2d.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
        (ctx2d as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
        const m = ctx2d.measureText(mark.textContent ?? "");
        const left = m.actualBoundingBoxLeft / fs;
        const ink = (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) / fs;
        if (ink > 0) {
          mark.style.fontSize = `${(w / ink).toFixed(2)}px`;
          mark.style.marginLeft = `${left.toFixed(4)}em`;
          return;
        }
      }
      const adv = mark.getBoundingClientRect().width / fs;
      if (adv) mark.style.fontSize = `${(w / (adv - 0.05)).toFixed(2)}px`;
    };
    const ro =
      mark && box
        ? new ResizeObserver(() => {
            if (box.clientWidth !== lastW) fit();
          })
        : null;
    if (box) ro?.observe(box);
    fit();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.fonts?.ready.then(() => {
      if (!alive) return;
      fit();
      if (!reduce) ScrollTrigger.refresh();
    });

    if (reduce) {
      return () => {
        alive = false;
        ro?.disconnect();
        if (mark) {
          mark.style.fontSize = "";
          mark.style.marginLeft = "";
        }
      };
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const splits: SplitText[] = [];
    const bar = () => cssPx(document.documentElement, "--demo-bar-h");
    const gutter = () => cssPx(root, "--k-g");

    const ctx = gsap.context(() => {
      /* ── Line reveals ──────────────────────────────────────────── */
      root.querySelectorAll<HTMLElement>("[data-k-lines]").forEach((el) => {
        const own = Array.from(el.querySelectorAll<HTMLElement>("[data-k-line]"));
        let split: SplitText | null = null;
        let lines: HTMLElement[] = own;
        if (!own.length) {
          split = SplitText.create(el, {
            type: "lines",
            linesClass: "k-ln",
            aria: HEADINGS.has(el.tagName) ? "auto" : "none",
          });
          splits.push(split);
          lines = split.lines as HTMLElement[];
        }
        gsap.set(lines, { y: 24, opacity: 0 });
        el.classList.add("k-ready");

        ScrollTrigger.create({
          trigger: el,
          start: "top 94%",
          once: true,
          onEnter: () =>
            gsap.to(lines, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "sine.inOut",
              stagger: 0.08,
              onComplete: () => {
                /* Give the text back to the browser so it can reflow
                   freely on resize. */
                if (split?.isSplit) split.revert();
                else gsap.set(lines, { clearProps: "transform,opacity" });
              },
            }),
        });
      });

      /* ── Hero photograph opens to full bleed ──────────────────────── */
      const media = root.querySelector<HTMLElement>("[data-k-expand]");
      const mediaImg = media?.querySelector<HTMLElement>("[data-k-expand-img]");
      if (media && mediaImg) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: media,
              start: "top bottom",
              end: () => `top ${bar()}px`,
              scrub: true,
              invalidateOnRefresh: true,
              onToggle: (self) => {
                mediaImg.style.willChange = self.isActive ? "transform" : "";
              },
            },
          })
          .fromTo(
            media,
            { clipPath: () => `inset(0px ${gutter()}px 0px ${gutter()}px)` },
            { clipPath: "inset(0px 0px 0px 0px)", ease: "none" },
            0,
          )
          .fromTo(mediaImg, { scale: 1.12 }, { scale: 1, ease: "none" }, 0);
      }

      /* ── Settling images ──────────────────────────────────────────── */
      root.querySelectorAll<HTMLElement>("[data-k-settle]").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement ?? img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);

    /* ── Word-flank grow and the project drift ───────────────────────── */
    const mm = gsap.matchMedia();
    const flank = root.querySelector<HTMLElement>("[data-k-flank]");
    const flankBox = flank?.querySelector<HTMLElement>("[data-k-flank-box]");
    const flankImg = flank?.querySelector<HTMLElement>("[data-k-flank-img]");

    mm.add(
      { desk: "(min-width: 768px)", wide: "(min-width: 1024px)" },
      (m) => {
        const { desk, wide } = m.conditions as { desk: boolean; wide: boolean };

        if (flank && flankBox && flankImg) {
          /* Desktop: starts as a ~150px thumbnail. Phone: 40 % of the
             content width. */
          const from = () =>
            desk ? Math.min(0.4, 150 / Math.max(1, flankBox.offsetWidth)) : 0.4;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: flank,
                start: () => `top ${bar()}px`,
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
                onToggle: (self) => {
                  const v = self.isActive ? "transform" : "";
                  flankBox.style.willChange = v;
                  flankImg.style.willChange = v;
                },
              },
            })
            .fromTo(flankBox, { scale: from }, { scale: 1, ease: "none" }, 0)
            .fromTo(flankImg, { scale: 1.15 }, { scale: 1, ease: "none" }, 0)
            /* Hold the full-size frame for a moment before the stage
               lets go. */
            .to({}, { duration: 0.18 });
        }

        if (wide) {
          root.querySelectorAll<HTMLElement>("[data-k-drift]").forEach((el) => {
            gsap.fromTo(
              el,
              { y: 60 },
              {
                y: -60,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
        }
      },
      root,
    );

    return () => {
      alive = false;
      ro?.disconnect();
      mm.revert();
      ctx.revert();
      splits.forEach((s) => {
        if (s.isSplit) s.revert();
      });
      root
        .querySelectorAll(".k-ready")
        .forEach((el) => el.classList.remove("k-ready"));
      if (mark) {
        mark.style.fontSize = "";
        mark.style.marginLeft = "";
      }
    };
  }, []);

  return null;
}
