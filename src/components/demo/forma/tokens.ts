/* Forma, the demo's own small system (round 8, after TARQ Studio).
 *
 * Warm grey paper, near-black ink, one sand tone for the dark contact
 * ground. No accent colour, no gradients. Hard-coded hex is correct here: a
 * demo owns its palette and must not inherit the site tokens, which flip with
 * the visitor's dark-mode toggle.
 *
 * Contrast, measured: MUTED on PAPER 4.97:1 (small text), DIM on PAPER
 * 3.32:1 (only for words 24px and up: inactive filter words), SAND on INK
 * 12.1:1, SAND_MUTED on INK 6.2:1. */

export const PAPER = "#DFDDDC";
export const INK = "#171717";
export const SAND = "#D9D4C2";
export const MUTED = "#5F5B58";
export const DIM = "#7A7673";
export const SAND_MUTED = "#9C978C";
/** The one hairline on paper: ink at 25%. */
export const HAIR = "rgba(23,23,23,0.25)";
/** The hairline on the dark contact ground. */
export const HAIR_DARK = "rgba(217,212,194,0.22)";

/** Page frame: 40px side margin at 1440, 16px on a phone, 1360px of content. */
export const WRAP =
  "mx-auto w-full max-w-[1440px] px-[var(--f-pad)]";

/* ── Type ──────────────────────────────────────────────────────────
   One grotesk (Archivo) in two widths, and one serif italic used only as
   punctuation: parentheses and numerals. Never a heading.
   `f-ext` (in FormaPage's stylesheet) sets the 125% width axis.

   The scale, desktop / phone (px):
     84 / 40   section titles (extended caps)
     60 / 34   hero project name (serif italic, tracked)
     36 / 22   filter words
     24 / 18   step and service names (extended caps), contact sentence
     20 / 18   hero intro (light)
     18 / 16   rows: project names, years, links, prices
     16 / 16   body (light, justified only from 1024px)
     14 / 14   notes, counts, footer (MUTED, 4.97:1)
   Nothing smaller than 12. */

/** Section titles: extended uppercase, 84px at 1440, 40px on a phone. */
export const T_TITLE =
  "f-ext min-w-0 font-normal uppercase text-[clamp(2.5rem,5.85vw,5.25rem)] leading-[1] tracking-[0]";
/** Small extended caps: process step titles, service names. */
export const T_CAPS =
  "f-ext font-normal uppercase text-[clamp(1.125rem,1.67vw,1.5rem)] leading-[0.95]";
/** Body: light, justified on desktop, 16/22.4. */
export const T_BODY =
  "f-just text-[1rem] font-light leading-[1.4]";
/** Body that is never justified: narrow columns, where justification
 *  opens rivers (process steps, phone). */
export const T_BODY_RAG = "text-[1rem] font-light leading-[1.45]";
/** The hero's intro over the photograph. */
export const T_LEAD =
  "text-[clamp(1.125rem,1.4vw,1.25rem)] font-light leading-[1.4]";
/** The first sentence of a block: same size, regular weight. */
export const T_BODY_STRONG = "text-[1rem] font-normal leading-[1.4]";
/** Labels, nav, project names. */
export const T_LABEL = "text-[0.9375rem] font-normal leading-[1.3]";
export const T_ROW = "text-[clamp(1rem,1.25vw,1.125rem)] font-normal leading-[1.3]";
export const T_SMALL = "text-[0.875rem] font-normal leading-[1.45]";
/** Instrument Serif italic. Only for ( ), 01 02 03 and the hero name. */
export const T_ITALIC = "f-it font-normal";
