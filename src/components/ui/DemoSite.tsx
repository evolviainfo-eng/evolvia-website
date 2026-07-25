import { cn } from "@/lib/cn";
import type { Demo } from "@/content/demos";

/* The portfolio frame.
 *
 *  It used to hold hand-built mock compositions — ~250 lines of fake nav bars
 *  and fake product cards. Every demo is now a real page at /demo/<slug>, so
 *  the frame shows an actual screenshot of it, captured from the production
 *  build. Nothing to keep in sync, and what the visitor sees is exactly what
 *  they get when they click.
 *
 *  The address in the chrome is deliberately `evolvia.lt/demo/…` and not a
 *  plausible `konstrukta.lt`: the frame must never imply the company owns a
 *  domain, because the company does not exist.
 */

function Chrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3.5 py-2.5">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-border" />
      <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-border" />
      <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-border" />
      <div className="mx-auto flex h-5 min-w-0 max-w-[64%] items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-[9px] tracking-[0.04em] text-text-muted">
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

/** The mobile capture, hanging off the frame corner — responsyvumo įrodymas. */
function PhoneMock({ demo }: { demo: Demo }) {
  return (
    <span
      className="demo-phone pointer-events-none absolute -bottom-8 right-5 hidden w-[21%] min-w-[92px] max-w-[130px] transition-transform duration-[var(--d-el)] ease-[var(--e-out)] group-hover:-translate-y-1 lg:block"
      aria-hidden="true"
    >
      <span className="block rounded-[20px] bg-[#101013] p-[5px] shadow-[var(--shadow-frame)]">
        <span className="relative block aspect-[9/18.5] overflow-hidden rounded-[15px] bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/work/shot-${demo.slug}-m.webp`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>
    </span>
  );
}

export function DemoSite({
  demo,
  ratioClass = "aspect-[16/10]",
  phone = false,
  eager = false,
  className,
}: {
  demo: Demo;
  ratioClass?: string;
  /** Show the overlapping mobile capture (desktop only). */
  phone?: boolean;
  /** True for the one frame near the top of the page. */
  eager?: boolean;
  className?: string;
}) {
  return (
    <a
      href={demo.href}
      target="_blank"
      rel="noopener"
      aria-label={`Atidaryti demonstracinę „${demo.name}“ svetainę naujame lange`}
      className={cn("group relative block", className)}
    >
      <span className="demo-browser block overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-frame)] transition-transform duration-[var(--d-el)] ease-[var(--e-out)] group-hover:-translate-y-1">
        <Chrome url={demo.url} />
        <span
          className={cn(
            "work-frame relative block w-full overflow-hidden bg-surface-2",
            ratioClass,
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-settle
            src={`/work/shot-${demo.slug}.webp`}
            alt={`„${demo.name}“ demonstracinės svetainės vaizdas`}
            className="work-img absolute left-0 top-[-6%] h-[112%] w-full object-cover object-top"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            decoding="async"
          />

          {/* The only thing that says the frame is a link. Still until the
              pointer arrives — no permanent badge sitting on the artwork. */}
          <span
            className="pointer-events-none absolute bottom-4 left-4 inline-flex translate-y-1.5 items-center gap-2 rounded-pill bg-white/95 px-4 py-2 text-[0.78rem] font-medium text-neutral-900 opacity-0 shadow-[var(--shadow-card)] transition-[opacity,translate] duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            aria-hidden="true"
          >
            Atidaryti demo
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
        </span>
      </span>
      {phone && <PhoneMock demo={demo} />}
    </a>
  );
}
