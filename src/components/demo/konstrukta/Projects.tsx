import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import {
  BAND,
  CONTAINER,
  Plate,
  SectionHead,
  SpecRow,
  T_BODY,
  T_MICRO,
} from "./ui";

/** Reference number and photo per project. The words (title, text, alt,
 *  spec table) live in the dictionary under the same id. */
const PROJECTS = [
  {
    id: "ringaudai",
    no: "OBJ-24-07",
    img: { src: "/demo/konstrukta/project-1.webp", w: 1400, h: 1050 },
  },
  {
    id: "domeikava",
    no: "OBJ-23-02",
    img: { src: "/demo/konstrukta/project-2.webp", w: 1400, h: 788 },
  },
  {
    id: "aleksotas",
    no: "OBJ-25-01",
    img: { src: "/demo/konstrukta/project-3.webp", w: 1400, h: 860 },
  },
  {
    id: "garliava",
    no: "OBJ-25-06",
    img: { src: "/demo/konstrukta/project-4.webp", w: 1400, h: 1106 },
  },
] as const;

export function Projects({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).projects;
  return (
    <section
      id="objektai"
      className={`${BAND} border-t border-white/[0.11] bg-[#1A1C20]`}
    >
      <div className={CONTAINER}>
        <SectionHead
          index="03"
          label={c.label}
          title={c.title}
          lead={c.lead}
        />

        <div className="mt-[clamp(40px,6vw,72px)] flex flex-col gap-[clamp(48px,6vw,80px)]">
          {PROJECTS.map((p, i) => {
            const t = c.items[p.id];
            return (
              <article
                key={p.no}
                data-rise
                style={{ "--i": i + 1 } as React.CSSProperties}
                className="grid gap-7 border-t border-white/[0.11] pt-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12"
              >
                <Plate
                  src={p.img.src}
                  width={p.img.w}
                  height={p.img.h}
                  alt={t.alt}
                  className="min-w-0"
                />

                <div className="min-w-0">
                  <p className={`${T_MICRO} tracking-[0.2em] text-[#9A9791]`}>
                    {p.no}
                  </p>
                  <h3 className="mt-3 text-balance text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#E7E5E1] md:text-[1.25rem]">
                    {t.title}
                  </h3>
                  <p
                    className={`mt-4 max-w-[52ch] text-pretty ${T_BODY} text-[#9A9791]`}
                  >
                    {t.body}
                  </p>

                  <dl className="mt-7 border-t border-white/[0.11]">
                    {t.specs.map(([k, v]) => (
                      <SpecRow key={k} k={k} v={v} />
                    ))}
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
