import { cn } from "@/lib/cn";

/** A sleek, crafted monochrome mini-site rendered inside a browser frame —
 *  real micro-typography (not skeleton bars), a placeholder figure and an
 *  ambient cursor. Theme-aware via surface tokens; motion is CSS. */
export function HeroDevice({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full", className)} aria-hidden="true">
      <div className="overflow-hidden rounded-[16px] border border-border bg-surface shadow-[var(--shadow-frame)]">
        {/* chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
          <span className="h-3 w-3 rounded-full border border-border" />
          <span className="h-3 w-3 rounded-full border border-border" />
          <span className="h-3 w-3 rounded-full border border-border" />
          <div className="mx-auto flex h-6 w-1/2 max-w-[260px] items-center justify-center rounded-full border border-border bg-surface text-[10px] tracking-[0.04em] text-text-muted">
            atelier.lt
          </div>
          <span className="h-3 w-3" />
        </div>

        {/* page */}
        <div className="px-6 py-6 sm:px-11 sm:py-10">
          {/* mini nav */}
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-bold tracking-[-0.02em] text-text">
              atelier.
            </span>
            <div className="flex items-center gap-5">
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

          {/* mini hero */}
          <div className="mt-10 grid items-center gap-8 sm:mt-14 sm:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                Interjero studija
              </p>
              <h3 className="mt-3 text-[26px] font-bold leading-[1.05] tracking-[-0.03em] text-text sm:text-[32px]">
                Grožis slypi
                <br />
                detalėse.
              </h3>
              <p className="mt-3 max-w-[26ch] text-[12px] leading-relaxed text-text-muted">
                Kuriame jaukias, apgalvotas erdves, kuriose norisi būti.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="rounded-full bg-accent px-4 py-2 text-[11px] font-medium text-accent-text">
                  Peržiūrėti
                </span>
                <span className="text-[11px] font-medium text-text">
                  Apie mus
                </span>
              </div>
            </div>

            {/* figure */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] border border-border bg-surface-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  className="h-10 w-10 text-text-muted/45"
                >
                  <rect x="6" y="9" width="36" height="30" rx="3" />
                  <circle cx="17" cy="20" r="3.2" />
                  <path d="M9 35l10-9 7 6 6-5 7 8" />
                </svg>
              </div>
            </div>
          </div>

          {/* thumbnail row */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[16/10] rounded-[8px] border border-border bg-surface-2"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ambient cursor */}
      <svg
        viewBox="0 0 24 24"
        className="anim-cursor absolute left-[58%] top-[64%] h-7 w-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
      >
        <path
          d="M5 3l14 7-6 1.6L9 18 5 3z"
          fill="#fff"
          stroke="#0a0a0a"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
