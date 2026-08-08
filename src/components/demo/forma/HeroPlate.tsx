"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MUTED, T_META } from "@/components/demo/forma/tokens";

/** The page's one scroll moment: the opening photograph closes to a horizon.
 *
 *  As the first screen is scrolled away the frame's aperture shuts from both
 *  edges and the picture inside drifts up behind it, so the room compresses
 *  into a single band of light before the studio starts talking. One scrubbed
 *  gesture, two properties, no pin.
 *
 *  It only ever runs FORWARD from the rendered state: progress 0 is
 *  `inset(0)` — exactly what the server sent and exactly what a visitor with
 *  reduced motion or no JS keeps. There is no start state to flash into, and
 *  nothing can strand the photograph mid-close.
 *
 *  The clip lives on the frame and the drift on an inner plate, because the
 *  <img> already owns its transform: `data-settle` lands it out of a 1.06 crop
 *  and GSAP must not write over that.
 */
export function HeroPlate() {
  const frameRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frame = frameRef.current;
    const plate = plateRef.current;
    if (!frame || !plate) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: frame,
            start: "top top",
            // a fixed slice of the viewport, so the gesture reads the same
            // on a tall desktop plate and a short phone crop
            end: () => `+=${Math.round(window.innerHeight * 0.72)}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          frame,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { clipPath: "inset(14% 0% 14% 0%)", ease: "none" },
          0,
        )
        // stays well inside the 14% the frame closes to, so no paper can
        // appear between the picture's edge and the aperture
        .fromTo(plate, { yPercent: 0 }, { yPercent: -5, ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <figure className="mx-auto w-full max-w-[1680px]">
      <div ref={frameRef} className="overflow-hidden bg-[rgba(26,25,23,0.06)]">
        <div ref={plateRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-settle
            src="/demo/forma/hero.webp"
            width={1800}
            height={1125}
            alt="Šviesi svetainė su panoraminiu langu į medžius"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/5] h-full w-full object-cover sm:aspect-[3/2] lg:aspect-[16/9]"
          />
        </div>
      </div>
      <figcaption
        className={`mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 ${T_META}`}
        style={{ color: MUTED }}
      >
        <span>Dienos zona · privatus namas</span>
        <span>Vilniaus r., 2025</span>
      </figcaption>
    </figure>
  );
}
