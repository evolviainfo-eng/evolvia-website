import type { Demo } from "@/content/demos";
import { cn } from "@/lib/cn";

/** The caption under a portfolio frame.
 *
 *  Carries the two things a visitor needs: what the demo is, and the fact
 *  that the one interaction named here genuinely works if they go and try it.
 *  The open link is repeated as text because a hover-only affordance on the
 *  frame is invisible on a phone. */
export function DemoMeta({
  demo,
  as: Tag = "figcaption",
  className,
}: {
  demo: Demo;
  as?: "figcaption" | "div";
  className?: string;
}) {
  return (
    <Tag className={cn("mt-5 flex flex-col gap-1.5", className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em]">
          {demo.name}
        </h3>
        <span className="rounded-pill border border-border px-2.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-text-muted">
          {demo.label}
        </span>
      </div>

      <p className="text-[0.8125rem] uppercase tracking-[0.1em] text-text-muted">
        {demo.sector} · {demo.year}
      </p>

      <p className="t-body mt-1 max-w-[46ch] text-[0.9375rem]">
        {demo.tagline}
      </p>

      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={demo.href}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-text"
        >
          <span className="relative">
            Atidaryti demo
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-text transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-x-0"
            />
          </span>
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3 transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path d="M4.5 2H10v5.5" />
            <path d="M10 2 2.5 9.5" />
          </svg>
        </a>
        <span className="text-[0.8125rem] text-text-muted">{demo.feature}</span>
      </p>
    </Tag>
  );
}
