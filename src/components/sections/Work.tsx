import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DemoSite } from "@/components/ui/DemoSite";
import { DemoNote } from "@/components/ui/DemoNote";
import { DemoMeta } from "@/components/ui/DemoMeta";
import { demos } from "@/content/demos";

/** Homepage work section.
 *
 *  No GSAP here any more. Each row is a `data-rise` gesture — the same
 *  primitive the rest of the site and all four demo sites use. One system,
 *  one pair of curves, and this file went from a client component carrying a
 *  hand-written timeline to plain server-rendered markup. */
export function Work() {
  // the homepage shows three demos; the full set lives on /darbai
  const [featured, ...rest] = demos.slice(0, 3);

  return (
    <Section id="darbai" tone="light">
      <Container>
        <Reveal className="max-w-[680px]">
          <Eyebrow>Darbai</Eyebrow>
          <h2 className="t-h2 mt-4">Pavyzdžiai, kuriuos galite išbandyti.</h2>
        </Reveal>

        <Reveal delay={0.07} className="mt-6 max-w-[680px]">
          <DemoNote />
        </Reveal>

        {/* featured — with the overlapping mobile capture */}
        <figure className="mt-[clamp(40px,6vw,72px)] min-w-0" data-rise>
          <DemoSite
            demo={featured}
            ratioClass="aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7]"
            phone
          />
          <DemoMeta demo={featured} />
        </figure>

        {/* two smaller */}
        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {rest.map((demo, i) => (
            <figure
              key={demo.slug}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
              className="min-w-0"
            >
              <DemoSite demo={demo} ratioClass="aspect-[16/11]" />
              <DemoMeta demo={demo} />
            </figure>
          ))}
        </div>

        {/* the full set (incl. the e-shop concept) lives on its own page */}
        <Reveal className="mt-14 flex justify-center">
          <Button href="/darbai" variant="secondary" size="lg">
            Visi pavyzdžiai
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
