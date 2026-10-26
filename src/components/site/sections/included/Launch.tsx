"use client";

import { useRef } from "react";
import { useScene } from "@/components/site/ui/scene";
import { EASE, checkStatus } from "@/components/site/ui/fx";
import { Status } from "@/components/site/ui/Primitives";
import { useLocale } from "@/i18n/LocaleProvider";
import { included } from "../../copy/included";
import s from "../Included.module.css";

/* Cell 4: the launch checklist, four rows, each a spinner that turns into
   a tick while its label shimmers; under it the year bar fills its first
   part (the first year, included) and outlines the rest (€50 per year).
   One column, one object. Runs once and holds, about 3 s. */

export function Launch() {
  const ref = useRef<HTMLDivElement>(null);
  const c = included[useLocale()].launch;

  useScene(
    ref,
    (tl, { one, q, init }) => {
      const rows = q("[data-row]");
      const t0 = 0.2;
      // The four rows stand from the start, dim and pending, so the card
      // is never an empty box; each brightens, spins and ticks in turn.
      init(rows, { opacity: 0.4 });
      rows.forEach((row, i) => {
        const at = t0 + i * 0.42 + 0.08;
        tl.to(row, { opacity: 1, duration: 0.36, ease: EASE.ui }, at - 0.08);
        const done = checkStatus(tl, row.querySelector<HTMLElement>("[data-status]"), at, 0.34);
        const val = row.querySelector<HTMLElement>("[data-val]");
        if (val) {
          init(val, { opacity: 0 });
          tl.to(val, { opacity: 1, duration: 0.36, ease: EASE.ui }, done);
        }
        const label = row.querySelector<HTMLElement>("[data-label]");
        if (label) {
          tl.call(() => label.classList.remove("shimmer"), [], 0);
          tl.call(() => label.classList.add("shimmer"), [], at);
          tl.call(() => label.classList.remove("shimmer"), [], done);
        }
      });

      const a = one("[data-bar-a]");
      const b = one("[data-bar-b]");
      if (a) {
        init(a, { clipPath: "inset(0% 100% 0% 0%)" });
        tl.to(a, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: EASE.reveal }, 2.0);
      }
      if (b) {
        init(b, { opacity: 0, x: -8 });
        tl.to(b, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 2.5);
      }
    },
    { delay: 0.3, start: "top 88%" },
  );

  return (
    <div ref={ref} className={`${s.card} ${s.launch}`} aria-hidden="true">
      <ul className={s.list}>
        {c.rows.map((r) => (
          <li key={r.label} className={s.row} data-row>
            <Status state="done" />
            <span className={s.rowMain}>
              <span data-label>{r.label}</span>
              {r.chip ? <span className={`chip chip-dash chip-mono ${s.rowChip}`}>{r.chip}</span> : null}
            </span>
            {r.value ? (
              <span className={s.rowVal} data-val>
                {r.value}
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      <div className={s.year}>
        <div className={s.bar}>
          <span className={s.barA} data-bar-a>
            {c.year1}
          </span>
          <span className={s.barB} data-bar-b>
            {c.later}
          </span>
        </div>
      </div>
    </div>
  );
}
