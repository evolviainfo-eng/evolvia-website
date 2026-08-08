import type { CSSProperties, ReactNode } from "react";

/** Shared typographic and photographic primitives for the Fumé demo.
 *
 *  Everything here is hard-coded to Fumé's palette on purpose — the demo must
 *  not follow the surrounding site's light/dark toggle.
 *
 *    ink      #0C0B0A   page
 *    surface  #141210   raised panels / bands
 *    cream    #EDE6DA   text
 *    ash      #9C948A   muted text (6.3:1 on ink — passes AA)
 *    hairline rgba(237,230,218,0.14) — the ONE border colour on the page
 *    ember    #C0703A   the single accent — four uses on the whole page
 *
 *  Type scale, in rem. Nothing on the page sits between these steps:
 *    0.66  micro  — eyebrows, legends, column headings (uppercase, tracked)
 *    0.76  small  — captions, footnotes, helper text
 *    0.86  ui     — nav, chips, controls
 *    0.95  body
 *    1.05  lead   — menu and wine entries (display face)
 *    h2    clamp(1.9rem, 3.4vw, 2.6rem)
 *    h1    clamp(3.4rem, 10vw, 4.5rem)  → 72px at 1440, the ceiling
 */

export const HAIRLINE = "rgba(237,230,218,0.14)";
export const EMBER = "#C0703A";

const UI = "font-[family-name:var(--font-fume-ui)]";
const DISPLAY = "font-[family-name:var(--font-fume-display)]";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className={`${UI} text-[0.66rem] uppercase leading-none tracking-[0.26em] text-[#9c948a]`}
    >
      {children}
    </p>
  );
}

export function H2({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`${DISPLAY} text-balance text-[clamp(1.9rem,3.4vw,2.6rem)] font-light leading-[1.12] text-[#ede6da] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Body({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`${UI} text-pretty text-[0.95rem] leading-[1.75] text-[#9c948a] ${className}`}
    >
      {children}
    </p>
  );
}

/** Footnotes, captions, helper lines — one size for all of them. */
export function Note({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`${UI} text-pretty text-[0.76rem] leading-[1.7] text-[#9c948a] ${className}`}
    >
      {children}
    </p>
  );
}

/** A hairline that draws itself in from the left as the section arrives. */
export function Rule({
  className = "",
  index = 0,
}: {
  className?: string;
  index?: number;
}) {
  return (
    <div
      aria-hidden
      data-wipe
      style={{ background: HAIRLINE, "--i": index } as CSSProperties}
      className={`h-px w-full ${className}`}
    />
  );
}

/** The one <img> in the demo. Centralised so the eslint exemption, the
 *  intrinsic size discipline and the lazy/eager split live in a single place. */
export function Photo({
  src,
  w,
  h,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={w}
      height={h}
      alt={alt}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}

/** Every photograph on the page goes through here, which is what keeps the
 *  crops honest: one ratio system (3:2 unless a shot asks for otherwise), one
 *  frame colour, one hover.
 *
 *  Three nested boxes, and each owns exactly one job — `.fume-shot` clips,
 *  the `data-settle` div carries the arrival scale, the <img> carries the
 *  hover scale. Sharing a box between the last two would mean two systems
 *  writing `transform` on one element, and the hover would inherit the
 *  arrival's 1.2s timing. */
export function Shot({
  src,
  w,
  h,
  alt,
  ratio = "3 / 2",
  className = "",
  caption,
  rise,
  settle = false,
  priority = false,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  ratio?: string;
  className?: string;
  caption?: string;
  /** Reveal index inside the parent gesture. Omit when an ancestor already
   *  carries the reveal — nesting two would double the travel. */
  rise?: number;
  settle?: boolean;
  priority?: boolean;
}) {
  const img = (
    <Photo
      src={src}
      w={w}
      h={h}
      alt={alt}
      priority={priority}
      className="h-full w-full object-cover"
    />
  );

  return (
    <figure
      {...(rise === undefined ? {} : { "data-rise": "" })}
      style={{ "--i": rise ?? 0 } as CSSProperties}
      className={`min-w-0 ${className}`}
    >
      <div
        className="fume-shot relative overflow-hidden bg-[#141210]"
        style={{ aspectRatio: ratio }}
      >
        {settle ? (
          <div data-settle className="absolute inset-0">
            {img}
          </div>
        ) : (
          img
        )}
      </div>
      {caption && (
        <figcaption
          className={`${UI} mt-3 max-w-[46ch] text-pretty text-[0.76rem] leading-[1.7] text-[#9c948a]`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
