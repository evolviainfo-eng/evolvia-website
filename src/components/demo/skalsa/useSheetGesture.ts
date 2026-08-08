"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   A sheet you can actually grab.

   The drawer used to be a CSS transform transition, which cannot be
   caught mid-flight: grab a closing panel and it finishes closing,
   then reopens. A spring animates from wherever the thing currently
   is, which is exactly what interruption needs.

   Apple's projection function, verbatim from the Designing Fluid
   Interfaces sample. Note this is the exponential-decay form, not the
   textbook v²/2a — a flick should land where scrolling would land, and
   that is what every good bottom sheet uses.
   ───────────────────────────────────────────────────────────── */
export function project(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Apple ships drawers at damping 0.8 / response 0.3. Framer's `bounce` +
 *  `duration` maps onto that pair; bounce 0 is critically damped. */
const SETTLE = { type: "spring", bounce: 0, duration: 0.34 } as const;
const THROWN = { type: "spring", bounce: 0.18, duration: 0.32 } as const;

export function useSheetGesture(open: boolean, onDismiss: () => void) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const [width, setWidth] = useState(420);

  // The panel's own width is the travel distance — measured, not assumed, so
  // the closed position is exactly off-screen at every breakpoint.
  const measure = (el: HTMLElement | null) => {
    if (el) setWidth(el.offsetWidth || 420);
  };

  useEffect(() => {
    if (reduce) {
      // No slide at all: the panel is simply there or not, and the parent
      // cross-fades it. Nothing vestibular, nothing to interrupt.
      x.set(0);
      return;
    }
    // Opening is a tap, not a throw — so it settles without overshoot. Bounce
    // is earned by momentum, and a tap carries none.
    const controls = animate(x, open ? 0 : width, SETTLE);
    return () => controls.stop();
  }, [open, width, reduce, x]);

  /** Where the drag ends is not where the finger stopped — it is where the
   *  throw was going. Decide on the projected endpoint, then hand the spring
   *  the release velocity so there is no seam between drag and animation. */
  const onDragEnd = (velocity: number) => {
    const projected = x.get() + project(velocity);
    const dismiss = projected > width * 0.4;
    if (dismiss) {
      animate(x, width, { ...THROWN, velocity }).then(onDismiss);
    } else {
      animate(x, 0, { ...THROWN, velocity });
    }
  };

  return { x, width, measure, onDragEnd, reduce: !!reduce };
}
