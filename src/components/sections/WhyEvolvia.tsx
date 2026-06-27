import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { compareColumns, compareRows, compareKicker } from "@/content/compare";
import { cn } from "@/lib/cn";

const LAST = compareRows.length - 1;

/* Marker: em-dash for the lesser options, bullet for Evolvia. */
function Marker({ good }: { good?: boolean }) {
  return (
    <span
      className={cn(
        "mr-2 inline-block w-3 shrink-0",
        good ? "text-text" : "text-text-muted",
      )}
      aria-hidden="true"
    >
      {good ? "•" : "—"}
    </span>
  );
}

function DesktopTable() {
  return (
    <div className="hidden md:grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      {/* header */}
      <div className="border-b border-border" />
      <div className="border-b border-border px-5 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
        {compareColumns[0]}
      </div>
      <div className="border-b border-border px-5 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-text-muted">
        {compareColumns[1]}
      </div>
      <div className="rounded-t-[16px] bg-accent px-5 py-4 text-center text-[0.95rem] font-semibold text-accent-text">
        {compareColumns[2]}
      </div>

      {/* rows */}
      {compareRows.map((row, ri) => {
        const isLast = ri === LAST;
        return (
          <div key={row.criterion} className="contents">
            <div
              className={cn(
                "flex items-center px-5 py-5 text-[0.95rem] font-medium text-text",
                !isLast && "border-b border-border",
              )}
            >
              {row.criterion}
            </div>
            <div
              className={cn(
                "flex items-center px-5 py-5 text-[0.95rem] text-text-muted",
                !isLast && "border-b border-border",
              )}
            >
              <Marker />
              {row.values[0]}
            </div>
            <div
              className={cn(
                "flex items-center px-5 py-5 text-[0.95rem] text-text-muted",
                !isLast && "border-b border-border",
              )}
            >
              <Marker />
              {row.values[1]}
            </div>
            <div
              className={cn(
                "flex items-center border-x-2 border-accent bg-surface px-5 py-5 text-[0.95rem] font-medium text-text",
                isLast && "rounded-b-[16px] border-b-2",
              )}
            >
              <Marker good />
              {row.values[2]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileCard({ index }: { index: number }) {
  const featured = index === 2;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border bg-surface",
        featured
          ? "border-2 border-accent shadow-[var(--shadow-frame)]"
          : "border-border",
      )}
    >
      <div
        className={cn(
          "px-5 py-3 text-[0.95rem] font-semibold",
          featured
            ? "bg-accent text-accent-text"
            : "border-b border-border text-text-muted",
        )}
      >
        {compareColumns[index]}
      </div>
      <dl className="px-5 py-2">
        {compareRows.map((row, ri) => (
          <div
            key={row.criterion}
            className={cn(
              "flex items-baseline justify-between gap-4 py-3",
              ri !== LAST && "border-b border-border",
            )}
          >
            <dt className="text-[0.85rem] text-text-muted">{row.criterion}</dt>
            <dd
              className={cn(
                "text-right text-[0.9rem]",
                featured ? "font-medium text-text" : "text-text-muted",
              )}
            >
              {row.values[index]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function WhyEvolvia() {
  return (
    <Section id="kodel-evolvia" tone="light">
      <Container>
        <Reveal className="max-w-[640px]">
          <Eyebrow>Kodėl Evolvia</Eyebrow>
          <h2 className="t-h2 mt-4">Pigiau atrodo pigiau.</h2>
          <p className="t-body mt-5 max-w-[54ch]">
            Šablonas ar atsitiktinis programuotojas kainuoja mažiau — kol pamatai
            rezultatą. Štai skirtumas.
          </p>
        </Reveal>

        <Reveal className="mt-[clamp(40px,6vw,72px)]">
          <DesktopTable />

          {/* mobile: stacked, Evolvia first */}
          <div className="flex flex-col gap-5 md:hidden">
            <MobileCard index={2} />
            <MobileCard index={0} />
            <MobileCard index={1} />
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <p className="mx-auto max-w-[40ch] text-center text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] text-text">
            {compareKicker}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="#kontaktai" variant="primary" size="lg">
              Gauti nemokamą eskizą
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
