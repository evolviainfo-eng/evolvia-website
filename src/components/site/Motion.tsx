"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/* Page motion for v7, round 4: scroll-driven, never bouncy.

   Everything below is tied to the scroll position (scrubbed with a short
   lag), the way Apple product pages and Linear move. Nothing fades in on a
   timer except the hero on load.

   Hooks:
   [data-split]        headline fades up as one block once, 1.1 s,
                       power2.out (no mask, no stagger, no overshoot)
   [data-split="now"]  the same on load
   [data-words]        a statement whose words brighten one after another as
                       it scrolls through the middle of the screen
   [data-scrub]        a panel that rises 56px and settles from 0.96 scale
                       while it scrolls into view (scrubbed)
   [data-scrub="x"]    the same from the side (used by alternating rows)
   [data-in]           small text and UI: opacity and 20px once, power2.out
   [data-stagger]      children with [data-in] enter 60 ms apart
   [data-tone]         the section crossing the middle sets the page tone
   [data-live-root]    gets [data-playing] while on screen

   Hidden states exist only under html.motion; a CSS timeout reveals
   everything if the script never runs; reduced motion shows the page
   complete and still. */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const toned = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    const setTone = () => {
      const mid = window.innerHeight * 0.5;
      let tone = "dark";
      for (const s of toned) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) tone = s.dataset.tone || "dark";
      }
      if (root.dataset.tone !== tone) root.dataset.tone = tone;
    };
    setTone();
    window.addEventListener("scroll", setTone, { passive: true });

    const liveIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.target as HTMLElement).toggleAttribute("data-playing", e.isIntersecting);
      },
      { rootMargin: "10% 0px" },
    );
    document.querySelectorAll("[data-live-root]").forEach((el) => liveIO.observe(el));

    if (reduce) {
      document.querySelectorAll("[data-in],[data-scrub]").forEach((el) => el.setAttribute("data-shown", ""));
      return () => {
        window.removeEventListener("scroll", setTone);
        liveIO.disconnect();
      };
    }

    root.classList.add("motion");
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -84 } });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Small items: a short, even entrance, once.
      document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
        const step = parseFloat(group.dataset.stagger || "0.06");
        group.querySelectorAll<HTMLElement>("[data-in]").forEach((el, i) => el.style.setProperty("--d", `${(i * step).toFixed(2)}s`));
      });
      const items = Array.from(document.querySelectorAll<HTMLElement>("[data-in]"));
      const show = (el: Element) => el.setAttribute("data-shown", "");
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            show(en.target);
            io.unobserve(en.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) requestAnimationFrame(() => show(el));
        else io.observe(el);
      });
      const watchdog = window.setInterval(() => {
        items.forEach((el) => {
          if (!el.hasAttribute("data-shown") && el.getBoundingClientRect().top < window.innerHeight * 0.95) show(el);
        });
      }, 1200);

      // Panels: scrubbed rise and settle while they scroll into view.
      document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
        const side = el.dataset.scrub === "x";
        gsap.fromTo(
          el,
          { opacity: 0, y: side ? 0 : 56, x: side ? 48 : 0, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 94%", end: "top 48%", scrub: 0.6 },
          },
        );
        el.setAttribute("data-shown", "");
      });

      // Statements: words brighten with the scroll (Apple).
      document.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => {
        // Headings keep their name through aria-label; on a paragraph that
        // attribute is not allowed, so there the words stay readable as is.
        const split = SplitText.create(el, {
          type: "words",
          wordsClass: "wd",
          aria: /^H[1-6]$/.test(el.tagName) ? "auto" : "none",
        });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 86%", end: "bottom 42%", scrub: 0.5 },
          },
        );
      });

      // Hero headline: each line is unveiled by a soft-edged light that
      // travels left to right (a feathered mask), with a 10 px settle.
      // Slow and even, like a keynote title card. No blur, no bounce.
      document.fonts.ready.then(() => {
        document.querySelectorAll<HTMLElement>('[data-split="reveal"]').forEach((el) => {
          const split = SplitText.create(el, { type: "lines", linesClass: "ln-reveal" });
          const lines = split.lines as HTMLElement[];
          const feather = "linear-gradient(90deg, #000 calc(var(--p) - 28%), transparent var(--p))";
          lines.forEach((ln) => {
            ln.style.setProperty("--p", "0%");
            ln.style.webkitMaskImage = feather;
            ln.style.maskImage = feather;
          });
          gsap.set(lines, { y: 10 });
          el.style.visibility = "visible";
          el.style.opacity = "1";
          gsap.to(lines, {
            "--p": "130%",
            y: 0,
            duration: 1.7,
            ease: "power2.inOut",
            stagger: 0.22,
            delay: 0.15,
            onComplete: () =>
              lines.forEach((ln) => {
                ln.style.webkitMaskImage = "none";
                ln.style.maskImage = "none";
              }),
          });
        });
      });

      // Headlines: one quiet block, fade and a 16 px rise (Apple), once.
      document.fonts.ready.then(() => {
        document.querySelectorAll<HTMLElement>("[data-split]:not([data-split=reveal])").forEach((el) => {
          gsap.set(el, { opacity: 0, y: 16, visibility: "visible" });
          const play = () =>
            gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "power2.out", delay: el.dataset.split === "now" ? 0.1 : 0 });
          if (el.dataset.split === "now") play();
          else {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.9 && r.bottom > 0) play();
            else {
              const o = new IntersectionObserver(
                (es) => {
                  if (es.some((e) => e.isIntersecting)) {
                    o.disconnect();
                    play();
                  }
                },
                { rootMargin: "0px 0px -8% 0px" },
              );
              o.observe(el);
            }
          }
        });
        ScrollTrigger.refresh();
      });

      let refreshT = 0;
      const ro = new ResizeObserver(() => {
        window.clearTimeout(refreshT);
        refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      });
      ro.observe(document.body);

      return () => {
        window.clearInterval(watchdog);
        io.disconnect();
        ro.disconnect();
        window.clearTimeout(refreshT);
      };
    });

    return () => {
      window.removeEventListener("scroll", setTone);
      liveIO.disconnect();
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      root.classList.remove("motion");
    };
  }, []);

  return null;
}
