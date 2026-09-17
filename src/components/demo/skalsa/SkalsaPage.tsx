import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import type { Locale } from "@/i18n/config";
import { ShopProvider } from "@/components/demo/skalsa/ShopProvider";
import { SiteHeader } from "@/components/demo/skalsa/SiteHeader";
import { CartDrawer } from "@/components/demo/skalsa/CartDrawer";
import { Hero } from "@/components/demo/skalsa/Hero";
import { Catalog } from "@/components/demo/skalsa/Catalog";
import { Bundles } from "@/components/demo/skalsa/Bundles";
import { Studio } from "@/components/demo/skalsa/Studio";
import { Mood } from "@/components/demo/skalsa/Mood";
import { Shipping } from "@/components/demo/skalsa/Shipping";
import { ShopFooter } from "@/components/demo/skalsa/ShopFooter";
import { getSkalsaCopy } from "@/components/demo/skalsa/copy";

/* latin-ext būtinas: ą č ę ė į š ų ū ž. Abu šriftai turi visus rašmenis. */
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-skalsa-display",
  display: "swap",
});

const ui = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-skalsa-ui",
  display: "swap",
});

/** Page metadata in the demo's language. */
export function skalsaMetadata(locale: Locale): Metadata {
  const { title, description } = getSkalsaCopy(locale).meta;
  return { title, description };
}

/** Viskas, ko negalima pasakyti `class` atributu: ciklinė šiluma tamsiojoje
 *  juostoje, krepšelio eilučių pasirodymas ir keli fokuso patikslinimai.
 *  Trukmės ir kreivės — tik iš bendrų kintamųjų, jokių žalių ms reikšmių.
 *
 *  Komentarai stovi čia, o ne CSS eilutėje: viskas, kas yra eilutėje,
 *  keliauja į naršyklę ir angliškame puslapyje būtų lietuviškai.
 *
 *  - sk-breathe: vienintelė ciklinė animacija visame puslapyje — žvakės
 *    šiluma tamsiojoje juostoje. Slenkant ją dar valdo ScrollTrigger
 *    (žr. Mood.tsx).
 *  - sk-row: krepšelio eilutės sugula viena po kitos, kai stalčius
 *    atsidaro.
 *  - sk-pop: skaičius krūpteli, kai kiekis pasikeičia.
 *  - sk-stamp: patvirtinimo antspaudas.
 *  - .sk-dark: tamsiojoje juostoje fokuso žiedas privalo būti šviesus. */
const CSS = `
.sk-shop { --sk-line: rgba(36,30,25,0.13); --sk-line-2: rgba(36,30,25,0.34); }

@keyframes sk-breathe {
  0%, 100% { opacity: .82; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.045); }
}
.sk-breathe { animation: sk-breathe 9s ease-in-out infinite; }

@keyframes sk-row {
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to   { opacity: 1; transform: none; }
}
.sk-row {
  animation: sk-row var(--d-el) var(--e-out) both;
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

.sk-dark *:focus-visible { outline-color: #FAF6F0; }

@media (prefers-reduced-motion: reduce) {
  .sk-breathe { animation: none; }
}
`;

export function SkalsaPage({ locale }: { locale: Locale }) {
  return (
    <DemoShell
      locale={locale}
      slug="skalsa"
      bg="#FAF6F0"
      fg="#241E19"
      className={`sk-shop ${display.variable} ${ui.variable} font-[family-name:var(--font-skalsa-ui)] antialiased`}
    >
      <style>{CSS}</style>
      <ShopProvider>
        <SiteHeader />
        <main>
          <Hero locale={locale} />
          <Catalog locale={locale} />
          <Bundles locale={locale} />
          <Studio locale={locale} />
          <Mood />
          <Shipping locale={locale} />
        </main>
        <ShopFooter locale={locale} />
        <CartDrawer />
      </ShopProvider>
    </DemoShell>
  );
}
