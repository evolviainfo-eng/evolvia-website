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
import { SeamField } from "@/components/ui/SeamField";

const STATEMENT = "Pamatote svetainę gyvai. Tik tada mokate.";
const WORDS = STATEMENT.split(" ");

// Words reveal across the first half of the scroll, the sub-line follows
// right after — and everything HOLDS fully visible for the rest of the pin
// (the sub-line used to appear at ~0.9 and unpin immediately: it flashed
// and vanished before it could be read).
const REVEAL_END = 0.5;

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
  // NOTE: every mapping needs an explicit hold keyframe at progress 1 —
  // framer's native ScrollTimeline path otherwise interpolates back to the
  // element's inline initial value after the last keyframe (the text used
  // to fade back OUT during the final third of the pin).
  // Resting opacity is 0.3, not the 0.14 it was: framer serialises this value
  // into the static HTML, so 0.14 meant a JS failure left the statement
  // effectively invisible. 0.3 still reads as clearly "not yet revealed"
  // while degrading to dim-but-legible.
  const opacity = useTransform(progress, [start, end, 1], [0.3, 1, 1]);
  return (
    <span className="inline-block">
      <motion.span
        style={reduce ? undefined : { opacity }}
        className="inline-block"
      >
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

  const subOpacity = useTransform(scrollYProgress, [0.54, 0.7, 1], [0, 1, 1]);
  const subY = useTransform(scrollYProgress, [0.54, 0.7, 1], [20, 0, 0]);

  return (
    // Tall track gives the sticky inner room to scrub the reveal — and a
    // long fully-assembled hold (~last 30%) so the message can be read.
    <section
      ref={ref}
      className="relative min-h-[220vh] bg-ink-bg text-ink-fg"
      aria-label="Pamatote svetainę gyvai. Tik tada mokate."
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden py-24">
        {/* The floor the shader sits on — and the whole background when there
            is no WebGL2, no GPU worth spending, or reduced motion is on. It is
            composed to stand alone, not to look like something failed. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 42%, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.022) 38%, transparent 72%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <SeamField />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="t-eyebrow text-ink-fg/55">Be rizikos</p>

            <h2
              aria-hidden="true"
              className="mt-6 font-normal"
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
              className="mx-auto mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-fg/70 sm:text-[1.25rem]"
            >
              Jokios rizikos. Jokių prielaidų. Sukuriame realų eskizą jūsų
              verslui. Jei nepatinka, nieko nemokate.
            </motion.p>
          </div>
        </Container>
      </div>
    </section>
  );
}
