import type { Locale } from "@/i18n/config";
import { CardPanel } from "./CardPanel";
import { getFumeCopy } from "./copy";
import { Arrow, Body, DISPLAY, Frame, H2, HAIRLINE, Label, Note } from "./Type";

/* Without JS the menu panel cannot open, so the whole card is set inline
   under the short one, as an ordinary printed card in the page. */
const noscriptCss = `
.fc{position:static;max-width:720px;margin:clamp(56px,7vw,96px) auto 0}
.fc[data-phase]{visibility:visible}
.fc-scrim,.fc-close{display:none}
.fc-panel{position:static;width:auto;overflow:visible;clip-path:none}
.fc-l,.fc-r{transform:none}
`;

/** The menu, after Zimmerl's photo pairs and Da Maria's printed card.
 *
 *  A centred heading block, then one plate beside a short ruled card: a
 *  thin double copper frame, each course with a dot leader to its lowest
 *  price, the footnote, and "Visa kortelė", which opens the full card from
 *  the right (CardPanel.tsx, the page's signature). The hero's "Vakaro
 *  meniu" and the nav's "Meniu" open the same panel. */
export function MenuSection({ locale }: { locale: Locale }) {
  const { menu: copy, card, price } = getFumeCopy(locale);

  return (
    <section id="meniu" className="px-4 pt-[var(--sec)] sm:px-8">
      <div
        data-group
        className="mx-auto flex max-w-[720px] flex-col items-center text-center"
      >
        <Label>{copy.eyebrow}</Label>
        <H2 className="mt-6">{copy.title}</H2>
        <Body lines className="mt-7 max-w-[52ch]">
          {copy.lead}
        </Body>
      </div>

      <div className="mx-auto mt-[var(--gap)] grid max-w-[1180px] items-stretch gap-x-[clamp(32px,5vw,80px)] gap-y-10 md:grid-cols-12">
        {/* Two plates stacked to the card's height: the beef above, the fish
            below, so the column beside the card is never a lone square in a
            dark field. On a phone they sit side by side over the card. */}
        <div
          data-group
          className="grid min-w-0 grid-cols-2 gap-3 md:col-span-5 md:grid-cols-1 md:grid-rows-[3fr_2fr] md:gap-4"
        >
          <Frame
            src="/demo/fume/dish-1.webp"
            w={1100}
            h={732}
            alt={copy.plateAlts[0]}
            ratio="4 / 5"
            position="45% 50%"
            fill
          />
          <Frame
            src="/demo/fume/dish-3.webp"
            w={1100}
            h={732}
            alt={copy.plateAlts[2]}
            ratio="4 / 5"
            position="50% 55%"
            fill
          />
        </div>

        <div data-group className="min-w-0 md:col-span-7">
          <div className="fume-frame bg-[#231e1a] px-5 py-12 sm:px-[clamp(32px,4vw,56px)] sm:py-14">
            <p className="fume-label text-center">{card.title}</p>

            <ul className="mt-9">
              {copy.courses.map((c) => {
                const lowest = Math.min(...c.items.map((it) => it.p));
                return (
                  <li
                    key={c.title}
                    className="border-t py-5 last:border-b"
                    style={{ borderColor: HAIRLINE }}
                  >
                    <p className="flex items-baseline gap-x-3">
                      <span className="fume-label min-w-0 text-[0.9375rem] text-[#efe7dc]">
                        {c.title}
                      </span>
                      <span
                        aria-hidden
                        className="fume-leader min-w-[1.5rem] flex-1"
                      />
                      <span
                        className={`${DISPLAY} shrink-0 text-[1.1875rem] font-medium leading-none tabular-nums text-[#efe7dc]`}
                      >
                        {card.from(price(lowest))}
                      </span>
                    </p>
                    <p
                      className={`${DISPLAY} mt-1.5 text-[1.125rem] italic leading-[1.4] text-[#c4b8a9]`}
                    >
                      {c.note}
                    </p>
                  </li>
                );
              })}
            </ul>

            <Note className="mx-auto mt-8 max-w-[46ch] text-center">
              {copy.footnote}
            </Note>

            <div className="mt-8 flex justify-center">
              <a href="#kortele" className="fume-btn">
                <span>{card.open}</span>
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>

      <CardPanel />
      <noscript>
        <style>{noscriptCss}</style>
      </noscript>
    </section>
  );
}
