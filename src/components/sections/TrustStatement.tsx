"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const STATEMENT = "Pamatote svetainę gyvai. Tik tada mokate.";
const WORDS = STATEMENT.split(" ");

// Words reveal across the first ~65% of scroll; the sub-line follows.
const REVEAL_END = 0.62;

function Word({
  children,
  progress,
  start,
  end,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  return (
    <span className="inline-block">
      <motion.span style={reduce ? undefined : { opacity }} className="inline-block">
        {children}
      </motion.span>
      {/* preserve the inter-word space */}
      <span>&nbsp;</span>
    </span>
  );
}

export function TrustStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const subOpacity = useTransform(scrollYProgress, [0.68, 0.9], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.68, 0.9], [20, 0]);

  return (
    // Tall track gives the sticky inner room to scrub the reveal.
    <section
      ref={ref}
      className="relative min-h-[200vh] bg-ink-bg text-ink-fg"
      aria-label="Pamatote svetainę gyvai. Tik tada mokate."
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center py-24">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <p className="t-eyebrow text-ink-fg/55">Be rizikos</p>

            <h2
              aria-hidden="true"
              className="mt-6 font-normal tracking-[-0.035em]"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.9rem)",
                lineHeight: 1.14,
              }}
            >
              {WORDS.map((w, i) => {
                const span = REVEAL_END / WORDS.length;
                const start = i * span;
                const end = start + span * 1.4;
                return (
                  <Word
                    key={`${w}-${i}`}
                    progress={scrollYProgress}
                    start={start}
                    end={Math.min(end, REVEAL_END)}
                    reduce={!!reduce}
                  >
                    {w}
                  </Word>
                );
              })}
            </h2>

            <motion.p
              style={reduce ? undefined : { opacity: subOpacity, y: subY }}
              className="mx-auto mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-fg/70 sm:text-[1.1875rem]"
            >
              Jokios rizikos. Jokių prielaidų. Sukuriame realų eskizą jūsų
              verslui — jei nepatinka, nieko nemokate.
            </motion.p>
          </div>
        </Container>
      </div>
    </section>
  );
}
