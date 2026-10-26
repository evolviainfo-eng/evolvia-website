import { Arrow, Window } from "@/components/site/ui/Primitives";
import { localizePath, type Locale } from "@/i18n/config";
import { works } from "@/components/site/copy/works";
import { Screen } from "./works/Screen";
import s from "./Works.module.css";

/* Darbai: the demo sites as one calm lineup, not a screen each. A centred
   chapter (headline, statement), then a 2 x 2 grid of browser windows, each
   showing the demo's real first screen. The whole card is the link to the
   demo. Under each window a two-tone line and, at the right, its label.
   The two rows enter with the scroll (data-scrub); then one quiet link to
   the work page. */
export function Works({ locale = "lt" }: { locale?: Locale } = {}) {
  const c = works[locale];
  const rows = [c.demos.slice(0, 2), c.demos.slice(2, 4)];
  return (
    <section id="darbai" className={`sec ${s.sec}`} data-tone="dark" aria-labelledby="darbai-h">
      <div className="wrap">
        <header className={s.head}>
          <h2 id="darbai-h" className={`t-h2 ${s.h2}`} data-split>
            {c.titleA} <span className="dim">{c.titleB}</span>
          </h2>
          <p className={`t-statement ${s.statement}`} data-words>
            {c.statementA} <span className="dim">{c.statementB}</span>
          </p>
        </header>

        <div className={s.grid}>
          {rows.map((row, i) => (
            <div key={i} className={s.row} data-scrub>
              {row.map((d) => {
                const href = localizePath(`/demo/${d.slug}`, locale);
                return (
                  <a key={d.slug} className={s.card} href={href}>
                    <div aria-hidden="true">
                      <Window address={`evolvia.lt${href}`} tag={d.tag} className={s.win}>
                        <Screen slug={d.slug} locale={locale} />
                      </Window>
                    </div>
                    <div className={s.meta}>
                      <h3 className={s.line}>
                        {d.name} <span className="dim">{d.caption}</span>
                      </h3>
                      <span className={s.tag}>{d.tag}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        <p className={s.more} data-in>
          <a className={s.moreLink} href={localizePath("/darbai", locale)}>
            {c.more}
            <Arrow />
          </a>
        </p>
      </div>
    </section>
  );
}
