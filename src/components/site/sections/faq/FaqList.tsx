"use client";

import { useState, useSyncExternalStore } from "react";
import s from "../Faq.module.css";

export type FaqItem = { q: string; a: string };

const noop = () => () => {};

/** One answer open at a time. Before hydration (and with JavaScript off)
 *  every answer is open, so the text is always readable; once hydrated
 *  the list collapses to its index rows. Rows enter with the shared
 *  [data-in] hook, 50 ms apart (opacity and 20 px, no blur). */
export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  return (
    <ul className={s.list} data-ready={hydrated ? "" : undefined} data-stagger="0.05">
      {items.map((it, i) => {
        const isOpen = open === i;
        const qid = `duk-q-${i}`;
        const aid = `duk-a-${i}`;
        return (
          <li key={it.q} className={s.item} data-open={isOpen ? "" : undefined} data-in>
            <h3 className={s.qh}>
              <button
                type="button"
                id={qid}
                className={s.q}
                aria-expanded={hydrated ? isOpen : true}
                aria-controls={aid}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={s.qt}>{it.q}</span>
                <span className={s.pm} aria-hidden="true">
                  <svg viewBox="0 0 12 12">
                    <path d="M6 1.5 V10.5 M1.5 6 H10.5" />
                  </svg>
                </span>
              </button>
            </h3>
            <div id={aid} role="region" aria-labelledby={qid} className={s.panel} inert={hydrated && !isOpen}>
              <div className={s.inner}>
                <p className={`t-body ${s.a}`}>{it.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
