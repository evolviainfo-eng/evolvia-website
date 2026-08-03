import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import { ContactFooter } from "@/components/demo/fume/ContactFooter";
import { Fire } from "@/components/demo/fume/Fire";
import { Hero } from "@/components/demo/fume/Hero";
import { Intro } from "@/components/demo/fume/Intro";
import { MenuSection } from "@/components/demo/fume/MenuSection";
import { Nav } from "@/components/demo/fume/Nav";
import { Reservation } from "@/components/demo/fume/Reservation";
import { Space } from "@/components/demo/fume/Space";
import { Wine } from "@/components/demo/fume/Wine";

/* latin-ext is mandatory: without it Cormorant drops ė, ų, ū, š, ž. */
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

export const metadata: Metadata = {
  title: "Fumé — restoranas ir vyno baras, Užupis (demo)",
  description:
    "Demonstracinė svetainė: mažas atviros ugnies restoranas ir vyno baras Vilniaus Užupyje. Sezoninis meniu, vyno kortelė ir veikianti stalo rezervacija.",
};

/* The demo runs in its own colour world, so it overrides two things the
   surrounding (theme-switchable) site provides: the focus ring, which uses a
   token that would be near-black here, and the reveal travel, kept short —
   an evening should not lurch.
   These rules ship in a plain <style>, i.e. unlayered, so they outrank every
   Tailwind utility no matter the specificity — a `focus:outline-none` class
   cannot switch them off. Hence the second rule: the two `tabindex="-1"`
   landing spots we move focus to programmatically (after a submit error, after
   "Rinktis iš naujo") get a quieter mark instead of a control's full ring
   drawn around the whole panel.

   `--sec` and `--gap` are the page's whole vertical rhythm: every section is
   --sec top and bottom, and the one place where a section continues the
   thought of the one above it rather than starting a new one — Fire opens on
   a photograph, not a heading — closes to --gap and marks the join with a
   drawn rule. No section is allowed a padding of its own invention.

   `.fume-leader` is the printed-menu dot leader: round dots at a 7px pitch,
   drawn as a background so they never wrap or get selected. The element is a
   3px block with no baseline of its own, so flexbox synthesises one from its
   bottom edge — which puts the dots exactly on the type's baseline. */
const scopeCss = `
.fume{--sec:clamp(68px,8vw,112px);--gap:clamp(44px,5.5vw,76px)}
.fume :focus-visible{outline:2px solid #EDE6DA;outline-offset:3px;border-radius:2px}
.fume [tabindex="-1"]:focus-visible{outline:1px solid rgba(237,230,218,0.45);outline-offset:5px}
.fume [data-rise]{--rise-y:16px}

.fume-leader{height:3px;background-image:radial-gradient(circle,rgba(237,230,218,0.32) 1.1px,transparent 1.2px);background-size:7px 3px;background-repeat:repeat-x;background-position:left bottom}

.fume-shot img{transform:scale(1);transition:transform var(--d-el) var(--e-out)}
@media (hover:hover){
  .fume-shot:hover img{transform:scale(1.035)}
  .fume-row{transition:background-color var(--d-ui) var(--e-out)}
  .fume-row:hover{background-color:rgba(237,230,218,0.035)}
}
@media (prefers-reduced-motion:reduce){.fume-shot:hover img{transform:none}}

.fume-navlink{position:relative}
.fume-navlink::after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left center;transition:transform var(--d-ui) var(--e-out)}
.fume-navlink:hover::after,.fume-navlink[aria-current]::after{transform:none}

@keyframes fume-arrive{from{opacity:0;transform:translate3d(0,12px,0)}to{opacity:1;transform:none}}
.fume-arrive>*{animation:fume-arrive var(--d-el) var(--e-out) both;animation-delay:calc(var(--n,0) * var(--d-step))}
@media (prefers-reduced-motion:reduce){.fume-arrive>*{animation:none}}
`;

export default function Page() {
  return (
    <DemoShell
      slug="fume"
      bg="#0C0B0A"
      fg="#EDE6DA"
      className={`fume ${display.variable} ${ui.variable} font-[family-name:var(--font-fume-ui)] antialiased`}
    >
      <style>{scopeCss}</style>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Fire />
        <MenuSection />
        <Wine />
        <Space />
        <Reservation />
      </main>
      <ContactFooter />
    </DemoShell>
  );
}
