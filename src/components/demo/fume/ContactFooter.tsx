import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Btn, Frame, H2, HAIRLINE, Label, Note, RULE, Rule, UI } from "./Type";

/** The last section of the page: where to find Fumé and when it is open.
 *
 *  Deliberately not a footer. The page is already closed by Evolvia's demo
 *  strip (DemoFooter), so a framed card plus a wordmark line here read as a
 *  second and third footer stacked on top of it. Instead this is an ordinary
 *  section in the page's rhythm: the bar's window seen from the street at
 *  night on the left, running the full height of the words on the right
 *  (the quarter, the week's hours and the useful notes side by side, then the
 *  phone and the email). No street or house number on purpose. */
export function ContactFooter({ locale }: { locale: Locale }) {
  const { footer: copy, space } = getFumeCopy(locale);

  return (
    <section
      id="kontaktai"
      className="px-4 pb-[clamp(72px,7vw,112px)] pt-[clamp(24px,3vw,48px)] sm:px-8"
    >
      <div className="mx-auto grid max-w-[1180px] items-stretch gap-x-6 gap-y-10 md:grid-cols-12">
        <div data-group className="min-w-0 md:col-span-5">
          <Frame
            src="/demo/fume/room-glass.webp"
            w={1400}
            h={933}
            alt={space.windowAlt}
            ratio="4 / 3"
            position="42% 50%"
            fill
          />
        </div>

        <div
          data-group
          className="min-w-0 md:col-span-7 md:pl-[clamp(16px,3vw,48px)]"
        >
          <Label>{copy.eyebrow}</Label>
          <H2 className="mt-5">{copy.title}</H2>
          <p className={`${UI} mt-3 text-[1rem] text-[#b9ad9f] sm:text-[1.0625rem]`}>
            {copy.tagline}
          </p>
          <Rule className="mt-8" />

          <div className="mt-9 grid gap-x-10 gap-y-10 lg:grid-cols-2">
            <div className="min-w-0">
              <p className="fume-label">{copy.hoursLabel}</p>
              <table
                className={`${UI} mt-3 w-full border-collapse text-[0.9375rem]`}
              >
                <caption className="sr-only">{copy.hoursCaption}</caption>
                <tbody>
                  {copy.hours.map((r) => (
                    <tr
                      key={r.d}
                      style={{ borderColor: HAIRLINE }}
                      className="border-b"
                    >
                      <th
                        scope="row"
                        className="min-w-0 py-3 pr-3 text-left font-normal text-[#b9ad9f]"
                      >
                        {r.d}
                      </th>
                      <td className="whitespace-nowrap py-3 text-right tabular-nums text-[#efe7dc]">
                        {r.h}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Note className="mt-4">{copy.hoursNote}</Note>
            </div>

            <div className="min-w-0">
              <p className="fume-label">{copy.goodToKnowLabel}</p>
              <ul
                className={`${UI} mt-3 text-[0.9375rem] leading-[1.6] text-[#efe7dc]`}
              >
                {copy.goodToKnow.map((g) => (
                  <li
                    key={g}
                    className="min-w-0 border-b py-3 text-pretty last:border-b-0"
                    style={{ borderColor: HAIRLINE }}
                  >
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start gap-x-8 gap-y-4 border-t pt-8 sm:flex-row sm:items-center" style={{ borderColor: RULE }}>
            <Btn href="tel:+37060000000" className="max-sm:w-full">+370 600 00000</Btn>
            <a
              href="mailto:labas@fume.demo"
              className={`${UI} fume-link inline-flex min-h-11 items-center break-words text-[1rem] text-[#efe7dc] underline decoration-[rgba(184,121,74,0.6)] underline-offset-[6px] transition-colors duration-300 hover:decoration-[#efe7dc]`}
            >
              labas@fume.demo
            </a>
          </div>
          <Note className="mt-4">{copy.badge}</Note>
        </div>
      </div>
    </section>
  );
}
