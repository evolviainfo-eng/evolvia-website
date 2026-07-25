import type { ReactNode } from "react";

/** Shared typographic and photographic primitives for the Fumé demo.
 *
 *  Everything here is hard-coded to Fumé's palette on purpose — the demo must
 *  not follow the surrounding site's light/dark toggle.
 *
 *    ink      #0C0B0A   page
 *    surface  #141210   raised panels
 *    cream    #EDE6DA   text
 *    ash      #9C948A   muted text (6.3:1 on ink — passes AA)
 *    hairline rgba(237,230,218,0.14)
 *    ember    #C0703A   the single accent — five uses on the whole page
 */

export const HAIRLINE = "rgba(237,230,218,0.14)";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase leading-none tracking-[0.26em] text-[#9c948a]">
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
      className={`font-[family-name:var(--font-fume-display)] text-[clamp(1.85rem,3.9vw,2.9rem)] font-light leading-[1.1] tracking-[-0.008em] text-[#ede6da] ${className}`}
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
      className={`font-[family-name:var(--font-fume-ui)] text-[0.97rem] leading-[1.78] text-[#9c948a] ${className}`}
    >
      {children}
    </p>
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
  settle = false,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  className?: string;
  priority?: boolean;
  settle?: boolean;
}) {
  const settleAttr = settle ? { "data-settle": "" } : {};
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
      {...settleAttr}
    />
  );
}

/** A photo in its frame: the frame rises, the image settles inside it. */
export function Frame({
  src,
  w,
  h,
  alt,
  ratio,
  className = "",
  caption,
  index = 0,
  settle = false,
  priority = false,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  ratio: string;
  className?: string;
  caption?: string;
  index?: number;
  settle?: boolean;
  priority?: boolean;
}) {
  return (
    <figure
      data-rise
      style={{ "--i": index } as React.CSSProperties}
      className={className}
    >
      <div className="overflow-hidden bg-[#141210]" style={{ aspectRatio: ratio }}>
        <Photo
          src={src}
          w={w}
          h={h}
          alt={alt}
          settle={settle}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-[42ch] font-[family-name:var(--font-fume-ui)] text-[0.78rem] leading-relaxed text-[#9c948a]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
