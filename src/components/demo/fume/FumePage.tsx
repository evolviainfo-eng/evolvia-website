import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import type { Locale } from "@/i18n/config";
import { ContactFooter } from "@/components/demo/fume/ContactFooter";
import { getFumeCopy } from "@/components/demo/fume/copy";
import { Fire } from "@/components/demo/fume/Fire";
import { Hero } from "@/components/demo/fume/Hero";
import { Intro } from "@/components/demo/fume/Intro";
import { MenuSection } from "@/components/demo/fume/MenuSection";
import { Motion } from "@/components/demo/fume/Motion";
import { Nav } from "@/components/demo/fume/Nav";
import { Reservation } from "@/components/demo/fume/Reservation";
import { Space } from "@/components/demo/fume/Space";
import { Wine } from "@/components/demo/fume/Wine";

/* latin-ext is mandatory: without it Cormorant drops ė, ų, ū, š, ž, and
   their capitals (Ė Ų Ū Š Ž), which the spaced-caps headings are full of. */
const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-fume-display",
  display: "swap",
});

const ui = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fume-ui",
  display: "swap",
});

/** Page metadata in the demo's language. */
export function fumeMetadata(locale: Locale): Metadata {
  const { meta } = getFumeCopy(locale);
  return { title: meta.title, description: meta.description };
}

/* The demo runs in its own colour world, so it overrides what the surrounding
   (theme-switchable) site provides, the focus ring among them. These rules
   ship in a plain <style>, i.e. unlayered, so they outrank every Tailwind
   utility no matter the specificity.

   `--sec` is the page's vertical rhythm between sections, `--gap` the one
   distance from a heading block to its content. The type scale is written
   out in Type.tsx.
   `--osmo` is the one ease of the page, cubic-bezier(.625,.05,0,1): a slow
   start and a long soft landing (Studenterkilden's global ease).

   Reveal gate: the direct children of a `data-group` are held back only
   under html[data-choreo], which the root boot script sets before paint and
   never under reduced motion. Motion.tsx marks each group `.fx-on` as it
   takes it over; a group it never reaches is released by the animation below
   after 3s, so nothing can be stranded invisible.

   `.fc` is the menu panel ("Šio vakaro kortelė", CardPanel.tsx). It is a
   dialog, closed by default; its whole open and close choreography is CSS
   transitions keyed on data-phase, with per-line delays (--d) written into
   the server HTML. Under reduced motion the transitions are removed and the
   panel simply appears. Without JS the <noscript> rules in MenuSection set it
   inline in the page as an ordinary printed card. */
const scopeCss = `
.fume{--sec:clamp(88px,9.5vw,144px);--gap:clamp(48px,5.5vw,80px);--osmo:cubic-bezier(.625,.05,0,1)}
.fume :focus-visible{outline:2px solid #EFE7DC;outline-offset:3px;border-radius:1px}
.fume [tabindex="-1"]:focus-visible{outline:1px solid rgba(239,231,220,.45);outline-offset:5px}

html[data-choreo] .fume [data-group]:not(.fx-on)>*{opacity:0;animation:fume-release 0s linear 3s forwards}
@keyframes fume-release{to{opacity:1}}
.fume .fx-line-mask{padding-bottom:.12em;margin-bottom:-.12em}

@layer components{
.fume-word{font-family:var(--font-fume-display);font-weight:300;text-transform:uppercase;letter-spacing:.3em;padding-left:.3em;line-height:1.15;color:#EFE7DC}
.fume-h2{font-family:var(--font-fume-display);font-weight:400;font-size:clamp(1.75rem,3.2vw,3rem);line-height:1.18;letter-spacing:.12em;text-transform:uppercase;color:#EFE7DC;text-wrap:balance}
.fume-label{font-family:var(--font-fume-display);font-weight:600;font-size:.875rem;line-height:1.5;letter-spacing:.24em;text-transform:uppercase;color:#D6CABA;font-variant-numeric:lining-nums}

.fume-btn{display:inline-flex;align-items:center;justify-content:center;gap:14px;height:52px;padding:0 26px;border:1px solid rgba(239,231,220,.42);font-family:var(--font-fume-display);font-weight:600;font-size:.875rem;letter-spacing:.2em;text-transform:uppercase;color:#EFE7DC;white-space:nowrap;font-variant-numeric:lining-nums;transition:background-color .4s var(--osmo),border-color .4s var(--osmo),color .4s var(--osmo)}
.fume-btn>span{padding-left:.2em}
.fume-btn--cu{background:#B8794A;border-color:#B8794A;color:#1B1714}
.fume-btn--sm{height:44px;padding:0 18px}
.fume-arrow{transition:transform .5s var(--osmo)}
@media (hover:hover){
  .fume-btn:hover{border-color:#EFE7DC;background-color:rgba(239,231,220,.06)}
  .fume-btn--cu:hover{background-color:#C4875A;border-color:#C4875A}
  .fume-btn:hover .fume-arrow{transform:translateX(5px)}
  .fume-link:hover{color:#EFE7DC}
}
.fume-btn:active{background-color:rgba(239,231,220,.12)}
.fume-btn--cu:active{background-color:#A86C40;border-color:#A86C40}

.fume-frame{position:relative;border:1px solid rgba(184,121,74,.5)}
.fume-frame::before{content:"";position:absolute;inset:5px;border:1px solid rgba(184,121,74,.26);pointer-events:none}
.fume-leader{height:3px;align-self:baseline;background-image:radial-gradient(circle,rgba(184,121,74,.75) .9px,transparent 1.1px);background-size:6px 3px;background-repeat:repeat-x;background-position:left bottom}
}

.fume-nav{transform:none;transition:transform .35s var(--osmo),background-color .4s ease,border-color .4s ease}
.fume-nav[data-hidden]{transform:translateY(-110%);transition:transform 1s var(--osmo),background-color .4s ease,border-color .4s ease}
.fume-nav[data-hidden]:focus-within{transform:none}
@layer components{
.fume-navlink{position:relative}
.fume-navlink::after{content:"";position:absolute;left:0;right:.3em;bottom:-6px;height:1px;background:#B8794A;transform:scaleX(0);transition:transform .5s var(--osmo)}
.fume-navlink:hover::after,.fume-navlink[aria-current]::after{transform:none}
}

/* The site's globals give every main>section content-visibility:auto, which
   contains layout: a fixed panel inside #meniu would then be positioned
   against that section, thousands of pixels down the page, and never seen.
   The menu section opts out so the card opens over the viewport. */
.fume #meniu{content-visibility:visible;contain-intrinsic-size:none}
.fc{position:fixed;left:0;right:0;bottom:0;top:var(--demo-bar-h);z-index:150}
.fc[data-phase=closed]{visibility:hidden}
.fc-scrim{position:absolute;inset:0;background:rgba(14,11,9,.66);opacity:0;transition:opacity .3s ease}
.fc[data-phase=open] .fc-scrim{opacity:1;transition-duration:.4s}
.fc-panel{position:absolute;top:0;right:0;bottom:0;width:min(100%,max(560px,46vw));overflow-y:auto;overscroll-behavior:contain;background:#231E1A;clip-path:inset(0 0 0 100%);transition:clip-path .5s cubic-bezier(.55,.055,.675,.19)}
.fc[data-phase=open] .fc-panel{clip-path:inset(0 0 0 0);transition:clip-path .575s cubic-bezier(.215,.61,.355,1)}
.fc-m{display:block;overflow:clip;padding-bottom:.14em;margin-bottom:-.14em}
.fc-m.fc-m--room{padding:10px;margin:-10px}
.fc-l{display:block;transform:translateY(110%)}
.fc[data-phase=open] .fc-l{transform:none;transition:transform .75s cubic-bezier(.215,.61,.355,1) var(--d,0s)}
.fc[data-phase=closing] .fc-l{transform:none}
.fc-r{display:block;height:1px;background:rgba(184,121,74,.5);transform:scaleX(0);transform-origin:50% 50%}
.fc[data-phase=open] .fc-r{transform:none;transition:transform .6s cubic-bezier(.215,.61,.355,1) var(--d,0s)}
.fc[data-phase=closing] .fc-r{transform:none}

.fume-arrive>*{animation:fume-arrive .8s var(--osmo) both;animation-delay:calc(var(--n,0) * 100ms)}
@keyframes fume-arrive{from{opacity:0;transform:translate3d(0,14px,0)}to{opacity:1;transform:none}}

@media (prefers-reduced-motion:reduce){
  .fume-arrive>*{animation:none}
  .fume-btn,.fume-arrow,.fume-nav,.fume-nav[data-hidden],.fume-navlink::after{transition:none}
  .fc,.fc *{transition:none!important}
}
`;

export function FumePage({ locale }: { locale: Locale }) {
  return (
    <DemoShell
      locale={locale}
      slug="fume"
      bg="#1B1714"
      fg="#EFE7DC"
      className={`fume ${display.variable} ${ui.variable} font-[family-name:var(--font-fume-ui)] antialiased`}
    >
      <style>{scopeCss}</style>
      {/* Nav, the menu panel and Reservation are client components and read
          the language from DemoShell's LocaleProvider. */}
      <Nav />
      <main>
        <Hero locale={locale} />
        <Intro locale={locale} />
        <Fire locale={locale} />
        <MenuSection locale={locale} />
        <Wine locale={locale} />
        <Space locale={locale} />
        <Reservation />
        <ContactFooter locale={locale} />
      </main>
      <Motion />
    </DemoShell>
  );
}
