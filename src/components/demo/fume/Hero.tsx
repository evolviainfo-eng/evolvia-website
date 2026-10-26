import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Btn, DISPLAY, Photo, RULE } from "./Type";

/** The opening, after Zimmerl: the room at full screen and, dead centre, the
 *  name in widely spaced capitals. One upright line under it, the booking
 *  button and the menu card, the three practical facts at the foot behind a
 *  copper hairline.
 *
 *  Legibility is built in, not hoped for: the photograph is held down by a
 *  flat veil plus a soft, wide pool of shade exactly behind the centred
 *  stack, and the foot darkens into the page ground, so the lead line and the
 *  facts always sit on calm, dark tone (paper on it is above 9:1).
 *
 *  The fixed nav floats over the photograph, so the hero fills the screen
 *  under the honesty bar with nothing of the next section peeking in. The
 *  photograph is the only full-bleed image on the page (hero.webp is 1800 px
 *  wide) and the first of the three that drift with the scroll. Motion.tsx
 *  raises the wordmark from its mask on load, then the line, buttons and
 *  facts 100 ms apart. Without JS it is simply all there.
 *
 *  "Vakaro meniu" opens the menu panel (CardPanel.tsx catches every
 *  href="#kortele"); without JS it jumps to the same card in the page. */
export function Hero({ locale }: { locale: Locale }) {
  const copy = getFumeCopy(locale).hero;

  return (
    <section
      id="top"
      data-parallax
      className="relative isolate flex flex-col overflow-hidden"
      style={{ minHeight: "calc(100svh - var(--demo-bar-h))" }}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          data-parallax-img
          className="absolute inset-x-0 top-[-15%] h-[130%]"
        >
          <Photo
            src="/demo/fume/hero.webp"
            w={1800}
            h={1206}
            alt={copy.photoAlt}
            priority
            className="h-full w-full object-cover object-[72%_45%] sm:object-[50%_45%]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 46% 40% at 50% 54%, rgba(20,16,13,0.62) 0%, rgba(20,16,13,0.38) 55%, rgba(20,16,13,0) 100%), linear-gradient(180deg, rgba(27,23,20,0.78) 0%, rgba(27,23,20,0.42) 22%, rgba(27,23,20,0.42) 62%, rgba(27,23,20,0.86) 88%, #1B1714 100%)",
          }}
        />
      </div>

      <div
        data-group="load"
        className="flex min-w-0 flex-1 flex-col items-center justify-center px-4 pb-8 pt-[clamp(96px,14vh,150px)] text-center sm:px-8"
      >
        <h1
          data-lines
          className="fume-word text-[clamp(4rem,12.5vw,11rem)]"
        >
          Fumé
        </h1>

        <p
          data-lines
          className={`${DISPLAY} mt-[clamp(16px,2.6vh,28px)] max-w-[30ch] text-balance text-[clamp(1.375rem,1.9vw,1.625rem)] font-normal leading-[1.35] text-[#efe7dc]`}
        >
          {copy.lead}
        </p>

        <div className="mt-[clamp(28px,4.6vh,44px)] flex w-full max-w-[320px] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
          <Btn href="#rezervacija" copper arrow>
            {copy.book}
          </Btn>
          <Btn href="#kortele">
            {copy.menu}
          </Btn>
        </div>
      </div>

      <div className="px-4 pb-[clamp(24px,4.5vh,44px)] sm:px-8">
        <ul
          data-group="load"
          data-delay="0.5"
          className="fume-label mx-auto flex w-full max-w-[880px] flex-col items-center justify-center gap-y-1 border-t pt-[clamp(16px,2.6vh,24px)] text-[#e6dccf] sm:flex-row sm:flex-wrap sm:gap-x-0"
          style={{ borderColor: RULE }}
        >
          {copy.meta.map((m, i) => (
            <li key={m} className="flex min-w-0 items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className="mx-6 block h-1 w-1 rotate-45 max-sm:hidden"
                  style={{ background: "#B8794A" }}
                />
              )}
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
