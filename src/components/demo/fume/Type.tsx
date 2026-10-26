import type { CSSProperties, ReactNode } from "react";

/** Shared typographic and photographic primitives for the Fumé demo.
 *
 *  Composition and type after Restaurant Zimmerl (Awwwards HM, Nov 2025):
 *  a widely spaced capitals wordmark, small spaced capitals for headings and
 *  labels, fine copper hairlines and thin ruled frames, calm centred rhythm.
 *  The palette is hard-coded on purpose: the demo must not follow the
 *  surrounding site's light/dark toggle.
 *
 *    ground   #1B1714   page (smoked charcoal)
 *    raised   #231E1A   ruled card, booking widget, footer card, menu panel
 *    paper    #EFE7DC   text (14.5:1 on ground)
 *    muted    #B9AD9F   secondary text (8.1:1 on ground, 7.5:1 on raised)
 *    label    #D6CABA   spaced capitals (10.9:1 on ground)
 *    copper   #B8794A   hairlines, ruled frames and the reservation button,
 *                       nothing else (no copper text anywhere)
 *
 *  Type: Cormorant Garamond for everything set in capitals and every price;
 *  DM Sans for reading text and form controls. ONE scale, nothing outside it:
 *    wordmark  clamp(4rem, 12.5vw, 11rem), weight 300, tracking 0.3em
 *    h2        clamp(1.75rem, 3.2vw, 3rem), caps, tracking 0.12em
 *    lead      clamp(1.375rem, 1.9vw, 1.625rem) serif, upright (hero only)
 *    body      1rem phone / 1.0625rem desktop, line-height 1.75
 *    label     0.875rem (14px), weight 600, caps, tracking 0.24em, #D6CABA
 *    note      0.875rem DM Sans, #B9AD9F (captions, footnotes, helpers)
 *  Rhythm: --sec between sections, --gap from a heading block to its
 *  content (FumePage's scope CSS).
 *
 *  Motion hooks are data attributes, read by Motion.tsx:
 *    data-group      its direct children arrive one after another, 100 ms
 *                    apart, once, when the group reaches 82% of the viewport
 *    data-lines      (a child of a group) split into masked lines that rise
 *    data-parallax   a photo frame whose [data-parallax-img] layer drifts
 *                    ±15% of the frame height with the scroll
 */

export const PAPER = "#EFE7DC";
export const MUTED = "#B9AD9F";
export const COPPER = "#B8794A";
/** The page's hairline: copper, thin. */
export const RULE = "rgba(184,121,74,0.5)";
/** A quieter copper rule, for rows inside a list. */
export const HAIRLINE = "rgba(184,121,74,0.3)";

export const UI = "font-[family-name:var(--font-fume-ui)]";
export const DISPLAY = "font-[family-name:var(--font-fume-display)]";

/** Small spaced capitals (`.fume-label` in FumePage's scope CSS). */
export function Label({
  children,
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "h3";
}) {
  return <Tag className={`fume-label ${className}`}>{children}</Tag>;
}

/** A section heading in spaced capitals, split into rising lines. */
export function H2({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2 id={id} data-lines className={`fume-h2 text-balance ${className}`}>
      {children}
    </h2>
  );
}

export function Body({
  children,
  className = "",
  lines = false,
}: {
  children: ReactNode;
  className?: string;
  /** Split into rising lines (only as a direct child of a data-group). */
  lines?: boolean;
}) {
  return (
    <p
      {...(lines ? { "data-lines": "" } : {})}
      className={`${UI} text-pretty text-[1rem] leading-[1.75] text-[#b9ad9f] sm:text-[1.0625rem] ${className}`}
    >
      {children}
    </p>
  );
}

/** Footnotes, captions, helper lines: one size for all of them. */
export function Note({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`${UI} text-pretty text-[0.875rem] leading-[1.65] text-[#b9ad9f] ${className}`}
    >
      {children}
    </p>
  );
}

/** A short copper hairline, centred unless told otherwise. */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-px w-12 ${className}`}
      style={{ background: RULE }}
    />
  );
}

export function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 10"
      className="fume-arrow h-[10px] w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path d="M0 5h19M14.5 0.5 19 5l-4.5 4.5" />
    </svg>
  );
}

/** Two buttons only: the copper one is for booking a table and nothing
 *  else; the outlined one is everything else. */
export function Btn({
  href,
  children,
  copper = false,
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  copper?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`fume-btn ${copper ? "fume-btn--cu" : ""} ${className}`}
    >
      <span>{children}</span>
      {arrow && <Arrow />}
    </a>
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
  style,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
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
      style={style}
    />
  );
}

/** A photograph in a fixed-ratio frame with square corners.
 *
 *  `parallax`: the image sits on a layer 130% of the frame's height, which
 *  Motion.tsx drifts ±15% of the frame with the scroll. Without JS (or under
 *  reduced motion, or on a phone) that layer simply rests centred.
 *
 *  Frames are sized so no photograph is shown wider than half its pixel
 *  width allows (2x screens); parallax frames are smaller still, since the
 *  layer is enlarged by 1.3. */
export function Frame({
  src,
  w,
  h,
  alt,
  ratio = "3 / 2",
  className = "",
  caption,
  parallax = false,
  position,
  fill = false,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  ratio?: string;
  className?: string;
  caption?: string;
  parallax?: boolean;
  position?: string;
  /** From md up, drop the ratio and stretch to the grid row's height (the
   *  figure must be a stretched grid item). */
  fill?: boolean;
}) {
  const img = (
    <Photo
      src={src}
      w={w}
      h={h}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      style={position ? { objectPosition: position } : undefined}
    />
  );
  return (
    <figure
      className={`m-0 min-w-0 ${fill ? "md:flex md:h-full md:flex-col" : ""} ${className}`}
    >
      <div
        {...(parallax ? { "data-parallax": "" } : {})}
        className={`relative overflow-hidden bg-[#231e1a] aspect-[var(--ar)] ${
          fill ? "md:aspect-auto md:min-h-0 md:flex-1" : ""
        }`}
        style={{ "--ar": ratio } as CSSProperties}
      >
        {parallax ? (
          <div data-parallax-img className="absolute inset-x-0 top-[-15%] h-[130%]">
            {img}
          </div>
        ) : (
          img
        )}
      </div>
      {caption && (
        <figcaption
          className={`${UI} mt-4 max-w-[44ch] text-pretty text-[0.875rem] leading-[1.65] text-[#b9ad9f]`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
