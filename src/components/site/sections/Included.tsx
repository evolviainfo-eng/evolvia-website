import type { ReactNode } from "react";
import { included, type IncludedCopy } from "../copy/included";
import s from "./Included.module.css";
import { Bento } from "./included/Bento";
import { Reflow } from "./included/Reflow";
import { PhoneScroll } from "./included/PhoneScroll";
import { Snippet } from "./included/Snippet";
import { Launch } from "./included/Launch";
import type { Locale } from "@/i18n/config";

/* What is included (Kas įeina), round 4: one large two-tone statement whose words brighten
   with the scroll, then one 2 x 2 bento that rises into view (data-scrub).
   Four cells, each one object: the page reflowing between screens, a
   phone, a search result, the launch checklist. Nothing else in a cell
   but a title and one sentence. */

const UI: Record<IncludedCopy["cells"][number]["key"], ReactNode> = {
  dizainas: <Reflow />,
  telefonas: <PhoneScroll />,
  paieska: <Snippet />,
  paleidimas: <Launch />,
};

export function Included({ locale = "lt" }: { locale?: Locale } = {}) {
  const c = included[locale];
  return (
    <section id="ieina" className={`sec ${s.root}`} data-tone="dark" aria-labelledby="ieina-h" data-live-root>
      <div className="wrap">
        <h2 id="ieina-h" className={`t-statement ${s.statement}`} data-words>
          {c.lead}{" "}
          <span className="dim">{c.rest}</span>
        </h2>

        <Bento>
          {c.cells.map((cell) => (
            <article key={cell.key} className={s.cell} data-cell>
              <div className={s.ui}>{UI[cell.key]}</div>
              <div className={s.text}>
                <h3 className={s.title}>{cell.title}</h3>
                <p className={s.desc}>{cell.desc}</p>
              </div>
            </article>
          ))}
        </Bento>
      </div>
    </section>
  );
}
