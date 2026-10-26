import { getDictionary } from "@/i18n";
import { site } from "@/content/site";
import { Chapter } from "@/components/site/ui/Primitives";
import type { Locale } from "@/i18n/config";
import { faq } from "@/components/site/copy/faq";
import { FaqList, type FaqItem } from "./faq/FaqList";
import s from "./Faq.module.css";

/** Cuts a string at the first en or em dash (house rule: none in copy).
 *  The current answers contain none; this only guards future edits. */
const DASH = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);

function clean(text: string): string {
  const at = text.search(DASH);
  return at < 0 ? text : text.slice(0, at).trimEnd();
}

/** DUK: Linear-style index rows, the chapter sticky in the left third. The
 *  questions and answers are the site dictionary's, in the page's language. */
export function Faq({ locale = "lt" }: { locale?: Locale } = {}) {
  const d = getDictionary(locale).faq;
  const c = faq[locale];
  const items: FaqItem[] = d.items.map((it) => ({ q: clean(it.q), a: clean(it.a) }));

  return (
    <section id="duk" className="sec" data-tone="dark" aria-labelledby="duk-h">
      <div className={`wrap ${s.grid}`}>
        <div className={s.side}>
          <div className={s.sticky}>
            <Chapter
              id="duk-h"
              a={d.title}
              lead={
                <>
                  {c.before}{" "}
                  <a className={s.mail} href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  {c.after}
                </>
              }
            />
          </div>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}
