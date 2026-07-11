import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { payOptions, shopTier, pricingNote } from "@/content/pricing";

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

/** Kainos: one website, two EQUAL payment options side by side (identical
 *  visual weight — deliberate), then the e-shop tier as a quieter band below. */
export function Pricing({
  contactHref = "#kontaktai",
  standalone = false,
}: {
  contactHref?: string;
  /** true on /kainos — the PageHeader already carries the "Kainos" eyebrow. */
  standalone?: boolean;
}) {
  return (
    <Section id="kainos" tone="secondary">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          {!standalone && <Eyebrow>Kainos</Eyebrow>}
          <h2 className={`t-h2 text-balance ${standalone ? "" : "mt-4"}`}>
            Viena svetainė. Du mokėjimo būdai.
          </h2>
          <p className="t-body mx-auto mt-5 max-w-[46ch]">
            Svetainė, dizainas ir kokybė — identiški. Pasirenkate tik tai, kaip
            patogiau mokėti.
          </p>
        </Reveal>

        {/* two equal options */}
        <div className="mx-auto mt-[clamp(40px,6vw,72px)] grid max-w-[960px] gap-5 md:grid-cols-2 md:gap-6">
          {payOptions.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-[26px] border border-border bg-surface p-8 shadow-[var(--shadow-frame)] sm:p-10">
                <p className="t-eyebrow">{plan.mode}</p>
                <h3 className="t-h3 mt-2">{plan.name}</h3>

                <div className="mt-6">
                  <span className="font-light leading-none tracking-[-0.04em] text-text tabular-nums [font-size:clamp(3.2rem,6vw,4.6rem)]">
                    {plan.oneTime}
                  </span>
                  <p className="mt-3 text-[0.95rem] text-text-muted">
                    {plan.priceSuffix}
                  </p>
                </div>

                <p className="t-body mt-5 text-[1rem]">{plan.summary}</p>

                <ul className="mt-7 flex flex-col gap-3.5 border-t border-border pt-7">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[0.95rem] text-text"
                    >
                      <Check className="h-5 w-5 shrink-0 text-text" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button
                    href={contactHref}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* e-shop / larger site — quieter band below the two equal options */}
        <Reveal className="mx-auto mt-6 max-w-[960px]">
          <div className="rounded-[22px] border border-border bg-surface p-7 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[46ch]">
                <h3 className="t-h3">{shopTier.name}</h3>
                <p className="t-body mt-2 text-[0.98rem]">{shopTier.summary}</p>
              </div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                <div className="sm:text-right">
                  <span className="font-light leading-none tracking-[-0.035em] text-text tabular-nums [font-size:clamp(2.2rem,4vw,2.9rem)]">
                    {shopTier.oneTime}
                  </span>
                  <p className="mt-1.5 text-[0.88rem] text-text-muted">
                    {shopTier.priceSuffix}
                  </p>
                </div>
                <Button
                  href={contactHref}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {shopTier.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="t-body mx-auto mt-9 max-w-[62ch] text-center text-[0.95rem]">
            {pricingNote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
