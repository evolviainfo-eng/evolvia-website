import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Body, Frame, H2, Label, Rule } from "./Type";

/** The kitchen, Zimmerl's chef moment: one photograph of the cook at the
 *  stove on the left, the heading in spaced capitals and the two paragraphs
 *  on the right, set left on a short measure.
 *
 *  Then the fire's results as an intimate pair, the larger plate on the left
 *  and the smaller one dropped to the baseline on the right. */
export function Fire({ locale }: { locale: Locale }) {
  const copy = getFumeCopy(locale).fire;

  return (
    <section className="px-4 pt-[var(--sec)] sm:px-8">
      <div className="mx-auto grid max-w-[1180px] items-center gap-x-[clamp(32px,6vw,96px)] gap-y-12 md:grid-cols-12">
        <div data-group className="min-w-0 md:col-span-5">
          <Frame
            src="/demo/fume/kitchen.webp"
            w={1400}
            h={936}
            alt={copy.kitchenAlt}
            ratio="4 / 5"
            position="64% 50%"
          />
        </div>

        <div data-group className="min-w-0 text-center md:col-span-6 md:col-start-7 md:text-left">
          <Label>{copy.eyebrow}</Label>
          <H2 className="mt-6">
            {copy.title.line1} {copy.title.before}
            {copy.title.italic}
            {copy.title.after}
          </H2>
          <Rule className="mx-auto mt-8 md:mx-0" />
          <Body lines className="mx-auto mt-8 max-w-[46ch] md:mx-0">
            {copy.body[0]}
          </Body>
          <Body lines className="mx-auto mt-5 max-w-[46ch] md:mx-0">
            {copy.body[1]}
          </Body>
        </div>
      </div>

      <div
        data-group
        className="mx-auto mt-[var(--gap)] grid max-w-[1180px] grid-cols-12 items-end gap-x-4 gap-y-4 sm:gap-x-6"
      >
        <Frame
          className="col-span-12 sm:col-span-6"
          src="/demo/fume/dish-4.webp"
          w={1100}
          h={732}
          alt={copy.lambAlt}
          ratio="4 / 3"
        />
        <Frame
          className="col-span-8 sm:col-span-4 sm:col-start-9"
          src="/demo/fume/dish-2.webp"
          w={1100}
          h={733}
          alt={copy.meatAlt}
          ratio="1 / 1"
          position="45% 50%"
        />
      </div>
    </section>
  );
}
