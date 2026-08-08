"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import {
  Mask,
  Plate,
  PlateHead,
  caps,
  step,
  usePre,
  type ArtefactProps,
} from "./shared";

/** Neutral tone ramp — percentages of --text mixed into --bg, so it stays
 *  monochrome and correct in both themes. */
const TONES = [8, 22, 40, 66, 100];

/** ARTEFACT 01 — an editorial type specimen.
 *
 *  The claim is "modern design". Rather than say it, the panel sets a real
 *  Lithuanian headline on ruled baselines and then prints the full diacritic
 *  set at size — the one thing on this plate a visitor can check against the
 *  template site they are comparing us with, where ų and ė are usually the
 *  first casualties.
 *
 *  What this plate deliberately does NOT do is annotate its own tracking and
 *  leading. Those numbers are a designer talking to designers; the buyer owns
 *  none of them and learns nothing from them.
 */
export function TypeSpecimen({ play, armed, className }: ArtefactProps) {
  const pre = usePre(play, armed);

  return (
    <Plate className={className}>
      <PlateHead no="01" name="Tipografija" />

      {/* Baseline field. The rules repeat from the bottom at exactly the
          leading interval, so one lands under each line of the headline. */}
      <div
        className="relative mt-5"
        style={
          {
            /* Height matters as much as width here: the plate lives inside a
               pinned rail with a fixed vertical budget, so the headline is
               capped by the shorter of the two axes. */
            "--fs": "clamp(1.75rem, min(3.6vw, 5.6vh), 3.4rem)",
            "--lead": "1.1",
          } as CSSProperties
        }
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-left transition-transform duration-[var(--d-scene)] ease-[var(--e-out)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to top, var(--border) 0 1px, transparent 1px calc(var(--fs) * var(--lead)))",
            transform: pre ? "scaleX(0)" : "scaleX(1)",
          }}
        />
        <p
          className="relative font-normal tracking-[-0.035em] text-text"
          style={{ fontSize: "var(--fs)", lineHeight: "var(--lead)" }}
        >
          <Mask show={!pre} i={1}>
            Švarios linijos,
          </Mask>
          <Mask show={!pre} i={2}>
            tikslūs tarpai.
          </Mask>
        </p>
      </div>

      {/* The evidence: the character set the headline is actually set in,
          at reading size rather than as a footnote. */}
      <div
        className={cn(
          "mt-[clamp(16px,2.4vh,24px)] border-t border-border pt-[clamp(12px,2vh,18px)] transition-[opacity,translate] duration-[var(--d-gesture)] ease-[var(--e-out)]",
          pre ? "translate-y-1.5 opacity-0" : "translate-y-0 opacity-100",
        )}
        style={step(4)}
      >
        <p
          className="truncate leading-[1.25] tracking-[0.14em] text-text"
          style={{ fontSize: "clamp(1.15rem, min(2.6vw, 3.8vh), 2rem)" }}
        >
          ĄČĘĖĮŠŲŪŽ
        </p>
        <p
          className="mt-1 truncate leading-[1.25] tracking-[0.14em] text-text-muted"
          style={{ fontSize: "clamp(1.15rem, min(2.6vw, 3.8vh), 2rem)" }}
        >
          ąčęėįšųūž
        </p>
        <p className={cn(caps, "mt-2.5 text-text-muted")}>
          Visi lietuviški rašmenys — didžiosios ir mažosios
        </p>
      </div>

      {/* Neutral tone ramp. */}
      <div className="mt-[clamp(16px,2.4vh,24px)] flex gap-1.5">
        {TONES.map((tone, i) => (
          <span
            key={tone}
            className={cn(
              "h-[clamp(22px,3.4vh,32px)] min-w-0 flex-1 origin-bottom border border-border transition-transform duration-[var(--d-el)] ease-[var(--e-out)]",
              pre ? "scale-y-0" : "scale-y-100",
            )}
            style={{
              backgroundColor: `color-mix(in oklab, var(--text) ${tone}%, var(--bg))`,
              ...step(6 + i),
            }}
          />
        ))}
      </div>
      <p className={cn(caps, "mt-2.5 text-text-muted")}>
        Neutralus pagrindas — jūsų spalvai lieka vietos
      </p>
    </Plate>
  );
}
