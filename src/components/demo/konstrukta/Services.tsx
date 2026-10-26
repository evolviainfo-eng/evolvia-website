import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { ServiceList } from "./ServiceList";
import { BAND, SectionHead, WRAP } from "./ui";

/** What Konstrukta builds. Haven's section head, then the one move taken
 *  from Built Environs: the four areas as a right-aligned stack of large
 *  blue lines with a photograph on the left that changes to the line in
 *  focus (ServiceList.tsx). */
export function Services({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).services;
  return (
    <section id="paslaugos" className={BAND}>
      <div className={WRAP}>
        <SectionHead label={c.label} title={c.title} lead={c.lead} />
        <ServiceList />
      </div>
    </section>
  );
}
