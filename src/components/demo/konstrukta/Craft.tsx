import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { BAND, CONTAINER, Plate, SectionHead, T_MICRO, T_SM } from "./ui";

/** Plate code and photo per shot. The alt text and caption live in the
 *  dictionary under the same id. */
const SHOTS = [
  {
    id: "cut",
    code: "A/01",
    src: "/demo/konstrukta/detail-cut.webp",
    w: 1200,
    h: 800,
  },
  {
    id: "worker",
    code: "A/02",
    src: "/demo/konstrukta/worker.webp",
    w: 1200,
    h: 800,
  },
  {
    id: "truss",
    code: "A/03",
    src: "/demo/konstrukta/truss.webp",
    w: 1400,
    h: 933,
  },
  {
    id: "scaffold",
    code: "A/04",
    src: "/demo/konstrukta/scaffold.webp",
    w: 1400,
    h: 933,
  },
] as const;

export function Craft({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).craft;
  return (
    <section id="amatas" className={`${BAND} border-t border-white/[0.11]`}>
      <div className={CONTAINER}>
        <SectionHead
          index="06"
          label={c.label}
          title={c.title}
          lead={c.lead}
        />

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-x-[clamp(20px,3vw,36px)] gap-y-[clamp(32px,4vw,52px)] sm:grid-cols-2">
          {SHOTS.map((s, i) => (
            <figure
              key={s.code}
              data-rise
              style={{ "--i": i + 1 } as React.CSSProperties}
              className="min-w-0"
            >
              <Plate
                src={s.src}
                width={s.w}
                height={s.h}
                alt={c.shots[s.id].alt}
              />
              <figcaption className="mt-4 border-t border-white/[0.11] pt-3">
                <span className={`${T_MICRO} block text-[#9A9791]`}>
                  {s.code}
                </span>
                <span
                  className={`mt-2 block max-w-[46ch] text-pretty ${T_SM} text-[#E7E5E1]`}
                >
                  {c.shots[s.id].caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
