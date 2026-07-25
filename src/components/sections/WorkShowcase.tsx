import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { DemoSite } from "@/components/ui/DemoSite";
import { demos } from "@/content/demos";
import { cn } from "@/lib/cn";

/** /darbai — the full demo set as editorial rows: big frame + meta rail,
 *  alternating sides, mobile capture on every frame.
 *
 *  Each row arrives as ONE gesture: the frame rises, the photo settles out of
 *  a 1.06 crop, and the meta rail follows two steps behind. That sequencing
 *  is expressed entirely with `data-rise` / `data-settle` and the `--i`
 *  offset — no timeline code, and it degrades to plain visible content when
 *  JS or motion is off. */
export function WorkShowcase() {
  return (
    <Section tone="light">
      <Container>
        <div className="flex flex-col gap-[clamp(80px,11vw,140px)]">
          {demos.map((demo, i) => {
            const flip = i % 2 === 1;
            return (
              <figure
                key={demo.slug}
                className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10"
              >
                <div
                  data-rise
                  className={cn("min-w-0 lg:col-span-8", flip && "lg:order-2")}
                >
                  <DemoSite
                    demo={demo}
                    ratioClass="aspect-[16/10]"
                    phone
                    eager={i === 0}
                  />
                </div>

                <figcaption
                  data-rise
                  style={{ "--i": 2 } as React.CSSProperties}
                  className={cn(
                    "flex min-w-0 flex-col lg:col-span-4",
                    flip && "lg:order-1",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2 className="text-[1.35rem] font-medium tracking-[-0.015em]">
                      {demo.name}
                    </h2>
                    <span className="rounded-pill border border-border px-2.5 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-text-muted">
                      {demo.label}
                    </span>
                  </div>

                  <p className="mt-2 text-[0.82rem] uppercase tracking-[0.1em] text-text-muted">
                    {demo.sector} · {demo.year}
                  </p>

                  <p className="t-body mt-4 max-w-[44ch] text-[0.98rem]">
                    {demo.tagline}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {demo.scope.map((s) => (
                      <li
                        key={s}
                        className="rounded-pill bg-surface-2 px-3 py-1 text-[0.75rem] text-text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* The point of the whole page: it is not a picture, it
                      opens. Named so the visitor knows what to go and try. */}
                  <a
                    href={demo.href}
                    target="_blank"
                    rel="noopener"
                    className="mt-7 inline-flex h-12 w-fit items-center gap-2.5 rounded-pill bg-accent px-6 text-[0.95rem] font-medium text-accent-text transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0"
                  >
                    Atidaryti demo svetainę
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path d="M4.5 2H10v5.5" />
                      <path d="M10 2 2.5 9.5" />
                    </svg>
                  </a>
                  <p className="mt-3 text-[0.86rem] text-text-muted">
                    {demo.feature} · atsidaro naujame lange
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
