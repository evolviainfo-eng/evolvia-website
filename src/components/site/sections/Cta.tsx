import { EnquiryLink } from "@/components/site/Chrome";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { cta } from "@/components/site/copy/cta";
import s from "./Cta.module.css";

/** Kontaktai: the closing accent. A full-screen, centred, hero-sized
 *  two-tone line whose words brighten one after another with the scroll
 *  (`data-words`, scrubbed), the question last. Under it the two direct
 *  ways to act (the enquiry and a call) and one line of real contacts.
 *  Nothing else on the screen: no slab, no light. The footer follows. */
export function Cta({ locale = "lt" }: { locale?: Locale } = {}) {
  const c = cta[locale];
  const tel = `tel:${site.phoneHref}`;
  return (
    <section id="kontaktai" className={`sec ${s.sec}`} data-tone="dark" aria-labelledby="kontaktai-h">
      <div className={`wrap ${s.inner}`}>
        <h2 id="kontaktai-h" className={`t-hero ${s.title}`} data-words>
          <span className={s.line}>{c.lineA}</span>
          <span className={`dim ${s.line}`}>{c.lineB}</span>
        </h2>
        <div className={`actions ${s.actions}`} data-in>
          <EnquiryLink className="btn btn-primary btn-lg" />
          <a className={`btn btn-ghost btn-lg tnum ${s.tel}`} href={tel} aria-label={`${c.callLabel} ${site.phone}`}>
            {site.phone}
          </a>
        </div>
        <p className={s.meta} data-in>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span className={s.dot} aria-hidden="true">
            ·
          </span>
          <a className="tnum" href={tel}>
            {site.phone}
          </a>
          <span className={s.dot} aria-hidden="true">
            ·
          </span>
          <span>{c.city}</span>
        </p>
      </div>
    </section>
  );
}
