"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DemoSite } from "@/components/ui/DemoSite";
import { demos } from "@/content/demos";

/* The hero frame used to be a hand-built mock of a fictional "atelier.lt".
   It now shows a real demo — the e-shop, the one the homepage work section
   doesn't already carry — so the first thing a visitor sees is a website they
   can actually open. */
const heroDemo = demos.find((d) => d.slug === "skalsa") ?? demos[0];

/** One line of the headline, revealed by sliding up out of its mask.
 *
 *  The reveal is pure CSS (`data-line` in globals.css) rather than framer,
 *  and that is the point: framer serialises its `initial` state as an inline
 *  style, so the static HTML used to ship this headline at
 *  `translateY(112%)` — parked below its mask, invisible until JS ran. The
 *  CSS version is gated behind `html[data-choreo]`, which the boot script
 *  sets before paint and a watchdog removes if the observer never arrives.
 *  Worst case the headline is simply visible.
 */
function Line({ children, i }: { children: string; i: number }) {
  return (
    <span
      data-line
      style={{ "--i": i } as React.CSSProperties}
      className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
    >
      <span>{children}</span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* Framer is kept for the scroll-linked parallax only. A scroll transform has
     no hidden resting state, so it cannot strand content the way an entrance
     `initial` can. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  // explicit hold at 1 — the ScrollTimeline path would otherwise animate
  // back toward the initial value after the last keyframe
  const fade = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0, 0]);

  const copyStyle = reduce ? undefined : { y: copyY, opacity: fade };
  const deviceStyle = reduce ? undefined : { y: deviceY };

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      {/* subtle monochrome depth wash (theme-aware) */}
      <div
        className="anim-aura pointer-events-none absolute right-[-10%] top-[6%] h-[560px] w-[760px] max-w-[110vw] rounded-pill"
        style={{
          background: "radial-gradient(closest-side, var(--aura), transparent)",
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="grid items-center gap-12 pt-[120px] pb-[clamp(56px,8vw,96px)] lg:min-h-[90vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* copy — one gesture, the parts a stagger step apart */}
          <motion.div style={copyStyle} className="min-w-0 max-w-[640px]">
            <p
              data-rise
              className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-text-muted"
            >
              <span className="inline-block h-px w-6 bg-text/30" />
              web dizainas
            </p>

            {/* Line-level, never letter-level. */}
            <h1 className="mt-6 font-normal text-text [font-size:clamp(2.6rem,5.4vw,4.6rem)] [line-height:1.04]">
              <Line i={2}>Tavo konkurentai</Line>
              <Line i={3}>jau matomi.</Line>
              <Line i={4}>O tu?</Line>
            </h1>

            <p
              data-rise
              style={{ "--i": 7 } as React.CSSProperties}
              className="mt-6 max-w-[44ch] text-pretty text-[1.0625rem] leading-relaxed text-text-muted sm:text-[1.25rem]"
            >
              Modernios svetainės Lietuvos verslui. Nuo pirmo eskizo iki
              paleidimo — viskas padaroma už jus.
            </p>

            <div
              data-rise
              style={{ "--i": 9 } as React.CSSProperties}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                href="#kontaktai"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Gauti nemokamą eskizą
              </Button>
              <Button
                href="#darbai"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Pamatyti darbus
              </Button>
            </div>
          </motion.div>

          {/* device — a real demo, not a mock.
              The parallax and the entrance live on SEPARATE elements on
              purpose: framer writes `transform` inline, which would win over
              the CSS transform `data-rise` needs, and the two would fight. */}
          <motion.div style={deviceStyle} className="min-w-0 lg:pl-4">
            <div data-rise style={{ "--i": 5 } as React.CSSProperties}>
              <DemoSite demo={heroDemo} ratioClass="aspect-[16/10]" eager />
              <p className="mt-3 text-[0.8125rem] text-text-muted">
                Demonstracinė svetainė — atsidaro ir veikia.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
