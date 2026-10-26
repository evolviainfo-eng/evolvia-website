import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { Square, T_META, WRAP } from "./ui";

/** The opening, after Haven: no photograph above the fold and no buttons.
 *  The company's name is the hero, set in blueprint blue from gutter to
 *  gutter and standing on the bottom of the first screen (Motion.tsx fits
 *  it to the exact width once the font is in). Above it, in the right
 *  columns, the promise with its square bullet; under it, four plain facts
 *  spread across the width.
 *
 *  Directly below, the site photograph already peeks in at the gutters.
 *  As it rises it opens to full bleed (clip-path scrubbed by Motion.tsx,
 *  no pin): the one image the brand rests on. */
export function Hero({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).hero;
  return (
    <section id="top" className="relative overflow-x-clip">
      <div
        className={`${WRAP} flex flex-col pb-6 pt-[112px] md:min-h-[max(600px,calc(100svh_-_var(--demo-bar-h)_-_44px))] md:pb-5 md:pt-[136px]`}
      >
        {/* The promise stands directly on the wordmark (right columns on
            a laptop), so the first screen reads as one block: no stray
            paragraph floating at the top. */}
        <div className="grid md:mt-auto md:grid-cols-12 md:gap-x-6">
          <div className="min-w-0 max-w-[440px] md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
            <p
              data-k-lines
              className="flex gap-3 text-[1.125rem] font-medium leading-[1.3] tracking-[-0.01em] text-[#111111] lg:text-[1.25rem]"
            >
              <Square />
              <span>
                <span data-k-line className="block">
                  {c.title[0]}
                </span>
                <span data-k-line className="block">
                  {c.title[1]}
                </span>
              </span>
            </p>
            <p
              data-k-lines
              className="mt-3 text-pretty pl-[21px] text-[1rem] leading-[1.55] text-[#5E5E5E]"
            >
              {c.lead}
            </p>
            <p className="mt-4 pl-[21px]">
              <a href="#objektai" className="k-link text-[1rem]">
                {c.secondary}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-[clamp(48px,6vh,64px)]">
          <h1 className="min-w-0">
            <span data-k-fit className="k-wordmark">
              Konstrukta
            </span>
          </h1>
          <ul
            className={`mt-[clamp(14px,2.2vh,22px)] grid grid-cols-2 gap-x-6 gap-y-1.5 md:flex md:justify-between ${T_META} text-[#111111]`}
          >
            {c.facts.map((f, i) => (
              <li
                key={f}
                className={`min-w-0 ${i % 2 === 1 ? "text-right md:text-left" : ""}`}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        data-k-expand
        className="relative h-[58svh] min-h-[340px] overflow-hidden bg-[#F5F5F5] md:h-[calc(100svh_-_var(--demo-bar-h))] md:max-h-[1100px] md:min-h-[520px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/demo/konstrukta/hero.webp"
          width={2400}
          height={1800}
          alt={c.alt}
          decoding="async"
          loading="eager"
          data-k-expand-img
          className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
        />
      </div>
    </section>
  );
}
