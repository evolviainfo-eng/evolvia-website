/** Shared furniture for the Konstrukta demo.
 *
 *  The whole page is built like a technical document: hairline rules, mono
 *  data, numbered sections. These three primitives carry that grammar so the
 *  sections themselves stay readable.
 */

/** Page gutter. 1200px is wide enough for a four-column data row and still
 *  leaves air at 1440. */
export const CONTAINER = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";

/** The one hairline colour, used for every rule on the page. */
export const LINE = "border-white/[0.11]";

/** Vertical rhythm of a full band. */
export const BAND = "py-[clamp(64px,9vw,116px)]";

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
        <span className="knst-mono shrink-0 text-[0.7rem] tracking-[0.18em] text-[#9A9791]">
          {index}
        </span>
        <span className="knst-mono shrink-0 text-[0.66rem] uppercase tracking-[0.2em] text-[#9A9791] sm:text-[0.7rem]">
          {label}
        </span>
        <span aria-hidden className="h-px min-w-0 flex-1 bg-white/[0.11]" />
      </div>

      <h2 className="mt-7 max-w-[22ch] text-[clamp(1.7rem,3.4vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.028em] text-[#E7E5E1]">
        {title}
      </h2>

      {lead ? (
        <p className="mt-5 max-w-[58ch] text-[1rem] leading-[1.65] text-[#9A9791]">
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
      <dt className="knst-mono shrink-0 text-[0.65rem] uppercase tracking-[0.14em] text-[#9A9791]">
        {k}
      </dt>
      <dd className="knst-mono min-w-0 break-words text-right text-[0.8rem] leading-snug text-[#E7E5E1]">
        {v}
      </dd>
    </div>
  );
}

/** Small bordered mono tag — used for spec chips and the honesty label. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="knst-mono inline-block border border-white/[0.11] px-2.5 py-1 text-[0.63rem] uppercase tracking-[0.12em] text-[#9A9791]">
      {children}
    </span>
  );
}
