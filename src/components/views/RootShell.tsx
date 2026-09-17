import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Choreo } from "@/components/ui/Choreo";
import { Scrollfx } from "@/components/ui/Scrollfx";
import { Analytics } from "@vercel/analytics/next";
import { businessJsonLd, webSiteJsonLd } from "@/content/schema";
import { getDictionary } from "@/i18n";
import {
  defaultLocale,
  LANG_STORAGE_KEY,
  localeInfo,
  locales,
  type Locale,
} from "@/i18n/config";

/* ─────────────────────────────────────────────────────────────
   The document shell, shared by the two root layouts.

   Each language is its own root layout (app/(lt)/layout.tsx and
   app/en/layout.tsx) for exactly one reason: <html lang> has to be right
   in the static HTML, and only a root layout renders <html>. Everything
   else about the shell is identical, so it lives here once.
   ───────────────────────────────────────────────────────────── */

/* Inter is the cross-platform fallback (self-hosted by next/font).
   On Apple devices the CSS stack resolves to real SF Pro first.
   latin-ext is required for Lithuanian diacritics: ą č ę ė į š ų ū ž. */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

/* The display voice. Inter is the interface; it is not the brand, and a
   system typeface set at 74px is the single clearest tell that a page was
   assembled rather than designed. Schibsted Grotesk continues the wordmark's
   skeleton (a light grotesk, cut terminals, closed apertures) while having a
   character Inter deliberately does not.
   latin-ext is not optional here: ą č ę ė į š ų ū ž. */
const display = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});

export const rootViewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

/* Runs before hydration. Two jobs:
 *
 *  1. Paint the ground. The site is dark unless the visitor has chosen
 *     light.
 *  2. Arm the choreography. The reveal system hides `data-rise` elements
 *     behind `html[data-choreo]`; if that attribute were set by React on
 *     mount, everything above the fold would paint visible and then snap
 *     hidden.
 *
 *  The watchdog is the safety net: if Choreo never mounts (a JS error, a
 *  chunk that failed to load), the attribute is dropped after 4s and the
 *  page renders as plain visible content. It only ever *reveals* — it can
 *  never strand anything at opacity 0.
 */
const bootScript = `(function(){try{
if(localStorage.getItem('theme')!=='light'){document.documentElement.setAttribute('data-theme','dark');}
}catch(e){}
try{
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var d=document.documentElement;d.setAttribute('data-choreo','');
setTimeout(function(){if(!window.__choreo){d.removeAttribute('data-choreo');}},4000);
}catch(e){}})();`;

/* The remembered language, and the only redirect on the site.
 *
 * Fires on "/" alone, and only when the visitor has previously clicked a
 * flag for another language (the switch writes the choice; nothing else
 * does). A first visit has nothing stored, so it is never redirected, and
 * neither is a crawler. A same-site referrer means the visitor clicked
 * through to the Lithuanian home page from inside the site, which is a
 * choice too, so that is left alone.
 *
 * A plain inline script in <head>, not next/script: it has to run while the
 * document is still being parsed, before anything of the Lithuanian page is
 * painted. `replace` keeps the bounce out of the back button. */
const nonDefault = locales.filter((l) => l !== defaultLocale);
const langRedirectScript = `(function(){try{
if(location.pathname!=='/')return;
var l=localStorage.getItem('${LANG_STORAGE_KEY}');
if(${JSON.stringify(nonDefault)}.indexOf(l)<0)return;
var r=document.referrer;
if(r){try{if(new URL(r).origin===location.origin)return;}catch(e){}}
location.replace('/'+l+location.search+location.hash);
}catch(e){}})();`;

/* The 404 is one static file for every URL, so it carries both languages
 * and picks one here, before paint, from the address it was served at.
 * The tab title follows once the document has parsed (NotFoundView sets it
 * again after hydration, in case React restores the server's). */
const notFoundLangScript = `(function(){try{
var m=location.pathname.match(/^\\/(${nonDefault.join("|")})(\\/|$)/);
if(!m)return;
var d=document.documentElement,l=m[1];
d.setAttribute('data-locale',l);
d.setAttribute('lang',${JSON.stringify(
  Object.fromEntries(nonDefault.map((l) => [l, localeInfo[l].htmlLang])),
)}[l]);
var t=${JSON.stringify(
  Object.fromEntries(
    nonDefault.map((l) => [
      l,
      `${getDictionary(l).pages.notFound.metaTitle} · Evolvia`,
    ]),
  ),
)}[l];
document.addEventListener('DOMContentLoaded',function(){document.title=t;});
}catch(e){}})();`;

export function RootShell({
  locale,
  notFound = false,
  children,
}: {
  locale: Locale;
  /** The shared 404: both languages in one document, chosen by URL. */
  notFound?: boolean;
  children: ReactNode;
}) {
  const shellLocales: Locale[] = notFound ? [...locales] : [locale];
  const headScript = notFound
    ? notFoundLangScript
    : locale === defaultLocale
      ? langRedirectScript
      : null;

  return (
    <html
      lang={localeInfo[locale].htmlLang}
      className={`${inter.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      {headScript && (
        // The lint rule below is written for the Pages Router. This shell is
        // only ever rendered by App Router root layouts, where <head> and a
        // beforeInteractive script are the supported way to do this.
        // eslint-disable-next-line @next/next/no-head-element
        <head>
          <script dangerouslySetInnerHTML={{ __html: headScript }} />
        </head>
      )}
      <body>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script id="boot-init" strategy="beforeInteractive">
          {bootScript}
        </Script>
        {/* Sitewide structured data lives in content/schema.ts, derived from
            the same files that own the prices and the registration. A search
            result or an AI answer that quotes a number the site does not
            charge is worse than no structured data at all. */}
        {!notFound && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                businessJsonLd(locale),
                webSiteJsonLd(locale),
              ]),
            }}
          />
        )}
        {shellLocales.map((l) => (
          <a
            key={l}
            href="#main"
            className="skip-link"
            lang={notFound ? localeInfo[l].htmlLang : undefined}
            data-locale-only={notFound ? l : undefined}
          >
            {getDictionary(l).shell.skipLink}
          </a>
        ))}
        <SmoothScroll />
        <Choreo />
        <Scrollfx />
        {children}
        {/* Cookieless page counting. It writes nothing to the visitor's
            device, so it needs no consent banner — but it does process the
            request, so the privacy notice names it. Only collects when the
            site is served from Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
