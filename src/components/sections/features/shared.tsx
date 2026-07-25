"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared plumbing for the three "Ką gaunate" artefacts.
 *
 *  Each artefact is a small live demonstration rather than an illustration of
 *  a claim, so they all need the same two things: a way to know when their
 *  beat has arrived, and a pre-roll state that can never strand content.
 */
export interface ArtefactProps {
  /** True once this artefact's beat is on screen. It plays from here. */
  play: boolean;
  /** False until the client has mounted WITH motion allowed. While false the
   *  artefact renders its finished state immediately — so no-JS visitors and
   *  reduced-motion visitors never meet an element parked at opacity 0. */
  armed: boolean;
  className?: string;
}

/** Plays once and stays played: scrubbing a pinned rail backwards must not
 *  rewind an artefact that has already made its point.
 *
 *  The latch is set during render rather than in an effect — the artefact has
 *  to be in its played state on the same frame the beat arrives, and a latch
 *  by definition never needs to un-latch. */
export function useLatch(play: boolean) {
  const [on, setOn] = useState(false);
  if (play && !on) setOn(true);
  return play || on;
}

/** True while the artefact is still holding its pre-roll state. */
export function usePre(play: boolean, armed: boolean) {
  const on = useLatch(play);
  return armed && !on;
}

/** Offset inside one gesture, on the house 70ms step. */
export function step(i: number): CSSProperties {
  return { transitionDelay: `calc(${i} * var(--d-step))` };
}

/** The sheet each artefact is printed on. */
export function Plate({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6 lg:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small-caps annotation type — the voice of a printed manual.
 *
 *  Deliberately carries no colour. `cn` is a plain joiner, not tailwind-merge,
 *  so a colour baked in here would survive alongside any colour added at the
 *  call site and the two would fight on specificity order. Every user of
 *  `caps` states its own ink. */
export const caps =
  "text-[0.6rem] font-medium uppercase tracking-[0.16em] sm:text-[0.64rem]";

/** The caption strip at the top of every plate. */
export function PlateHead({ no, name }: { no: string; name: string }) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-border pb-3 text-text-muted",
        caps,
      )}
    >
      <span className="min-w-0 truncate">Pavyzdys {no}</span>
      <span className="min-w-0 shrink-0 truncate text-text">{name}</span>
    </div>
  );
}

/** One headline line sliding up out of its own mask.
 *  Mirrors the house `data-line` primitive, but driven by the artefact's own
 *  beat instead of the global observer — the panels off to the right of a
 *  pinned rail are never reliably "in view" for an IntersectionObserver. */
export function Mask({
  show,
  i = 0,
  children,
}: {
  show: boolean;
  i?: number;
  children: ReactNode;
}) {
  return (
    <span className="-mb-[0.16em] block overflow-hidden pb-[0.16em]">
      <span
        className={cn(
          "block transition-transform duration-[var(--d-scene)] ease-[var(--e-out)]",
          show ? "translate-y-0" : "translate-y-[112%]",
        )}
        style={step(i)}
      >
        {children}
      </span>
    </span>
  );
}
