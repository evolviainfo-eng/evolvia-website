import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { pricingTiers, pricingNote } from "@/content/pricing";

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="4 10.5 8.5 15 16 5.5" />
    </svg>
  );
}

export function Pricing() {
  const main = pricingTiers.find((t) => t.featured) ?? pricingTiers[0];
  const step = pricingTiers.find((t) => !t.featured) ?? pricingTiers[1];

  return (
    <Section id="kainos" tone="secondary">
      <Container>
        <Reveal className="mx-auto max-w-[640px] text-center">
          <Eyebrow>Kainos</Eyebrow>
          <h2 className="t-h2 mt-4">Viena kaina. Jokių staigmenų.</h2>
        </Reveal>

        {/* main offer — €300, editorial split */}
        <Reveal className="mx-auto mt-[clamp(40px,6vw,72px)] max-w-[820px]">
          <div className="rounded-[26px] border border-border bg-surface p-8 shadow-[var(--shadow-frame)] sm:p-12">
            <div className="grid gap-9 sm:grid-cols-[1.25fr_1fr] sm:items-center sm:gap-12">
              {/* offer */}
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="t-h3">{main.name}</h3>
                  {main.badge && (
                    <span className="rounded-full bg-accent px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-accent-text">
                      {main.badge}
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-light leading-none tracking-[-0.04em] text-text [font-size:clamp(3.5rem,8vw,5.5rem)]">
                    {main.oneTime}
                  </span>
                  <div className="text-[0.9rem] leading-tight text-text-muted">
                    <div>vienkartinis</div>
                    <div>+ {main.monthly}</div>
                  </div>
                </div>

                <p className="t-body mt-6 max-w-[38ch]">{main.summary}</p>

                <Button
                  href={main.cta.href}
                  variant="primary"
                  size="lg"
                  className="mt-8 w-full sm:w-auto"
                >
                  {main.cta.label}
                </Button>
              </div>

              {/* includes */}
              <div className="border-t border-border pt-8 sm:border-l sm:border-t-0 sm:pl-12 sm:pt-0">
                <Eyebrow>Kas įeina</Eyebrow>
                <ul className="mt-5 flex flex-col gap-4">
                  {main.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.98rem] text-text">
                      <Check className="h-5 w-5 shrink-0 text-text" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* step-up — €600, fuller secondary card */}
        <Reveal className="mx-auto mt-6 max-w-[820px]">
          <div className="rounded-[22px] border border-border bg-surface p-8 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-[1.25fr_1fr] sm:items-center sm:gap-12">
              <div>
                <h3 className="t-h3">{step.name}</h3>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-light leading-none tracking-[-0.035em] text-text [font-size:clamp(2.4rem,5vw,3.4rem)]">
                    {step.oneTime}
                  </span>
                  <div className="text-[0.88rem] leading-tight text-text-muted">
                    <div>vienkartinis</div>
                    <div>+ {step.monthly}</div>
                  </div>
                </div>
                <p className="t-body mt-5 max-w-[40ch]">{step.summary}</p>
                <Button
                  href={step.cta.href}
                  variant="secondary"
                  size="lg"
                  className="mt-7 w-full sm:w-auto"
                >
                  {step.cta.label}
                </Button>
              </div>

              <div className="border-t border-border pt-7 sm:border-l sm:border-t-0 sm:pl-12 sm:pt-0">
                <Eyebrow>Kas įeina</Eyebrow>
                <ul className="mt-5 flex flex-col gap-4">
                  {step.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.98rem] text-text">
                      <Check className="h-5 w-5 shrink-0 text-text" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="t-body mx-auto mt-9 max-w-[58ch] text-center text-[0.95rem]">
            {pricingNote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
