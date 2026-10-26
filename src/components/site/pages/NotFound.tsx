"use client";

import { useEffect, useState } from "react";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { localeInfo, localizePath, locales, splitLocale, type Locale } from "@/i18n/config";
import { Footer, Nav } from "@/components/site/Chrome";
import { Motion } from "@/components/site/Motion";
import { PointerField } from "@/components/site/PointerField";
import { chrome } from "@/components/site/copy/chrome";
import { notFoundCopy } from "@/components/site/copy/not-found";
import s from "./NotFound.module.css";

/* The 404, in both languages at once.

   A static export has one 404.html for every missing address, /en/...
   included. So the page carries each language's nav, message and footer,
   and the head script in app/global-not-found.tsx marks <html> with
   data-locale before anything paints; the CSS module shows only the
   matching block. Without JavaScript it reads in Lithuanian.

   The language switch has no page to keep here, so it goes to the other
   language's home page (Nav and Footer get path "/"). */

const only = (l: Locale) => (l === "en" ? s.en : s.lt);

/** Keeps the tab title and description in the address's language: the
 *  head script sets them while the page parses, but hydration puts the
 *  server's (Lithuanian) title back. Re-applying the same text is a
 *  no-op, so the observer cannot loop. Also reads the missing address. */
function useAddress() {
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    const { locale } = splitLocale(window.location.pathname);
    const t = notFoundCopy[locale];
    const apply = () => {
      if (document.title !== t.metaTitle) document.title = t.metaTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && meta.getAttribute("content") !== t.metaDescription) meta.setAttribute("content", t.metaDescription);
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.head, { subtree: true, childList: true, characterData: true, attributes: true });
    let path = window.location.pathname;
    try {
      path = decodeURI(path);
    } catch {}
    // Set once after mount: the server cannot know the address.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAddress(`${window.location.host}${path}`);
    return () => mo.disconnect();
  }, []);
  return address;
}

export function NotFound() {
  const address = useAddress();
  return (
    <>
      {locales.map((l) => (
        <a key={l} href="#main" className={`skip-link ${only(l)}`} lang={localeInfo[l].htmlLang}>
          {chrome[l].skip}
        </a>
      ))}
      <Motion />
      <div className="rails" aria-hidden="true" />
      <PointerField />
      {locales.map((l) => (
        <div key={l} className={only(l)} lang={localeInfo[l].htmlLang}>
          <LocaleProvider locale={l}>
            <Nav path="/" />
          </LocaleProvider>
        </div>
      ))}
      <main id="main" className={s.main}>
        {locales.map((l) => {
          const t = notFoundCopy[l];
          return (
            <div key={l} className={`${only(l)} ${s.block}`} lang={localeInfo[l].htmlLang}>
              <div className="wrap">
                <div className={s.message}>
                  <h1 className={`t-hero ${s.title}`} data-split="now">
                    {t.title}
                  </h1>
                  <p className={`t-lead ${s.lead}`} data-in>
                    {t.lead}
                  </p>
                  <p className={s.address} data-in aria-live="polite">
                    <span className={s.addressLabel}>{t.addressLabel}</span>
                    <span className={s.addressValue}>{address ?? " "}</span>
                  </p>
                  <div className={`actions ${s.actions}`} data-in>
                    <a className="btn btn-primary btn-lg" href={localizePath("/", l)}>
                      {t.home}
                    </a>
                    <a className="btn btn-ghost btn-lg" href={localizePath("/darbai", l)}>
                      {t.work}
                    </a>
                  </div>
                </div>
                <nav className={s.index} aria-label={t.indexTitle}>
                  <h2 className={s.indexTitle} data-in>
                    {t.indexTitle}
                  </h2>
                  <ul className={s.indexList} data-stagger="0.05">
                    {t.index.map((it) => (
                      <li key={it.path} data-in>
                        <a className={s.indexLink} href={localizePath(it.path, l)}>
                          <span className={s.indexLabel}>
                            {it.label}
                            <span className={`arrow ${s.arrow}`} aria-hidden="true" />
                          </span>
                          <span className={s.indexNote}>{it.note}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          );
        })}
      </main>
      {locales.map((l) => (
        <div key={l} className={only(l)} lang={localeInfo[l].htmlLang}>
          <LocaleProvider locale={l}>
            <Footer path="/" />
          </LocaleProvider>
        </div>
      ))}
    </>
  );
}
