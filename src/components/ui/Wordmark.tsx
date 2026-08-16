import { cn } from "@/lib/cn";

/** The real wordmark, from the brand artwork — not a reconstruction.
 *
 *  It used to be live text in Inter at weight 300 with a typed period. That
 *  was wrong in three ways at once: the drawn mark is a good deal heavier,
 *  its terminals are not Inter's, and its period is an oversized circle
 *  sitting on the baseline rather than a punctuation glyph. Close enough to
 *  look deliberate, far enough off to be a different logo.
 *
 *  Shipped as a CSS mask rather than an <img>, which buys three things a
 *  picture cannot: the ink is `currentColor`, so one file serves the light
 *  theme, the dark theme and the ink sections with nothing to switch and
 *  nothing to keep in sync; there is one request instead of two; and it can
 *  never fall out of step with the text beside it.
 *
 *  The compact lockup includes its corner brackets, cropped — that is the
 *  drawn artwork, and the brackets are the mark. The mask is 324×129 and is
 *  used at a third of that or smaller, so it stays sharp past 3×. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="evolvia."
      className={cn("wordmark block h-[34px] w-[85px]", className)}
    />
  );
}
