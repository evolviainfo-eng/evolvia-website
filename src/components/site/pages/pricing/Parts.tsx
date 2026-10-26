import type { ReactNode } from "react";
import s from "./Parts.module.css";

/* Pieces /kainos and /paslaugos share: the page head, the question list
   and the closing. Server components; the questions are native <details>,
   so they open with the keyboard and without JavaScript. */

/** First screen: a two-tone h1 at the left, the lead and the actions. */
export function PageHead({ a, b, lead, actions, id }: { a: string; b: string; lead: string; actions?: ReactNode; id: string }) {
  return (
    <div className={`wrap ${s.head}`}>
      <h1 id={id} className={`t-hero ${s.title}`} data-split="now">
        {a} <span className="dim">{b}</span>
      </h1>
      <p className={`t-lead ${s.lead}`} data-in>
        {lead}
      </p>
      {actions ? (
        <div className={`actions ${s.actions}`} data-in>
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export type QA = { q: string; a: string };

/** Questions in the chapter grammar: the title sticky in the left third,
 *  hairline rows in the right two thirds, the first one open. */
export function Questions({
  id,
  title,
  items,
  more,
}: {
  id: string;
  title: string;
  items: QA[];
  more: ReactNode;
}) {
  return (
    <section id={id} className="sec" data-tone="dark" aria-labelledby={`${id}-h`}>
      <div className={`wrap ${s.qGrid}`}>
        <div className={s.qSide}>
          <div className={s.qSticky}>
            <h2 id={`${id}-h`} className="t-h2" data-split>
              {title}
            </h2>
            <p className={`t-body ${s.qMore}`} data-in>
              {more}
            </p>
          </div>
        </div>
        <div className={s.qList} data-stagger="0.05">
          {items.map((it, i) => (
            <details key={it.q} className={s.qItem} data-in open={i === 0 ? true : undefined}>
              <summary className={s.q}>
                <span className={s.qt}>{it.q}</span>
                <span className={s.pm} aria-hidden="true">
                  <svg viewBox="0 0 12 12">
                    <path d="M6 1.5 V10.5 M1.5 6 H10.5" />
                  </svg>
                </span>
              </summary>
              <div className={s.answer}>
                <p className={s.a}>{it.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The closing: one centred two-tone line whose words brighten with the
 *  scroll, one line under it, the actions. */
export function Closing({ id, a, b, lead, actions }: { id: string; a: string; b: string; lead: ReactNode; actions: ReactNode }) {
  return (
    <section id={id} className={`sec ${s.close}`} data-tone="dark" aria-labelledby={`${id}-h`}>
      <div className={`wrap ${s.closeIn}`}>
        <h2 id={`${id}-h`} className={`t-hero ${s.closeTitle}`} data-words>
          <span className={s.closeLine}>{a}</span> <span className={`dim ${s.closeLine}`}>{b}</span>
        </h2>
        <p className={`t-lead ${s.closeLead}`} data-in>
          {lead}
        </p>
        <div className={`actions ${s.closeActions}`} data-in>
          {actions}
        </div>
      </div>
    </section>
  );
}

/** An underlined inline link in the page's grey. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className={s.link} href={href}>
      {children}
    </a>
  );
}
