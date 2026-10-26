import type { Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";
import { Swap } from "./Swap";

/** The opening, after the reference's first screen: plain warm ground, one
 *  product still life, one line of text bottom left. No headline, no
 *  subtitle, no button block. The lightest real product photograph the shop
 *  owns (two jars against a white wall) stands in the middle and runs off
 *  the bottom edge; on a phone it fills the width.
 *
 *  The page's h1 is that one 20 px line, with its brand word in the serif.
 *  The header bar sits above this screen, never over it (SiteHeader). */
export function Hero({ locale }: { locale: Locale }) {
  const t = getSkalsaCopy(locale).hero;

  return (
    <section
      id="virsus"
      data-sk-tone="light"
      className="relative h-[calc(100svh-var(--demo-bar-h)-var(--sk-head))] min-h-[520px] overflow-clip"
    >
      <div className="absolute inset-x-0 bottom-[120px] top-0 lg:bottom-0 lg:left-1/2 lg:right-auto lg:top-[clamp(24px,5svh,56px)] lg:w-[min(46vw,860px)] lg:-translate-x-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/demo/skalsa/p-4.webp"
          alt={t.stillAlt}
          width={900}
          height={898}
          decoding="async"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-[50%_70%]"
        />
      </div>

      <div className="absolute inset-x-0 bottom-[36px] flex items-baseline justify-between gap-6 px-[30px] lg:bottom-[48px] lg:px-[60px]">
        <h1 className="sk-cap min-w-0 max-w-[22ch] text-balance lg:max-w-[calc((100vw-min(46vw,860px))/2-90px)]">
          <Swap text={t.line} />
        </h1>
        <a href="#katalogas" className="sk-link shrink-0">
          {t.shop}
        </a>
      </div>
    </section>
  );
}

/** One paragraph, the largest type on the page (28 px), with generous air
 *  above and below. It ends on the brand's own name in the serif, the way
 *  the reference's intro ends on "The One." */
export function Intro({ locale }: { locale: Locale }) {
  const copy = getSkalsaCopy(locale);

  return (
    <section
      data-sk-tone="light"
      className="px-[30px] py-[clamp(96px,14vw,200px)] lg:px-[60px]"
    >
      <p
        data-rise
        className="max-w-[34ch] text-[1.375rem] leading-[1.27] text-pretty sm:text-[1.5rem] lg:max-w-[48ch] lg:text-[1.75rem] lg:leading-[1.25]"
      >
        {copy.hero.lead} <Swap text={copy.intro.close} />
      </p>
    </section>
  );
}
