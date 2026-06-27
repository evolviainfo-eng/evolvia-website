import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { DemoSite } from "@/components/ui/DemoSite";
import { demos, type Demo } from "@/content/demos";

function Caption({ demo }: { demo: Demo }) {
  return (
    <figcaption className="mt-5 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">
          {demo.name}
        </h3>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
          {demo.label}
        </span>
      </div>
      <p className="t-body max-w-[46ch] text-[0.95rem]">{demo.tagline}</p>
    </figcaption>
  );
}

export function Work() {
  const [featured, ...rest] = demos;

  return (
    <Section id="darbai" tone="light">
      <Container>
        <Reveal className="max-w-[680px]">
          <Eyebrow>Darbai</Eyebrow>
          <h2 className="t-h2 mt-4">Pavyzdžiai, kurie parduoda.</h2>
          <p className="t-body mt-5 max-w-[54ch]">
            Kol kuriame pirmuosius klientų projektus, štai demonstracinės
            svetainės — kad iškart matytumėte, kokios kokybės tikėtis.
          </p>
        </Reveal>

        {/* featured */}
        <Reveal className="mt-[clamp(40px,6vw,72px)]">
          <figure>
            <DemoSite demo={featured} ratioClass="aspect-[16/9] sm:aspect-[16/7]" />
            <Caption demo={featured} />
          </figure>
        </Reveal>

        {/* two smaller */}
        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {rest.map((demo, i) => (
            <Reveal key={demo.name} delay={i * 0.1}>
              <figure>
                <DemoSite demo={demo} ratioClass="aspect-[16/11]" />
                <Caption demo={demo} />
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
