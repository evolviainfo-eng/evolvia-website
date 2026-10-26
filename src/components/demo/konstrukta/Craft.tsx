import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { BAND, SectionHead, T_TEXT, WRAP } from "./ui";

/** The quiet page after the calculator, in Haven's section grammar: the
 *  sentence as the heading, hairline, label left and the lead right, then
 *  four site details as a two-column hairline list across the full grid,
 *  numbered like the stages. No photographs: the page breathes. */
export function Craft({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).craft;
  const shots = [c.shots.cut, c.shots.worker, c.shots.truss, c.shots.scaffold];
  return (
    <section id="amatas" className={BAND}>
      <div className={WRAP}>
        <SectionHead label={c.label} title={c.title} lead={c.lead} />

        <ul className="mt-[clamp(48px,6vw,88px)] grid border-t border-[#E2E2E2] lg:grid-cols-2 lg:gap-x-6">
          {shots.map((s, i) => (
            <li
              key={s.caption}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
              className="flex min-w-0 items-baseline gap-4 border-b border-[#E2E2E2] py-6 lg:py-7"
            >
              <span className="k-num w-7 shrink-0 text-[1rem] text-[#5E5E5E]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={`min-w-0 max-w-[52ch] text-pretty ${T_TEXT} text-[#111111]`}>
                {s.caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
