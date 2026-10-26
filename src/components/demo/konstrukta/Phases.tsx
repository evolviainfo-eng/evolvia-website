import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { BAND, Photo, SectionHead, T_H3, T_TEXT, WRAP } from "./ui";

/** How a build runs: Haven's section head, then one upright photograph in
 *  the left third (it stays while the list passes) beside the five stages
 *  as a hairline table (stage, what happens, how long). Phone: the
 *  photograph above the list. Nothing moves here except the rows arriving
 *  and the photograph settling. */
export function Phases({ locale }: { locale: Locale }) {
  const copy = getKonstruktaCopy(locale);
  const c = copy.phases;
  return (
    <section id="eiga" className={BAND}>
      <div className={WRAP}>
        <SectionHead label={c.label} title={c.title} lead={c.lead} />

        <div className="mt-[clamp(48px,6vw,96px)] grid gap-y-10 lg:grid-cols-12 lg:items-start lg:gap-x-6">
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--demo-bar-h)+112px)] lg:col-span-4">
            <Photo
              src="/demo/konstrukta/phases.webp"
              width={1400}
              height={1400}
              ratio="1 / 1"
              alt={copy.photos.phases}
              settle
              position="42% 50%"
              className="max-w-[400px]"
            />
          </div>

          <ol className="min-w-0 border-t border-[#E2E2E2] lg:col-span-8">
            {c.items.map((p, i) => (
              <li
                key={p.no}
                data-rise
                style={{ "--i": i } as React.CSSProperties}
                className="grid gap-y-3 border-b border-[#E2E2E2] py-7 lg:grid-cols-8 lg:items-baseline lg:gap-x-6 lg:py-8"
              >
                <h3
                  className={`flex min-w-0 items-baseline gap-4 ${T_H3} text-[#111111] lg:col-span-3`}
                >
                  <span className="k-num w-7 shrink-0 text-[1rem] font-normal text-[#5E5E5E]">
                    {p.no}
                  </span>
                  <span className="min-w-0 text-balance">{p.title}</span>
                </h3>
                <p className={`min-w-0 max-w-[60ch] text-pretty pl-11 ${T_TEXT} text-[#5E5E5E] lg:col-span-4 lg:pl-0`}>
                  {p.body}
                </p>
                <p className="k-num min-w-0 whitespace-nowrap pl-11 text-[1rem] text-[#111111] lg:col-span-1 lg:pl-0 lg:text-right">
                  {p.time}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
