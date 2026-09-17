import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Body, Eyebrow, H2, HAIRLINE, Note, Shot } from "./Type";

const PRICE_COL =
  "w-[3.4rem] shrink-0 text-right font-[family-name:var(--font-fume-display)] text-[1.0625rem] leading-[1.3] tabular-nums";

export function Wine({ locale }: { locale: Locale }) {
  const { wine: copy, price } = getFumeCopy(locale);

  return (
    <section
      id="vynas"
      className="mx-auto max-w-[1240px] px-5 py-[var(--sec)] sm:px-8"
    >
      <div className="grid items-start gap-[clamp(36px,5vw,72px)] lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-6">
          <div data-rise>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <H2 className="mt-6">
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </H2>
            <Body className="mt-5 max-w-[46ch]">{copy.lead}</Body>
          </div>

          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-10"
          >
            <div
              className="flex items-baseline gap-x-3 border-b pb-2.5 font-[family-name:var(--font-fume-ui)] text-[0.6875rem] uppercase tracking-[0.18em] text-[#9c948a]"
              style={{ borderColor: HAIRLINE }}
            >
              <span className="min-w-0 flex-1">{copy.columns.wines}</span>
              <span className="w-[3.4rem] shrink-0 text-right">
                {copy.columns.glass}
              </span>
              <span className="w-[3.4rem] shrink-0 text-right">
                {copy.columns.bottle}
              </span>
            </div>

            <ul>
              {copy.list.map((w) => (
                <li
                  key={w.n}
                  style={{ borderColor: HAIRLINE }}
                  className="fume-row -mx-2 border-b px-2 py-4 last:border-b-0"
                >
                  <p className="flex items-baseline gap-x-3">
                    <span className="min-w-0 flex-1 font-[family-name:var(--font-fume-display)] text-[1.0625rem] italic leading-[1.3] text-[#ede6da]">
                      {w.n}
                    </span>
                    {/* The column headings above are visual only — a screen
                        reader would otherwise read the two figures back to back
                        with no way to tell the glass price from the bottle. */}
                    <span
                      className={`${PRICE_COL} text-[rgba(237,230,218,0.9)]`}
                    >
                      <span className="sr-only">{copy.srGlass}</span>
                      {price(w.g)}
                    </span>
                    <span
                      className={`${PRICE_COL} text-[rgba(237,230,218,0.9)]`}
                    >
                      <span className="sr-only">{copy.srBottle}</span>
                      {price(w.b)}
                    </span>
                  </p>
                  <p className="mt-1.5 max-w-[46ch] font-[family-name:var(--font-fume-ui)] text-[0.8125rem] leading-[1.6] text-[#9c948a]">
                    {w.r}
                  </p>
                </li>
              ))}
            </ul>

            <div
              style={{ borderColor: HAIRLINE }}
              className="mt-6 border-t pt-5"
            >
              <Note>{copy.note}</Note>
            </div>
          </div>
        </div>

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="min-w-0 lg:col-span-5 lg:col-start-8"
        >
          <Shot
            src="/demo/fume/wine.webp"
            w={1200}
            h={800}
            alt={copy.pourAlt}
            settle
          />
          <Shot
            className="ml-auto mt-[clamp(16px,2.5vw,28px)] w-[68%]"
            src="/demo/fume/wine-studio.webp"
            w={1100}
            h={893}
            ratio="5 / 4"
            alt={copy.studioAlt}
          />
        </div>
      </div>
    </section>
  );
}
