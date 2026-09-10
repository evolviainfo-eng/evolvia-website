import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SiteFrame, FrameHint } from "@/components/ui/SiteFrame";
import { minerda as c, minerdaShots } from "@/content/cases";

/* Darbai, on the homepage.
 *
 * ONE case, given the whole band. A single card sitting in a four-up grid
 * would read as a portfolio with three holes in it; a single case running the
 * full measure reads as the piece of work the section was built for.
 *
 * It has to outrank the examples below it while being QUIETER than them, so
 * the ranking is done entirely by scale and position: one frame at the full
 * measure, above the examples, on its own ground. Everything that would have
 * shouted is gone. There is no fact grid, no phone hanging off the corner and
 * no pair of competing buttons, because each of those is a device the examples
 * already use, and repeating them louder would make the two sections look like
 * the same kind of thing.
 *
 * The one signal that says "this one is real" is the quietest thing here: the
 * address in the browser chrome reads minerda.lt, where a demo reads
 * evolvia.lt/demo/…. A visitor reads a URL bar without being told to.
 *
 * The colour in this band is entirely inside the screenshot. Minerda's own
 * site is near-black and gold, which on this ground is the single strongest
 * object on the screen, and it does the work a decoration would otherwise be
 * invented to do.
 */

export function CaseStudy() {
  return (
    <Section id="darbai" tone="secondary">
      <Container>
        <Reveal className="max-w-[660px]">
          <Eyebrow>Darbai</Eyebrow>
          <h2 className="t-h2 mt-4 text-balance">
            Minerda. Svetainė įlenkimų šalinimo studijai Kaune.
          </h2>
          <p className="t-body mt-6 max-w-[56ch] text-pretty">{c.summary}</p>
        </Reveal>

        <Reveal delay={0.14} className="mt-[clamp(40px,6vw,72px)]">
          <SiteFrame
            src={minerdaShots.home}
            alt="Minerda svetainės pagrindinis puslapis"
            url={c.domain}
            href={c.url}
            ratioClass="aspect-[16/10]"
            sizes="(min-width: 1120px) 1072px, 100vw"
            overlay={<FrameHint>Atidaryti minerda.lt</FrameHint>}
          />
        </Reveal>

        {/* One hairline, one line of metadata, one way onward. */}
        <Reveal delay={0.21}>
          <div className="mt-7 flex flex-col gap-5 border-t border-border pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <p className="min-w-0 text-[0.9375rem] leading-relaxed text-text-muted">
              <span className="font-medium text-text">{c.name}</span>{" "}
              <span aria-hidden="true">·</span> {c.sector}{" "}
              <span aria-hidden="true">·</span> {c.city}
            </p>

            <a
              href={`/darbai/${c.slug}`}
              className="group inline-flex shrink-0 items-center gap-2 text-[0.9375rem] font-medium text-text"
            >
              <span className="relative">
                Žiūrėti visą projektą
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-text transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-x-0"
                />
              </span>
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-x-[3px]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path d="M2.5 6h7" />
                <path d="M6.5 2.5 10 6l-3.5 3.5" />
              </svg>
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
