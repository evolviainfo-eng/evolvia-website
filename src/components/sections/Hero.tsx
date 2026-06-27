"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroDevice } from "@/components/ui/HeroDevice";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const copyStyle = reduce ? undefined : { y: copyY, opacity: fade };
  const deviceStyle = reduce ? undefined : { y: deviceY };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      {/* subtle monochrome depth wash (theme-aware) */}
      <div
        className="anim-aura pointer-events-none absolute right-[-10%] top-[6%] h-[560px] w-[760px] max-w-[110vw] rounded-full"
        style={{
          background: "radial-gradient(closest-side, var(--aura), transparent)",
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="grid items-center gap-12 pt-[120px] pb-[clamp(56px,8vw,96px)] lg:min-h-[90vh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* copy */}
          <motion.div style={copyStyle} className="max-w-[640px]">
            <motion.p
              {...rise(0.05)}
              className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-text-muted"
            >
              <span className="inline-block h-px w-6 bg-text/30" />
              web dizainas
            </motion.p>

            <h1 className="mt-6 font-bold tracking-[-0.035em] text-text [font-size:clamp(2.6rem,5.4vw,4.6rem)] [line-height:1.03]">
              <motion.span {...rise(0.16)} className="block">
                Tavo konkurentai
              </motion.span>
              <motion.span {...rise(0.3)} className="block">
                jau matomi.
              </motion.span>
              <motion.span {...rise(0.44)} className="block">
                O tu?
              </motion.span>
            </h1>

            <motion.p
              {...rise(0.58)}
              className="mt-6 max-w-[44ch] text-pretty text-[1.0625rem] leading-relaxed text-text-muted sm:text-[1.1875rem]"
            >
              Modernios svetainės Lietuvos verslui. Nuo pirmo eskizo iki
              paleidimo — viskas padaroma už jus.
            </motion.p>

            <motion.div
              {...rise(0.7)}
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
            </motion.div>
          </motion.div>

          {/* device */}
          <motion.div
            style={deviceStyle}
            initial={reduce ? false : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
            className="lg:pl-4"
          >
            <div className="anim-float">
              <HeroDevice />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.3 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        aria-hidden="true"
      >
        <span className="relative block h-9 w-px bg-text/15">
          <span className="anim-scrollcue absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-text/50" />
        </span>
      </motion.div>
    </section>
  );
}
