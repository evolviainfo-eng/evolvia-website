"use client";

import { useRef } from "react";
import { useScene } from "@/components/site/ui/scene";
import { typeText } from "@/components/site/ui/fx";
import s from "../Included.module.css";

/* Cell 3: one search result for minerda.lt, large. The real title types
   in, then the real description rises in (opacity and 8 px, no blur).
   No address, no footer. Runs once and holds. */

export function Snippet() {
  const ref = useRef<HTMLDivElement>(null);

  useScene(
    ref,
    (tl, { one, init }) => {
      const typed = typeText(tl, init, one("[data-title]"), 0.3, 32);
      const desc = one("[data-desc]");
      if (desc) {
        init(desc, { opacity: 0, y: 8 });
        tl.to(desc, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, typed + 0.15);
      }
    },
    { delay: 0.3, start: "top 88%" },
  );

  return (
    <div ref={ref} className={`${s.card} ${s.snip}`} aria-hidden="true" lang="lt">
      <div className={s.snipHead}>
        <span className={s.fav} />
        <span>minerda.lt</span>
        <svg className={s.kebab} viewBox="0 0 3 13">
          <circle cx="1.5" cy="1.5" r="1.2" />
          <circle cx="1.5" cy="6.5" r="1.2" />
          <circle cx="1.5" cy="11.5" r="1.2" />
        </svg>
      </div>
      <p className={s.snipTitle} data-title>
        Minerda | Įlenkimų šalinimas be dažymo Kaune
      </p>
      <p className={s.snipDesc} data-desc>
        Meninis lyginimas (PDR) be dažymo, kėbulo poliravimas ir keraminė nanodanga.
      </p>
    </div>
  );
}
