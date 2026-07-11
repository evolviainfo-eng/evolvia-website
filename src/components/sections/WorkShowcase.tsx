"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { DemoSite } from "@/components/ui/DemoSite";
import { demos } from "@/content/demos";
import { cn } from "@/lib/cn";

/** /darbai — the full demo set as editorial rows: big frame + meta rail with
 *  an oversized index numeral, alternating sides. Phone mock on every frame. */
export function WorkShowcase() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".showcase-item");
      const parts = (item: HTMLElement) => ({
        browser: item.querySelector<HTMLElement>(".demo-browser"),
        imgs: item.querySelectorAll<HTMLElement>(".demo-browser .work-img"),
        phone: item.querySelector<HTMLElement>(".demo-phone"),
        caption: item.querySelector<HTMLElement>("figcaption"),
      });

      if (reduce) {
        return; // everything stays at its natural, visible state
      }
      gsap.registerPlugin(ScrollTrigger);

      // choreographed entrance: frame rises in → photo settles (Ken Burns)
      // → meta rail follows → phone mock lands last
      items.forEach((item) => {
        const p = parts(item);
        if (p.browser) gsap.set(p.browser, { opacity: 0, y: 56 });
        if (p.imgs.length) gsap.set(p.imgs, { scale: 1.12, force3D: false });
        if (p.phone) gsap.set(p.phone, { opacity: 0, y: 28 });
        if (p.caption) gsap.set(p.caption, { opacity: 0, y: 26 });
      });
      ScrollTrigger.batch(items, {
        start: "top 84%",
        once: true,
        onEnter: (batch) =>
          batch.forEach((item, bi) => {
            const p = parts(item as HTMLElement);
            // the frame is about to be seen — release any native lazy gate
            // (belt-and-braces: instant scroll jumps can leave it stuck)
            item.querySelectorAll("img").forEach((im) => {
              if (im.loading === "lazy") im.loading = "eager";
            });
            const tl = gsap.timeline({
              delay: bi * 0.12,
              defaults: { ease: "power3.out", force3D: false },
            });
            if (p.browser)
              // clearProps so the CSS hover-lift transform works afterwards
              tl.to(p.browser, { opacity: 1, y: 0, duration: 1.1, clearProps: "transform" }, 0);
            if (p.imgs.length) tl.to(p.imgs, { scale: 1, duration: 1.5 }, 0);
            if (p.caption)
              tl.to(p.caption, { opacity: 1, y: 0, duration: 0.8, clearProps: "transform" }, 0.25);
            if (p.phone)
              tl.to(p.phone, { opacity: 1, y: 0, duration: 0.8, clearProps: "transform" }, 0.4);
          }),
      });

      // subtle parallax on each demo photo
      gsap.utils.toArray<HTMLElement>(".work-img").forEach((img) => {
        const frame = img.closest(".work-frame");
        if (!frame) return;
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Section tone="light">
      <Container>
        <div
          ref={root}
          className="flex flex-col gap-[clamp(80px,11vw,140px)]"
        >
          {demos.map((demo, i) => {
            const flip = i % 2 === 1;
            return (
              <figure
                key={demo.name}
                className="showcase-item grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10"
              >
                <div className={cn("lg:col-span-8", flip && "lg:order-2")}>
                  <DemoSite demo={demo} ratioClass="aspect-[16/10]" phone />
                </div>

                <figcaption
                  className={cn(
                    "flex flex-col lg:col-span-4",
                    flip && "lg:order-1",
                  )}
                >
                  <span
                    className="select-none font-light leading-none tracking-[-0.04em] text-border tabular-nums [font-size:clamp(3.4rem,6vw,5.4rem)]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="mt-4 flex items-center gap-3">
                    <h2 className="text-[1.35rem] font-medium tracking-[-0.015em]">
                      {demo.name}
                    </h2>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-text-muted">
                      {demo.label}
                    </span>
                  </div>

                  <p className="mt-2 text-[0.82rem] uppercase tracking-[0.1em] text-text-muted">
                    {demo.sector} · {demo.year}
                  </p>

                  <p className="t-body mt-4 max-w-[44ch] text-[0.98rem]">
                    {demo.tagline}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {demo.scope.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-surface-2 px-3 py-1 text-[0.75rem] text-text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
