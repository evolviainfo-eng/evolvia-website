"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { DemoSite } from "@/components/ui/DemoSite";
import { demos, type Demo } from "@/content/demos";

function Caption({ demo }: { demo: Demo }) {
  return (
    <figcaption className="mt-5 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <h3 className="text-[1.15rem] font-medium tracking-[-0.01em]">
          {demo.name}
        </h3>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-text-muted">
          {demo.label}
        </span>
      </div>
      <p className="t-body max-w-[46ch] text-[0.95rem]">{demo.tagline}</p>
    </figcaption>
  );
}

export function Work() {
  const root = useRef<HTMLDivElement>(null);
  const [featured, ...rest] = demos;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".work-item");
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.registerPlugin(ScrollTrigger);

      // demos pop in, staggered, as they enter
      gsap.set(items, { opacity: 0, y: 56, scale: 0.95 });
      ScrollTrigger.batch(items, {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.14,
            force3D: false,
            clearProps: "transform,willChange",
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
    <Section id="darbai" tone="light">
      <Container>
        <div ref={root}>
          <Reveal className="max-w-[680px]">
            <Eyebrow>Darbai</Eyebrow>
            <h2 className="t-h2 mt-4">Pavyzdžiai, kurie parduoda.</h2>
            <p className="t-body mt-5 max-w-[54ch]">
              Kol kuriame pirmuosius klientų projektus, štai demonstracinės
              svetainės — kad iškart matytumėte, kokios kokybės tikėtis.
            </p>
          </Reveal>

          {/* featured */}
          <figure className="work-item mt-[clamp(40px,6vw,72px)]">
            <DemoSite demo={featured} ratioClass="aspect-[16/9] sm:aspect-[16/7]" />
            <Caption demo={featured} />
          </figure>

          {/* two smaller */}
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {rest.map((demo) => (
              <figure key={demo.name} className="work-item">
                <DemoSite demo={demo} ratioClass="aspect-[16/11]" />
                <Caption demo={demo} />
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
