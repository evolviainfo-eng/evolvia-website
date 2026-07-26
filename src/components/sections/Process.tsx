import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────────────────────────
   Kaip dirbame — the four steps, set as a ledger.

   This replaced four numbered circles on a connecting line that drew
   itself as you scrolled. That is a timeline graphic anyone has seen a
   hundred times, and the owner's verdict was simply "bland". The
   circle-and-line vocabulary is gone entirely.

   What is here instead is editorial: full-width rows separated by
   hairlines, each row arriving as one gesture — the rule wipes in from
   the left, the title slides up out of its own mask, the body follows a
   step behind. No numerals larger than a caption, no connectors, no
   widgets.

   Step 2 is the whole argument (you see the real site before paying),
   so it gets the room: a larger title, ink-weight body copy and its own
   tag. Everything else stays quiet around it.

   Server-rendered and static — the reveal is the house CSS primitive,
   so there is no client JS here at all and nothing is hidden if it
   never runs.
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

        <ol className="mt-[clamp(44px,6vw,80px)]">
          {processSteps.map((step, i) => {
            const lead = !!step.lead;
            return (
              <li key={step.title} className="min-w-0">
                {/* the rule belongs to the row below it, and draws first */}
                <span
                  data-wipe
                  style={{ "--i": i * 2 } as React.CSSProperties}
                  aria-hidden="true"
                  className="block h-px w-full bg-border"
                />

                <div
                  className={cn(
                    "grid min-w-0 gap-x-[clamp(24px,5vw,72px)] gap-y-3 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
                    lead
                      ? "py-[clamp(30px,4.4vw,54px)]"
                      : "py-[clamp(22px,3.2vw,38px)]",
                  )}
                >
                  <div
                    data-rise
                    style={{ "--i": i * 2 } as React.CSSProperties}
                    className="flex min-w-0 items-baseline gap-4"
                  >
                    <span className="shrink-0 text-[0.78rem] tabular-nums tracking-[0.1em] text-text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* the house masked-line reveal, at row scale */}
                    <span
                      data-line
                      style={{ "--i": i * 2 + 1 } as React.CSSProperties}
                      className="block min-w-0 overflow-hidden pb-[0.14em] -mb-[0.14em]"
                    >
                      <span
                        className={cn(
                          "block tracking-[-0.02em] text-text",
                          lead
                            ? "text-[clamp(1.5rem,2.9vw,2.15rem)] leading-[1.12]"
                            : "text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.2]",
                        )}
                      >
                        {step.title}
                      </span>
                    </span>
                  </div>

                  <div
                    data-rise
                    style={{ "--i": i * 2 + 2 } as React.CSSProperties}
                    className="min-w-0"
                  >
                    <p
                      className={cn(
                        "max-w-[46ch] text-pretty",
                        lead
                          ? "text-[1.0625rem] leading-relaxed text-text sm:text-[1.1875rem]"
                          : "t-body text-[1rem]",
                      )}
                    >
                      {step.body}
                    </p>
                    {lead && (
                      <span className="mt-4 inline-block rounded-pill border border-text/25 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.1em] text-text">
                        Be rizikos
                      </span>
                    )}
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
