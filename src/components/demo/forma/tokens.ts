/* Forma — the demo's own small system.
 *
 * Two ink tones, one hairline, one type scale. Hard-coded hex is correct here:
 * a demo owns its palette and must not inherit the site tokens, which flip with
 * the visitor's dark-mode toggle.
 *
 * These are plain strings, never merged — so nothing here carries a colour that
 * a call site would then have to fight. */

export const PAPER = "#F4F1EC";
export const BAND = "#EAE5DD";
export const INK = "#1A1917";
/** The one secondary tone. 5.4:1 on paper, 5.0:1 on the band — AA at 11px. */
export const MUTED = "#5E5952";
/** The one hairline. Every rule, border and divider on the page uses it. */
export const HAIR = "rgba(26,25,23,0.16)";

export const SERIF = { fontFamily: "var(--font-forma-display)" } as const;

export const WRAP = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
/** One vertical rhythm for every band on the page. */
export const SECTION = "py-[clamp(80px,11vw,144px)]";

/* ── Type scale — four body steps and two headings, nothing off it ────
   Every constant below is used whole: none of them is ever concatenated with
   a second `text-*` or `tracking-*`, because two arbitrary values of the same
   utility on one element have no defined winner. Sizes belong to the step,
   headings state their own. */
/** Caps meta — figure captions, table keys, indices, timings. */
export const T_META = "text-[0.6875rem] uppercase tracking-[0.2em]";
/** The section label. Same size, opened up so it reads as a marker. */
export const T_EYEBROW = "text-[0.6875rem] uppercase tracking-[0.24em]";
/** Figures that must stay in sentence case — prices, counters, ratios. */
export const T_NUM = "text-[0.6875rem] tabular-nums tracking-[0.04em]";
export const T_SMALL = "text-[0.8125rem] leading-[1.65]";
export const T_BODY = "text-[0.9375rem] leading-[1.72]";
export const T_LEAD = "text-[1.0625rem] leading-[1.68]";
/** Section heading. 48.8px at 1440 — well inside the 72px ceiling. */
export const T_H2 =
  "min-w-0 font-normal text-[clamp(2rem,4.4vw,3.05rem)] leading-[1.06] tracking-[-0.02em] text-balance";
/** Card heading — shape only; the call site states the size for its column. */
export const T_H3 =
  "min-w-0 font-normal leading-[1.16] tracking-[-0.01em] text-pretty";
