"use client";

import { useRef, type CSSProperties } from "react";
import { useScene } from "@/components/site/ui/scene";
import { EASE } from "@/components/site/ui/fx";
import s from "../Included.module.css";
import { useLocale } from "@/i18n/LocaleProvider";
import { included } from "../../copy/included";

/* Cell 2: a caption row (Konstrukta, Koncepcija chip) and under it a drawn
   phone (190 wide, radius 34, 7 px bezel, notch) showing the Konstrukta
   concept. The phone is taller than the cell and dissolves at the bottom.
   The screenshot drifts up and back, slowly, as if someone scrolls it
   (10.4 s loop). Loops while on screen; the server frame is the top of
   the page. */

/** The screenshot is 360 x 735. The screen is a little shorter than the
 *  shot, so the shot can scroll by the difference. */
const SHOT_RATIO = 360 / 735;
const SCREEN_RATIO = 0.56;
/** How far the shot travels, in % of its own height. */
const TRAVEL = (1 - SHOT_RATIO / SCREEN_RATIO) * 100;

export function PhoneScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const c = included[useLocale()].phone;

  useScene(
    ref,
    (tl, { one, init }) => {
      const shot = one("[data-shot]");
      if (!shot) return;
      init(shot, { yPercent: 0 });
      tl.to(shot, { yPercent: -TRAVEL, duration: 3.4, ease: EASE.move }, 1.0);
      tl.to(shot, { yPercent: 0, duration: 3.4, ease: EASE.move }, 5.8);
      tl.to({}, { duration: 10.4 }, 0);
    },
    { loop: true, repeatDelay: 0, delay: 0.6 },
  );

  return (
    <div ref={ref} className={s.phoneWrap} aria-hidden="true">
      <div className={s.phoneCap}>
        <span>{c.name}</span>
        <span className="chip">{c.tag}</span>
      </div>
      <div className={s.phone}>
        <div className={s.screen} style={{ aspectRatio: SCREEN_RATIO } as CSSProperties}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={s.shot}
            src={c.src}
            width={360}
            height={735}
            alt={c.alt}
            loading="lazy"
            decoding="async"
            data-shot
          />
          <i className={s.notch} />
        </div>
      </div>
    </div>
  );
}
