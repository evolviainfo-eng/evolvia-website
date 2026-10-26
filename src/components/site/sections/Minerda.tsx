import { Arrow, Chapter, External } from "@/components/site/ui/Primitives";
import { localizePath, type Locale } from "@/i18n/config";
import { minerda } from "@/components/site/copy/minerda";
import { Story } from "./minerda/Story";
import s from "./Minerda.module.css";

/** Minerda: the real client case. The chapter stays left-aligned in the
 *  Linear grammar; then the client's real home page in a browser window and
 *  a phone, with four captions at the left (see minerda/Story.tsx); then
 *  one quiet row with the caption, the link to the full case and the link
 *  to the live site. */
export function Minerda({ locale = "lt" }: { locale?: Locale } = {}) {
  const c = minerda[locale];
  return (
    <section id="minerda" className={`sec ${s.band}`} data-tone="dark" aria-labelledby="minerda-h">
      <div className="wrap">
        <Chapter
          id="minerda-h"
          a={
            <>
              {c.titleA}
              <br />
            </>
          }
          b={c.titleB}
          lead={c.lead}
        />
      </div>

      <Story locale={locale} />

      <div className="wrap">
        <div className={s.after} data-in="">
          <p className={s.client}>{c.client}</p>
          <div className={s.links}>
            <a className={`${s.link} ${s.quiet}`} href={localizePath("/darbai/minerda", locale)}>
              {c.caseLink}
              <Arrow />
            </a>
            <a className={s.link} href="https://minerda.lt" target="_blank" rel="noopener">
              {c.open}
              <External />
              <span className="sr-only"> {c.newWindow}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
