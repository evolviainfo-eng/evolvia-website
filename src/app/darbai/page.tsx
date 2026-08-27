import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { DemoNote } from "@/components/ui/DemoNote";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sukurtų svetainių pavyzdžiai",
  description:
    "Keturios svetainės, kurias galite atidaryti ir išbandyti: statybos bendrovė su sąmatos skaičiuokle, restoranas su rezervacija, interjero studija ir el. parduotuvė su veikiančiu krepšeliu.",
  path: "/darbai",
});

export default function DarbaiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Darbai", "/darbai")} />
      <Nav />
      <main id="main">
        <PageHeader
          eyebrow="Darbai"
          title="Keturios svetainės, kurias galite išbandyti."
          lead="Keturi pavyzdiniai darbai, kiekvienas su realiai veikiančia funkcija, kurią galite išbandyti patys."
        >
          <DemoNote className="mt-8 max-w-[64ch]" />
        </PageHeader>
        <WorkShowcase />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
