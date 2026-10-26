import { Window } from "@/components/site/ui/Primitives";
import type { Locale } from "@/i18n/config";
import { minerda } from "@/components/site/copy/minerda";
import s from "../Minerda.module.css";

/* Minerda, still: the client's real home page in a browser window with the
   phone version overlapping its corner, and the four facts beside it. No
   scroll scrubbing, no sticky travel: the whole block enters once with the
   page's usual panel rise and then stays put (the user found the scrolling
   story heavy). Images are the top of the client's real pages, with their
   nav, phone number and address removed. */
export function Story({ locale }: { locale: Locale }) {
  const c = minerda[locale];
  return (
    <div className={s.story}>
      <div className={s.stage}>
        <div className={s.side}>
          <div className={s.caps} data-stagger="0.08">
            {c.captions.map((cap) => (
              <p key={cap.a} className={s.cap} data-in="">
                {cap.a} <span className="dim">{cap.b}</span>
              </p>
            ))}
          </div>
        </div>

        <div className={s.frame} data-scrub="">
          <div className={s.device}>
            <div className={s.winBox}>
              <Window className={s.win} address="minerda.lt">
                <div className={s.screen}>
                  <img
                    className={s.page}
                    src="/site/minerda-top.webp"
                    width={1680}
                    height={1050}
                    alt={c.altDesktop}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Window>
            </div>

            <div className={s.phone}>
              <div className={s.phScreen}>
                <img
                  className={s.page}
                  src="/site/minerda-top-m.webp"
                  width={600}
                  height={1300}
                  alt={c.altPhone}
                  loading="lazy"
                  decoding="async"
                />
                <span className={s.island} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
