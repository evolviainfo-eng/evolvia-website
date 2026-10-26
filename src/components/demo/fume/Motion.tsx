"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";

/** Every scroll-driven move on the Fumé page, after Studenterkilden's
 *  grammar (initContentRevealScroll, initImageParallax). The components only
 *  carry data attributes; this reads them once after hydration. All of it
 *  lives in one gsap.context, so leaving the page reverts every tween,
 *  ScrollTrigger and SplitText in one call.
 *
 *    [data-group]      its direct children arrive one after another, 100 ms
 *                      apart, once, when the group's top reaches 82% of the
 *                      viewport. A plain child rises 2em and fades in (0.8s);
 *                      a child marked [data-lines] is split into masked lines
 *                      that rise from 150% (1.5s, 0.2s of stagger in total).
 *                      Ease everywhere: cubic-bezier(.625,.05,0,1).
 *    [data-group=load] the same, played on load instead of on scroll
 *                      (the hero); data-delay pushes it back
 *    [data-parallax]   a photo frame whose [data-parallax-img] layer (130%
 *                      of the frame's height) drifts ±15% of the frame,
 *                      scrubbed. Two on the page (the hero, the bar), tablet and up.
 *
 *  Nothing pins, nothing replays, nothing reverses. Re-splits on resize or
 *  when the fonts arrive (SplitText autoSplit) only re-place the lines.
 *
 *  Hidden states are never in the server HTML: group children are held
 *  back only under html[data-choreo] (set before paint by the root boot
 *  script, never under reduced motion), and FumePage's scope CSS releases
 *  them after 3s on its own if this never runs. Under reduced motion none of
 *  this is set up and everything is simply there. */

const ON = "fx-on";
const EASE = "fumeOsmo";

function q<T extends Element = HTMLElement>(scope: ParentNode, sel: string) {
  return Array.from(scope.querySelectorAll<T>(sel));
}

function groups(root: HTMLElement) {
  const observers: IntersectionObserver[] = [];
  q(root, "[data-group]").forEach((group) => {
    const onLoad = group.dataset.group === "load";
    const base = onLoad ? 0.15 + Number(group.dataset.delay ?? 0) : 0;
    const kids = Array.from(group.children) as HTMLElement[];
    let played = false;
    const plays: Array<() => void> = [];

    kids.forEach((el, i) => {
      const delay = base + i * 0.1;

      if (el.hasAttribute("data-lines")) {
        // SplitText re-splits on resize and once the fonts have arrived. The
        // tween returned from onSplit is killed and rebuilt each time with
        // its progress carried over, so `current` always points at the live
        // one and a group that has played stays played.
        let current: gsap.core.Tween | null = null;
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "fx-line",
          autoSplit: true,
          // Headings keep their accessible name through aria-label; a
          // paragraph cannot carry one, so there the lines stay exposed.
          aria: /^H[1-6]$/.test(el.tagName) ? "auto" : "none",
          onSplit(self) {
            current = gsap.from(self.lines, {
              yPercent: 150,
              duration: 1.5,
              ease: EASE,
              stagger: { amount: 0.2 },
              delay,
              paused: !played,
            });
            return current;
          },
        });
        plays.push(() => current?.play());
        return;
      }

      const tween = gsap.from(el, {
        y: "2em",
        autoAlpha: 0,
        duration: 0.8,
        ease: EASE,
        delay,
        paused: true,
        clearProps: "transform,opacity,visibility",
      });
      plays.push(() => tween.play());
    });

    group.classList.add(ON);
    const play = () => {
      if (played) return;
      played = true;
      plays.forEach((p) => p());
    };

    if (onLoad) play();
    else {
      // An IntersectionObserver, not a ScrollTrigger: trigger positions
      // measured before the photos and fonts arrive go stale as the page
      // grows, and groups then stayed hidden in view. The observer always
      // sees the real position. A group already above the viewport (reload
      // halfway down, an anchor jump) plays at once.
      // Plays once the group's top passes 85 % of the viewport, or once
      // half of it is visible, or at the foot of the page (a last group
      // that can never scroll higher still plays).
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const atFoot = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
            const reached =
              e.boundingClientRect.top < 0 ||
              (e.isIntersecting && (e.boundingClientRect.top < window.innerHeight * 0.92 || e.intersectionRatio >= 0.5 || atFoot));
            if (reached) {
              play();
              io.disconnect();
            }
          }
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.75, 1] },
      );
      io.observe(group);
      observers.push(io);
    }
  });
  return () => observers.forEach((o) => o.disconnect());
}

function parallax(root: HTMLElement) {
  q(root, "[data-parallax]").forEach((frame) => {
    const layer = frame.querySelector("[data-parallax-img]");
    if (!layer) return;
    // The layer is 130% of the frame: ±11.5% of the layer is ±15% of the
    // frame, inside the 15% it overhangs at each edge.
    gsap.fromTo(
      layer,
      { yPercent: -11.5 },
      {
        yPercent: 11.5,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".fume");
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    if (!CustomEase.get(EASE)) CustomEase.create(EASE, "0.625,0.05,0,1");

    let alive = true;
    const ctx = gsap.context(() => {
      const OK = "(prefers-reduced-motion: no-preference)";
      const mm = gsap.matchMedia();
      mm.add(OK, () => groups(root));
      mm.add(`${OK} and (min-width: 768px)`, () => {
        parallax(root);
      });
      return () => mm.revert();
    }, root);

    // Cormorant arrives with display: swap; once it has, the headings are
    // their final height and every trigger below them is re-measured.
    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      ctx.revert();
    };
  }, []);

  return null;
}
