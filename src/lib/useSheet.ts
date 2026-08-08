"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import { SETTLE, THROWN, project } from "@/lib/spring";

type Axis = "x" | "y";

/* ─────────────────────────────────────────────────────────────
   A surface you can actually grab, on either axis.

   Two sheets on this site need identical physics and opposite
   geometry: the cart drawer leaves to the right, the nav menu
   leaves upward. Rather than two hooks drifting apart, one hook
   takes the axis and the direction it exits in.

   Why not a CSS transition: a transition cannot be caught in
   flight. Grab a closing panel and it finishes closing, then
   reopens from the top — the "brick wall". A spring animates from
   wherever the surface currently *is*, which is exactly what
   interruption needs, and it can inherit the finger's velocity so
   there is no seam between dragging and animating.
   ───────────────────────────────────────────────────────────── */
export function useSheet({
  open,
  onDismiss,
  axis = "x",
  /** +1 exits toward positive translate (right / down), −1 toward negative
   *  (left / up). Enter and exit share this path — a panel that arrives from
   *  above must leave upward, or the space stops making sense. */
  sign = 1,
  fallback = 420,
  keepMounted = false,
}: {
  open: boolean;
  onDismiss: () => void;
  axis?: Axis;
  sign?: 1 | -1;
  fallback?: number;
  /** True when the consumer never unmounts the surface. Changes only what
   *  reduced motion does: an unmounted sheet can sit at 0 and let the parent
   *  cross-fade it, but a permanently mounted one has to be parked off-screen
   *  or it covers the page forever. */
  keepMounted?: boolean;
}) {
  const reduce = useReducedMotion();
  /* Starts CLOSED, never at 0. A motion value serialises into the static HTML
     at whatever it currently holds, so a sheet initialised at 0 ships fully
     open — the nav menu spread across the hero with the scrim at full black,
     until hydration yanks it away. Starting at the closed position makes the
     server's markup correct on its own, and it is also what both sheets want
     anyway: a sheet always opens from closed. `fallback` is only in force
     until the ref callback measures the real size, which happens before any
     effect runs. */
  const offset = useMotionValue(fallback * sign);
  const [travel, setTravel] = useState(fallback);
  const el = useRef<HTMLElement | null>(null);

  /** The surface's own size is the travel distance — measured, never assumed,
   *  so "closed" is exactly off-screen at every breakpoint and on every phone
   *  rather than approximately off-screen with a sliver showing. */
  const measure = (node: HTMLElement | null) => {
    el.current = node;
    if (node) {
      const size = axis === "x" ? node.offsetWidth : node.offsetHeight;
      if (size) setTravel(size);
    }
  };

  // Re-measure when the viewport changes: a rotated phone has a different
  // sheet height, and a stale measurement leaves the closed sheet visible.
  useEffect(() => {
    const onResize = () => measure(el.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axis]);

  const closed = travel * sign;

  useEffect(() => {
    if (reduce) {
      // No travel at all — the surface is simply there or not. Where the
      // parent unmounts it, it can stay at 0 and be cross-faded; where it is
      // always mounted it has to be moved out of the way, instantly, because
      // an instant reposition is not vestibular motion.
      offset.set(keepMounted ? (open ? 0 : closed) : 0);
      return;
    }
    // Opening is a tap, and a tap carries no momentum — so it settles without
    // overshoot. Bounce has to be earned.
    const controls = animate(offset, open ? 0 : closed, SETTLE);
    return () => controls.stop();
  }, [open, closed, reduce, offset, keepMounted]);

  /** Where a drag ends is not where the finger stopped — it is where the throw
   *  was going. So project the resting point first, decide against *that*, and
   *  then hand the spring the release velocity so the drag and the animation
   *  are one continuous motion instead of two. */
  const onDragEnd = (velocity: number) => {
    const projected = offset.get() + project(velocity);
    // A projection that lands more than 40% of the way out means the gesture
    // was a dismissal, however short the finger's actual travel was.
    const dismissed =
      sign > 0 ? projected > travel * 0.4 : projected < closed * 0.4;
    if (dismissed) {
      animate(offset, closed, { ...THROWN, velocity }).then(onDismiss);
    } else {
      animate(offset, 0, { ...THROWN, velocity });
    }
  };

  return { offset, travel, closed, measure, onDragEnd, reduce: !!reduce };
}
