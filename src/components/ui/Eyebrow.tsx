import { cn } from "@/lib/cn";

/** Small uppercase label that sits above a heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <p className={cn("t-eyebrow", className)}>{children}</p>;
}
