import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { T_META, WRAP } from "./ui";

/** The signature, Haven's "word-flank grow": a white screen, the two ways
 *  Konstrukta builds, and between them a small photograph of a timber frame
 *  that grows until it meets them.
 *  The words never move.
 *
 *  The section is the page's only pinned moment, and it is plain CSS
 *  sticky: under html[data-choreo] it is 220svh tall (180svh on a phone)
 *  and the stage sticks under the honesty bar. Motion.tsx scrubs one
 *  transform on a box that already has its final size (700px at most: the
 *  photograph is 1400px wide, so never past 2x). The words stand right
 *  beside that final frame, so at full size the photograph meets them
 *  (scale ~0.2 to 1; 0.4 to 1 on a phone) and counter-scales the image inside it (1.15 to 1).
 *  Width and height are never animated.
 *
 *  Phone: the words go above and below the photograph (top left, bottom
 *  right) and the photograph grows across the content width.
 *  Reduced motion or no JS: one screen, photograph at full size. */
export function Flank({ locale }: { locale: Locale }) {
  const copy = getKonstruktaCopy(locale);
  const c = copy.flank;
  const word =
    "min-w-0 text-[clamp(2.25rem,3.6vw,3.5rem)] font-normal leading-none tracking-[-0.035em] text-[#111111]";

  return (
    <section data-k-flank className="k-flank relative">
      <div className="k-flank-stage flex flex-col overflow-clip">
        <p
          className={`${T_META} pointer-events-none absolute inset-x-0 top-[clamp(24px,4.5vh,40px)] text-center text-[#111111]`}
        >
          {copy.hero.facts[0]}
        </p>

        <div
          className={`${WRAP} grid flex-1 content-center gap-5 py-[clamp(72px,10vh,96px)] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-[clamp(32px,3.4vw,56px)] md:py-[clamp(64px,9vh,88px)]`}
        >
          <p className={`${word} md:justify-self-end md:text-right`}>{c.left}</p>

          <div className="flex min-w-0 justify-center">
            <div
              data-k-flank-box
              className="relative aspect-[4/3] w-[min(100%,calc((100svh_-_var(--demo-bar-h)_-_300px)*4/3))] min-w-[200px] origin-center overflow-hidden bg-[#F5F5F5] md:w-[min(960px,calc(100vw_-_2*var(--k-g)_-_26rem),calc((100svh_-_var(--demo-bar-h)_-_176px)*4/3))] md:min-w-[240px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demo/konstrukta/flank.webp"
                width={2000}
                height={1500}
                alt={copy.photos.flank}
                decoding="async"
                loading="lazy"
                data-k-flank-img
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <p className={`${word} justify-self-end text-right md:justify-self-start md:text-left`}>{c.right}</p>
        </div>

        <p
          className={`${T_META} pointer-events-none absolute inset-x-0 bottom-[clamp(24px,4.5vh,40px)] text-center text-[#111111]`}
        >
          {copy.hero.facts[1]}
        </p>
      </div>
    </section>
  );
}
