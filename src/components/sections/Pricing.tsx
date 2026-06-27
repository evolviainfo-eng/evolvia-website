import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { pricingTiers, pricingNote, type PricingTier } from "@/content/pricing";
import { cn } from "@/lib/cn";

function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="4 10.5 8.5 15 16 5.5" />
    </svg>
  );
}

function PriceCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[20px] p-8 sm:p-10",
        tier.featured
          ? "border-2 border-accent bg-surface shadow-[var(--shadow-frame)] md:-translate-y-2"
          : "border border-border bg-surface shadow-[var(--shadow-card)]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="t-h3">{tier.name}</h3>
        {tier.badge && (
          <span className="rounded-full bg-accent px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-accent-text">
            {tier.badge}
          </span>
        )}
      </div>

      <div className="mt-7">
        <div className="flex items-baseline gap-2">
          <span className="text-[2.75rem] font-bold leading-none tracking-[-0.03em] text-text">
            {tier.oneTime}
          </span>
          <span className="text-text-muted">vienkartinis</span>
        </div>
        <p className="mt-2 text-text-muted">{tier.monthly}</p>
      </div>

      <p className="t-body mt-5 max-w-[40ch]">{tier.summary}</p>

      <hr className="my-7 border-border" />

      <ul className="flex flex-col gap-3.5">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-center gap-3 text-[0.98rem] text-text">
            <Check className="h-5 w-5 shrink-0 text-text" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2 sm:mt-auto">
        <Button
          href={tier.cta.href}
          variant={tier.featured ? "primary" : "secondary"}
          size="lg"
          className="w-full"
        >
          {tier.cta.label}
        </Button>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <Section id="kainos" tone="secondary">
      <Container>
        <Reveal className="mx-auto max-w-[640px] text-center">
          <Eyebrow>Kainos</Eyebrow>
          <h2 className="t-h2 mt-4">Paprasta ir aišku.</h2>
        </Reveal>

        <div className="mx-auto mt-[clamp(40px,6vw,72px)] grid max-w-[860px] items-stretch gap-6 md:grid-cols-2">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.14} className="h-full">
              <PriceCard tier={tier} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="t-body mx-auto mt-10 max-w-[58ch] text-center text-[0.95rem]">
            {pricingNote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
