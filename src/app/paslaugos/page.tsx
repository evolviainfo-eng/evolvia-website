import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { BuildSequence } from "@/components/sections/BuildSequence";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Svetainių kūrimas — paslaugos",
  description:
    "Svetainių kūrimo paslaugos Lietuvos verslui: unikalus dizainas, programavimas, optimizacija Google paieškai, paleidimas ir priežiūra. Nuo pirmo eskizo iki veikiančios svetainės — viskas padaroma už jus.",
  path: "/paslaugos",
});

export default function PaslaugosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Paslaugos", "/paslaugos")} />
      <Nav />
      <main>
        <PageHeader
          eyebrow="Paslaugos"
          title="Viena kaina. Visa svetainė."
          lead="Nuo pirmo eskizo iki veikiančios svetainės — dizainas, programavimas, paleidimas ir priežiūra vienose rankose. Jums lieka tik jūsų verslas."
        />
        <ServiceDetail />
        <BuildSequence />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
