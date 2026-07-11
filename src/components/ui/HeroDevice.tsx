import { cn } from "@/lib/cn";

/** A sleek browser-framed mock of an interior-studio site ("atelier.") —
 *  photo-led with real on-theme interior shots (grayscale, on-brand).
 *  Compact: a landscape hero image + a thumbnail row, so it stays short on
 *  phones. Theme-aware frame. */
const THUMBS = [
  "/work/hero-int-1.webp",
  "/work/hero-int-3.webp",
  "/work/hero-int-4.webp",
];

export function HeroDevice({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)} aria-hidden="true">
      <div className="overflow-hidden rounded-[16px] border border-border bg-surface shadow-[var(--shadow-frame)]">
        {/* chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
          <span className="h-3 w-3 rounded-full border border-border" />
          <span className="h-3 w-3 rounded-full border border-border" />
          <span className="h-3 w-3 rounded-full border border-border" />
          <div className="mx-auto flex h-6 w-1/2 max-w-[240px] items-center justify-center rounded-full border border-border bg-surface text-[10px] tracking-[0.04em] text-text-muted">
            atelier.lt
          </div>
          <span className="h-3 w-3" />
        </div>

        {/* page */}
        <div className="px-4 py-4 sm:px-7 sm:py-6">
          {/* mini nav */}
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-medium tracking-[-0.02em] text-text">
              atelier.
            </span>
            <div className="flex items-center gap-4">
              <span className="hidden text-[11px] text-text-muted sm:inline">
                Darbai
              </span>
              <span className="hidden text-[11px] text-text-muted sm:inline">
                Studija
              </span>
              <span className="rounded-full bg-accent px-3.5 py-1.5 text-[10px] font-medium text-accent-text">
                Užklausa
              </span>
            </div>
          </div>

          {/* hero image */}
          <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[10px]">
            {/* the LCP image — eager + high priority (a lazy LCP image
                delays first paint and gets flagged by PageSpeed) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/hero-int-2.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover grayscale"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <p className="text-[9px] uppercase tracking-[0.16em] text-white/70">
                Interjero studija
              </p>
              <h3 className="mt-1 text-[18px] font-medium leading-tight tracking-[-0.02em] sm:text-[22px]">
                Grožis slypi detalėse.
              </h3>
              <span className="mt-2.5 inline-block rounded-full bg-white px-3.5 py-1.5 text-[10px] font-medium text-black">
                Peržiūrėti
              </span>
            </div>
          </div>

          {/* thumbnails */}
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {THUMBS.map((src) => (
              <div
                key={src}
                className="aspect-[4/3] overflow-hidden rounded-[8px] border border-border"
              >
                {/* above the fold on desktop — don't lazy-load */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover grayscale"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
