import type { Metadata, Viewport } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Choreo } from "@/components/ui/Choreo";
import { Scrollfx } from "@/components/ui/Scrollfx";
import { Analytics } from "@vercel/analytics/next";
import { businessJsonLd, webSiteJsonLd } from "@/content/schema";
import "./globals.css";

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

const SITE_URL = "https://evolvia.lt";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Svetainių kūrimas Lietuvoje · Evolvia",
    template: "%s · Evolvia",
  },
  description:
    "Svetainių kūrimas Lietuvos verslui už €400. Individualus dizainas, tekstai, paleidimas ir pirmi metai priežiūros vienoje kainoje. Svetainę pamatote gyvai prieš mokėdami.",
  keywords: [
    "svetainių kūrimas",
    "svetainių kūrimas Lietuvoje",
    "svetainių kūrimas Kaune",
    "interneto svetainių kūrimas",
    "svetainės kaina",
    "verslo svetainė",
    "el. parduotuvės kūrimas",
    "evolvia",
  ],
  authors: [{ name: "Evolvia" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Svetainių kūrimas Lietuvoje · Evolvia",
    description:
      "Svetainių kūrimas Lietuvos verslui už €400. Svetainę pamatote gyvai, mokate tik tada, kai ji patinka.",
    url: SITE_URL,
    siteName: "Evolvia",
    locale: "lt_LT",
    type: "website",
    images: [
      {
        url: "/brand/lockup-dark.png",
        width: 1600,
        height: 900,
        alt: "evolvia. · svetainių kūrimas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Svetainių kūrimas Lietuvoje · Evolvia",
    description:
      "Svetainių kūrimas Lietuvos verslui už €400. Svetainę pamatote gyvai, mokate tik tada, kai ji patinka.",
    images: ["/brand/lockup-dark.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

/* Runs before first paint. Two jobs:
 *
 *  1. Paint the ground. The site is dark unless the visitor has chosen
 *     light, so this runs before first paint and nothing flashes.
 *  2. Arm the choreography. The reveal system hides `data-rise` elements
 *     behind `html[data-choreo]`; if that attribute were set by React on
 *     mount, everything above the fold would paint visible and then snap
 *     hidden. Setting it here means it is hidden from the very first frame.
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

// Sitewide structured data lives in content/schema.ts, derived from the
// same files that own the prices and the registration. A search result or an
// AI answer that quotes a number the site does not charge is worse than no
// structured data at all.

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt" className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <body>
        <Script id="boot-init" strategy="beforeInteractive">
          {bootScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([businessJsonLd, webSiteJsonLd]),
          }}
        />
        <a href="#main" className="skip-link">
          Pereiti į turinį
        </a>
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
