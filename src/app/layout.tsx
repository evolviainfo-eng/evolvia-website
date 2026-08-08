import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Choreo } from "@/components/ui/Choreo";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import "./globals.css";

/* Inter is the cross-platform fallback (self-hosted by next/font).
   On Apple devices the CSS stack resolves to real SF Pro first.
   latin-ext is required for Lithuanian diacritics: ą č ę ė į š ų ū ž. */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://evolvia.lt";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Evolvia — Web dizainas Lietuvoje",
    template: "%s — Evolvia",
  },
  description:
    "Modernios svetainės Lietuvos verslui. Pamatote svetainę gyvai — tik tada mokate. Nuo pirmo eskizo iki paleidimo viskas padaroma už jus.",
  keywords: [
    "web dizainas",
    "svetainių kūrimas",
    "interneto svetainės",
    "Lietuva",
    "Kaunas",
    "modernios svetainės",
    "evolvia",
  ],
  authors: [{ name: "Evolvia" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Evolvia — Web dizainas Lietuvoje",
    description:
      "Svetainės, kurios atrodo brangiai. Pamatote svetainę gyvai — tik tada mokate.",
    url: SITE_URL,
    siteName: "Evolvia",
    locale: "lt_LT",
    type: "website",
    images: [
      {
        url: "/brand/evolvia-dark.jpg",
        width: 2400,
        height: 1500,
        alt: "evolvia. — web design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evolvia — Web dizainas Lietuvoje",
    description:
      "Svetainės, kurios atrodo brangiai. Pamatote svetainę gyvai — tik tada mokate.",
    images: ["/brand/evolvia-dark.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/* Runs before first paint. Two jobs:
 *
 *  1. Apply a stored dark-mode preference, so the page never flashes light.
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
if(localStorage.getItem('theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}
}catch(e){}
try{
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var d=document.documentElement;d.setAttribute('data-choreo','');
setTimeout(function(){if(!window.__choreo){d.removeAttribute('data-choreo');}},4000);
}catch(e){}})();`;

// Sitewide structured data — who Evolvia is, where it works, what it costs.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Evolvia",
  description:
    "Modernios svetainės Lietuvos verslui — dizainas, programavimas, paleidimas ir priežiūra.",
  url: SITE_URL,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kaunas",
    addressCountry: "LT",
  },
  areaServed: "Lietuva",
  priceRange: "€150–€600",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt" className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="boot-init" strategy="beforeInteractive">
          {bootScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Pereiti į turinį
        </a>
        <SmoothScroll />
        <Choreo />
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
