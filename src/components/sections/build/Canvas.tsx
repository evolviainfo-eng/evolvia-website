import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────────
   The composition that builds itself.

   One artboard, five states. `stage` selects the state; every
   difference between states is expressed as a CSS transition on
   transform / opacity / border-colour, so the same component can be
   driven by a pin (desktop), frozen at one stage (mobile storyboard)
   or rendered complete (reduced motion) with no conditional
   animation code anywhere.

     -1  blank artboard
      0  Tinklelis      — 12 columns + baseline rules draw themselves
      1  Blokai         — hairline blocks place themselves on the grid
      2  Tipografija    — real type lands, wireframe outlines fade
      3  Nuotraukos     — imagery settles in from a slight scale
      4  Gyva svetainė  — grid gone, browser chrome resolves

   Everything inside is decorative: the artboard is aria-hidden and the
   readable content lives in the stage index beside it.

   Type is sized in `cqw` against the frame itself, so the mini-page
   keeps a real page's proportions at 750px wide and at 300px wide.
   `--ts` raises the scale on the small storyboard frames — the brief
   is to drop blocks on mobile, never to shrink the type.
   ───────────────────────────────────────────────────────────── */

const COLS = 12;
const COLS_COMPACT = 6;
const RULES = 8;
const RULES_COMPACT = 6;

/** the mock's gallery — three different rooms, cropped to the cell ratio */
const THUMBS = ["/work/mock-1.webp", "/work/mock-2.webp", "/work/mock-3.webp"];

/** offset for one child inside the single gesture */
const step = (i: number) => ({ transitionDelay: `calc(${i} * var(--d-step))` });

/* Tailwind v4 writes the individual `translate` / `scale` properties rather
   than `transform`, so those are what the transition lists name. */
const MASS =
  "transition-[translate,opacity,border-color,background-color] duration-[var(--d-gesture)] ease-[var(--e-mass)]";
const OUT = "transition-[border-color] duration-[var(--d-el)] ease-[var(--e-out)]";
const SETTLE =
  "transition-[scale,opacity] duration-[var(--d-scene)] ease-[var(--e-out)]";
const FADE = "transition-opacity duration-[var(--d-gesture)] ease-[var(--e-out)]";

export function Canvas({
  stage,
  compact = false,
  className,
}: {
  /** -1 … 4 */
  stage: number;
  /** small storyboard frame: fewer blocks, larger type */
  compact?: boolean;
  className?: string;
}) {
  const at = (n: number) => stage >= n;

  const cols = compact ? COLS_COMPACT : COLS;
  const rules = compact ? RULES_COMPACT : RULES;

  /* a wireframe block: at stage 1 it lands on the grid as a filled plate —
     it has to occlude the rules, or "blokai" is just more hairlines on a
     field of hairlines and the beat reads as nothing happening. At stage 2
     the plate dissolves and the words are what is left. */
  const block = (extra?: string) =>
    cn(
      "relative min-w-0 overflow-hidden border",
      MASS,
      at(1) ? "translate-y-0 opacity-100" : "translate-y-[7%] opacity-0",
      at(2) ? "border-transparent bg-transparent" : "border-border bg-surface-2",
      extra,
    );

  /* the words inside a block */
  const type = cn(FADE, at(2) ? "opacity-100" : "opacity-0");

  const gridLayer = cn(
    "absolute inset-0",
    SETTLE,
    at(4) ? "opacity-0" : at(2) ? "opacity-30" : "opacity-100",
  );

  return (
    <div
      aria-hidden
      className={cn(
        "@container relative flex w-full flex-col overflow-hidden rounded-card border border-border bg-surface",
        className,
      )}
      style={
        {
          aspectRatio: compact ? "4 / 3.1" : "16 / 10",
          "--ts": compact ? 1.45 : 1,
        } as React.CSSProperties
      }
    >
      {/* ── browser chrome — resolves last ──────────────────────── */}
      <div
        className={cn(
          "flex shrink-0 basis-[8%] items-center gap-[1.2cqw] border-b bg-surface-2 px-[3%]",
          "transition-[opacity,border-color] duration-[var(--d-gesture)] ease-[var(--e-out)]",
          at(4) ? "border-border opacity-100" : "border-transparent opacity-0",
        )}
      >
        <span className="block h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-pill border border-border" />
        <span className="block h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-pill border border-border" />
        <span className="block h-[1.1cqw] w-[1.1cqw] shrink-0 rounded-pill border border-border" />
        <span className="mx-auto flex max-w-[46%] min-w-0 items-center rounded-pill border border-border bg-surface px-[2cqw] py-[0.3cqw] text-[length:calc(1.25cqw*var(--ts))] tracking-[0.02em] text-text-muted">
          <span className="truncate">jusu-svetaine.lt</span>
        </span>
        <span className="h-[1.1cqw] w-[1.1cqw] shrink-0" />
      </div>

      {/* ── artboard ────────────────────────────────────────────── */}
      <div className="relative min-h-0 flex-1">
        {/* 01 — the grid draws itself: columns first, baselines a beat later */}
        <div className="pointer-events-none absolute inset-x-[5%] inset-y-[7%]">
          <div
            className={cn(
              gridLayer,
              "origin-top",
              at(0) ? "scale-y-100" : "scale-y-0",
            )}
          >
            {Array.from({ length: cols + 1 }, (_, i) => (
              <span
                key={i}
                className="absolute inset-y-0 w-px bg-border"
                style={{ left: `${(i / cols) * 100}%` }}
              />
            ))}
          </div>
          <div
            className={cn(
              gridLayer,
              "origin-left",
              at(0) ? "scale-x-100" : "scale-x-0",
            )}
            style={step(2)}
          >
            {Array.from({ length: rules + 1 }, (_, i) => (
              <span
                key={i}
                className="absolute inset-x-0 h-px bg-border"
                style={{ top: `${(i / rules) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* 02–05 — the page itself */}
        <div
          className="absolute inset-x-[5%] inset-y-[7%] grid gap-[2%]"
          style={{
            /* The content row carries the tallest intrinsic content in the
               composition — a three-item list with rules between the items —
               so it gets the height that content actually needs. Everything
               here is cqw/%-based, so a row that is short is short at every
               width, and the frame's overflow:hidden turns it into a list
               with its last item sliced off. */
            gridTemplateRows: compact
              ? "0.7fr 3.5fr 1.8fr 0.5fr"
              : "0.62fr 3.05fr 1.85fr 1.25fr 0.5fr",
          }}
        >
          {/* header ------------------------------------------------ */}
          <div className={block("flex items-center px-[3%]")} style={step(0)}>
            <div
              className={cn("flex w-full items-center justify-between gap-[3%]", type)}
              style={step(4)}
            >
              <span className="truncate text-[length:calc(2.4cqw*var(--ts))] leading-none font-light tracking-[-0.01em] text-text">
                Studija
              </span>
              <span className="flex shrink-0 items-center gap-[2.2cqw] text-[length:calc(1.35cqw*var(--ts))] text-text-muted">
                <span>Darbai</span>
                <span>Apie</span>
                <span className={compact ? "hidden" : undefined}>Kontaktai</span>
              </span>
            </div>
            {/* the nav rule of a finished page */}
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-px bg-border",
                FADE,
                at(4) ? "opacity-100" : "opacity-0",
              )}
            />
          </div>

          {/* hero -------------------------------------------------- */}
          <div
            className={block("flex items-stretch gap-[3%] p-[2.4%]")}
            style={step(1)}
          >
            <div
              className={cn("flex min-w-0 flex-1 flex-col justify-center", type)}
              style={step(5)}
            >
              <span className="text-[length:calc(1.2cqw*var(--ts))] tracking-[0.16em] text-text-muted uppercase">
                Interjero architektūra
              </span>
              <span className="mt-[1.6cqw] text-[length:calc(3.9cqw*var(--ts))] leading-[1.08] font-light tracking-[-0.035em] text-text">
                Erdvė, kurioje
                <br />
                viskas savo vietoje.
              </span>
            </div>

            {/* image placeholder → photograph */}
            <div
              className={cn(
                "relative w-[44%] shrink-0 overflow-hidden border bg-surface-2",
                OUT,
                at(3) ? "border-transparent" : "border-border",
              )}
              style={step(6)}
            >
              {/* A photograph, not a screenshot of one. /work/shot-*.webp are
                  full-page captures — nav bar, eyebrow, headline, then the
                  photo — and shot-forma's headline is the sentence printed in
                  live type immediately to the left of this panel. mock-*.webp
                  are crops of the demo's own photography: no page chrome, and
                  small enough to belong under a caption about compression. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/work/mock-hero.webp"
                alt=""
                width={800}
                height={364}
                loading="lazy"
                decoding="async"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover",
                  SETTLE,
                  at(3) ? "scale-[1] opacity-100" : "scale-[1.06] opacity-0",
                )}
                style={step(6)}
              />
            </div>
          </div>

          {/* content row ------------------------------------------- */}
          <div className={block("px-[3%] py-[1.2%]")} style={step(2)}>
            <div
              className={cn("flex h-full items-start gap-[5%]", type)}
              style={step(6)}
            >
              <div className="min-w-0 flex-1">
                <span className="block text-[length:calc(1.2cqw*var(--ts))] leading-none tracking-[0.16em] text-text-muted uppercase">
                  Apie
                </span>
                <p className="mt-[1cqw] text-[length:calc(1.75cqw*var(--ts))] leading-[1.45] text-text">
                  Projektuojame, deriname ir prižiūrime kiekvieną detalę.
                </p>
              </div>
              <ul className="w-[34%] min-w-0 shrink-0 text-[length:calc(1.5cqw*var(--ts))] leading-[1.2] text-text-muted">
                <li className="border-b border-border py-[0.3cqw]">Projektavimas</li>
                <li className="border-b border-border py-[0.3cqw]">Vizualizacijos</li>
                <li className="py-[0.3cqw]">Autorinė priežiūra</li>
              </ul>
            </div>
          </div>

          {/* gallery strip — dropped on the small storyboard frames -- */}
          {!compact && (
            <div className={block("p-[1.6%]")} style={step(3)}>
              <div
                className={cn(
                  "absolute inset-[1.6%] grid grid-cols-3 gap-[1.4%]",
                  "transition-opacity duration-[var(--d-el)] ease-[var(--e-out)]",
                  at(3) ? "opacity-0" : "opacity-100",
                )}
              >
                <span className="border border-border" />
                <span className="border border-border" />
                <span className="border border-border" />
              </div>
              <div
                className={cn(
                  "absolute inset-[1.6%] grid grid-cols-3 gap-[1.4%]",
                  SETTLE,
                  at(3) ? "scale-[1] opacity-100" : "scale-[1.05] opacity-0",
                )}
                style={step(7)}
              >
                {/* Three rooms, three files. The cells are ~3.8:1 against a
                    3.7:1 source, so there is no horizontal overflow to pan
                    into — varying objectPosition here does literally nothing. */}
                {THUMBS.map((src) => (
                  <span
                    key={src}
                    className="relative min-w-0 overflow-hidden bg-surface-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      width={600}
                      height={162}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* footer ------------------------------------------------ */}
          <div
            className={block("flex items-center px-[3%]")}
            style={step(compact ? 3 : 4)}
          >
            <div
              className={cn("flex w-full items-center justify-between gap-[3%]", type)}
              style={step(7)}
            >
              <span className="truncate text-[length:calc(1.2cqw*var(--ts))] text-text-muted">
                © 2026 Studija
              </span>
              <span className="shrink-0 text-[length:calc(1.2cqw*var(--ts))] text-text-muted">
                Vilnius
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
