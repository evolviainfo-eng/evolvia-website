import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Darbai — svetainių pavyzdžiai",
  description:
    "Svetainių dizaino pavyzdžiai: statybos bendrovė, restoranas, interjero studija ir el. parduotuvė. Demonstracinės svetainės, kad iškart matytumėte, kokios kokybės tikėtis.",
  path: "/darbai",
});

export default function DarbaiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Darbai", "/darbai")} />
      <Nav />
      <main>
        <PageHeader
          eyebrow="Darbai"
          title="Pavyzdžiai, kurie parduoda."
          lead="Kol kuriame pirmuosius klientų projektus, štai demonstracinės svetainės — sąžiningai pažymėtos kaip demo ir koncepcijos, kad iškart matytumėte, kokios kokybės tikėtis."
        />
        <WorkShowcase />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
