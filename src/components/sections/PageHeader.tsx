import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { ReactNode } from "react";

/** Subpage hero: eyebrow + oversized h1 + lead. Sits under the fixed nav,
 *  ends with a small padding so the first section's own rhythm sets the gap. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="bg-bg text-text">
      <Container>
        <Reveal className="pt-[clamp(128px,16vh,168px)] pb-[clamp(16px,2.5vw,32px)]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="t-display mt-4 max-w-[18ch] text-balance">{title}</h1>
          {lead && (
            <p className="t-body mt-6 max-w-[56ch] text-pretty">{lead}</p>
          )}
          {children}
        </Reveal>
      </Container>
    </div>
  );
}
