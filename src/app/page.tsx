import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { BuildSequence } from "@/components/sections/BuildSequence";
import { Process } from "@/components/sections/Process";
import { TrustStatement } from "@/components/sections/TrustStatement";
import { Work } from "@/components/sections/Work";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <BuildSequence />
        <Process />
        <TrustStatement />
        <Work />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
