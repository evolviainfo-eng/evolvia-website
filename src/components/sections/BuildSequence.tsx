"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Canvas } from "./build/Canvas";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────────
   Amatas — a website assembling itself.

   This section is about the artefact, not the engagement: the layers a
   page is made of. The client-facing sequence (call → live sketch →
   launch → maintenance) belongs to Process, which follows immediately
   after — hence no numerals and no "etapai" here. Two numbered
   roads-to-launch back to back read as one trick used twice.

   Desktop: the section pins for 300vh and a real page builds inside
   an artboard, stage by stage, ending on the finished site and
   holding there. ScrollTrigger is used for exactly one thing — turning
   scroll position into a stage number and a progress value. Every
   visual change is then a CSS transition on the house curves, so the
   composition moves with the same hand as the rest of the site
   instead of stuttering along with the wheel.

   Below 1024px the pin is dropped for a storyboard: the same
   composition frozen at each of the five stages, each arriving as its
   own `data-rise` beat.

   Reduced motion (and every server render) gets `static`: the final
   composition, the complete stage index and the closing line as
   ordinary stacked content. Nothing is ever hidden behind the JS gate.
   ───────────────────────────────────────────────────────────── */

type Stage = { title: string; copy: string };

const STAGES: Stage[] = [
  {
    title: "Tinklelis",
    copy: "Dvylika stulpelių ir bendra eilutė. Ant jų sėda visi elementai.",
  },
  {
    title: "Blokai",
    copy: "Antraštė, pagrindinis ekranas, tekstas, galerija, poraštė — vietos prieš turinį.",
  },
  {
    title: "Tipografija",
    copy: "Tikras tekstas tikrais dydžiais — ne „Lorem ipsum“ ir ne pilki brūkšniai.",
  },
  {
    title: "Nuotraukos",
    copy: "Jūsų nuotraukos — apkarpytos, suspaustos, greitai užsikraunančios.",
  },
  {
    title: "Gyva svetainė",
    copy: "Tinklelis dingsta, lieka svetainė. Tokia, kokią pamatys jūsų klientas.",
  },
];

const FINAL = STAGES.length - 1;

/** where each stage takes over inside the pin. The tail is the part that
    can kill the section: a pinned viewport that stops changing is
    indistinguishable from a stuck page, so the last stage holds ~24% of a
    300vh track (~72vh) rather than 29% of 440vh (~127vh). The lead-in is
    kept under 2% for the same reason — nobody wants to scroll an empty
    rounded rectangle. */
const THRESHOLDS = [0.02, 0.16, 0.34, 0.54, 0.76];

type Mode = "static" | "pin" | "steps";

/* One transition per item rather than one per line of text: the whole row
   dims together, which is both fewer animated elements and a cleaner read.
   Colour stays fixed so the dim states keep real contrast — at
   text-text-muted/30 the upcoming copy computed to ~1.9:1 in light mode and
   simply was not there. */
const DIM = "transition-opacity duration-[var(--d-el)] ease-[var(--e-out)]";

function StageIndex({
  active,
  progressRef,
  scrubbed,
}: {
  active: number;
  progressRef?: React.RefObject<HTMLSpanElement | null>;
  scrubbed?: boolean;
}) {
  return (
    <div className="relative min-w-0 pl-[clamp(18px,2vw,30px)]">
      <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-border" />
      <span
        ref={progressRef}
        aria-hidden
        className="absolute inset-y-0 left-0 w-px origin-top bg-text"
        style={scrubbed ? undefined : { transform: "scaleY(1)" }}
      />
      <ol>
        {STAGES.map((s, i) => {
          const state = i === active ? "now" : i < active ? "done" : "next";
          return (
            <li
              key={s.title}
              className={cn(
                "min-w-0 py-[clamp(6px,1.1vh,13px)]",
                DIM,
                state === "now"
                  ? "opacity-100"
                  : state === "done"
                    ? "opacity-85"
                    : "opacity-65",
              )}
            >
              <h3 className="text-[1.02rem] leading-tight tracking-[-0.015em] text-text">
                {s.title}
              </h3>
              <p className="mt-1 text-[0.855rem] leading-[1.5] text-text-muted">
                {s.copy}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function BuildSequence() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  // Server render — and anything before JS decides otherwise — is the
  // complete, final state.
  const [mode, setMode] = useState<Mode>("static");
  const [stage, setStage] = useState(FINAL);
  // `static` is also the server render, so it ships one artboard, not one per
  // breakpoint; which artboard it is gets decided once JS knows the width.
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const small = window.matchMedia("(max-width: 639px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      const next: Mode = reduce.matches
        ? "static"
        : wide.matches
          ? "pin"
          : "steps";
      setMode(next);
      // Batched with the mode on purpose. Left to the effect below, the pin
      // would paint one frame of the finished composition and then animate
      // it apart — a full --d-scene teardown on every desktop load.
      setStage(next === "pin" ? -1 : FINAL);
      setCompact(small.matches);
    };
    decide();
    wide.addEventListener("change", decide);
    small.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      small.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (mode !== "pin" || !track.current) {
      setStage(FINAL);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const line = progress.current;
      if (line) gsap.set(line, { transformOrigin: "0% 0%", scaleY: 0 });
      const setScale = line ? gsap.quickSetter(line, "scaleY") : null;

      let last = -2;
      const apply = (p: number) => {
        setScale?.(p);
        let next = -1;
        for (let i = 0; i < THRESHOLDS.length; i += 1) {
          if (p >= THRESHOLDS[i]) next = i;
        }
        if (next !== last) {
          last = next;
          setStage(next);
        }
      };

      const st = ScrollTrigger.create({
        trigger: track.current!,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });
      apply(st.progress);
    }, section);

    return () => ctx.revert();
  }, [mode]);

  return (
    /* Desktop only. The sequence needs a wide artboard and a long pin to read
       as anything; squeezed onto a phone it became a stack of small frames
       that said less than the sections around it, so it is dropped there
       rather than shipped diminished. */
    <section
      ref={section}
      id="kaip-kuriame"
      className="hidden bg-bg text-text lg:block"
    >
      <Container>
        <div className="pt-[clamp(80px,12vw,160px)]">
          <Reveal className="max-w-[680px]">
            <Eyebrow>Amatas</Eyebrow>
            <h2 className="t-h2 mt-4">Svetainė, kuri susidėlioja prieš akis.</h2>
            <p className="t-body mt-5 max-w-[54ch]">
              Tinklelis, blokai, tipografija, nuotraukos — sluoksniai, iš kurių
              sudėliota kiekviena mūsų svetainė. Paprastai jų nematyti. Čia
              matote visus.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* ── desktop: the pin ─────────────────────────────────────── */}
      {mode === "pin" && (
        <div ref={track} className="relative h-[300vh]">
          <div className="sticky top-0 flex h-[100svh] items-center pt-[72px]">
            {/* Wider than the site Container on purpose: this is the section
                where the artefact IS the argument, so it gets the room. */}
            <div className="mx-auto w-full min-w-0 max-w-[1340px] px-6 sm:px-8">
              <div className="grid grid-cols-[minmax(0,280px)_minmax(0,1fr)] items-center gap-[clamp(32px,4vw,72px)]">
                <StageIndex
                  active={Math.max(0, Math.min(FINAL, stage))}
                  progressRef={progress}
                  scrubbed
                />
                <div
                  className="mx-auto w-full min-w-0"
                  style={{ maxWidth: "calc(min(60svh,580px)*1.6)" }}
                >
                  <Canvas stage={stage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── narrow: the same composition as a storyboard ───────────
          One column at every width. The old two-column beat put the artboard
          in a 1.15fr track, which made it *narrower* as the viewport grew
          (576px stacked at 640 → 359px in two columns at 768). Stacked, the
          frame only ever gets bigger — and past 640 it is wide enough to run
          the full 12-column composition, gallery beat included. */}
      {mode === "steps" && (
        <Container>
          <ol className="mt-[clamp(40px,8vw,64px)] space-y-[clamp(44px,10vw,72px)]">
            {STAGES.map((s, i) => (
              <li key={s.title} data-rise className="min-w-0">
                <div className="min-w-0 border-t border-border pt-4">
                  <h3 className="text-[1.06rem] tracking-[-0.015em] text-text">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[42ch] text-[0.92rem] leading-[1.55] text-text-muted">
                    {s.copy}
                  </p>
                </div>
                <Canvas
                  stage={i}
                  compact={compact}
                  className="mt-5 min-w-0"
                />
              </li>
            ))}
          </ol>
        </Container>
      )}

      {/* ── static: reduced motion, and every server render ──────── */}
      {mode === "static" && (
        <Container>
          <div className="mt-[clamp(44px,7vw,80px)] grid min-w-0 items-center gap-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
            <StageIndex active={FINAL} />
            <div className="min-w-0">
              <Canvas stage={FINAL} compact={compact} />
            </div>
          </div>
        </Container>
      )}

      {/* ── the one line rescued from the comparison table ───────── */}
      <Container>
        <div className="pb-[clamp(80px,12vw,160px)]">
          <div
            data-rise
            className="mt-[clamp(56px,9vw,112px)] border-t border-border pt-[clamp(26px,4vw,44px)]"
          >
            <p className="max-w-[30ch] text-[clamp(1.2rem,2.1vw,1.6rem)] leading-[1.35] font-light tracking-[-0.025em] text-text">
              Tą patį darbą gali padaryti pigiau. Bet ne taip, kad atrodytum
              brangiai.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
