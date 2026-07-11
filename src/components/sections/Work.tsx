"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DemoSite } from "@/components/ui/DemoSite";
import { demos, type Demo } from "@/content/demos";

function Caption({ demo }: { demo: Demo }) {
  return (
    <figcaption className="mt-5 flex flex-col gap-1.5">
      <div className="flex items-center gap-3">
        <h3 className="text-[1.15rem] font-medium tracking-[-0.01em]">
          {demo.name}
        </h3>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-text-muted">
          {demo.label}
        </span>
      </div>
      <p className="text-[0.82rem] uppercase tracking-[0.1em] text-text-muted">
        {demo.sector} · {demo.year}
      </p>
      <p className="t-body mt-1 max-w-[46ch] text-[0.95rem]">{demo.tagline}</p>
    </figcaption>
  );
}

export function Work() {
  const root = useRef<HTMLDivElement>(null);
  // the homepage shows three demos; the full set lives on /darbai
  const [featured, ...rest] = demos.slice(0, 3);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".work-item");
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
      // → caption follows → phone mock lands last
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

          {/* featured — with the overlapping mobile mock */}
          <figure className="work-item mt-[clamp(40px,6vw,72px)]">
            <DemoSite
              demo={featured}
              ratioClass="aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7]"
              phone
            />
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

          {/* the full set (incl. the e-shop concept) lives on its own page */}
          <Reveal className="mt-14 flex justify-center">
            <Button href="/darbai" variant="secondary" size="lg">
              Visi pavyzdžiai
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
