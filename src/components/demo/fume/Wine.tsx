import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Body, DISPLAY, Frame, H2, HAIRLINE, Label, Note, RULE, UI } from "./Type";

const PRICE_COL = `${DISPLAY} w-[4rem] shrink-0 text-right text-[1.1875rem] font-medium leading-[1.3] tabular-nums text-[#efe7dc]`;

/** The wine list, set like a sommelier's card.
 *
 *  A centred heading block, then the pour, still and running the full height
 *  of the list beside it (a 1200 px photograph: drifting it would enlarge it
 *  past its pixels): five wines in italic, where they come from
 *  in small capitals under each, glass and bottle in two figure columns
 *  between copper hairlines. */
export function Wine({ locale }: { locale: Locale }) {
  const { wine: copy, price } = getFumeCopy(locale);

  return (
    <section id="vynas" className="px-4 pt-[var(--sec)] sm:px-8">
      <div
        data-group
        className="mx-auto flex max-w-[760px] flex-col items-center text-center"
      >
        <Label>{copy.eyebrow}</Label>
        <H2 className="mt-6">
          {/* the space keeps the two lines apart in the heading's
              accessible name, which SplitText builds from its text */}
          {copy.title[0]} <br />
          {copy.title[1]}
        </H2>
        <Body lines className="mt-7 max-w-[52ch]">
          {copy.lead}
        </Body>
      </div>

      <div className="mx-auto mt-[var(--gap)] grid max-w-[1180px] items-stretch gap-x-[clamp(32px,5vw,80px)] gap-y-12 md:grid-cols-12">
        {/* The pour runs the full height of the list beside it. */}
        <div data-group className="min-w-0 md:col-span-5">
          <Frame
            src="/demo/fume/wine.webp"
            w={1200}
            h={800}
            alt={copy.pourAlt}
            ratio="4 / 3"
            position="62% 50%"
            fill
          />
        </div>

        <div data-group className="min-w-0 md:col-span-7">
          <div
            className="fume-label flex items-baseline gap-x-3 border-b pb-3"
            style={{ borderColor: RULE }}
          >
            <span className="min-w-0 flex-1">{copy.columns.wines}</span>
            <span className="w-[4rem] shrink-0 text-right tracking-[0.08em]">
              {copy.columns.glass}
            </span>
            <span className="w-[4rem] shrink-0 text-right tracking-[0.08em]">
              {copy.columns.bottle}
            </span>
          </div>

          <ul>
            {copy.list.map((w) => (
              <li
                key={w.n}
                style={{ borderColor: HAIRLINE }}
                className="border-b py-[clamp(16px,2vw,24px)]"
              >
                <p className="flex items-baseline gap-x-3">
                  <span
                    className={`${DISPLAY} min-w-0 flex-1 text-[clamp(1.375rem,2.2vw,1.875rem)] italic leading-[1.15] text-[#efe7dc]`}
                  >
                    {w.n}
                  </span>
                  {/* The column headings above are visual only: a screen
                      reader would otherwise read the two figures back to back
                      with no way to tell the glass price from the bottle. */}
                  <span className={PRICE_COL}>
                    <span className="sr-only">{copy.srGlass}</span>
                    {price(w.g)}
                  </span>
                  <span className={PRICE_COL}>
                    <span className="sr-only">{copy.srBottle}</span>
                    {price(w.b)}
                  </span>
                </p>
                <p className="fume-label mt-2 text-[0.8125rem] tracking-[0.18em] text-[#c4b8a9]">
                  {w.r}
                </p>
              </li>
            ))}
          </ul>

          <Note className={`${UI} mt-6 max-w-[56ch]`}>{copy.note}</Note>
        </div>
      </div>
    </section>
  );
}
