import type { ReactNode } from "react";

/** A part of a scroll-in gesture.
 *
 *  Thin wrapper over the house `data-rise` system in globals.css — the same
 *  primitive the demo sites use, so the whole project animates through one
 *  observer and one pair of curves. It renders on the server and ships no JS;
 *  `Choreo` in the root layout does the watching, and skips it entirely under
 *  reduced motion.
 *
 *  `delay` stays in seconds for the call sites that already pass it, quantised
 *  onto the 70ms stagger step so offsets inside a gesture keep the same rhythm
 *  everywhere on the site.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      data-rise
      style={
        {
          "--i": Math.max(0, Math.round(delay / 0.07)),
          "--rise-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
