import type { ReactNode } from "react";

export type Tone = "dark" | "light";

/** A still photo tile carrying the page's signature: the caption row.
 *
 *  The photo moves with the page 1:1 (no parallax, no scrub). Its caption
 *  row (name left, one underlined action right) is `position: sticky` at
 *  45 % of the viewport INSIDE the tile, so while the tile passes, the row
 *  stays parked on one horizontal line in the middle of the screen, then
 *  leaves with the tile's bottom edge. Tiles that sit side by side park
 *  their rows on the same line; tiles that follow each other hand the line
 *  over, because one tile's top edge is the previous tile's bottom edge.
 *
 *  The tile's own top inset is that same 45vh, so the row starts on its
 *  parked line instead of riding the photo's top edge, then simply stays.
 *
 *  Pure CSS: zero JS, nothing to revert, nothing to reduce. The tile itself
 *  uses `overflow: clip` (not hidden, which would make it a scroll
 *  container and stop the sticky row); the 1.03 hover zoom is clipped by
 *  the image's own wrapper.
 *
 *  `tone` is the photo's brightness under the caption: "dark" sets the row
 *  in the ground colour (plus a very light brown veil so the words never
 *  sit on a bare highlight), "light" in the brand brown. The header reads
 *  `data-sk-tone` to flip its wordmark. */
export function Tile({
  src,
  w,
  h,
  alt,
  tone,
  position = "50% 50%",
  className = "",
  label,
  action,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  tone: Tone;
  /** CSS object-position: which part of the photo the crop keeps. */
  position?: string;
  /** Height utilities for the tile. */
  className?: string;
  label: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      data-sk-tone={tone}
      className={`sk-tile group relative min-w-0 pb-[28px] pt-[45vh] ${className} ${
        tone === "dark" ? "text-[#F2EFEA]" : "text-[#5A2A1E]"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#ECE3DA]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={w}
          height={h}
          decoding="async"
          loading="lazy"
          style={{ objectPosition: position }}
          className="sk-zoom h-full w-full object-cover"
        />
        {tone === "dark" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[rgba(42,20,16,0.2)]"
          />
        )}
      </div>

      <div
        className={`sk-caption relative z-[1] flex items-baseline justify-between gap-6 px-[30px] lg:px-[60px] ${
          tone === "dark" ? "[text-shadow:0_1px_18px_rgba(42,20,16,0.55)]" : ""
        }`}
      >
        <div className="min-w-0">{label}</div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

/** A section's opening row, in the reference's grammar: the section name
 *  as a 20 px uppercase label on the left, its one sentence on the right
 *  half (under it on a phone). Nothing larger than the caption size. */
export function SectionHead({
  label,
  line,
  sub,
}: {
  label: ReactNode;
  line?: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="grid gap-x-[120px] gap-y-3 px-[30px] pb-[28px] pt-[clamp(80px,8vw,120px)] lg:grid-cols-2 lg:px-[60px] lg:pb-[40px]">
      <h2 data-rise className="sk-cap sk-up min-w-0">
        {label}
      </h2>
      {(line || sub) && (
        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="min-w-0"
        >
          {line && <p className="sk-cap max-w-[32ch] text-pretty">{line}</p>}
          {sub && (
            <p className="mt-3 max-w-[48ch] text-[1rem] leading-[1.5] text-pretty text-[#7E5A50]">
              {sub}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
