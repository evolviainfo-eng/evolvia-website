import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/* The browser frame, shared by the demo sites and the real case study.
 *
 *  One frame, one chrome, one shadow. What differs between a demo and a real
 *  client site is the ADDRESS inside the chrome, and that difference is
 *  load-bearing: a demo reads `evolvia.lt/demo/…` because the company does not
 *  exist, and a case reads `minerda.lt` because it does. Same object, and the
 *  visitor can tell them apart by reading the URL bar, exactly as they would
 *  in a real browser.
 */

export function Chrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3.5 py-2.5">
      <span className="h-2.5 w-2.5 shrink-0 rounded-pill border border-border" />
      <span className="h-2.5 w-2.5 shrink-0 rounded-pill border border-border" />
      <span className="h-2.5 w-2.5 shrink-0 rounded-pill border border-border" />
      <div className="mx-auto flex h-5 min-w-0 max-w-[64%] items-center gap-1.5 rounded-pill border border-border bg-surface px-3 text-[9px] tracking-[0.04em] text-text-muted">
        <svg
          viewBox="0 0 10 12"
          className="h-[9px] w-[8px] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden="true"
        >
          <rect x="1.5" y="5" width="7" height="5.5" rx="1" />
          <path d="M3 5V3.5a2 2 0 0 1 4 0V5" />
        </svg>
        <span className="truncate">{url}</span>
      </div>
      <span className="h-2.5 w-2.5 shrink-0" />
    </div>
  );
}

/** A screenshot of a live site sitting in the frame.
 *
 *  Unlike `DemoSite` the image is NOT over-scaled for a parallax drift: a
 *  capture of a real page is evidence, and evidence does not move under the
 *  visitor. It settles out of its crop once on entry and then stays still. */
export function SiteFrame({
  src,
  alt,
  url,
  href,
  ratioClass = "aspect-[16/10]",
  eager = false,
  sizes,
  overlay,
  className,
}: {
  src: string;
  alt: string;
  /** What the chrome's address bar shows. */
  url: string;
  /** When set, the whole frame opens this address in a new tab. */
  href?: string;
  ratioClass?: string;
  eager?: boolean;
  sizes?: string;
  /** The hover affordance, shown only when the frame is a link. */
  overlay?: ReactNode;
  className?: string;
}) {
  const frame = (
    <span className="demo-browser block overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-frame)] transition-transform duration-[var(--d-el)] ease-[var(--e-out)] group-hover:-translate-y-1">
      <Chrome url={url} />
      <span
        className={cn(
          "relative block w-full overflow-hidden bg-surface-2",
          ratioClass,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-settle
          src={src}
          alt={alt}
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover object-top"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
        />
        {overlay}
      </span>
    </span>
  );

  if (!href) {
    return <span className={cn("group relative block", className)}>{frame}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn("group relative block", className)}
    >
      {frame}
    </a>
  );
}

/** The label that appears on a linked frame once the pointer arrives. Kept out
 *  of the resting state so nothing sits permanently on top of the artwork. */
export function FrameHint({ children }: { children: string }) {
  return (
    <span
      className="pointer-events-none absolute bottom-4 left-4 inline-flex translate-y-1.5 items-center gap-2 rounded-pill bg-white/95 px-4 py-2 text-[0.8125rem] font-medium text-neutral-900 opacity-0 shadow-[var(--shadow-card)] transition-[opacity,translate] duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      aria-hidden="true"
    >
      {children}
      <svg
        viewBox="0 0 12 12"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M4.5 2H10v5.5" />
        <path d="M10 2 2.5 9.5" />
      </svg>
    </span>
  );
}
