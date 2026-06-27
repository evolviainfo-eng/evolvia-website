import { cn } from "@/lib/cn";

/** The evolvia. wordmark, rendered as live text (never an image) so it stays
 *  pixel-sharp at any size. The trailing period is part of the mark.
 *  Colour follows the theme via `text-text` unless overridden. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "wordmark inline-block text-[1.35rem] leading-none text-text",
        className,
      )}
    >
      evolvia.
    </span>
  );
}
