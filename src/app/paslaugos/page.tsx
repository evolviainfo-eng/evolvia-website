import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Svetainių kūrimo paslaugos",
  description:
    "Svetainių kūrimas Lietuvos verslui: individualus dizainas, programavimas, tekstai, optimizacija Google paieškai, paleidimas ir priežiūra. Viena fiksuota kaina, vienas atsakingas žmogus.",
  path: "/paslaugos",
});

export default function PaslaugosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Paslaugos", "/paslaugos")} />
      <Nav />
      <main id="main">
        <PageHeader
          eyebrow="Paslaugos"
          title="Svetainių kūrimas nuo pradžios iki paleidimo."
          lead="Evolvia yra svetainių kūrimo studija Kaune, dirbanti su visos Lietuvos verslu. Nuo pirmo eskizo iki veikiančios svetainės: dizainas, programavimas, tekstai, paleidimas ir priežiūra vienose rankose."
        />
        <ServiceDetail />
        <Process />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
