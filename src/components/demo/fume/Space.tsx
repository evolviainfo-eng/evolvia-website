import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Body, Frame, H2, Label, Rule } from "./Type";

/** The room, Zimmerl's offset pair with the words inside the composition:
 *  the bar large on the left (the page's second drifting photograph, after the hero), and on
 *  the right the heading, the paragraph and, under them, the lamps. Each
 *  photograph keeps its own caption. On a phone it reads top to bottom:
 *  words, bar, lamps. No slider: the room is two still pictures. */
export function Space({ locale }: { locale: Locale }) {
  const copy = getFumeCopy(locale).space;

  return (
    <section id="erdve" className="px-4 pt-[var(--sec)] sm:px-8">
      <div className="mx-auto grid max-w-[1180px] grid-cols-12 items-start gap-x-4 gap-y-12 sm:gap-x-6">
        <div
          data-group
          className="col-span-12 min-w-0 text-center md:order-2 md:col-span-5 md:col-start-8 md:pl-[clamp(8px,2vw,32px)] md:text-left"
        >
          <Label>{copy.eyebrow}</Label>
          <H2 className="mt-6">{copy.title}</H2>
          <Rule className="mx-auto mt-8 md:mx-0" />
          <Body lines className="mx-auto mt-8 max-w-[44ch] md:mx-0">
            {copy.body}
          </Body>
          <div className="mt-[var(--gap)] max-md:hidden">
            <Frame
              src="/demo/fume/lamps.webp"
              w={1200}
              h={800}
              alt={copy.lampsAlt}
              caption={copy.lampsCaption}
              ratio="4 / 3"
            />
          </div>
        </div>

        <div data-group className="col-span-12 min-w-0 md:order-1 md:col-span-7">
          <Frame
            src="/demo/fume/room-bar.webp"
            w={1400}
            h={933}
            alt={copy.barAlt}
            caption={copy.barCaption}
            ratio="1 / 1"
            position="58% 50%"
            parallax
          />
        </div>

        {/* Phone: the lamps follow the bar, dropped to the right. */}
        <div data-group className="col-span-9 col-start-4 min-w-0 md:hidden">
          <Frame
            src="/demo/fume/lamps.webp"
            w={1200}
            h={800}
            alt={copy.lampsAlt}
            caption={copy.lampsCaption}
            ratio="1 / 1"
          />
        </div>
      </div>
    </section>
  );
}
