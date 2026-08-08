"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import { TypeSpecimen } from "./features/TypeSpecimen";
import { SearchProof } from "./features/SearchProof";
import { ReflowProof } from "./features/ReflowProof";
import { caps, type ArtefactProps } from "./features/shared";

/* "Ką gaunate" — three claims, each replaced by a live artefact that proves
   itself in front of the visitor. The artefacts are the same three components
   in both vehicles; only the thing carrying them changes:

     rail   a horizontal track under a sticky panel, one beat per artefact
     flow   a calm vertical sequence, each artefact full-width

   ── Why the choice is made in CSS, not in an effect ──────────────────────

   This used to render a third "plain" vehicle on the server and swap to the
   rail in a useEffect. The two have very different heights, so the instant
   hydration finished every section below this one — most of the page — moved
   down by more than a screen. Anyone who started reading during hydration
   lost their place.

   So both vehicles ship in the markup and a media query picks one. The server
   render is therefore already the right height, and nothing below moves.

   For the same reason the rail is a sticky panel over a track of declared
   height rather than a GSAP `pin: true`. A pin injects its spacer at runtime,
   which is the same post-hydration growth by another route; `h: RAIL_SCREENS`
   in the markup is a height the server can render. GSAP is left with the one
   job it is actually needed for — turning scroll position into track travel. */

const ARTEFACTS: Array<(p: ArtefactProps) => ReactElement> = [
  TypeSpecimen,
  SearchProof,
  ReflowProof,
];
const TOTAL = services.length;

/* Timeline shape, in abstract units. A beat is the dwell where a panel sits
   centred and its artefact plays; a travel is the slide between two beats. */
const BEAT = 0.72;
const TRAVEL = 1;
const UNITS = BEAT + (BEAT + TRAVEL) * (TOTAL - 1);

/* Screens of scroll spent on each travel, and the resulting track height.
   Kept deliberately short: BuildSequence holds the viewport for four screens
   immediately after this section, and two long scroll-driven scenes back to
   back stop reading as a decision and start reading as a mannerism. */
const TRAVEL_SCREENS = 1.15;
const RAIL_SCREENS = 1 + (TOTAL - 1) * TRAVEL_SCREENS;

/* The rail needs width AND height: the sticky panel spends a fixed ~217px on
   its header before the artefact gets any room, and below roughly 720px of
   viewport the tallest plate no longer fits inside what is left. The panel is
   clipped, so that shortfall would be silent — no scrollbar, no way to reach
   the bottom of the artefact. A 1366x768 laptop lands right in that band.
   Under the threshold, and under reduced motion, the flow vehicle carries the
   same three artefacts with no height budget at all.

   The query is duplicated as a Tailwind variant on the two vehicle wrappers
   below; the copies must agree. Tailwind's `motion-safe` is the
   `prefers-reduced-motion: no-preference` half of the same condition. */
const RAIL_MQ =
  "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";
const RAIL_ON =
  "[@media(min-width:1024px)_and_(min-height:720px)]:motion-safe:block";
const RAIL_OFF =
  "[@media(min-width:1024px)_and_(min-height:720px)]:motion-safe:hidden";

function Lede() {
  return (
    <>
      <Eyebrow>Kas įeina</Eyebrow>
      <h2 className="t-h2 mt-3">Ką gaunate.</h2>
    </>
  );
}

function PanelCopy({ i }: { i: number }) {
  const s = services[i];
  return (
    <div className="min-w-0">
      <span className={cn(caps, "block text-text-muted")}>0{i + 1}</span>
      <h3 className="mt-4 text-[clamp(1.5rem,2.1vw,1.9rem)] font-normal leading-[1.15] text-text">
        {s.title}
      </h3>
      <p className="t-body mt-4 max-w-[34ch] text-[1rem]">{s.body}</p>
    </div>
  );
}

/* ── rail ─────────────────────────────────────────────────────────────── */

function Rail({ armed, live }: { armed: boolean; live: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  // The first panel is already centred when the rail mounts, so its artefact
  // has to wait for the scene itself to arrive — otherwise it plays to nobody.
  const scene = useInView(panel, { once: true, amount: 0.35 });

  useEffect(() => {
    // `live` mirrors the media query that decides whether this vehicle is
    // displayed at all. Off-duty the whole subtree is display:none, so every
    // measurement ScrollTrigger would take reads zero.
    if (!live) return;
    const panelEl = panel.current;
    const trackEl = track.current;
    const stripEl = strip.current;
    const barEl = bar.current;
    if (!panelEl || !trackEl || !stripEl || !barEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const inners = gsap.utils.toArray<HTMLElement>(".fx-inner", stripEl);
      const width = () => Math.max(1, panelEl.clientWidth);

      // Panels that have not arrived yet sit slightly ahead of their slot, so
      // the content lags the frame as the strip moves. Depth, not decoration.
      gsap.set(inners, { xPercent: (i: number) => (i === 0 ? 0 : 7) });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: trackEl,
          start: "top top",
          end: "bottom bottom",
          // Lenis already smooths this page (lerp 0.1, wired into
          // ScrollTrigger.update). A scrub duration on top of it is a second
          // smoothing stage — the track keeps travelling well after the wheel
          // stops, which is the long inertia tail this project rejected. It
          // also desynced the 01/02/03 index, which reads raw progress.
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const unit = self.progress * UNITS;
            let i = 0;
            for (let k = 0; k < TOTAL - 1; k += 1) {
              if (unit >= BEAT * (k + 1) + TRAVEL * k + TRAVEL / 2) i = k + 1;
            }
            setActive((prev) => (prev === i ? prev : i));
          },
        },
      });

      tl.to({}, { duration: BEAT });
      for (let i = 1; i < TOTAL; i += 1) {
        tl.to(stripEl, {
          x: () => -width() * i,
          duration: TRAVEL,
          ease: "power2.inOut",
        });
        tl.to(inners[i - 1], { xPercent: -7, duration: TRAVEL }, "<");
        tl.to(inners[i], { xPercent: 0, duration: TRAVEL }, "<");
        tl.to({}, { duration: BEAT });
      }
      // the quiet progress rule, filling across the whole track
      tl.fromTo(barEl, { scaleX: 0 }, { scaleX: 1, duration: UNITS }, 0);
    }, track);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [live]);

  return (
    <div
      ref={track}
      className="relative"
      style={{ height: `${RAIL_SCREENS * 100}svh` }}
    >
      <div
        ref={panel}
        /* overflow-clip, not hidden: clipping IS the right answer for a
           translated strip, and clip (unlike hidden) does not turn this into
           a scroll container, which would break its own stickiness. */
        className="sticky top-0 flex h-[100svh] flex-col overflow-clip bg-surface-2"
      >
        <Container className="shrink-0 pt-[clamp(88px,10.5vh,124px)]">
          <div className="flex items-end justify-between gap-10">
            <div className="min-w-0">
              <Lede />
            </div>
            {/* decorative: each panel already announces its own index */}
            <ol aria-hidden="true" className="flex shrink-0 items-center gap-4 pb-1.5">
              {services.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "text-[0.78rem] tabular-nums transition-colors duration-[var(--d-el)] ease-[var(--e-out)]",
                    active === i ? "text-text" : "text-text-muted/40",
                  )}
                >
                  0{i + 1}
                </li>
              ))}
            </ol>
          </div>
          <div className="relative mt-6 h-px w-full bg-border">
            <span
              ref={bar}
              aria-hidden="true"
              className="absolute inset-0 block origin-left bg-text"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </Container>

        <div className="relative min-h-0 flex-1">
          <div ref={strip} className="grid h-full grid-flow-col auto-cols-[100%]">
            {services.map((s, i) => {
              const Artefact = ARTEFACTS[i];
              return (
                <div key={s.title} className="flex h-full items-center">
                  {/* same measure as Container, so the panel copy sits on the
                      section's own left margin */}
                  <div className="fx-inner mx-auto grid w-full max-w-[1300px] grid-cols-[minmax(0,280px)_minmax(0,1fr)] items-center gap-[clamp(36px,4.5vw,72px)] px-6 sm:px-8">
                    <PanelCopy i={i} />
                    <div className="min-w-0">
                      <Artefact play={scene && active === i} armed={armed} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── flow ─────────────────────────────────────────────────────────────── */

function Beat({ i, armed }: { i: number; armed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const Artefact = ARTEFACTS[i];
  const s = services[i];

  return (
    <div>
      <div
        data-rise
        style={{ "--i": 0 } as CSSProperties}
        className="border-t border-border pt-4"
      >
        <div className="flex items-baseline gap-4">
          <span className={cn(caps, "shrink-0 text-text-muted")}>0{i + 1}</span>
          <h3 className="t-h3 min-w-0">{s.title}</h3>
        </div>
        <p className="t-body mt-3 max-w-[42ch]">{s.body}</p>
      </div>
      <div ref={ref} data-rise style={{ "--i": 1 } as CSSProperties} className="mt-6">
        <Artefact play={inView} armed={armed} />
      </div>
    </div>
  );
}

function Flow({ armed }: { armed: boolean }) {
  return (
    <div className="py-[clamp(80px,12vw,140px)]">
      <Container>
        <Reveal className="max-w-[560px]">
          <Lede />
        </Reveal>
        <div className="mt-[clamp(44px,9vw,72px)] flex flex-col gap-[clamp(56px,13vw,96px)]">
          {services.map((s, i) => (
            <Beat key={s.title} i={i} armed={armed} />
          ))}
        </div>
      </Container>
    </div>
  );
}

/* ── section ──────────────────────────────────────────────────────────── */

export function Features() {
  /* Two client-only facts, and neither one moves the layout.
     `armed` false is the finished, nothing-hidden state of every artefact —
     the correct server render, and the permanent state for a reduced-motion
     visitor. `live` only decides whether the rail's ScrollTrigger is built;
     which vehicle is *shown* is settled in CSS above. */
  const [armed, setArmed] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const rail = window.matchMedia(RAIL_MQ);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setArmed(!reduce.matches);
      setLive(rail.matches);
    };
    sync();
    rail.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      rail.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section id="paslaugos" className="bg-surface-2 text-text">
      <div className={cn("hidden", RAIL_ON)}>
        <Rail armed={armed} live={live} />
      </div>
      <div className={cn("block", RAIL_OFF)}>
        <Flow armed={armed} />
      </div>
    </section>
  );
}
