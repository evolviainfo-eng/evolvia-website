import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import { KonstruktaNav } from "@/components/demo/konstrukta/Nav";
import { Hero } from "@/components/demo/konstrukta/Hero";
import { Company } from "@/components/demo/konstrukta/Company";
import { Services } from "@/components/demo/konstrukta/Services";
import { Projects } from "@/components/demo/konstrukta/Projects";
import { Phases } from "@/components/demo/konstrukta/Phases";
import { Estimator } from "@/components/demo/konstrukta/Estimator";
import { Craft } from "@/components/demo/konstrukta/Craft";
import { Contact } from "@/components/demo/konstrukta/Contact";
import { KonstruktaFooter } from "@/components/demo/konstrukta/Footer";

/* latin-ext is not optional: ą č ę ė į š ų ū ž are dropped from the `latin`
   subset alone, and half this page is Lithuanian data labels. */
const display = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-konstrukta-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-konstrukta-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Konstrukta — statybos bendrovė Kaune",
  description:
    "Demonstracinė svetainė: generalinės rangos bendrovė su veikiančia sąmatos skaičiuokle. Įmonė išgalvota, svetainė tikra.",
};

/* Demo-scoped CSS. Three jobs only: bind the two typefaces to short class
   names, give focus a visible ring in the demo's own palette (the site token
   would resolve to black in light mode and vanish on this dark page), and
   declare color-scheme:dark — the surrounding site sits on `color-scheme:
   light` unless the visitor stored a dark preference, and a light UA scheme
   makes Chrome paint autofilled name/tel fields pale blue and the native
   select arrow light against this near-black palette. */
const KONSTRUKTA_CSS = `
.knst{color-scheme:dark;font-family:var(--font-konstrukta-display),system-ui,-apple-system,sans-serif}
.knst-mono{font-family:var(--font-konstrukta-mono),ui-monospace,SFMono-Regular,monospace;font-variant-numeric:tabular-nums}
.knst *:focus-visible{outline:2px solid #E7E5E1;outline-offset:2px;border-radius:0}
.knst .knst-opt:focus-within{outline:2px solid #E7E5E1;outline-offset:2px}
.knst ::selection{background:#E7E5E1;color:#121316}
`;

export default function Page() {
  return (
    <DemoShell
      slug="konstrukta"
      bg="#121316"
      fg="#E7E5E1"
      className={`knst ${display.variable} ${mono.variable}`}
    >
      <style>{KONSTRUKTA_CSS}</style>
      <KonstruktaNav />
      <main>
        <Hero />
        <Company />
        <Services />
        <Projects />
        <Phases />
        <Estimator />
        <Craft />
        <Contact />
      </main>
      <KonstruktaFooter />
    </DemoShell>
  );
}
