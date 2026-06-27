import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Tone = "light" | "secondary";

const toneClasses: Record<Tone, string> = {
  light: "bg-bg text-text",
  secondary: "bg-surface-2 text-text",
};

/** A page section with the standard fluid vertical rhythm. */
export function Section({
  children,
  id,
  tone = "light",
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  as?: "section" | "div" | "footer";
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-[clamp(80px,12vw,160px)]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
