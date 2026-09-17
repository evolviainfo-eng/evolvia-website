import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Body, Eyebrow, H2, HAIRLINE, Rule, Shot } from "./Type";

export function Intro({ locale }: { locale: Locale }) {
  const copy = getFumeCopy(locale).intro;

  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-[var(--sec)] sm:px-8">
      <div className="grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <div data-rise>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <H2 className="mt-6">
              {copy.title[0]}
              <br />
              {copy.title[1]}
            </H2>
          </div>

          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-7 space-y-5"
          >
            <Body className="max-w-[46ch]">{copy.body[0]}</Body>
            <Body className="max-w-[46ch]">{copy.body[1]}</Body>

            <dl
              style={{ borderColor: HAIRLINE }}
              className="!mt-10 grid grid-cols-3 gap-x-4 gap-y-4 border-t pt-6"
            >
              {copy.facts.map((f, i) => (
                <div
                  key={f.k}
                  style={{ borderColor: HAIRLINE }}
                  className={`min-w-0 ${i > 0 ? "sm:border-l sm:pl-5" : ""}`}
                >
                  <dt className="font-[family-name:var(--font-fume-display)] text-[clamp(1.5rem,3vw,1.875rem)] font-light leading-none tabular-nums text-[#ede6da]">
                    {f.k}
                  </dt>
                  <dd className="mt-2 font-[family-name:var(--font-fume-ui)] text-[0.8125rem] leading-[1.5] text-[#9c948a]">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <Shot
          className="lg:col-span-6 lg:col-start-7"
          src="/demo/fume/room-hall.webp"
          w={1400}
          h={933}
          alt={copy.photoAlt}
          rise={1}
          settle
        />
      </div>

      <Rule className="mt-[var(--gap)]" />
    </section>
  );
}
