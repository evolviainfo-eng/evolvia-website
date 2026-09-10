import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SiteFrame, FrameHint } from "@/components/ui/SiteFrame";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { minerda as c, minerdaShots } from "@/content/cases";

/* /darbai/minerda — the full case.
 *
 * Written to be checkable rather than impressive. Every fact on this page has
 * a source: the launch date is the certificate on minerda.lt, the term is the
 * gap between the first email and that launch, the delivered items are the
 * pages the live site actually serves, and the screenshots are captures of
 * that site rather than mockups of it.
 *
 * There are no visitor numbers, no percentages and no conversion figures,
 * because nobody measured any. Inventing one would be the only thing on this
 * page a reader could catch us on.
 */

export const metadata = pageMetadata({
  title: "Minerda: svetainė įlenkimų šalinimo studijai Kaune",
  description:
    "Kaip Kauno kėbulo studija Minerda gavo svetainę nuo nulio: keturi straipsniai, DUK puslapis, struktūriniai duomenys, užklausų forma ir paleidimas kliento serveryje su galiojančiu SSL.",
  path: `/darbai/${c.slug}`,
});

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Pradžia", item: site.url },
    { "@type": "ListItem", position: 2, name: "Darbai", item: `${site.url}/darbai` },
    {
      "@type": "ListItem",
      position: 3,
      name: c.name,
      item: `${site.url}/darbai/${c.slug}`,
    },
  ],
};

/* Four facts, and deliberately no fifth. A launch date and a delivery time
   were here and came out: a term reads as a promise about the next project
   rather than a fact about this one. */
const facts = [
  { label: "Klientas", value: `${c.name}, ${c.legalName}` },
  { label: "Veikla", value: c.sector },
  { label: "Miestas", value: c.city },
  { label: "Adresas", value: c.domain },
];

export default function MinerdaPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <Nav />
      <main id="main">
        {/* ── Antraštė ─────────────────────────────────────────── */}
        <div className="bg-bg text-text">
          <Container>
            <Reveal className="pt-[clamp(128px,16vh,168px)]">
              <nav aria-label="Naršymo kelias">
                <a
                  href="/darbai"
                  className="t-eyebrow transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                >
                  Darbai
                </a>
              </nav>
              <h1 className="t-display mt-4 max-w-[20ch] text-balance">
                Minerda: svetainė įlenkimų šalinimo studijai Kaune.
              </h1>
              <p className="t-body mt-6 max-w-[60ch] text-pretty">
                {c.summary}
              </p>
            </Reveal>
          </Container>
        </div>

        {/* ── Gyva svetainė ────────────────────────────────────── */}
        <Section tone="light" className="pt-[clamp(40px,6vw,72px)]">
          <Container>
            <Reveal>
              <SiteFrame
                src={minerdaShots.home}
                alt="Minerda svetainės pagrindinis puslapis"
                url={c.domain}
                href={c.url}
                ratioClass="aspect-[16/10]"
                eager
                sizes="(min-width: 1120px) 1072px, 100vw"
                overlay={<FrameHint>Atidaryti minerda.lt</FrameHint>}
              />
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-[clamp(40px,6vw,72px)] grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col gap-1 border-t border-border py-4"
                  >
                    <dt className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-text-muted">
                      {f.label}
                    </dt>
                    <dd className="text-[0.9375rem] leading-snug text-text">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </Section>

        {/* ── Situacija ────────────────────────────────────────── */}
        <Section tone="secondary">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <h2 className="t-h3">Situacija</h2>
              </Reveal>
              <Reveal delay={0.07} className="lg:col-span-8">
                <p className="t-body max-w-[60ch] text-pretty text-[1.0625rem] text-text">
                  {c.situation}
                </p>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ── Ką padarėme ──────────────────────────────────────── */}
        <Section tone="light">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <h2 className="t-h3">Ką padarėme</h2>
                <p className="t-body mt-4 max-w-[34ch] text-[0.9375rem]">
                  Viskas, kas sudaro veikiančią svetainę, o ne tik pirmą ekraną.
                </p>
              </Reveal>

              <Reveal delay={0.07} className="lg:col-span-8">
                <ol className="flex flex-col">
                  {c.work.map((w) => (
                    <li
                      key={w.title}
                      className="row-hover border-t border-border py-5 last:border-b"
                    >
                      <div>
                        <h3 className="text-[1.0625rem] font-medium tracking-[-0.01em]">
                          {w.title}
                        </h3>
                        <p className="mt-1.5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-text-muted">
                          {w.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ── Straipsniai ir DUK ───────────────────────────────── */}
        <Section tone="secondary">
          <Container>
            <Reveal className="max-w-[640px]">
              <h2 className="t-h3">Straipsniai ir DUK</h2>
              <p className="t-body mt-4 max-w-[56ch] text-pretty text-[1.0625rem]">
                Keturi straipsniai ir DUK puslapis atsako į klausimus, kuriuos
                žmonės užduoda dar prieš skambindami. Kiekvienas jų yra atskiras
                puslapis su savo adresu, tad gali būti randamas atskirai.
              </p>
            </Reveal>

            <div className="mt-[clamp(40px,6vw,72px)] grid gap-10 md:grid-cols-2 md:gap-8">
              <Reveal>
                <figure>
                  <SiteFrame
                    src={minerdaShots.article}
                    alt="Minerda straipsnis apie meninį lyginimą"
                    url={`${c.domain}/straipsniai/meninis-lyginimas/`}
                    href={`${c.url}/straipsniai/meninis-lyginimas/`}
                    ratioClass="aspect-[16/10]"
                    sizes="(min-width: 768px) 520px, 100vw"
                    overlay={<FrameHint>Atidaryti</FrameHint>}
                  />
                  <figcaption className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted">
                    Vienas iš keturių straipsnių. Kiti trys: kėbulo poliravimas,
                    nanodanga, žibintų poliravimas.
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.07}>
                <figure>
                  <SiteFrame
                    src={minerdaShots.faq}
                    alt="Minerda DUK puslapis"
                    url={`${c.domain}/duk/`}
                    href={`${c.url}/duk/`}
                    ratioClass="aspect-[16/10]"
                    sizes="(min-width: 768px) 520px, 100vw"
                    overlay={<FrameHint>Atidaryti</FrameHint>}
                  />
                  <figcaption className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted">
                    DUK puslapis su struktūriniais duomenimis, kad klausimai
                    būtų suprantami ir paieškos sistemoms.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ── Rezultatas ───────────────────────────────────────── */}
        <Section tone="light">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <h2 className="t-h3">Rezultatas</h2>
              </Reveal>
              <Reveal delay={0.07} className="lg:col-span-8">
                <p className="t-body max-w-[56ch] text-pretty text-[1.0625rem] text-text">
                  {c.result}
                </p>

                {/*  Kliento atsiliepimas stos čia, kai klientas jį duos.
                     Sąmoningai nerenderinamas nieko: tuščias rėmelis su
                     pažadu būtų blogiau nei jo nebuvimas.  */}

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener"
                    className="press inline-flex h-12 w-fit items-center gap-2.5 rounded-pill bg-accent px-6 text-[0.9375rem] font-medium text-accent-text transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0"
                  >
                    Atidaryti {c.domain}
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path d="M4.5 2H10v5.5" />
                      <path d="M10 2 2.5 9.5" />
                    </svg>
                  </a>
                  <a
                    href="/darbai"
                    className="inline-flex h-12 items-center rounded-pill border border-border px-6 text-[0.9375rem] font-medium text-text transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-text"
                  >
                    Visi darbai
                  </a>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
