import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { businessJsonLd, webSiteJsonLd } from "@/content/schema";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { defaultLocale, LANG_STORAGE_KEY, localeInfo, locales, type Locale } from "@/i18n/config";
import { Motion } from "./Motion";
import { PointerField } from "./PointerField";
import { EnquiryHost } from "./enquiry/EnquiryHost";
import { getCopy } from "./copy";
import "./site.css";

/* ─────────────────────────────────────────────────────────────
   The document shell for the site (every page except the demos, which
   keep their own shell in app/(demo) so their Tailwind styles never meet
   this stylesheet). One root layout per language, because <html lang>
   must be right in the static HTML; everything else lives here once.
   ───────────────────────────────────────────────────────────── */

/* Geist for all text, IBM Plex Mono for technical text. The variable
   names are what site.css reads. latin-ext carries ą č ę ė į š ų ū ž. */
const display = Geist({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-sg",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-plex",
  display: "swap",
});

export const siteViewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* Before first paint: marks that JavaScript is on (headlines wait hidden
   for their reveal) unless the visitor asked for less motion. A CSS
   timeout shows everything anyway if the script never arrives. */
const boot = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js')}catch(e){}`;

/* The remembered language, on "/" only, and only after the visitor has
   chosen another language with the switch. Never on a first visit, never
   for a crawler, never when arriving from inside the site. */
const nonDefault = locales.filter((l) => l !== defaultLocale);
const langRedirect = `(function(){try{
if(location.pathname!=='/')return;
var l=localStorage.getItem('${LANG_STORAGE_KEY}');
if(${JSON.stringify(nonDefault)}.indexOf(l)<0)return;
var r=document.referrer;
if(r){try{if(new URL(r).origin===location.origin)return;}catch(e){}}
location.replace('/'+l+location.search+location.hash);
}catch(e){}})();`;

export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const c = getCopy(locale);
  return (
    <html
      lang={localeInfo[locale].htmlLang}
      data-tone="dark"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        {locale === defaultLocale ? <script dangerouslySetInnerHTML={{ __html: langRedirect }} /> : null}
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([businessJsonLd(locale), webSiteJsonLd(locale)]) }}
        />
        <a href="#main" className="skip-link">
          {c.chrome.skip}
        </a>
        <LocaleProvider locale={locale}>
          <Motion />
          <div className="rails" aria-hidden="true" />
          <PointerField />
          {children}
          <EnquiryHost />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
