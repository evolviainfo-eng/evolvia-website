import type { Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";
import { FreeShippingMeter } from "./FreeShippingMeter";
import { SectionHead } from "./Tile";

/** Delivery and returns: the four facts as a two by two grid in the right
 *  half, under the section's sentence (a 20 px title and a few lines each,
 *  no rules, no icons), then the live
 *  basket meter as the second solid brand block of the page. */
export function Shipping({ locale }: { locale: Locale }) {
  const t = getSkalsaCopy(locale).shipping;

  return (
    <section id="pristatymas" data-sk-tone="light">
      <SectionHead label={t.eyebrow} line={t.title} />

      <div className="grid gap-x-[120px] px-[30px] pb-[clamp(80px,8vw,120px)] pt-[20px] lg:grid-cols-2 lg:px-[60px] lg:pt-[24px]">
        <dl className="grid min-w-0 gap-x-[60px] gap-y-10 sm:grid-cols-2 lg:col-start-2 lg:gap-y-12">
          {t.facts.map((f, i) => (
            <div
              key={f.title}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
              className="min-w-0"
            >
              <dt className="sk-cap text-pretty">{f.title}</dt>
              <dd className="mt-3 max-w-[36ch] text-[1rem] leading-[1.55] text-pretty text-[#7E5A50]">
                {f.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <FreeShippingMeter />
    </section>
  );
}
