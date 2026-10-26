import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { ContactForm } from "./ContactForm";
import { BAND, SectionHead, SpecRow, T_SM, WRAP } from "./ui";

/** The close, on the same white and the same hairlines as everything
 *  before it: the invitation as a section head, then the details on the
 *  left and the working enquiry form on the right. */
export function Contact({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).contact;
  return (
    <section id="kontaktai" className={BAND}>
      <div className={WRAP}>
        <SectionHead label={c.label} title={c.title} lead={c.lead} />

        <div className="mt-[clamp(56px,7vw,112px)] grid gap-y-14 lg:grid-cols-12 lg:items-start lg:gap-x-6">
          <div data-rise className="min-w-0 lg:col-span-5">
            <p className={`${T_SM} text-[#5E5E5E]`}>{c.tag}</p>
            <dl className="mt-4 border-t border-[#E2E2E2]">
              {c.details.map(([k, v]) => (
                <SpecRow key={k} k={k} v={v} />
              ))}
            </dl>

            <p className="mt-10 text-[0.9375rem] font-medium text-[#111111]">
              {c.hoursTitle}
            </p>
            <dl className="mt-3 border-t border-[#E2E2E2]">
              {c.hours.map(([k, v]) => (
                <SpecRow key={k} k={k} v={v} />
              ))}
            </dl>

            <p className={`mt-8 max-w-[46ch] text-pretty ${T_SM} text-[#5E5E5E]`}>
              {c.note}
            </p>
          </div>

          <div id="knst-form" className="min-w-0 lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
