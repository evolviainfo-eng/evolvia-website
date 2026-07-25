import type { Metadata } from "next";
import { Bricolage_Grotesque, Outfit } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
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

export const metadata: Metadata = {
  title: "Skalsa — rankų darbo žvakių el. parduotuvė",
  description:
    "Demonstracinė el. parduotuvė: rankomis liejamos sojų vaško žvakės, veikiantis krepšelis ir užsakymo eiga. Išgalvota įmonė, tikra svetainė.",
};

export default function Page() {
  return (
    <DemoShell
      slug="skalsa"
      bg="#FAF6F0"
      fg="#241E19"
      className={`${display.variable} ${ui.variable} font-[family-name:var(--font-skalsa-ui)] antialiased`}
    >
      <ShopProvider>
        <SiteHeader />
        <main>
          <Hero />
          <Catalog />
          <Bundles />
          <Studio />
          <Mood />
          <Shipping />
        </main>
        <ShopFooter />
        <CartDrawer />
      </ShopProvider>
    </DemoShell>
  );
}
