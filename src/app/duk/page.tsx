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
  title: "DUK — dažni klausimai",
  description:
    "Atsakymai apie svetainių kūrimą: kiek kainuoja svetainė, kaip greitai ji paruošiama, kas ją prižiūri ir ar būsite matomi Google. Viskas aiškiai ir be smulkaus šrifto.",
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
          lead="Viskas, ką klientai dažniausiai klausia prieš pradėdami — kainos, terminai, priežiūra ir matomumas Google."
        />
        <Faq standalone contactHref="/kontaktai" />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
