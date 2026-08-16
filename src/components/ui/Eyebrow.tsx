import { cn } from "@/lib/cn";

/** Small uppercase label that sits above a heading.
 *
 *  It briefly carried a drawn dot as a bullet, from a period-as-mark idea
 *  invented before the real brand artwork turned up. The actual mark is the
 *  pair of corner brackets, so the dot is gone — two marks is the same as
 *  none. */
export function Eyebrow({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <p className={cn("t-eyebrow", className)}>{children}</p>;
}
