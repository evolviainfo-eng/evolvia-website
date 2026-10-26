import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { defaultLocale, localeInfo, locales } from "@/i18n/config";
import { NotFound } from "@/components/site/pages/NotFound";
import { notFoundCopy } from "@/components/site/copy/not-found";
import "@/components/site/site.css";

/* The site's one 404.

   Each language has its own root layout, so there is no single layout to
   compose a not-found page from; `global-not-found` (enabled in
   next.config.ts) renders a whole document instead. The static export
   writes it once, as out/404.html, and the host serves it for every missing
   path in both languages, which is why NotFound carries both. It uses the
   site's stylesheet and fonts (the same variables SiteShell sets).

   Before paint the head script reads the address: on /en/... it sets
   html[data-locale="en"] and lang, which shows the English blocks, and
   swaps the tab title once the document has parsed (NotFound keeps it
   after hydration). Without JavaScript the page reads in Lithuanian. */

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

const t = notFoundCopy[defaultLocale];

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const others = locales.filter((l) => l !== defaultLocale);
const head = `(function(){try{
var d=document.documentElement;
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js');
var m=location.pathname.match(/^\\/(${others.join("|")})(\\/|$)/);
if(!m)return;
var l=m[1];
d.setAttribute('data-locale',l);
d.setAttribute('lang',${JSON.stringify(Object.fromEntries(others.map((l) => [l, localeInfo[l].htmlLang])))}[l]);
var t=${JSON.stringify(Object.fromEntries(others.map((l) => [l, notFoundCopy[l].metaTitle])))}[l];
document.addEventListener('DOMContentLoaded',function(){document.title=t;});
}catch(e){}})();`;

export default function GlobalNotFound() {
  return (
    <html
      lang={localeInfo[defaultLocale].htmlLang}
      data-tone="dark"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: head }} />
      </head>
      <body>
        <NotFound />
        <Analytics />
      </body>
    </html>
  );
}
