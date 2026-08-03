/** Shared furniture for the Konstrukta demo.
 *
 *  The whole page is built like a technical document: hairline rules, mono
 *  data, numbered sections. These primitives carry that grammar so the
 *  sections themselves stay readable — and so the type scale, the hairline
 *  and the photo frame exist in exactly one place each.
 */

/** Page gutter. 1200px is wide enough for a four-column data row and still
 *  leaves air at 1440. */
export const CONTAINER = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";

/** Vertical rhythm of a full band. Every section uses this and nothing else,
 *  so no band is visibly tighter than its neighbour.
 *
 *  Hairlines: one colour on the whole page, `white/[0.11]` for anything
 *  structural. Controls get their own three-step edge — `white/[0.22]` at
 *  rest, `white/[0.5]` on hover or focus, `white/[0.7]` pressed — and nothing
 *  else is allowed a border. */
export const BAND = "py-[clamp(72px,9vw,120px)]";

/** ── Type scale ──────────────────────────────────────────────────────────
 *  Five steps, no ad-hoc sizes anywhere else. Colour is deliberately absent:
 *  these compose with a text-* class at the call site, and `cn` here is plain
 *  string joining, so a buried colour could never be overridden. */
export const T_MICRO =
  "knst-mono text-[0.63rem] uppercase leading-[1.5] tracking-[0.18em]";
export const T_META =
  "knst-mono text-[0.7rem] uppercase leading-[1.5] tracking-[0.16em]";
export const T_SM = "text-[0.875rem] leading-[1.6]";
export const T_BODY = "text-[0.95rem] leading-[1.62]";
export const T_LEAD = "text-[1.02rem] leading-[1.65]";

export function SectionHead({
  index,
  label,
  title,
  lead,
  i = 0,
}: {
  index: string;
  label: string;
  title: string;
  lead?: string;
  i?: number;
}) {
  return (
    <div data-rise style={{ "--i": i } as React.CSSProperties}>
      <div className="flex items-center gap-4">
        <span className={`${T_MICRO} shrink-0 tracking-[0.2em] text-[#9A9791]`}>
          {index}
        </span>
        <span className={`${T_MICRO} shrink-0 text-[#9A9791]`}>{label}</span>
        <span aria-hidden className="h-px min-w-0 flex-1 bg-white/[0.11]" />
      </div>

      <h2 className="mt-7 max-w-[22ch] text-balance text-[clamp(1.7rem,3.4vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.028em] text-[#E7E5E1]">
        {title}
      </h2>

      {lead ? (
        <p className={`mt-5 max-w-[62ch] text-pretty ${T_LEAD} text-[#9A9791]`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** A label/value row from a spec table. */
export function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-5 border-b border-white/[0.11] py-2.5">
      <dt className="knst-mono shrink-0 text-[0.65rem] uppercase leading-[1.5] tracking-[0.14em] text-[#9A9791]">
        {k}
      </dt>
      <dd className="knst-mono min-w-0 break-words text-right text-[0.8rem] leading-[1.45] text-[#E7E5E1]">
        {v}
      </dd>
    </div>
  );
}

/** Small bordered mono tag — used for spec chips and the honesty label. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="knst-mono inline-block border border-white/[0.11] px-2.5 py-1 text-[0.63rem] uppercase leading-[1.5] tracking-[0.12em] text-[#9A9791] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)]">
      {children}
    </span>
  );
}

/** Every editorial photograph on the page sits in the same plate: a hairline
 *  mat, one aspect ratio (3:2), one crop rule. The image lifts very slightly
 *  under the pointer inside its own clipping box — the only reason the mat is
 *  a separate element from the frame. */
export function Plate({
  src,
  width,
  height,
  alt,
  className,
  ratio = "3 / 2",
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`group/plate border border-white/[0.11] p-1.5 transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-white/[0.2] ${className ?? ""}`}
    >
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          decoding="async"
          loading="lazy"
          style={{ aspectRatio: ratio }}
          className="w-full object-cover object-center transition-transform duration-[var(--d-el)] ease-[var(--e-out)] group-hover/plate:scale-[1.035]"
        />
      </div>
    </div>
  );
}
