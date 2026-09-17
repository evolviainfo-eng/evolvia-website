import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import {
  BAND,
  CONTAINER,
  Plate,
  SectionHead,
  T_BODY,
  T_MICRO,
  Tag,
} from "./ui";

export function Services({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).services;
  return (
    <section id="paslaugos" className={`${BAND} border-t border-white/[0.11]`}>
      <div className={CONTAINER}>
        <div className="grid gap-[clamp(32px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:items-end">
          <SectionHead
            index="02"
            label={c.label}
            title={c.title}
            lead={c.lead}
          />

          <figure className="min-w-0">
            <Plate
              src="/demo/konstrukta/frame.webp"
              width={1400}
              height={933}
              alt={c.alt}
            />
            <figcaption
              className={`${T_MICRO} mt-3 max-w-[52ch] tracking-[0.12em] text-[#9A9791]`}
            >
              {c.caption}
            </figcaption>
          </figure>
        </div>

        <ol className="mt-[clamp(44px,6vw,72px)] border-t border-white/[0.11]">
          {c.items.map((s, i) => (
            <li
              key={s.no}
              data-rise
              style={{ "--i": i + 1 } as React.CSSProperties}
              className="border-b border-white/[0.11]"
            >
              <div className="group grid gap-x-8 gap-y-4 px-1 py-7 transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:bg-[#1A1C20] md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.25fr)] md:py-9">
                <span
                  className={`${T_MICRO} tracking-[0.2em] text-[#9A9791] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:text-[#E7E5E1]`}
                >
                  {s.no}
                </span>

                <h3 className="min-w-0 text-balance text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.018em] text-[#E7E5E1] transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-x-[3px] md:text-[1.25rem]">
                  {s.title}
                </h3>

                <div className="min-w-0">
                  <p
                    className={`max-w-[64ch] text-pretty ${T_BODY} text-[#9A9791]`}
                  >
                    {s.body}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.specs.map((sp) => (
                      <li key={sp}>
                        <Tag>{sp}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
