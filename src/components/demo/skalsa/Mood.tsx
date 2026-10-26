import type { Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";

/** The one move borrowed from Rahasya Fragrances: one full-bleed mood
 *  photograph with a short story set in its corner, a name, a few lines and
 *  a plain "Discover" link. Nothing else on the photo, nothing moving.
 *
 *  This is the only full-bleed photograph on the page, because it is the
 *  only one wide enough (1800 px) to fill a desktop without being blown up.
 *  The text sits bottom right, on the right half's grid line, over the dark table edge, with a light brown
 *  veil rising from that corner so the words never sit on a flame. */
export function Mood({ locale }: { locale: Locale }) {
  const copy = getSkalsaCopy(locale);
  const t = copy.mood;

  return (
    <section
      data-sk-tone="dark"
      className="group relative h-[90svh] min-h-[520px] overflow-clip text-[#F2EFEA] lg:h-[clamp(620px,100svh,1100px)]"
    >
      <div className="absolute inset-0 overflow-hidden bg-[#2A1410]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/demo/skalsa/hero.webp"
          alt={copy.hero.imageAlt}
          width={1800}
          height={1286}
          decoding="async"
          loading="lazy"
          className="sk-zoom h-full w-full object-cover object-[35%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(42,20,16,0.62),rgba(42,20,16,0)_55%)] lg:bg-[linear-gradient(to_top_left,rgba(42,20,16,0.62),rgba(42,20,16,0)_50%)]"
        />
      </div>

      <div
        data-rise
        className="absolute inset-x-0 bottom-0 px-[30px] pb-[40px] lg:left-1/2 lg:px-[60px] lg:pb-[60px]"
      >
        <h2 className="sk-serif text-[1.75rem] leading-[1.1]">{t.eyebrow}</h2>
        <p className="mt-4 max-w-[36ch] text-[1rem] leading-[1.55] text-pretty">
          {t.quote}
        </p>
        <a href="#katalogas" className="sk-link mt-6 inline-block">
          {copy.discover}
        </a>
      </div>
    </section>
  );
}
