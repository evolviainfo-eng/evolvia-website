/** Shared furniture for the Konstrukta demo.
 *
 *  The grammar is a residential builder's, not a film's: a white page, one
 *  blueprint blue (#0C388D) for the wordmark, the square bullets and the
 *  selected states, ink for everything else, 1px hairlines (#E2E2E2) under
 *  every section head, and one sans (Inter Tight) at two weights. Photos
 *  have square corners, no borders, no shadow, no scrim.
 *
 *  Motion hooks are plain data attributes, read by Motion.tsx:
 *    data-k-lines   a heading or paragraph that rises line by line, once
 *    data-k-settle  an image that settles from 1.08 to 1 as it crosses
 *  and the global `data-rise` (Choreo) for blocks such as tables and forms.
 */

/** Page frame: full width up to 1760px, side gutter 20 / 32 / 44px
 *  (`--k-g`, set in KonstruktaPage). */
export const WRAP = "mx-auto w-full max-w-[1760px] px-[var(--k-g)]";

/** Vertical rhythm of a full section. */
export const BAND = "py-[clamp(72px,8vw,120px)]";

/** The 12 column grid the section heads and tables sit on. */
export const GRID = "grid gap-y-6 lg:grid-cols-12 lg:gap-x-6";

/* ── Type scale ─────────────────────────────────────────────────────────
   One scale, desktop / phone:
     wordmark   fitted to the gutters (~17vw)
     H2         48 / 32   section heads
     list       44 / 32   the blue service lines
     H3         22 / 20   project and stage names
     lead       18 / 16   section leads, reading text
     body       17 / 16   project stories, stage text, notes beside data
     table      15        spec rows, form labels
     small      14        captions, meta, units (never under 12)
   Colour is set at the call site. Meta lines are plain uppercase sans at
   small body size: never mono, never letter-spaced. */
export const T_META = "text-[0.875rem] uppercase leading-[1.4]";
export const T_SM = "text-[0.875rem] leading-[1.55]";
export const T_BODY =
  "text-[1rem] leading-[1.6] lg:text-[1.125rem] lg:leading-[1.55]";
export const T_TEXT =
  "text-[1rem] leading-[1.6] lg:text-[1.0625rem] lg:leading-[1.6]";
export const T_H2 =
  "text-[clamp(2rem,3.3vw,3rem)] font-medium leading-[1.06] tracking-[-0.02em]";
export const T_H3 =
  "text-[1.25rem] font-medium leading-[1.25] tracking-[-0.01em] lg:text-[1.375rem]";

/** The one solid action per view (blue, 4px radius like the menu bar), and
 *  the underlined text link that does everything else. CSS in
 *  KonstruktaPage. */
export const BTN_PRIMARY = "k-btn";
export const BTN_LINK = "k-link";

/** The 9px blueprint-blue square that marks a section's label. Used once
 *  per section, never as a micro label system. */
export function Square() {
  return (
    <span
      aria-hidden
      className="mt-[0.42em] inline-block h-[9px] w-[9px] shrink-0 bg-[#0C388D]"
    />
  );
}

/** Section head after Haven: the heading top-left, a hairline across the
 *  full width, the square label in the left half and the lead in the right
 *  half. `children` lands under the lead (a link, a note). */
export function SectionHead({
  label,
  title,
  lead,
  children,
  aside,
}: {
  label: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  /** Lands under the label in the left half (a photograph), so the left
   *  half is never an empty column beside a long right one. */
  aside?: React.ReactNode;
}) {
  return (
    <div>
      <h2
        data-k-lines
        className={`${T_H2} max-w-[24ch] text-balance text-[#111111]`}
      >
        {title}
      </h2>
      <div
        className={`${GRID} mt-[clamp(28px,3.2vw,48px)] border-t border-[#E2E2E2] pt-6 lg:grid-rows-[auto_1fr]`}
      >
        <p className="flex min-w-0 items-start gap-3 text-[1rem] leading-[1.45] text-[#111111] lg:col-span-6 lg:row-start-1">
          <Square />
          {label}
        </p>
        {lead || children ? (
          <div className="min-w-0 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            {lead ? (
              <p
                data-k-lines
                className={`max-w-[60ch] text-pretty ${T_BODY} text-[#111111]`}
              >
                {lead}
              </p>
            ) : null}
            {children}
          </div>
        ) : null}
        {aside ? (
          <div className="min-w-0 max-w-[600px] pt-4 lg:col-span-6 lg:row-start-2 lg:pr-6 lg:pt-2">
            {aside}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** A label/value row of a spec table: hairline under, label muted left,
 *  value ink right, tabular figures. */
export function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-5 border-b border-[#E2E2E2] py-3">
      <dt className="shrink-0 text-[0.9375rem] leading-[1.45] text-[#5E5E5E]">
        {k}
      </dt>
      <dd className="k-num min-w-0 break-words text-right text-[0.9375rem] leading-[1.45] text-[#111111]">
        {v}
      </dd>
    </div>
  );
}

/** A photograph at its own aspect ratio, square corners, nothing on it.
 *  `settle` lets Motion.tsx scrub the image from 1.08 to 1 as the frame
 *  crosses the viewport (the frame clips it, so it never grows past it). */
export function Photo({
  src,
  width,
  height,
  alt,
  ratio,
  settle = false,
  className,
  position = "center",
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  ratio?: string;
  settle?: boolean;
  className?: string;
  position?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#F5F5F5] ${className ?? ""}`}
      style={{ aspectRatio: ratio ?? `${width} / ${height}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        decoding="async"
        loading="lazy"
        data-k-settle={settle ? "" : undefined}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
