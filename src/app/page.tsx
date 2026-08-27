import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { TrustStatement } from "@/components/sections/TrustStatement";
import { Work } from "@/components/sections/Work";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceJsonLd } from "@/content/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Nav />
      <main id="main">
        <Hero />
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
