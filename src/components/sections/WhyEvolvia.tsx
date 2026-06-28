import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { compareColumns, compareRows, compareKicker } from "@/content/compare";
import { cn } from "@/lib/cn";

const LAST = compareRows.length - 1;

const cell =
  "px-2.5 py-4 align-middle text-[0.8rem] sm:px-5 sm:py-5 sm:text-[0.92rem]";
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
          {/* one comparison table that fits the viewport at every size; the
              Evolvia column is highlighted with visible row lines. */}
          <table className="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[27%] sm:w-[28%]" />
              <col className="w-[24.3%] sm:w-[24%]" />
              <col className="w-[24.3%] sm:w-[24%]" />
              <col className="w-[24.4%] sm:w-[24%]" />
            </colgroup>
            <thead>
              <tr>
                <th />
                <th className={cn(cell, "border-b border-border text-[0.66rem] font-medium uppercase tracking-[0.07em] sm:text-[0.76rem] sm:tracking-[0.09em]", loser)}>
                  {compareColumns[0]}
                </th>
                <th className={cn(cell, "border-b border-border text-[0.66rem] font-medium uppercase tracking-[0.07em] sm:text-[0.76rem] sm:tracking-[0.09em]", loser)}>
                  {compareColumns[1]}
                </th>
                <th className="rounded-t-[14px] bg-surface-2 px-2.5 py-4 text-center align-middle sm:px-5 sm:py-5">
                  <span className="inline-block rounded-full bg-accent px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-accent-text">
                    {compareColumns[2]}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, ri) => {
                const isLast = ri === LAST;
                return (
                  <tr key={row.criterion}>
                    <th
                      scope="row"
                      className={cn(
                        "py-4 pr-2.5 text-left text-[0.8rem] font-medium text-text align-middle sm:pr-4 sm:text-[0.92rem]",
                        !isLast && "border-b border-border",
                      )}
                    >
                      {row.criterion}
                    </th>
                    <td className={cn(cell, loser, !isLast && "border-b border-border")}>
                      <span className="mr-1 text-text-muted/60 sm:mr-1.5">—</span>
                      {row.values[0]}
                    </td>
                    <td className={cn(cell, loser, !isLast && "border-b border-border")}>
                      <span className="mr-1 text-text-muted/60 sm:mr-1.5">—</span>
                      {row.values[1]}
                    </td>
                    <td
                      className={cn(
                        cell,
                        "bg-surface-2 font-medium text-text",
                        isLast ? "rounded-b-[14px]" : "border-b border-border",
                      )}
                    >
                      <span className="mr-1 text-text-muted sm:mr-1.5">•</span>
                      {row.values[2]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
