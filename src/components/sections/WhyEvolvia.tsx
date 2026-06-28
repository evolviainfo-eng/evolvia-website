import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { compareColumns, compareRows, compareKicker } from "@/content/compare";
import { cn } from "@/lib/cn";

const LAST = compareRows.length - 1;

const cell =
  "px-4 py-5 align-middle text-[0.9rem] break-words sm:px-5 sm:text-[0.92rem]";
const loser = "text-text-muted";

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
          {/* DESKTOP: real 4-column table (fits, no scroll) */}
          <table className="hidden w-full table-fixed border-collapse text-left lg:table">
            <colgroup>
              <col className="w-[24%]" />
              <col className="w-[27%]" />
              <col className="w-[24.5%]" />
              <col className="w-[24.5%]" />
            </colgroup>
            <thead>
              <tr>
                <th />
                <th className="rounded-t-[14px] bg-surface-2 px-5 py-5 text-center align-middle">
                  <span className="inline-block rounded-full bg-accent px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-accent-text">
                    {compareColumns[2]}
                  </span>
                </th>
                <th className={cn(cell, "border-b border-border text-[0.72rem] font-medium uppercase tracking-[0.08em]", loser)}>
                  {compareColumns[0]}
                </th>
                <th className={cn(cell, "border-b border-border text-[0.72rem] font-medium uppercase tracking-[0.08em]", loser)}>
                  {compareColumns[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, ri) => {
                const isLast = ri === LAST;
                return (
                  <tr key={row.criterion}>
                    <th scope="row" className={cn("py-5 pr-4 text-left align-middle text-[0.92rem] font-medium text-text", !isLast && "border-b border-border")}>
                      {row.criterion}
                    </th>
                    <td className={cn(cell, "bg-surface-2 font-medium text-text", isLast ? "rounded-b-[14px]" : "border-b border-border")}>
                      <span className="mr-1.5 text-text-muted">•</span>
                      {row.values[2]}
                    </td>
                    <td className={cn(cell, loser, !isLast && "border-b border-border")}>
                      <span className="mr-1.5 text-text-muted/60">—</span>
                      {row.values[0]}
                    </td>
                    <td className={cn(cell, loser, !isLast && "border-b border-border")}>
                      <span className="mr-1.5 text-text-muted/60">—</span>
                      {row.values[1]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* MOBILE: grouped by criterion — no horizontal scroll, text always fits */}
          <div className="border-t border-border lg:hidden">
            {compareRows.map((row) => (
              <div key={row.criterion} className="border-b border-border py-5">
                <p className="mb-3 text-[0.95rem] font-medium text-text">
                  {row.criterion}
                </p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-start gap-3 rounded-lg bg-surface-2 px-3 py-2.5">
                    <span className="w-[5.25rem] shrink-0 pt-0.5 text-[0.68rem] font-semibold uppercase leading-snug tracking-[0.04em] text-text">
                      {compareColumns[2]}
                    </span>
                    <span className="text-[0.92rem] font-medium leading-snug text-text">
                      {row.values[2]}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 px-3 py-1">
                    <span className="w-[5.25rem] shrink-0 pt-0.5 text-[0.68rem] uppercase leading-snug tracking-[0.04em] text-text-muted">
                      {compareColumns[0]}
                    </span>
                    <span className="text-[0.9rem] leading-snug text-text-muted">
                      {row.values[0]}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 px-3 py-1">
                    <span className="w-[5.25rem] shrink-0 pt-0.5 text-[0.68rem] uppercase leading-snug tracking-[0.04em] text-text-muted">
                      {compareColumns[1]}
                    </span>
                    <span className="text-[0.9rem] leading-snug text-text-muted">
                      {row.values[1]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <p className="mx-auto max-w-[40ch] text-center text-[1.3rem] font-normal leading-snug tracking-[-0.02em] text-text">
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
