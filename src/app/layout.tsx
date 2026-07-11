import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
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

// Light is the default; applies a stored dark-mode preference before paint.
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

// Sitewide structured data — who Evolvia is, where it works, what it costs.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Evolvia",
  description:
    "Modernios svetainės Lietuvos verslui — dizainas, programavimas, paleidimas ir priežiūra.",
  url: SITE_URL,
  email: "evolvia.info@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kaunas",
    addressCountry: "LT",
  },
  areaServed: "Lietuva",
  priceRange: "€300–€600",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt" className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
