import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { Pricing } from "@/components/sections/Pricing";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { faqItems } from "@/content/faq";

export const metadata = pageMetadata({
  title: "Svetainės kaina — nuo €150",
  description:
    "Kiek kainuoja svetainė? €150 + €50/mėn su priežiūra arba €400 vienkartinai be mėnesinio mokesčio. El. parduotuvė — €600. Aiškios kainos, jokių paslėptų mokesčių.",
  path: "/kainos",
});

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Svetainių kūrimas",
  serviceType: "Web design",
  provider: { "@type": "ProfessionalService", name: "Evolvia" },
  areaServed: "Lietuva",
  offers: [
    {
      "@type": "Offer",
      name: "Svetainė su priežiūra",
      price: "150",
      priceCurrency: "EUR",
      description:
        "€150 vienkartinis + €50/mėn: hostingas, atnaujinimai, palaikymas ir smulkūs pakeitimai.",
    },
    {
      "@type": "Offer",
      name: "Svetainė — vienkartinis mokėjimas",
      price: "400",
      priceCurrency: "EUR",
      description: "€400 vienkartinai, be mėnesinio mokesčio.",
    },
    {
      "@type": "Offer",
      name: "El. parduotuvė / didesnė svetainė",
      price: "600",
      priceCurrency: "EUR",
      description: "€600 vienkartinis + €100/mėn.",
    },
  ],
};

/** The three price-related questions, inlined as crawlable text. */
const priceFaq = [faqItems[0], faqItems[1], faqItems[5]];

function PricingFaq() {
  return (
    <Section tone="light">
      <Container>
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <h2 className="t-h2 max-w-[14ch]">Klausimai apie kainą.</h2>
            <p className="t-body mt-5 max-w-[34ch]">
              Daugiau atsakymų —{" "}
              <a
                href="/duk"
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                DUK puslapyje
              </a>
              .
            </p>
          </Reveal>
          <div>
            {priceFaq.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className="border-t border-border py-7">
                  <h3 className="text-[1.15rem] font-medium tracking-[-0.01em] text-text">
                    {item.q}
                  </h3>
                  <p className="t-body mt-3 max-w-[58ch]">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function KainosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Kainos", "/kainos")} />
      <JsonLd data={serviceJsonLd} />
      <Nav />
      <main>
        <PageHeader
          eyebrow="Kainos"
          title="Aiški kaina. Jokių staigmenų."
          lead="Pirmiausia pamatote svetainę gyvai — mokate tik tada, kai ji jums patinka. Pasirenkate mokėjimo būdą: mažesnė pradžia su priežiūra arba viena suma iš karto."
        />
        <Pricing contactHref="/kontaktai" standalone />
        <PricingFaq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
