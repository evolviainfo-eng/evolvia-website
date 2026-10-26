import s from "./Hero.module.css";
import { HeroIntro } from "./hero/HeroIntro";
import { HeroWindow } from "./hero/HeroWindow";
import { EnquiryLink } from "../Chrome";
import { hero } from "../copy/hero";
import type { Locale } from "@/i18n/config";

/** First fold: a centred two-tone headline, one lead, two buttons, a
 *  one-line caption that says what the window below is, and the
 *  "path to a website" window on a flat slab. The window plays the four
 *  real steps of working with Evolvia, one step per view, and settles flat
 *  with the first 360 px of scroll. Nothing above the headline. */
export function Hero({ locale = "lt" }: { locale?: Locale } = {}) {
  const c = hero[locale];
  return (
    <section id="hero" className={`sec ${s.hero}`} data-tone="dark" aria-labelledby="hero-title">
      <HeroIntro />
      <div className={`wrap ${s.top}`}>
        <h1 id="hero-title" className={`t-hero ${s.h1}`} data-split="reveal">
          {c.h1a}
          <br />
          <span className="dim">{c.h1b}</span>
        </h1>
        <p className={`t-lead ${s.sub}`} data-hi="0.95">
          {c.sub}
        </p>
        <div className={`actions ${s.actions}`} data-hi="1.08">
          <EnquiryLink className="btn btn-primary btn-lg" />
          <a className="btn btn-ghost btn-lg" href="#darbai">
            {c.works}
          </a>
        </div>
        <p className={s.note} data-hi="1.2">
          {c.note}
        </p>
      </div>

      <div className={s.stage} data-hi="1.28" data-hi-kind="stage">
        <div className={s.stageBg} aria-hidden="true" />
        <p className="sr-only">{c.sr}</p>
        <HeroWindow />
      </div>
    </section>
  );
}
