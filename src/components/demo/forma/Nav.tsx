"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getFormaCopy } from "@/components/demo/forma/copy";

/* Labels come from the dictionary's section names. */
const LINKS = [
  { href: "#studija", section: "studio", phone: false },
  { href: "#projektai", section: "projects", phone: true },
  { href: "#paslaugos", section: "services", phone: false },
  { href: "#procesas", section: "process", phone: false },
] as const;

/* True on the client, false in the server HTML. */
const noop = () => () => {};
const useLive = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

/** TARQ's header: the wordmark left, the section words centred in one row,
 *  the contact link right. Transparent with white words over the hero
 *  photograph at the very top, warm-grey paper with ink words from the
 *  first pixel of scroll, hidden while scrolling down.
 *
 *  Without JS the header is `position:absolute` over the hero and simply
 *  scrolls away with it, so white words never land on paper. With JS it is
 *  fixed (one rAF-throttled scroll listener).
 *  The paper ground is a pseudo-element that fades by opacity; the words
 *  change colour in the same frame. All of it lives in FormaPage's
 *  stylesheet under `.f-head`. */
export function FormaNav() {
  const locale = useLocale();
  const t = getFormaCopy(locale);
  const live = useLive();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  /* Paper ground as soon as the page leaves the very top, so hero words
     never slide under transparent nav words. The header steps out of the
     way while the visitor scrolls down and returns on the first scroll up,
     so it never sits over a heading, a photograph or the form. */
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const read = () => {
      raf = 0;
      const y = window.scrollY;
      setSolid(y > 4);
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 240);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(read);
    };
    raf = window.requestAnimationFrame(read);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className="f-head"
      data-live={live ? "" : undefined}
      data-solid={solid ? "" : undefined}
      data-hidden={hidden ? "" : undefined}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-[var(--f-pad)] lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          aria-label={t.nav.home}
          className="f-ext justify-self-start text-[1.125rem] uppercase leading-none tracking-[0.04em] transition-opacity duration-[var(--d-tap)] hover:opacity-70"
        >
          Forma
        </a>

        <nav
          aria-label={t.nav.label}
          className="flex min-w-0 items-center justify-end gap-6 lg:justify-center lg:gap-12"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`${l.phone ? "inline-flex" : "hidden lg:inline-flex"} f-ul h-10 items-center text-[0.9375rem]`}
            >
              {t.sections[l.section]}
            </a>
          ))}
          <a
            href="#kontaktai"
            className="f-arrow inline-flex h-10 items-center gap-1.5 text-[0.9375rem] lg:hidden"
          >
            {t.sections.contact}
            <span aria-hidden="true">↘</span>
          </a>
        </nav>

        <a
          href="#kontaktai"
          className="f-arrow hidden h-10 items-center gap-1.5 justify-self-end text-[0.9375rem] lg:inline-flex"
        >
          {t.sections.contact}
          <span aria-hidden="true">↘</span>
        </a>
      </div>
    </header>
  );
}
