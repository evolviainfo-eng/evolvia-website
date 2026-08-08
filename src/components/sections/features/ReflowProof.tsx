"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Plate, PlateHead, caps, useLatch, type ArtefactProps } from "./shared";

/* Sequencing beats, in ms, derived from the motion tokens in globals.css with
   the arithmetic left visible — a retuned token is then a traceable change
   here instead of a silent drift:

     --d-el      520ms   one element entering
     --d-gesture 820ms   a whole section arriving as one gesture

   They live in JS because a layout switch cannot be a CSS transition. */
const D_EL = 520;
const D_GESTURE = 820;
/** The wide layout is allowed to be read before anything moves. */
const HOLD = D_EL + 100;
/** The breakpoint fires mid-travel, as a real one does. */
const FLIP = Math.round(D_GESTURE * 0.45);

const CARDS = ["Konsultacija", "Dizainas", "Paleidimas"];

/* Both the animated frame and the still diptych use this exact box, so the
   artefact is the same height whichever one is on screen — swapping between
   them at hydration must not move the rest of the page. Radii step down from
   the plate's own --radius: a nested frame at the same 14px would read as a
   mistake in concentricity. */
const FRAME =
  "h-[clamp(244px,30vh,276px)] overflow-hidden rounded-[calc(var(--radius)-8px)] border border-border bg-surface-2";

/** The frame's own width, printed as a ruler. */
function Ruler({ width }: { width: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-px shrink-0 bg-border" />
      <span className="h-px min-w-0 flex-1 bg-border" />
      <span className={cn(caps, "shrink-0 tabular-nums text-text")}>
        {width}
      </span>
      <span className="h-px min-w-0 flex-1 bg-border" />
      <span className="h-2 w-px shrink-0 bg-border" />
    </div>
  );
}

/** The one page, laid out for whichever width it currently has. */
function MockPage({ stacked }: { stacked: boolean }) {
  return (
    <div className="flex h-full flex-col p-3">
      {/* nav — links on the wide layout, a burger on the narrow one */}
      <div className="flex items-center justify-between gap-3">
        <span className="shrink-0 text-[0.7rem] font-medium tracking-[-0.02em] text-text">
          studija.
        </span>
        {stacked ? (
          <span
            aria-hidden="true"
            className="flex w-4 shrink-0 flex-col gap-[3px]"
          >
            <span className="h-px w-full bg-text" />
            <span className="h-px w-full bg-text" />
            <span className="h-px w-full bg-text" />
          </span>
        ) : (
          <span className="flex min-w-0 items-center gap-3 overflow-hidden whitespace-nowrap text-[0.56rem] uppercase tracking-[0.1em] text-text-muted">
            <span>Apie</span>
            <span>Darbai</span>
            <span>Kainos</span>
            <span>Kontaktai</span>
          </span>
        )}
      </div>
      <span className="mt-2.5 block h-px w-full bg-border" />

      {/* hero — two columns become one */}
      <div
        className={cn(
          "gap-3",
          stacked
            ? "mt-3 flex flex-col"
            : "my-auto grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-end",
        )}
      >
        <p
          className={cn(
            "min-w-0 tracking-[-0.03em] text-text",
            stacked
              ? "text-[0.85rem] leading-[1.2]"
              : "text-[1.05rem] leading-[1.12]",
          )}
        >
          Jūsų verslas — aiškiai ir tvarkingai.
        </p>
        <p className="min-w-0 text-[0.56rem] leading-[1.5] text-text-muted">
          Vienas turinys. Kiekvienam ekranui — savas išdėstymas.
        </p>
      </div>

      {/* cards — three across become three down */}
      <div
        className={cn(
          "gap-2",
          stacked ? "mt-auto flex flex-col" : "grid grid-cols-3",
        )}
      >
        {CARDS.map((title, i) => (
          <div
            key={title}
            className={cn(
              "min-w-0 rounded-[calc(var(--radius)-10px)] border border-border bg-surface px-2 py-1.5",
              stacked && "flex items-baseline gap-3",
            )}
          >
            <span className="block shrink-0 text-[0.52rem] uppercase tracking-[0.14em] text-text-muted">
              0{i + 1}
            </span>
            <span
              className={cn(
                "block min-w-0 truncate text-[0.62rem] text-text",
                !stacked && "mt-1",
              )}
            >
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** ARTEFACT 03 — one page that reflows.
 *
 *  Not two mockups side by side: a single page whose viewport narrows until
 *  the breakpoint fires, at which point the columns stack, the nav links
 *  become a burger and the type rescales. Same content, re-laid-out.
 *
 *  The frame's `width` is the one property here that is not a transform — a
 *  genuine reflow cannot be faked with a transform, and this is a one-shot
 *  state change on a single element rather than anything driven by scroll.
 *
 *  When there is no motion to spend — the server render, and a visitor who
 *  asked for reduced motion — the comparison moves from time into space
 *  rather than disappearing. Landing straight on the narrow end state, as
 *  this used to, left the caption asserting a rearrangement that never
 *  happened on that visitor's screen; a comparison artefact with the
 *  comparison removed is just a phone mockup and a claim.
 */
export function ReflowProof({ play, armed, className }: ArtefactProps) {
  const on = useLatch(play);
  const [narrowed, setNarrowed] = useState(false);
  const [stackedUp, setStackedUp] = useState(false);

  // `armed` is false for the server render and for a reduced-motion visitor —
  // exactly the two cases that cannot be shown a change over time.
  const still = !armed;

  useEffect(() => {
    if (!on || !armed) return;
    const a = window.setTimeout(() => setNarrowed(true), HOLD);
    const b = window.setTimeout(() => setStackedUp(true), HOLD + FLIP);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [on, armed]);

  return (
    <Plate className={className}>
      <PlateHead no="03" name="Išdėstymas" />

      {still ? (
        /* the comparison, laid out in space */
        <div className="mt-5 grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-3 sm:gap-4">
          <div className="min-w-0">
            <Ruler width="1440" />
            <div className={cn("mt-3", FRAME)}>
              <MockPage stacked={false} />
            </div>
          </div>
          <div className="min-w-0">
            <Ruler width="375" />
            <div className={cn("mt-3", FRAME)}>
              <MockPage stacked />
            </div>
          </div>
        </div>
      ) : (
        /* the comparison, laid out in time */
        <div className="mt-5">
          <div
            className={cn(
              "mx-auto transition-[width] duration-[var(--d-gesture)] ease-[var(--e-mass)]",
              narrowed ? "w-[72%] sm:w-[56%] lg:w-[40%]" : "w-full",
            )}
          >
            <Ruler width={narrowed ? "375" : "1440"} />
            <div className={cn("mt-3", FRAME)}>
              <MockPage stacked={stackedUp} />
            </div>
          </div>
        </div>
      )}

      <p className={cn(caps, "mt-4 text-text-muted")}>
        Nesumažinta — perrikiuota
      </p>
    </Plate>
  );
}
