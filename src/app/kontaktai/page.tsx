import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { CopyLine } from "@/components/ui/CopyLine";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontaktai ir svetainės užsakymas",
  description:
    "Susisiekite su Evolvia dėl svetainės kūrimo. Parašykite kelis sakinius apie savo verslą ir gaukite nemokamą gyvą eskizą. Atsakome per dieną.",
  path: "/kontaktai",
});

/* The details somebody looks for before transferring €400 to a stranger.
   The registration number, not the personal code sitting beside it on the
   same certificate: one identifies the business, the other identifies a
   person and does not belong on a public page. */
const details = [
  { label: "El. paštas", value: site.email, href: `mailto:${site.email}` },
  { label: "Telefonas", value: site.phone, href: `tel:${site.phoneHref}` },
  { label: "Miestas", value: site.location },
  { label: "Veiklos vykdytojas", value: site.legalName },
  {
    label: "Individuali veikla",
    value: `Nr. ${site.activityNo} · EVRK ${site.nace}`,
  },
];

function Details() {
  return (
    <Section tone="secondary">
      <Container>
        <Reveal className="mx-auto max-w-[720px]">
          <h2 className="t-h3">Rekvizitai</h2>
          <dl className="mt-8">
            {details.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-t border-border py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="w-[190px] shrink-0 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-text-muted">
                  {row.label}
                </dt>
                <dd className="text-[1.0625rem] text-text">
                  {row.href ? (
                    <CopyLine value={row.value} href={row.href} />
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="t-body mt-8 max-w-[58ch] text-[0.9375rem]">
            Dirbame oficialiai pagal individualios veiklos pažymą. Už atliktą
            darbą išrašoma sąskaita faktūra.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function KontaktaiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Kontaktai", "/kontaktai")} />
      <Nav />
      <main id="main">
        <PageHeader
          eyebrow="Kontaktai"
          title="Pradėkim."
          lead="Parašykite trumpai apie savo verslą ir per dieną gausite atsakymą su pirmais žingsniais bei nemokamu eskizu."
        />
        <FinalCta standalone />
        <Details />
      </main>
      <Footer />
    </>
  );
}
