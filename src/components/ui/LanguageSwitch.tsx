"use client";

import type { MouseEvent } from "react";
import {
  LANG_STORAGE_KEY,
  localeInfo,
  localizePath,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/cn";

/* The language switch: a two-segment pill, LT | EN.
 *
 * It is built as a sibling of the theme toggle beside it: the same 40px
 * height, the same hairline pill, the same ink-at-opacity tones, so the
 * header reads as one set of controls rather than a control and a sticker.
 * The current language sits on a soft filled segment at full ink; the other
 * is dimmed and comes up under the pointer.
 *
 * The marks are drawn for this site, not copied flags. Each is a 16px coin
 * in the theme toggle's own line language (a 1.2px ring, the weight the sun
 * and moon strokes render at) holding just enough of the flag's structure to
 * be recognised beside its code: Lithuania's three bands as a tint, a solid
 * middle and a half-tone foot; the Union flag as its cross and saltire.
 * Everything is currentColor, so a segment's mark dims and lights with its
 * label and follows both themes with nothing to switch. The shapes are
 * pre-cut to the coin, so there are no clip-path ids to collide when two
 * headers share a page (the 404).
 *
 * Each link carries the language's name for screen readers and a tooltip,
 * its hreflang, and a `lang` attribute when that name is written in the
 * target language itself. The names come from the page's own dictionary: an
 * English page calls the other option "Lithuanian".
 */

type Coin = (props: { className?: string }) => React.JSX.Element;

/** Lithuania: three equal bands, cut to a circle of r 7.25. The band edges
 *  meet the circle at x = 8 ± 6.835 (y = 5.583 and 10.417). */
const CoinLT: Coin = ({ className }) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="7.25" fill="currentColor" fillOpacity="0.12" />
    <path
      d="M1.165 5.583H14.835A7.25 7.25 0 0 1 14.835 10.417H1.165A7.25 7.25 0 0 1 1.165 5.583Z"
      fill="currentColor"
    />
    <path
      d="M1.165 10.417H14.835A7.25 7.25 0 0 1 1.165 10.417Z"
      fill="currentColor"
      fillOpacity="0.5"
    />
    <circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

/** The Union flag: saltire and cross, ending on the ring (7.25 · cos 45° =
 *  5.127), the cross heavier, as it is on the flag. */
const CoinUK: Coin = ({ className }) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="7.25" fill="currentColor" fillOpacity="0.12" />
    <path
      d="M2.873 2.873 13.127 13.127M13.127 2.873 2.873 13.127"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.6"
    />
    <path d="M8 .75V15.25M.75 8H15.25" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

/** Lithuanian first, as the default language. */
const OPTIONS: { locale: Locale; code: string; Coin: Coin }[] = [
  { locale: "lt", code: "LT", Coin: CoinLT },
  { locale: "en", code: "EN", Coin: CoinUK },
];

const TONES = {
  /* The site header: theme tokens. Inactive ink holds 70%, the value the
     nav links use to stay legible over the always-dark section. */
  site: {
    track: "border-border",
    on: "bg-text/[0.08] text-text",
    // Hover only lifts the ink: a hover fill would look like the selection.
    off: "text-text/70 hover:text-text",
    // Below 375px the codes alone fit beside the toggle and the menu button.
    coin: "hidden min-[375px]:block",
  },
  /* The demo honesty bar: ink in both themes. On a phone that bar also has
     to show the "fictional company" line, so the coins wait for more room. */
  ink: {
    track: "border-white/15",
    on: "bg-white/[0.13] text-white",
    off: "text-white/60 hover:text-white",
    coin: "hidden sm:block",
  },
} as const;

export function LanguageSwitch({
  locale,
  path,
  label,
  names,
  tone = "site",
  className,
}: {
  /** The language of the page the switch sits on. */
  locale: Locale;
  /** The current page as a language-neutral path ("/kainos"). null on a page
   *  with no counterpart (the 404), where each option goes to its home page. */
  path: string | null;
  /** Accessible name of the group ("Kalba" / "Language"). */
  label: string;
  /** Each language's name as this page writes it. */
  names: Record<Locale, string>;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  const t = TONES[tone];

  function remember(target: Locale, e: MouseEvent<HTMLAnchorElement>) {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, target);
    } catch {
      /* storage blocked: the link still works, it just is not remembered */
    }
    // Keep the reader's place. Section ids are the same in every language,
    // so /kainos#duk lands on the same block as /en/kainos#duk.
    const hash = window.location.hash;
    const link = e.currentTarget;
    if (path !== null && hash && !link.href.includes("#")) {
      link.href = `${link.href}${hash}`;
    }
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex h-10 shrink-0 items-center rounded-pill border p-[3px]",
        t.track,
        tone === "ink" && "ink-switch",
        className,
      )}
    >
      {OPTIONS.map(({ locale: target, code, Coin }) => {
        const active = target === locale;
        const info = localeInfo[target];
        const name = names[target];
        // The name's own language, when it is not the page's.
        const nameLang = name === info.name ? info.htmlLang : undefined;
        return (
          <a
            key={target}
            href={localizePath(path ?? "/", target)}
            hrefLang={info.hreflang}
            lang={nameLang !== localeInfo[locale].htmlLang ? nameLang : undefined}
            aria-label={`${code}, ${name}`}
            title={name}
            aria-current={active ? "true" : undefined}
            onClick={(e) => remember(target, e)}
            className={cn(
              "lang-flag press flex h-full items-center gap-1.5 rounded-pill px-1.5 text-[0.8125rem] font-medium leading-none tracking-[0.06em] [--press:0.96] min-[360px]:px-2 md:px-2.5",
              "transition-[color,background-color] duration-[var(--d-ui)] ease-[var(--e-out)]",
              active ? t.on : t.off,
            )}
          >
            <Coin className={cn("h-4 w-4 shrink-0", t.coin)} />
            <span aria-hidden="true">{code}</span>
          </a>
        );
      })}
    </div>
  );
}
