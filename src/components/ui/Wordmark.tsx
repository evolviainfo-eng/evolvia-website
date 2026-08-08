import { cn } from "@/lib/cn";

/** The evolvia. wordmark, rendered as live text (never an image) so it stays
 *  pixel-sharp at any size.
 *
 *  The period is a drawn circle, not a typed one. A typographic period is
 *  whatever the face makes it — small, and different in every font — while
 *  this is an exact ratio of the text it follows, so it is identical in the
 *  header, in the footer and at favicon size. That consistency is the whole
 *  point: the same shape appearing in enough places is what a visitor
 *  eventually recognises. See `.mark` in globals.css.
 *
 *  It carries no colour of its own. `currentColor` means it agrees with
 *  whatever text it sits beside — light header, ink section, inside a demo —
 *  with no overrides anywhere. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "wordmark inline-flex items-baseline gap-[0.06em] text-[1.25rem] leading-none text-text",
        className,
      )}
    >
      evolvia
      <span className="mark" aria-hidden="true" />
    </span>
  );
}
