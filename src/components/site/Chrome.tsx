"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { LANG_STORAGE_KEY, localizePath } from "@/i18n/config";
import { site } from "@/content/site";
import { chrome } from "./copy/chrome";

/* Links are plain <a>: every page is a full load, so the page motion and
   reveals (Motion.tsx, mounted by the shell) start fresh on each page. */

/** The enquiry trigger. Without JavaScript it is a link to the form on
 *  /kontaktai; with it, the enquiry sheet opens over the page (see
 *  enquiry/EnquiryHost.tsx, which handles every [data-enquiry] click). */
export function EnquiryLink({ className, children }: { className?: string; children?: React.ReactNode }) {
  const locale = useLocale();
  const c = chrome[locale];
  return (
    <a className={className} href={`${localizePath("/kontaktai", locale)}#uzklausa`} data-enquiry="">
      {children ?? c.cta}
    </a>
  );
}

/** The same page in the other language. Remembers the choice for "/". */
function LangLink({ path, className }: { path: string; className: string }) {
  const locale = useLocale();
  const o = chrome[locale].other;
  return (
    <a
      className={className}
      href={localizePath(path, o.lang)}
      hrefLang={o.lang}
      lang={o.lang}
      aria-label={`${o.code}, ${o.label}`}
      onClick={() => {
        try {
          localStorage.setItem(LANG_STORAGE_KEY, o.lang);
        } catch {}
      }}
    >
      {o.code}
    </a>
  );
}

/** Full bar; a hairline and blur once the page moves; a full-screen sheet
 *  on the phone. `path` is the current page, language-neutral. */
export function Nav({ path = "/" }: { path?: string }) {
  const locale = useLocale();
  const c = chrome[locale];
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.toggleAttribute("data-sheet-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="nav" data-solid={solid || open ? "" : undefined}>
        <div className="wrap">
          <div className="nav-in nav-linear">
            <a href={localizePath("/", locale)} className="nav-mark" aria-label={c.home}>
              <span className="wordmark" role="img" aria-label="evolvia." />
            </a>
            <nav className="nav-links" aria-label={c.mainNav}>
              {c.links.map((l) => (
                <a
                  key={l.path}
                  href={localizePath(l.path, locale)}
                  aria-current={path === l.path ? "page" : path.startsWith(`${l.path}/`) ? "true" : undefined}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="nav-end">
              <LangLink path={path} className="nav-lang" />
              <EnquiryLink className="btn btn-primary btn-sm" />
              <button
                type="button"
                className="nav-menu"
                aria-expanded={open}
                aria-controls="site-sheet"
                onClick={() => setOpen((o) => !o)}
              >
                {open ? c.close : c.menu}
              </button>
            </div>
          </div>
        </div>
      </header>
      {open ? (
        <div id="site-sheet" className="sheet" role="dialog" aria-modal="true" aria-label={c.menu}>
          <nav className="sheet-links" aria-label={c.menu}>
            {c.links.map((l) => (
              <a
                key={l.path}
                href={localizePath(l.path, locale)}
                aria-current={path === l.path ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="sheet-foot">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            <LangLink path={path} className="sheet-lang" />
            <EnquiryLink className="btn btn-primary btn-lg" />
          </div>
        </div>
      ) : null}
    </>
  );
}

const DEMOS = [
  { slug: "konstrukta", name: "Konstrukta", tag: "koncepcija" },
  { slug: "fume", name: "Fumé", tag: "demo" },
  { slug: "forma", name: "Forma", tag: "demo" },
  { slug: "skalsa", name: "Skalsa", tag: "koncepcija" },
] as const;

export function Footer({ path = "/" }: { path?: string }) {
  const locale = useLocale();
  const c = chrome[locale];
  return (
    <footer className="foot" data-tone="dark">
      <div className="foot-in wrap">
        <div className="foot-brand">
          <span className="wordmark" role="img" aria-label="evolvia." />
          <p className="t-small">{c.tagline}</p>
        </div>
        <nav className="foot-col" aria-label={c.footSite}>
          <h3>{c.footSite}</h3>
          <a href={localizePath("/", locale)}>{c.homeLabel}</a>
          {c.links.map((l) => (
            <a key={l.path} href={localizePath(l.path, locale)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="foot-col">
          <h3>{c.footDemos}</h3>
          {DEMOS.map((d) => (
            <a key={d.slug} href={localizePath(`/demo/${d.slug}`, locale)}>
              {d.name} <span className="dim">{c.demoTags[d.tag]}</span>
            </a>
          ))}
        </div>
        <div className="foot-col">
          <h3>{c.footContact}</h3>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
          <span>{c.city}</span>
          <LangLink path={path} className="foot-lang" />
        </div>
      </div>
      <div className="foot-legal wrap">
        <span>{c.registration}</span>
        <a href={`${localizePath("/kontaktai", locale)}#privatumas`}>{c.privacy}</a>
      </div>
    </footer>
  );
}
