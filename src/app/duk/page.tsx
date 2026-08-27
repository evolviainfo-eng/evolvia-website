import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { faqJsonLd } from "@/content/schema";
import { faqItems } from "@/content/faq";

export const metadata = pageMetadata({
  title: "Svetainių kūrimas: dažni klausimai",
  description:
    "Atsakymai apie svetainių kūrimą: kiek kainuoja svetainė, kas nutinka po pirmų metų, kaip greitai ji paruošiama, kas ją prižiūri ir ar būsite matomi Google.",
  path: "/duk",
});


export default function DukPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("DUK", "/duk")} />
      <JsonLd data={faqJsonLd} />
      <Nav />
      <main id="main">
        <PageHeader
          eyebrow="D.U.K."
          title="Dažni klausimai."
          lead="Viskas, ko klientai dažniausiai klausia prieš pradėdami: kaina, terminai, priežiūra ir matomumas Google."
        />
        <Faq standalone contactHref="/kontaktai" />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
