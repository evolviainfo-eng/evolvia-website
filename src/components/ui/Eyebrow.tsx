import { cn } from "@/lib/cn";

/** Small uppercase label that sits above a heading.
 *
 *  Carries the mark as a bullet — the same circle as the wordmark's period and
 *  the favicon, at the third and smallest size. One shape appearing in three
 *  places is what makes it register as an identity rather than as decoration;
 *  a different ornament in each place would just be noise. */
export function Eyebrow({
  children,
  className,
  bullet = true,
}: {
  children: string;
  className?: string;
  /** Off where the eyebrow sits inside a demo site — those have their own
   *  identities, and Evolvia's mark has no business inside them. */
  bullet?: boolean;
}) {
  return (
    <p className={cn("t-eyebrow flex items-baseline gap-2", className)}>
      {bullet && <span className="mark shrink-0" aria-hidden="true" />}
      {children}
    </p>
  );
}
