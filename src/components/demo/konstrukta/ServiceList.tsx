"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { KonstruktaCopy } from "@/i18n/dictionaries/lt/konstrukta";
import { getKonstruktaCopy } from "./copy";
import { GRID, T_SM, T_TEXT } from "./ui";

/** One photograph per area, in the order of services.items. The alt text
 *  comes from the dictionary entry that already describes that photo. */
const SHOTS: ReadonlyArray<{
  src: string;
  w: number;
  h: number;
  alt: (c: KonstruktaCopy) => string;
}> = [
  { src: "/demo/konstrukta/svc-frame.webp", w: 1800, h: 1200, alt: (c) => c.photos.svcFrame },
  { src: "/demo/konstrukta/svc-masonry.webp", w: 1800, h: 1200, alt: (c) => c.photos.svcMasonry },
  { src: "/demo/konstrukta/svc-facade.webp", w: 1800, h: 1200, alt: (c) => c.photos.svcFacade },
  { src: "/demo/konstrukta/svc-interior.webp", w: 1800, h: 1200, alt: (c) => c.photos.svcInterior },
];

const EASE = "cubic-bezier(.4,0,.6,1)";

/** Built Environs' sector list, in Konstrukta's blue.
 *
 *  Desktop (1024px and up): the photograph sits in the left columns and
 *  stays (sticky) while the four areas stack right-aligned in the right
 *  half. Pointing at an area,
 *  or scrolling it through the middle of the screen, crossfades the photo
 *  (opacity, 0.4 s) and lifts that line while the others step back.
 *
 *  Below 1024px there is no hover and no room for a photo beside the
 *  list, so each area carries its own photograph above its name instead,
 *  and nothing dims.
 *
 *  Without JS: the first photograph, every area at full strength. */
export function ServiceList() {
  const copy = getKonstruktaCopy(useLocale());
  const c = copy.services;
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const items = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    /* A line counts as "in focus" while it crosses a thin band in the
       middle of the viewport. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = items.current.indexOf(e.target as HTMLLIElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    items.current.forEach((el) => el && io.observe(el));
    const raf = requestAnimationFrame(() => setLive(true));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div className={`${GRID} mt-[clamp(64px,8vw,128px)] lg:items-start`}>
      <figure className="hidden min-w-0 lg:sticky lg:top-[calc(var(--demo-bar-h)+112px)] lg:col-span-5 lg:block">
        <div className="relative aspect-[3/2] max-w-[600px] overflow-hidden bg-[#F5F5F5]">
          {SHOTS.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.src}
              src={s.src}
              width={s.w}
              height={s.h}
              alt={s.alt(copy)}
              aria-hidden={i !== active}
              decoding="async"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover motion-reduce:transition-none"
              style={{
                opacity: i === active ? 1 : 0,
                transition: `opacity .4s ${EASE}`,
              }}
            />
          ))}
        </div>
        {/* The caption belongs to the first photograph only. */}
        <figcaption
          aria-hidden={active !== 0}
          className={`mt-4 ${T_SM} text-[#5E5E5E] motion-reduce:transition-none`}
          style={{
            opacity: active === 0 ? 1 : 0,
            transition: `opacity .4s ${EASE}`,
          }}
        >
          {c.caption}
        </figcaption>
      </figure>

      <ol className="min-w-0 lg:col-span-6 lg:col-start-7">
        {c.items.map((s, i) => {
          const shot = SHOTS[i];
          const dim = live && i !== active;
          return (
            <li
              key={s.no}
              ref={(el) => {
                items.current[i] = el;
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i);
              }}
              className="border-t border-[#E2E2E2] py-8 first:border-t-0 first:pt-0 lg:border-t-0 lg:py-7 lg:first:pt-0"
            >
              {shot ? (
                <figure className="mb-6 lg:hidden">
                <div className="relative aspect-[3/2] overflow-hidden bg-[#F5F5F5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    width={shot.w}
                    height={shot.h}
                    alt={shot.alt(copy)}
                    decoding="async"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                {i === 0 ? (
                  <figcaption className={`mt-3 ${T_SM} text-[#5E5E5E]`}>
                    {c.caption}
                  </figcaption>
                ) : null}
                </figure>
              ) : null}

              <h3
                className={`text-balance text-[clamp(2rem,3.1vw,2.75rem)] font-medium leading-[1.04] tracking-[-0.025em] text-[#0C388D] motion-reduce:transition-none lg:text-right ${dim ? "lg:opacity-30" : ""}`}
                style={{ transition: `opacity .4s ${EASE}` }}
              >
                {s.title}
              </h3>
              <div className="mt-4 max-w-[46ch] lg:ml-auto">
                <p className={`text-pretty ${T_TEXT} text-[#111111]`}>
                  {s.body}
                </p>
                <p className={`k-num mt-3 ${T_SM} text-[#5E5E5E]`}>
                  {s.specs.join(" · ")}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
