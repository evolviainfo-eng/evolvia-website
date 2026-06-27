import { cn } from "@/lib/cn";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded-pill font-medium " +
  "text-[0.95rem] leading-none whitespace-nowrap select-none " +
  "transition-[transform,background-color,color,border-color,opacity] duration-300 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform " +
  "hover:-translate-y-[2px] active:translate-y-0";

const variants: Record<Variant, string> = {
  // Accent fill — auto-contrasts with the theme (white on dark, black on light).
  primary: "bg-accent text-accent-text hover:opacity-90",
  // Quiet outline.
  secondary: "bg-transparent text-text border border-border hover:border-text",
};

const sizes = {
  md: "h-11 px-6",
  lg: "h-[52px] px-8 text-base",
} as const;

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
