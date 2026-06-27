import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGlyph } from "@/components/ui/icons";
import { services } from "@/content/services";

export function Features() {
  return (
    <Section id="paslaugos" tone="secondary">
      <Container>
        <Reveal className="mx-auto max-w-[640px] text-center">
          <Eyebrow>Kas įeina</Eyebrow>
          <h2 className="t-h2 mt-4">Ką gaunate.</h2>
        </Reveal>

        <div className="mt-[clamp(40px,6vw,72px)] grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.14}>
              <article className="group h-full rounded-card border border-border bg-surface p-8 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[4px] hover:border-text/30 hover:shadow-[var(--shadow-frame)] sm:p-9">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg text-text">
                  <ServiceGlyph name={s.icon} className="h-7 w-7" />
                </span>
                <h3 className="t-h3 mt-7">{s.title}</h3>
                <p className="t-body mt-3 max-w-[34ch]">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
