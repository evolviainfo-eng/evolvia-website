import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { BAND, CONTAINER, Plate, SectionHead, SpecRow, T_MICRO } from "./ui";

export function Company({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).company;
  return (
    <section id="bendrove" className={`${BAND} border-t border-white/[0.11]`}>
      <div className={CONTAINER}>
        <div className="grid gap-[clamp(36px,5vw,64px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="min-w-0">
            <SectionHead
              index="01"
              label={c.label}
              title={c.title}
              lead={c.lead}
            />

            <dl className="mt-10 border-t border-white/[0.11]">
              {c.facts.map(([k, v]) => (
                <SpecRow key={k} k={k} v={v} />
              ))}
            </dl>
          </div>

          <figure className="min-w-0 lg:pt-[3.5rem]">
            <Plate
              src="/demo/konstrukta/texture.webp"
              width={1200}
              height={743}
              alt={c.alt}
            />
            <figcaption
              className={`${T_MICRO} mt-3 max-w-[52ch] tracking-[0.12em] text-[#9A9791]`}
            >
              {c.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
