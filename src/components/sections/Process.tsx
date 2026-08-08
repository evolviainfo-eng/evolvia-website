import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────────
   Kaip dirbame — the four steps as a ledger with one black slab in it.

   Two rewrites got here. First the four numbered circles on a
   self-drawing line went, because that is a timeline graphic everyone
   has seen. What replaced them was honest and quiet and, in the
   owner's verdict, still bland.

   So there is now exactly one event: step 2 — the live sketch, the
   only reason anyone converts — is an ink slab dropped into the middle
   of an otherwise hairline-quiet list. A black band arriving mid-page
   is a real visual moment; four animated widgets would have been
   noise. One thing happens, and it happens to the thing that matters.

   Everything reveals under a travelling edge (`data-sweep`), the same
   left-to-right gesture the seam makes in the dark section, so the
   cascade reads as one hand rather than four effects.

   Server-rendered: the reveal is CSS, there is no client JS here, and
   nothing is hidden if it never runs.
   ───────────────────────────────────────────────────────────── */

export function Process() {
  return (
    <Section id="procesas" tone="secondary">
      <Container>
        <Reveal className="max-w-[640px]">
          <Eyebrow>Kaip dirbame</Eyebrow>
          <h2 className="t-h2 mt-4">Procesas be staigmenų.</h2>
          <p className="t-body mt-5 max-w-[52ch]">
            Keturi aiškūs žingsniai nuo pirmo laiško iki paleidimo. Realią
            svetainę pamatote dar prieš mokėdami.
          </p>
        </Reveal>

        <ol className="mt-[clamp(44px,6vw,80px)] flex flex-col">
          {processSteps.map((step, i) => {
            const lead = !!step.lead;
            const no = String(i + 1).padStart(2, "0");

            if (lead) {
              return (
                <li
                  key={step.title}
                  data-sweep
                  style={{ "--i": i * 2 } as React.CSSProperties}
                  className="my-[clamp(10px,1.6vw,20px)] min-w-0 rounded-card bg-ink-bg text-ink-fg"
                >
                  <div className="grid min-w-0 gap-x-[clamp(24px,5vw,72px)] gap-y-4 px-[clamp(20px,3.4vw,48px)] py-[clamp(30px,4.4vw,54px)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                    <div className="flex min-w-0 items-baseline gap-4">
                      <span className="shrink-0 text-[0.8125rem] tabular-nums tracking-[0.1em] text-ink-fg/55">
                        {no}
                      </span>
                      <h3 className="min-w-0 text-[clamp(1.5rem,3.1vw,2.5rem)] leading-[1.1]">
                        {step.title}
                      </h3>
                    </div>
                    <div className="min-w-0">
                      <p className="max-w-[46ch] text-pretty text-[1.0625rem] leading-relaxed text-ink-fg/80 sm:text-[1.25rem]">
                        {step.body}
                      </p>
                      <span className="mt-5 inline-block rounded-pill border border-ink-fg/30 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-fg">
                        Be rizikos
                      </span>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={step.title} className="min-w-0">
                {/* the rule belongs to the row below it, and draws first */}
                <span
                  data-wipe
                  style={{ "--i": i * 2 } as React.CSSProperties}
                  aria-hidden="true"
                  className="block h-px w-full bg-border"
                />
                {/* the sweep wrapper stays unclipped so the observer can see
                    it; its single child is what the edge travels across */}
                <div
                  data-sweep
                  style={{ "--i": i * 2 + 1 } as React.CSSProperties}
                  className="min-w-0"
                >
                  <div
                    className={cn(
                      "grid min-w-0 gap-x-[clamp(24px,5vw,72px)] gap-y-3",
                      "py-[clamp(22px,3.2vw,38px)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
                    )}
                  >
                    <div className="flex min-w-0 items-baseline gap-4">
                      <span className="shrink-0 text-[0.8125rem] tabular-nums tracking-[0.1em] text-text-muted">
                        {no}
                      </span>
                      <h3 className="min-w-0 text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.2] text-text">
                        {step.title}
                      </h3>
                    </div>
                    <p className="t-body min-w-0 max-w-[46ch] text-pretty text-[0.9375rem]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
          {/* closes the ledger */}
          <li aria-hidden="true">
            <span
              data-wipe
              style={{ "--i": processSteps.length * 2 } as React.CSSProperties}
              className="block h-px w-full bg-border"
            />
          </li>
        </ol>
      </Container>
    </Section>
  );
}
