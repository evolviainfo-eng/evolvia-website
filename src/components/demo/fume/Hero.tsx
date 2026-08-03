"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { HAIRLINE, Photo } from "./Type";

const META = [
  "Užupis, Vilnius",
  "Antradienis–Sekmadienis",
  "Durys nuo 17:00",
];

/** The page's one scroll moment: the evening falling.
 *
 *  As the hero leaves, the room drifts down and grows a little while a second
 *  veil closes over it — the same thing a dining room does when the candles
 *  are the only light left. One moving element, opacity on the other; no pin,
 *  so there is nothing to gate on viewport height and nothing that can fail to
 *  release at 1366×768. Under reduced motion the timeline is never built and
 *  the hero is simply a photograph.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const shot = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      // scale outruns the travel (7% of slack against 6% of drift), so no edge
      // of the frame can ever come into view
      tl.to(shot.current, { yPercent: 6, scale: 1.14, ease: "none" }, 0).to(
        veil.current,
        { opacity: 0.55, ease: "none" },
        0,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate overflow-hidden"
      style={{ minHeight: "clamp(560px, 86svh, 920px)" }}
    >
      <div className="absolute inset-0 -z-10">
        <div ref={shot} className="absolute inset-0">
          <div data-settle className="h-full w-full">
            <Photo
              src="/demo/fume/hero.webp"
              w={1800}
              h={1206}
              alt="Prieblandoje skendinti Fumé salė su padengtais stalais"
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,11,10,0.66) 0%, rgba(12,11,10,0.30) 34%, rgba(12,11,10,0.82) 78%, #0C0B0A 100%)",
          }}
        />
        <div
          ref={veil}
          aria-hidden
          className="absolute inset-0 opacity-0"
          style={{ background: "#0C0B0A" }}
        />
      </div>

      <div
        className="mx-auto flex max-w-[1240px] flex-col px-5 pb-[clamp(40px,6vw,64px)] pt-[clamp(96px,16vw,180px)] sm:px-8"
        style={{ minHeight: "clamp(560px, 86svh, 920px)" }}
      >
        <div className="mt-auto max-w-[42ch]">
          {/* The one masked line on the page. The mask is 0.1em deeper than the
              type so accents and descenders are not sheared; it stays under the
              0.12 × line-height at which the incoming line would peek out from
              under the bottom edge. */}
          <h1
            data-line
            className="-mb-[0.08em] overflow-hidden pb-[0.08em] font-[family-name:var(--font-fume-display)] text-[clamp(3.4rem,10vw,4.5rem)] font-light leading-[1.02] tracking-[-0.012em] text-[#ede6da]"
          >
            <span>Fumé</span>
          </h1>

          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-6"
          >
            <p className="max-w-[34ch] text-pretty font-[family-name:var(--font-fume-display)] text-[clamp(1.15rem,2.6vw,1.5rem)] font-light italic leading-[1.45] text-[rgba(237,230,218,0.86)]">
              Atviros ugnies virtuvė ir vyno baras. Trisdešimt keturios vietos
              Užupyje.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              {/* accent 1 of 4 */}
              <a
                href="#rezervacija"
                className="inline-flex h-12 items-center rounded-[2px] bg-[#C0703A] px-7 font-[family-name:var(--font-fume-ui)] text-[0.86rem] font-medium tracking-[0.03em] text-[#0c0b0a] transition-[background-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:bg-[#CE7B41] active:translate-y-0 active:bg-[#B0642F]"
              >
                Rezervuoti stalą
              </a>
              <a
                href="#meniu"
                style={{ borderColor: HAIRLINE }}
                className="border-b pb-1 font-[family-name:var(--font-fume-ui)] text-[0.86rem] tracking-[0.04em] text-[rgba(237,230,218,0.78)] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[#ede6da] hover:text-[#ede6da] active:text-[rgba(237,230,218,0.7)]"
              >
                Vakaro meniu
              </a>
            </div>
          </div>
        </div>

        <div
          data-rise
          style={{ "--i": 2, borderColor: HAIRLINE } as React.CSSProperties}
          className="mt-[clamp(48px,8vw,88px)] grid gap-x-8 gap-y-2 border-t pt-4 font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.2em] text-[#9c948a] sm:grid-cols-3"
        >
          {META.map((m) => (
            <p key={m} className="min-w-0">
              {m}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
