import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontaktai — nemokamas eskizas",
  description:
    "Susisiekite su Evolvia — atsakome per dieną. Parašykite apie savo verslą ir gaukite nemokamą svetainės eskizą: realią svetainę, ne paveikslėlį.",
  path: "/kontaktai",
});

export default function KontaktaiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Kontaktai", "/kontaktai")} />
      <Nav />
      <main id="main">
        <PageHeader
          eyebrow="Kontaktai"
          title="Pradėkim."
          lead="Parašykite trumpai apie savo verslą — atsakysime per dieną su pirmais žingsniais ir nemokamu eskizu."
        />
        <FinalCta standalone />
      </main>
      <Footer />
    </>
  );
}
