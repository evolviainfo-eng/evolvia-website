/* ─────────────────────────────────────────────────────────────
   The spring model, in one place.

   Apple does not describe springs as mass/stiffness/damping. It gives
   designers two numbers instead:

     damping ratio — overshoot. 1.0 settles without bounce; below 1.0
                     it overshoots and comes back. Lower = bouncier.
     response      — how fast it reaches the target, in seconds. Not a
                     duration: a spring has no duration, the settle time
                     falls out of the parameters.

   Framer's `bounce` + `duration` pair maps onto exactly that, so the
   presets below are Apple's shipped values transcribed rather than
   invented. The CSS equivalents live in globals.css as `linear()`
   curves sampled off the same oscillator — same physics, no JS. Use
   these when a finger is involved and those when it is not.
   ───────────────────────────────────────────────────────────── */

/** Apple's projection function, verbatim from the *Designing Fluid Interfaces*
 *  sample code. A flick should land where scrolling would land, so this is the
 *  exponential-decay form — not the textbook `v²/2a`, which Apple does not use.
 *
 *  `decelerationRate` 0.998 is the normal scroll feel; 0.99 is snappier. */
export function project(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** damping 1.0 — critically damped. The default for anything that merely
 *  appeared: a tap carries no momentum, so overshoot would be a lie. */
export const SETTLE = { type: "spring", bounce: 0, duration: 0.34 } as const;

/** damping ~0.8 — overshoots slightly. Earned only when the gesture itself
 *  carried momentum: a flick, a throw, a drag release. */
export const THROWN = { type: "spring", bounce: 0.18, duration: 0.32 } as const;

/** Apple ships drawers and sheets at damping 0.8 / response 0.3. */
export const SHEET = { type: "spring", bounce: 0.2, duration: 0.3 } as const;

/** Reduced motion: not "no feedback", just non-vestibular feedback. A short
 *  cross-fade with no travel and nothing elastic. */
export const FADE = { duration: 0.2, ease: "easeOut" } as const;

/** Soft boundary. The further past the edge the finger goes, the less the
 *  element follows — real things slow before they stop, they do not hit a wall.
 *  `dimension` is the travel available, so the resistance scales with the
 *  surface rather than being one magic pixel count. */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55,
) {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}
