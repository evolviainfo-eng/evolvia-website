"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGlyph } from "@/components/ui/icons";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

const TOTAL = services.length;

type Mode = "plain" | "stack" | "focus";

function Heading() {
  return (
    <Reveal className="max-w-[640px]">
      <Eyebrow>Kas įeina</Eyebrow>
      <h2 className="t-h2 mt-4">Ką gaunate.</h2>
    </Reveal>
  );
}

function CardInner({ i }: { i: number }) {
  const s = services[i];
  return (
    <article className="rounded-card border border-border bg-surface p-8 shadow-[var(--shadow-card)] sm:p-9">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg text-text">
        <ServiceGlyph name={s.icon} className="h-7 w-7" />
      </span>
      <h3 className="t-h3 mt-7">{s.title}</h3>
      <p className="t-body mt-3 max-w-[34ch]">{s.body}</p>
    </article>
  );
}

export function Features() {
  const wrap = useRef<HTMLDivElement>(null);
  const stackWrap = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("plain");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const lgMql = window.matchMedia("(min-width: 1024px)");
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () =>
      setMode(
        reduceMql.matches ? "plain" : lgMql.matches ? "focus" : "stack",
      );
    decide();
    lgMql.addEventListener("change", decide);
    reduceMql.addEventListener("change", decide);
    return () => {
      lgMql.removeEventListener("change", decide);
      reduceMql.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (mode === "plain") return;
    gsap.registerPlugin(ScrollTrigger);
    let ctx: gsap.Context | undefined;

    if (mode === "focus" && wrap.current) {
      const last = { v: -1 };
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: wrap.current!,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const i = Math.min(TOTAL - 1, Math.floor(self.progress * TOTAL));
            if (i !== last.v) {
              last.v = i;
              setActive(i);
            }
          },
        });
      }, wrap);
    } else if (mode === "stack" && stackWrap.current) {
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
        cards.forEach((card, i) => {
          if (i >= cards.length - 1) return;
          // recede to a faint ghost via OPACITY ONLY (no scale) — scaling
          // rasterizes text and makes it blurry; opacity keeps it crisp.
          gsap.to(card, {
            opacity: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 92%",
              end: "top 58%",
              scrub: true,
            },
          });
        });
      }, stackWrap);
    }

    ScrollTrigger.refresh();
    return () => ctx?.revert();
  }, [mode]);

  return (
    <section id="paslaugos" className="bg-surface-2 text-text">
      {/* PLAIN — reduced motion */}
      {mode === "plain" && (
        <div className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <Heading />
            <div className="mt-[clamp(40px,6vw,72px)] grid gap-5 md:grid-cols-3">
              {services.map((_, i) => (
                <div key={services[i].title} className="h-full">
                  <CardInner i={i} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* STACK — mobile sticky deck */}
      {mode === "stack" && (
        <div className="py-[clamp(80px,12vw,120px)]">
          <Container>
            <Heading />
            <div ref={stackWrap} className="mt-10 flex flex-col gap-6">
              {services.map((_, i) => (
                <div
                  key={services[i].title}
                  className="stack-card sticky"
                  style={{ top: `${92 + i * 12}px` }}
                >
                  <CardInner i={i} />
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="h-[24vh]" />
          </Container>
        </div>
      )}

      {/* FOCUS — desktop pinned rotation */}
      {mode === "focus" && (
        <div ref={wrap} className="relative" style={{ height: `${TOTAL * 90}vh` }}>
          <div className="sticky top-0 flex min-h-screen items-center">
            <Container>
              <div className="grid grid-cols-[0.8fr_1.2fr] items-center gap-16">
                <div>
                  <Eyebrow>Kas įeina</Eyebrow>
                  <h2 className="t-h2 mt-4">Ką gaunate.</h2>
                  <ul className="mt-14 flex flex-col">
                    {services.map((s, i) => (
                      <li
                        key={s.title}
                        className="flex items-center gap-5 border-b border-border py-5 last:border-0"
                      >
                        <span
                          className={cn(
                            "text-[0.85rem] tabular-nums transition-colors duration-500",
                            active === i ? "text-text" : "text-text-muted/40",
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "h-px bg-text transition-all duration-500",
                            active === i ? "w-7 opacity-100" : "w-0 opacity-0",
                          )}
                        />
                        <span
                          className={cn(
                            "text-[1.4rem] tracking-[-0.02em] transition-colors duration-500",
                            active === i ? "text-text" : "text-text-muted/40",
                          )}
                        >
                          {s.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative h-[380px]">
                  {services.map((s, i) => (
                    <div
                      key={s.title}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        active === i
                          ? "translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-4 opacity-0",
                      )}
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg text-text">
                        <ServiceGlyph name={s.icon} className="h-8 w-8" />
                      </span>
                      <h3 className="mt-9 text-[clamp(1.8rem,2.6vw,2.4rem)] font-normal tracking-[-0.03em] text-text">
                        {s.title}
                      </h3>
                      <p className="t-body mt-5 max-w-[42ch] text-[1.15rem]">
                        {s.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}
    </section>
  );
}
