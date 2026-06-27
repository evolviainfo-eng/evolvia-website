import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Centered content column. Max 1120px, 24px side padding on mobile. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1120px] px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}
