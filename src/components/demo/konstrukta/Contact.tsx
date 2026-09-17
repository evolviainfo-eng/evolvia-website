import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import {
  BAND,
  CONTAINER,
  SectionHead,
  SpecRow,
  T_MICRO,
  T_SM,
  Tag,
} from "./ui";
import { ContactForm } from "./ContactForm";

export function Contact({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).contact;
  return (
    <section id="kontaktai" className={`${BAND} border-t border-white/[0.11]`}>
      <div className={CONTAINER}>
        <SectionHead
          index="07"
          label={c.label}
          title={c.title}
          lead={c.lead}
        />

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-[clamp(32px,4vw,56px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="min-w-0"
          >
            <Tag>{c.tag}</Tag>

            <dl className="mt-6 border-t border-white/[0.11]">
              {c.details.map(([k, v]) => (
                <SpecRow key={k} k={k} v={v} />
              ))}
            </dl>

            <p className={`${T_MICRO} mt-9 text-[#9A9791]`}>{c.hoursTitle}</p>
            <dl className="mt-3 border-t border-white/[0.11]">
              {c.hours.map(([k, v]) => (
                <SpecRow key={k} k={k} v={v} />
              ))}
            </dl>

            <p
              className={`mt-8 max-w-[44ch] text-pretty ${T_SM} text-[#9A9791]`}
            >
              {c.note}
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
