import type { Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";
import { SectionHead, Tile } from "./Tile";

/* Step titles, texts and alts live in the dictionary, in the same order. */
const STEPS = [
  { img: "/demo/skalsa/studio-1.webp", w: 1300, h: 968, position: "70% 50%" },
  { img: "/demo/skalsa/studio-2.webp", w: 1300, h: 965, position: "40% 50%" },
  { img: "/demo/skalsa/match.webp", w: 1200, h: 803, position: "80% 50%" },
];

/** The workshop: three tall photographs in thirds, edge to edge, each
 *  carrying its step's name as a sticky caption, so on a desktop the three
 *  names ride across one line together, a shop window of the process. What
 *  happens in each step is a short paragraph on the ground under its photo.
 *  On a phone the steps stack: photo, caption, paragraph, next step. */
export function Studio({ locale }: { locale: Locale }) {
  const t = getSkalsaCopy(locale).studio;

  return (
    <section id="dirbtuve" data-sk-tone="light">
      <SectionHead label={t.eyebrow} line={t.title} sub={t.lead} />

      <ol className="grid lg:grid-cols-3 lg:pb-[clamp(80px,8vw,120px)]">
        {STEPS.map((s, i) => (
          <li key={s.img} className="flex min-w-0 flex-col">
            <Tile
              src={s.img}
              w={s.w}
              h={s.h}
              alt={t.steps[i].alt}
              tone="dark"
              position={s.position}
              className="h-[75svh] lg:h-[clamp(600px,92svh,900px)]"
              label={<h3 className="sk-cap">{t.steps[i].title}</h3>}
            />
            <p
              data-rise
              style={{ "--i": i } as React.CSSProperties}
              className="max-w-[calc(44ch+120px)] px-[30px] pb-[56px] pt-[24px] text-[1rem] leading-[1.55] text-pretty lg:px-[60px] lg:pb-0 lg:pt-[32px]"
            >
              {t.steps[i].body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
