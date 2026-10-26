import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { BAND, SectionHead, SpecRow, T_H3, T_TEXT, WRAP } from "./ui";

/** Photo and placement per project. The words (title, text, alt, spec
 *  table) live in the dictionary under the same id.
 *
 *  `place` is Haven's staggered scatter: images of different widths, left
 *  and right, the right column dropped below the left one so no two ever
 *  share a row line. Below 1024px one clean full-width column. */
const PROJECTS = [
  {
    id: "ringaudai",
    img: { src: "/demo/konstrukta/proj-ringaudai.webp", w: 1800, h: 1200 },
    place: "lg:w-[86%]",
  },
  {
    id: "domeikava",
    img: { src: "/demo/konstrukta/proj-domeikava.webp", w: 1800, h: 1200 },
    place: "lg:ml-auto",
  },
  {
    id: "aleksotas",
    img: { src: "/demo/konstrukta/proj-aleksotas.webp", w: 1350, h: 1800 },
    place: "",
  },
  {
    id: "garliava",
    img: { src: "/demo/konstrukta/proj-garliava.webp", w: 1200, h: 1800 },
    place: "lg:ml-auto lg:w-[84%]",
  },
] as const;

/** Four finished buildings, in Haven's scatter. Every image is capped at
 *  700px (half its pixel width) and settles from 1.08 to 1 as it crosses
 *  the screen; on desktop the right column drifts a little against the
 *  left (Motion.tsx, data-k-drift). Pointing at a project lifts a 20 %
 *  veil and enlarges the image to 1.03 (CSS, hover devices only). The
 *  name, year, story and spec table are always printed under the image,
 *  so touch loses nothing. */
export function Projects({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).projects;
  return (
    <section id="objektai" className={BAND}>
      <div className={WRAP}>
        <SectionHead label={c.label} title={c.title} lead={c.lead} />

        {/* Two independent columns, the right one dropped, so the gaps
            between projects stay even and the scatter never leaves one
            column empty for a screen. */}
        <div className="mt-[clamp(56px,7vw,112px)] grid gap-y-20 lg:grid-cols-2 lg:items-start lg:gap-x-[clamp(56px,9vw,150px)]">
          {[
            [0, 2],
            [1, 3],
          ].map((col, ci) => (
            <ol
              key={ci}
              className={`grid min-w-0 gap-y-20 lg:gap-y-[clamp(96px,9vw,144px)] ${ci === 1 ? "lg:pt-[clamp(140px,13vw,200px)]" : ""}`}
            >
              {col.map((i) => {
                const p = PROJECTS[i];
                const t = c.items[p.id];
                /* Row 1 of every spec table is the year. */
                const year = t.specs[1]?.[1];
                return (
                  <li
                    key={p.id}
                    data-k-drift={ci === 1 ? "" : undefined}
                    className={`w-full min-w-0 max-w-[700px] ${p.place}`}
                  >
                    <article className="k-proj">
                      <div
                        className="relative overflow-hidden bg-[#F5F5F5]"
                        style={{ aspectRatio: `${p.img.w} / ${p.img.h}` }}
                      >
                        <div className="k-proj-zoom absolute inset-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.img.src}
                            width={p.img.w}
                            height={p.img.h}
                            alt={t.alt}
                            decoding="async"
                            loading="lazy"
                            data-k-settle
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <div
                          aria-hidden
                          className="k-proj-veil absolute inset-0 bg-[rgba(17,17,17,0.2)]"
                        />
                      </div>

                      <div className="mt-5 flex items-baseline justify-between gap-6">
                        <h3
                          className={`min-w-0 text-balance ${T_H3} text-[#111111]`}
                        >
                          {t.title}
                        </h3>
                        {year ? (
                          <span className="k-num shrink-0 text-[1rem] text-[#111111]">
                            {year}
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={`mt-3 max-w-[54ch] text-pretty ${T_TEXT} text-[#5E5E5E]`}
                      >
                        {t.body}
                      </p>
                      <dl className="mt-6 border-t border-[#E2E2E2]">
                        {t.specs.map(([k, v]) => (
                          <SpecRow key={k} k={k} v={v} />
                        ))}
                      </dl>
                    </article>
                  </li>
                );
              })}
            </ol>
          ))}
        </div>
      </div>
    </section>
  );
}
