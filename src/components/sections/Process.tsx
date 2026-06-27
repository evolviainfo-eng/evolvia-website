"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps, type ProcessStep } from "@/content/process";
import { cn } from "@/lib/cn";

const TOTAL = processSteps.length;

function StepNode({
  index,
  active,
}: {
  index: number;
  active: MotionValue<number> | null;
}) {
  const label = String(index + 1).padStart(2, "0");
  return (
    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-[0.95rem] font-semibold text-text-muted">
      {label}
      {/* active overlay cross-fades the node from grayscale → solid black */}
      <motion.span
        style={active ? { opacity: active } : undefined}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-accent text-[0.95rem] font-semibold text-accent-text"
      >
        {label}
      </motion.span>
    </span>
  );
}

function StepText({ step }: { step: ProcessStep }) {
  return (
    <>
      <h3 className="t-h3">{step.title}</h3>
      {step.lead && (
        <span className="mt-3 inline-block rounded-full border border-border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text">
          Be rizikos
        </span>
      )}
      <p className="t-body mt-3 max-w-[30ch]">{step.body}</p>
    </>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });

  // Connecting line draws as the section scrolls in.
  const lineGrow = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  // Per-step activation windows (each node lights up in sequence).
  const a0 = useTransform(scrollYProgress, [0.0, 0.18], [0, 1]);
  const a1 = useTransform(scrollYProgress, [0.22, 0.4], [0, 1]);
  const a2 = useTransform(scrollYProgress, [0.46, 0.64], [0, 1]);
  const a3 = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const actives = reduce ? [null, null, null, null] : [a0, a1, a2, a3];

  return (
    <Section id="procesas" tone="secondary">
      <Container>
        <Reveal className="max-w-[640px]">
          <Eyebrow>Kaip dirbame</Eyebrow>
          <h2 className="t-h2 mt-4">Procesas be staigmenų.</h2>
          <p className="t-body mt-5 max-w-[52ch]">
            Keturi aiškūs žingsniai nuo pirmo pokalbio iki paleidimo. Realią
            svetainę pamatote dar prieš mokėdami.
          </p>
        </Reveal>

        <div ref={ref} className="mt-[clamp(48px,7vw,88px)]">
          {/* desktop: horizontal */}
          <div className="relative hidden md:block">
            <div className="absolute left-[12.5%] right-[12.5%] top-7 h-px bg-border" />
            <motion.div
              style={reduce ? { scaleX: 1 } : { scaleX: lineGrow }}
              className="absolute left-[12.5%] right-[12.5%] top-7 h-px origin-left bg-accent"
            />
            <ol className="grid grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <li key={step.title} className="flex flex-col items-center text-center">
                  <StepNode index={i} active={actives[i]} />
                  <div className="mt-7">
                    <StepText step={step} />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* mobile: vertical */}
          <div className="relative md:hidden">
            <div className="absolute bottom-9 left-7 top-7 w-px bg-border" />
            <motion.div
              style={reduce ? { scaleY: 1 } : { scaleY: lineGrow }}
              className="absolute bottom-9 left-7 top-7 w-px origin-top bg-accent"
            />
            <ol className="flex flex-col gap-12">
              {processSteps.map((step, i) => (
                <li key={step.title} className="flex gap-6">
                  <StepNode index={i} active={actives[i]} />
                  <div className="pt-2.5">
                    <StepText step={step} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
