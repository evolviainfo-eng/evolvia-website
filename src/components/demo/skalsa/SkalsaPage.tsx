import type { Metadata } from "next";
import { Gloock, Host_Grotesk } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import type { Locale } from "@/i18n/config";
import { ShopProvider } from "@/components/demo/skalsa/ShopProvider";
import { SiteHeader } from "@/components/demo/skalsa/SiteHeader";
import { CartDrawer } from "@/components/demo/skalsa/CartDrawer";
import { Hero, Intro } from "@/components/demo/skalsa/Hero";
import { BrandBlock } from "@/components/demo/skalsa/BrandBlock";
import { Catalog } from "@/components/demo/skalsa/Catalog";
import { Bundles } from "@/components/demo/skalsa/Bundles";
import { Studio } from "@/components/demo/skalsa/Studio";
import { Mood } from "@/components/demo/skalsa/Mood";
import { Shipping } from "@/components/demo/skalsa/Shipping";
import { ShopFooter } from "@/components/demo/skalsa/ShopFooter";
import { getSkalsaCopy } from "@/components/demo/skalsa/copy";

/* latin-ext is required: ą č ę ė į š ų ū ž. Both families carry every glyph.
   Host Grotesk is the reference's sturdy grotesk (GT America) for every
   word; Gloock is its flared serif, used only for the one swapped word in a
   line and for the wordmark. */
const ui = Host_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-skalsa-ui",
  display: "swap",
});

const serif = Gloock({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-skalsa-serif",
  display: "swap",
});

/** Page metadata in the demo's language. */
export function skalsaMetadata(locale: Locale): Metadata {
  const { title, description } = getSkalsaCopy(locale).meta;
  return { title, description };
}

/** Skalsa after Gielly Green (Awwwards HM, Jan 2026): light, still, two
 *  colours, two typefaces, tiny type and big photographs. Everything here
 *  ships to the browser, so it carries no comments; the notes live in this
 *  docblock.
 *
 *  - Palette: ground #F2EFEA, band #ECE3DA, brand #5A2A1E (text on light
 *    and the solid blocks), deepest #2A1410 (footer). Text is never black.
 *  - Type scale (the only sizes on the page): 28/35 intro and meter
 *    sentence (22 on a phone), 20/25 captions and section labels, 16/24
 *    body, 14 secondary lines, 13 px uppercase 500 for nav and actions.
 *    -0.02em everywhere. No heading is larger than 28 px.
 *  - Grid: 60 px outer gutter (30 on a phone); halves split with a 120 px
 *    gap, so every right-hand column starts at 50 % + 60 px, the same line
 *    as the captions inside the half-width photo tiles.
 *  - .sk-caption: the signature, sticky at 45vh inside its tile (Tile.tsx).
 *  - Motion is only: the shell's Lenis, `data-rise` entries (the site's
 *    Choreo: opacity + 16 px, once), the 1.03 zoom on photo hover (1 s),
 *    link hovers by opacity (150 ms) and the header wordmark's crossfade
 *    (800 ms). No GSAP on this page at all.
 *  - html.sk-js (set by the inline script below before the sections paint)
 *    shows the product row's Prev/Next buttons; without JS the row is a
 *    plain native horizontal scroller.
 *  - Reduced motion: Choreo never hides anything, the zoom and the smooth
 *    row scroll are off, the sticky captions stay (they are layout). */
const CSS = `
.sk-shop { --sk-head: 56px; --rise-y: 16px; --sk-ease: cubic-bezier(.4,0,.2,1); letter-spacing: -0.02em; font-weight: 400; }

@media (min-width: 1024px) { .sk-shop { --sk-head: 64px; } }

@layer components {
.sk-serif { font-family: var(--font-skalsa-serif); font-weight: 400; letter-spacing: -0.01em; }
.sk-cap { font-size: 1.25rem; line-height: 1.25; }
.sk-up { text-transform: uppercase; }
.sk-nav { font-size: .8125rem; line-height: 1.2; font-weight: 500; text-transform: uppercase; letter-spacing: -0.01em; }

.sk-link, .sk-act {
  font-size: .8125rem; line-height: 1.2; font-weight: 500; text-transform: uppercase; letter-spacing: -0.01em;
  text-decoration-line: underline; text-decoration-thickness: 1px; text-underline-offset: .3em;
  transition: opacity .15s var(--sk-ease);
}
.sk-link, .sk-act { display: inline-flex; align-items: center; min-height: 44px; }
.sk-act { text-decoration-line: none; }
.sk-act > span > span:first-child { text-decoration-line: underline; text-decoration-thickness: 1px; text-underline-offset: .3em; }
@media (hover: hover) {
  .sk-link:hover, .sk-act:hover { opacity: .55; }
}

.sk-solid {
  display: inline-flex; align-items: center; justify-content: center; height: 44px; padding: 0 1.25rem;
  background: #5A2A1E; color: #F2EFEA;
  font-size: .8125rem; line-height: 1; font-weight: 500; text-transform: uppercase; letter-spacing: -0.01em;
  transition: opacity .15s var(--sk-ease);
}
@media (hover: hover) { .sk-solid:hover { opacity: .86; } }
}

.sk-shop :is(h1, h2, h3, dt) { text-wrap: balance; }

.sk-caption { position: sticky; top: 45vh; padding-block: 0; }
.sk-zoom { transition: transform 1s var(--sk-ease); }
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .group:hover .sk-zoom { transform: scale(1.03); }
}

.sk-row { scrollbar-width: none; overscroll-behavior-x: contain; }
.sk-row::-webkit-scrollbar { display: none; }
html:not(.sk-js) .sk-js-only { display: none; }

@keyframes sk-rowin {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to   { opacity: 1; transform: none; }
}
.sk-row-in {
  animation: sk-rowin var(--d-el) var(--e-out) both;
  animation-delay: calc(var(--i, 0) * var(--d-step));
}
@keyframes sk-pop {
  0%   { transform: scale(1); }
  36%  { transform: scale(1.24); }
  100% { transform: scale(1); }
}
.sk-pop { animation: sk-pop var(--d-el) var(--e-out); }
@keyframes sk-stamp {
  from { opacity: 0; transform: scale(.72); }
  to   { opacity: 1; transform: none; }
}
.sk-stamp { animation: sk-stamp var(--d-el) var(--e-mass) both; }

[data-sk-tone="dark"] *:focus-visible { outline-color: #F2EFEA; }

@media (prefers-reduced-motion: reduce) {
  .sk-zoom, .sk-link, .sk-act, .sk-solid { transition: none; }
  .sk-row-in, .sk-pop, .sk-stamp { animation: none; }
}
`;

/* Runs while the document is parsed, before any section below it paints. */
const JS_FLAG = "document.documentElement.classList.add('sk-js')";

export function SkalsaPage({ locale }: { locale: Locale }) {
  return (
    <DemoShell
      locale={locale}
      slug="skalsa"
      bg="#F2EFEA"
      fg="#5A2A1E"
      className={`sk-shop ${ui.variable} ${serif.variable} font-[family-name:var(--font-skalsa-ui)] antialiased`}
    >
      <style>{CSS}</style>
      <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      <ShopProvider>
        <div>
        <SiteHeader />
        <main>
          <Hero locale={locale} />
          <Intro locale={locale} />
          <BrandBlock locale={locale} />
          <Catalog locale={locale} />
          <Bundles locale={locale} />
          <Studio locale={locale} />
          <Mood locale={locale} />
          <Shipping locale={locale} />
        </main>
        <ShopFooter locale={locale} />
        </div>
        <CartDrawer />
      </ShopProvider>
    </DemoShell>
  );
}
