import type { Locale } from "@/i18n/config";
import { getFumeCopy } from "./copy";
import { Body, Eyebrow, H2, Shot } from "./Type";

export function Space({ locale }: { locale: Locale }) {
  const copy = getFumeCopy(locale).space;

  return (
    <section
      id="erdve"
      className="mx-auto max-w-[1240px] px-5 pb-[var(--sec)] sm:px-8"
    >
      <div data-rise className="max-w-[46ch]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <H2 className="mt-6">{copy.title}</H2>
        <Body className="mt-5">{copy.body}</Body>
      </div>

      <div className="mt-[clamp(36px,5vw,64px)] grid gap-[clamp(16px,2.5vw,28px)] lg:grid-cols-12">
        <Shot
          className="lg:col-span-7"
          src="/demo/fume/room-bar.webp"
          w={1400}
          h={933}
          alt={copy.barAlt}
          caption={copy.barCaption}
          rise={0}
          settle
        />

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="grid min-w-0 content-start gap-[clamp(16px,2.5vw,28px)] lg:col-span-5 lg:mt-[clamp(28px,5vw,72px)]"
        >
          <Shot
            src="/demo/fume/room-glass.webp"
            w={1400}
            h={933}
            alt={copy.windowAlt}
          />
          <Shot
            src="/demo/fume/lamps.webp"
            w={1200}
            h={800}
            alt={copy.lampsAlt}
            caption={copy.lampsCaption}
          />
        </div>
      </div>
    </section>
  );
}
