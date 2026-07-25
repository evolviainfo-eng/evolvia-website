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
   drawn around the whole panel. */
const scopeCss = `
.fume :focus-visible{outline:2px solid #EDE6DA;outline-offset:3px;border-radius:2px}
.fume [tabindex="-1"]:focus-visible{outline:1px solid rgba(237,230,218,0.45);outline-offset:5px}
.fume [data-rise]{--rise-y:16px}
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
