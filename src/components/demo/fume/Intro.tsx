import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Body, DISPLAY, Frame, H2, Label, RULE, Rule } from "./Type";

/** The statement after the opening, Zimmerl's calm centred block: a small
 *  label, the heading in spaced capitals, a copper hairline, two short
 *  paragraphs on a narrow measure.
 *
 *  Then the three real facts as numerals (34 seats, about 120 wines, doors
 *  at 17:00), each over its words in capitals, between copper rules. Those
 *  are the only large figures on the page.
 *
 *  Then an intimate photo pair: the room, and a plate on its way to a table,
 *  tops offset the way Zimmerl sets its pairs. */
export function Intro({ locale }: { locale: Locale }) {
  const { intro: copy, menu } = getFumeCopy(locale);

  return (
    <section className="px-4 pt-[clamp(72px,7vw,108px)] sm:px-8">
      <div
        data-group
        className="mx-auto flex max-w-[760px] flex-col items-center text-center"
      >
        <Label>{copy.eyebrow}</Label>
        <H2 className="mt-6">
          {copy.title[0]} {copy.title[1]}
        </H2>
        <Rule className="mt-9" />
        <Body lines className="mt-9 max-w-[58ch]">
          {copy.body[0]}
        </Body>
        <Body lines className="mt-5 max-w-[58ch]">
          {copy.body[1]}
        </Body>
      </div>

      <dl
        data-group
        className="mx-auto mt-[var(--gap)] grid max-w-[980px] grid-cols-3 border-y"
        style={{ borderColor: RULE }}
      >
        {copy.facts.map((f, i) => (
          <div
            key={f.k}
            className={`flex min-w-0 flex-col items-center px-2 py-[clamp(22px,3.4vw,40px)] text-center sm:px-4 ${
              i > 0 ? "border-l" : ""
            }`}
            style={{ borderColor: RULE }}
          >
            <dt
              className={`${DISPLAY} text-[clamp(2.125rem,5.2vw,4.5rem)] font-light leading-none tracking-[0.02em] tabular-nums text-[#efe7dc]`}
            >
              {f.k}
            </dt>
            <dd className="fume-label mt-3 text-balance max-sm:text-[0.75rem] max-sm:tracking-[0.14em]">
              {f.v}
            </dd>
          </div>
        ))}
      </dl>

      <div
        data-group
        className="mx-auto mt-[var(--gap)] grid max-w-[1180px] grid-cols-12 items-start gap-x-4 gap-y-4 sm:gap-x-6"
      >
        <Frame
          className="col-span-12 sm:col-span-7"
          src="/demo/fume/room-hall.webp"
          w={1400}
          h={933}
          alt={copy.photoAlt}
          ratio="4 / 3"
        />
        <Frame
          className="col-span-8 col-start-5 sm:col-span-4 sm:col-start-9 sm:mt-[clamp(56px,6.5vw,96px)]"
          src="/demo/fume/dish-5.webp"
          w={1100}
          h={733}
          alt={menu.plateAlts[1]}
          ratio="1 / 1"
          position="60% 50%"
        />
      </div>
    </section>
  );
}
