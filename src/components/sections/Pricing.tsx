import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { plan, renewal, largerProjects, pricingNote } from "@/content/pricing";

/* Kainos, as a ledger rather than a card.
 *
 * The card version put the figure in a white box with a shadow, which is
 * what every subscription page does, and left the number floating over a
 * hole with the button orphaned at the bottom of it. There is one price
 * here, so it does not need a container to separate it from the plans it
 * is not being compared against: it can simply be set on the page.
 *
 * Everything is hairlines and baselines. The figure is the largest thing
 * in the section, what it includes reads as a list of rows rather than a
 * checklist, and year two is one line under a rule instead of a strip
 * that looks like a footer. */
export function Pricing({
  contactHref = "#kontaktai",
  standalone = false,
}: {
  contactHref?: string;
  /** true on /kainos, where the page header already says all of this once. */
  standalone?: boolean;
}) {
  return (
    <Section id="kainos" tone="secondary">
      <Container>
        {!standalone && (
          <Reveal className="max-w-[680px]">
            <Eyebrow>Kainos</Eyebrow>
            <h2 className="t-h2 mt-4 text-balance">
              Viena svetainė. Viena kaina.
            </h2>
            <p className="t-body mt-5 max-w-[46ch]">
              Sutariame prieš pradedant darbą, ir ji nesikeičia.
            </p>
          </Reveal>
        )}

        <Reveal
          className={
            standalone ? "" : "mt-[clamp(48px,7vw,88px)]"
          }
        >
          <div className="grid gap-x-16 gap-y-12 border-t border-text/15 pt-[clamp(28px,3.5vw,44px)] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="min-w-0">
              <p className="flex items-baseline gap-4">
                <span
                  data-num
                  className="font-light leading-[0.82] text-text tabular-nums [font-size:clamp(5rem,12vw,9.5rem)]"
                >
                  {plan.oneTime}
                </span>
              </p>
              <p className="mt-6 max-w-[26ch] text-[1.0625rem] text-text">
                {plan.priceSuffix}
              </p>
              <p className="t-body mt-4 max-w-[34ch] text-[0.9375rem]">
                {plan.summary}
              </p>
              <div className="mt-9">
                <Button href={contactHref} variant="primary" size="lg">
                  {plan.cta.label}
                </Button>
              </div>
            </div>

            <ul className="min-w-0 lg:pt-3">
              {plan.includes.map((item) => (
                <li
                  key={item}
                  className="row-hover border-b border-border py-[18px] text-[1.0625rem] leading-snug text-text first:border-t first:border-text/15 lg:first:border-t-0 lg:first:pt-0"
                >
                  <span className="block">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* year two, and everything larger: two rows, not two more cards */}
        <Reveal className="mt-[clamp(40px,5vw,64px)]">
          <div className="flex flex-col gap-3 border-t border-text/15 pt-7 sm:flex-row sm:items-baseline sm:gap-10">
            <p className="shrink-0 text-[1.0625rem] font-medium text-text tabular-nums sm:w-[240px]">
              {renewal.label}: {renewal.price}
            </p>
            <p className="t-body max-w-[54ch] text-[0.9375rem]">
              {renewal.body}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-7">
          <div className="flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:items-baseline sm:gap-10">
            <p className="shrink-0 text-[1.0625rem] font-medium text-text sm:w-[240px]">
              {largerProjects.name}
            </p>
            <div className="min-w-0">
              <p className="t-body max-w-[54ch] text-[0.9375rem]">
                {largerProjects.summary}
              </p>
              <a
                href={contactHref}
                className="mt-3 inline-block text-[0.9375rem] font-medium text-text underline decoration-border underline-offset-[6px] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:decoration-text"
              >
                {largerProjects.price}. {largerProjects.cta.label}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="t-body mt-10 max-w-[62ch] text-[0.9375rem]">
            {pricingNote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
