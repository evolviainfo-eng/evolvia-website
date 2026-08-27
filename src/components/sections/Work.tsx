import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DemoSite } from "@/components/ui/DemoSite";
import { DemoNote } from "@/components/ui/DemoNote";
import { DemoMeta } from "@/components/ui/DemoMeta";
import { demos } from "@/content/demos";

/* Darbai, floating.
 *
 * Four sites, and no grid holding them in place. Two columns run at
 * different heights, the frames are different widths, and each one travels
 * at its own rate as the page scrolls (`data-drift`, driven by Scrollfx),
 * so the group behaves like objects at different depths rather than like a
 * table of thumbnails. Nothing is pinned and nothing is sequenced: the
 * visitor scrolls at their own speed and the composition keeps re-forming
 * around them.
 *
 * On a phone the columns collapse into one and the drift stays, which is
 * enough: a phone screen only ever holds one frame at a time, so depth
 * between neighbours has nothing to describe.
 */

/** width inside its column, vertical offset, and how fast it travels */
const CAST = [
  { width: "lg:w-full", drift: "34px" },
  { width: "lg:w-[86%] lg:ml-auto", drift: "-16px" },
  { width: "lg:w-[92%]", drift: "58px" },
  { width: "lg:w-full", drift: "6px" },
] as const;

export function Work() {
  const left = demos.filter((_, i) => i % 2 === 0);
  const right = demos.filter((_, i) => i % 2 === 1);

  const column = (list: typeof demos, offset: number) => (
    <div className="flex flex-col gap-[clamp(56px,9vw,120px)]">
      {list.map((demo, i) => {
        const cast = CAST[(i * 2 + offset) % CAST.length];
        return (
          <figure
            key={demo.slug}
            data-rise
            data-drift
            style={{ "--i": i, "--drift": cast.drift } as CSSProperties}
            className={`min-w-0 ${cast.width}`}
          >
            <DemoSite
              demo={demo}
              ratioClass={offset === 0 ? "aspect-[16/11]" : "aspect-[4/3]"}
              eager={offset === 0 && i === 0}
            />
            <DemoMeta demo={demo} />
          </figure>
        );
      })}
    </div>
  );

  return (
    <Section id="darbai" tone="light">
      <Container>
        <Reveal className="max-w-[680px]">
          <Eyebrow>Darbai</Eyebrow>
          <h2 className="t-h2 mt-4">Pavyzdžiai, kuriuos galite išbandyti.</h2>
        </Reveal>

        <div className="mt-6 max-w-[680px]">
          {/* the sentence that keeps this honest never waits on an observer */}
          <DemoNote />
        </div>

        <div className="work-cast mt-[clamp(48px,7vw,96px)] grid gap-[clamp(56px,9vw,120px)] lg:grid-cols-2 lg:items-start lg:gap-x-[clamp(32px,4vw,72px)]">
          {column(left, 0)}
          {/* the right column starts lower, which is what makes the pair read
              as floating rather than as two rows */}
          <div className="lg:mt-[clamp(64px,11vw,180px)]">
            {column(right, 1)}
          </div>
        </div>

        <Reveal className="mt-[clamp(56px,8vw,112px)] flex justify-center">
          <Button href="/darbai" variant="secondary" size="lg">
            Visi pavyzdžiai
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
