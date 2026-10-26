import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "@/components/demo/konstrukta/copy";
import { KonstruktaNav } from "@/components/demo/konstrukta/Nav";
import { Hero } from "@/components/demo/konstrukta/Hero";
import { Flank } from "@/components/demo/konstrukta/Flank";
import { Company } from "@/components/demo/konstrukta/Company";
import { Services } from "@/components/demo/konstrukta/Services";
import { Projects } from "@/components/demo/konstrukta/Projects";
import { Phases } from "@/components/demo/konstrukta/Phases";
import { Estimator } from "@/components/demo/konstrukta/Estimator";
import { Craft } from "@/components/demo/konstrukta/Craft";
import { Contact } from "@/components/demo/konstrukta/Contact";
import { KonstruktaFooter } from "@/components/demo/konstrukta/Footer";
import { KonstruktaMotion } from "@/components/demo/konstrukta/Motion";

/** The one typeface: Inter Tight, the free neo-grotesk closest to the
 *  reference's Suisse Int'l. Variable, so 400 for text and 500 for display
 *  come from one file. latin-ext is not optional: ą č ę ė į š ų ū ž live
 *  there, and the English page still carries Lithuanian place names. */
const sans = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-konstrukta-sans",
  display: "swap",
});

/** Page metadata in the demo's language. */
export function konstruktaMetadata(locale: Locale): Metadata {
  const { meta } = getKonstruktaCopy(locale);
  return { title: meta.title, description: meta.description };
}

/* Demo-scoped CSS.

   - Tokens: white ground, blueprint blue, ink, one muted ink, the hairline
     and the menu-bar grey. Nothing else.
   - --k-g is the side gutter (20 / 32 / 44px); the hero photo's clip and
     the wordmark fit read it too.
   - The wordmark's size is an estimate in CSS (so the server HTML is right
     to within a few per cent) and fitted exactly to the gutters by
     Motion.tsx once the font has loaded.
   - Hidden states exist only under html[data-choreo], which the boot script
     sets before first paint and never under reduced motion. A CSS timer
     shows any line-reveal text after 2.6 s even if Motion never runs.
   - The word-flank section only becomes tall (and its stage sticky) under
     html[data-choreo]: without JS or with reduced motion it is one screen
     with the photograph already at full size.
   - Every animated property is transform, opacity or clip-path.
   - The site's global content-visibility:auto is switched off for this
     page's sections: its 1200px placeholders made ScrollTrigger measure a
     page ~700px taller than the real one, so the pin and the line reveals
     fired at the wrong scroll positions (or never, near the end). */
const KONSTRUKTA_CSS = `
.knst{--k-g:20px;color-scheme:light;font-family:var(--font-konstrukta-sans),system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:400;-webkit-font-smoothing:antialiased}
@media (min-width:640px){.knst{--k-g:32px}}
@media (min-width:1024px){.knst{--k-g:44px}}
.knst .k-num{font-variant-numeric:tabular-nums}
.knst *:focus-visible{outline:2px solid #0C388D;outline-offset:3px;border-radius:2px}
.knst .knst-opt:focus-within{outline:2px solid #0C388D;outline-offset:2px}
.knst ::selection{background:#0C388D;color:#FFFFFF}
.knst main>section{content-visibility:visible;contain-intrinsic-size:none}

.k-wordmark{display:block;width:max-content;white-space:nowrap;color:#0C388D;font-weight:500;line-height:.8;letter-spacing:-.045em;font-size:calc((min(100vw,1760px) - 2 * var(--k-g)) / 4.6);margin-left:-.05em}

html[data-choreo] .knst [data-k-lines]:not(.k-ready){opacity:0;animation:k-failsafe 0s linear 2.6s forwards}
@keyframes k-failsafe{to{opacity:1}}
html[data-choreo] .knst [data-k-expand]{clip-path:inset(0 var(--k-g))}

.k-flank-stage{position:relative;min-height:calc(100svh - var(--demo-bar-h))}
html[data-choreo] .knst .k-flank{height:180svh}
html[data-choreo] .knst .k-flank-stage{position:sticky;top:var(--demo-bar-h);height:calc(100svh - var(--demo-bar-h))}
@media (min-width:768px){html[data-choreo] .knst .k-flank{height:220svh}}

.k-btn{display:inline-flex;align-items:center;justify-content:center;gap:.75rem;min-height:48px;padding:0 1.5rem;border-radius:4px;background:#0C388D;color:#FFFFFF;font-size:.9375rem;font-weight:500;line-height:1.2;text-align:center;transition:transform var(--d-tap) var(--e-out)}
.k-btn .k-arrow{display:inline-block;transition:transform .45s cubic-bezier(.4,0,.6,1)}
.k-btn:active{transform:scale(.98)}
.k-link{position:relative;display:inline-flex;align-items:baseline;gap:.4rem;padding-bottom:3px;color:#111111;line-height:1.3}
.k-link::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:currentColor;transform-origin:0 50%}
@keyframes k-redraw{0%{transform:scaleX(1);transform-origin:100% 50%}45%{transform:scaleX(0);transform-origin:100% 50%}46%{transform:scaleX(0);transform-origin:0 50%}100%{transform:scaleX(1);transform-origin:0 50%}}
@media (hover:hover){
.k-btn:hover .k-arrow{transform:translateX(4px)}
.k-link:hover::after{animation:k-redraw .8s cubic-bezier(.4,0,.6,1)}
.k-proj:hover .k-proj-zoom{transform:scale(1.03)}
.k-proj:hover .k-proj-veil{opacity:1}
}
.k-proj-zoom{transition:transform .6s cubic-bezier(.4,0,.6,1)}
.k-proj-veil{opacity:0;transition:opacity .3s cubic-bezier(.4,0,.6,1)}

@media (prefers-reduced-motion:reduce){
.k-btn,.k-btn .k-arrow,.k-proj-zoom,.k-proj-veil{transition:none}
.k-link:hover::after{animation:none}
}
`;

export function KonstruktaPage({ locale }: { locale: Locale }) {
  return (
    <DemoShell
      locale={locale}
      slug="konstrukta"
      bg="#FFFFFF"
      fg="#111111"
      className={`knst ${sans.variable}`}
    >
      <style>{KONSTRUKTA_CSS}</style>
      {/* Client component: reads the language from DemoShell's
          LocaleProvider. */}
      <KonstruktaNav />
      <main>
        <Hero locale={locale} />
        <Flank locale={locale} />
        <Company locale={locale} />
        <Services locale={locale} />
        <Projects locale={locale} />
        <Phases locale={locale} />
        <Estimator />
        <Craft locale={locale} />
        <Contact locale={locale} />
      </main>
      <KonstruktaFooter locale={locale} />
      <KonstruktaMotion />
    </DemoShell>
  );
}
