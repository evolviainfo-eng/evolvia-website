"use client";

import { useEffect, useRef } from "react";

/** Vienintelis tikras slinkimo momentas visame puslapyje.
 *
 *  Puslapis iki šios vietos yra kreminis; čia jis pritemsta, ir kol juosta
 *  slenka pro akis, žvakės šiluma iš tamsos užauga iki pilnos — šviesa,
 *  kurios pats produktas ir yra. Slinkimas valdo tik dvi savybes (permatomumą
 *  ir mastelį) viename elemente, plius vieną nuotraukos poslinkį; jokio pin,
 *  jokio scrub'o ant išdėstymo, todėl 1366×768 nieko nesulaužo.
 *
 *  Be JS arba su „prefers-reduced-motion“ švytėjimas lieka savo natūralioje
 *  (pilnoje) būsenoje, o nuotrauka — vietoje. Sekcija atrodo užbaigta.
 */
export function Mood() {
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const drift = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    void (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapMod.gsap;
      gsap.registerPlugin(stMod.ScrollTrigger);

      ctx = gsap.context(() => {
        if (glow.current) {
          gsap.fromTo(
            glow.current,
            { opacity: 0.14, scale: 0.78 },
            {
              opacity: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                end: "center 56%",
                scrub: true,
              },
            },
          );
        }
        if (drift.current) {
          gsap.fromTo(
            drift.current,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      }, el);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="sk-dark relative isolate overflow-hidden bg-[#1C1712] text-[#FAF6F0]"
    >
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[86%] w-[136%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="sk-breathe h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(196,101,52,0.42), rgba(180,86,47,0.14) 58%, rgba(180,86,47,0) 78%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
        <div data-rise className="max-w-[26ch]">
          <p className="text-[0.8125rem] uppercase tracking-[0.16em] text-[rgba(250,246,240,0.58)]">
            Vakaras
          </p>
          <p
            className="mt-5 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.14] tracking-[-0.03em] text-balance"
            style={{
              fontFamily: "var(--font-skalsa-display)",
              fontWeight: 500,
            }}
          >
            Viena žvakė vakarui — ne dekoras, o ženklas, kad diena baigėsi.
          </p>
        </div>

        <div
          data-rise
          style={{ "--i": 1, "--rise-y": "28px" } as React.CSSProperties}
          className="mt-[clamp(36px,5vw,64px)] grid gap-4 md:grid-cols-12 md:items-end"
        >
          <div className="min-w-0 overflow-hidden rounded-[10px] bg-[#241E19] md:col-span-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={drift}
              src="/demo/skalsa/mood-1.webp"
              alt="Žvakių eilė ant lygaus paviršiaus su atspindžiu"
              width={1400}
              height={1120}
              decoding="async"
              loading="lazy"
              className="aspect-[5/4] h-full w-full scale-[1.09] object-cover"
            />
          </div>
          <div className="min-w-0 overflow-hidden rounded-[10px] bg-[#241E19] md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demo/skalsa/mood-2.webp"
              alt="Žvakių grupė tamsiame kambaryje"
              width={1400}
              height={1400}
              decoding="async"
              loading="lazy"
              className="aspect-square h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
