import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** The single dark beat on every subpage — a closing conversion band on the
 *  constant ink surface (never flips with the theme). */
export function CtaBand() {
  return (
    <section className="bg-ink-bg py-[clamp(72px,10vw,128px)] text-ink-fg">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.14em] text-ink-fg/50">
                Nemokamas eskizas
              </p>
              <h2 className="mt-4 max-w-[16ch] text-balance font-normal leading-[1.08] tracking-[-0.03em] [font-size:clamp(2.1rem,4.4vw,3.4rem)]">
                Pamatykite savo svetainę gyvai — dar prieš mokėdami.
              </h2>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
              <a
                href="/kontaktai"
                className="inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-pill bg-ink-fg px-8 text-base font-medium leading-none text-ink-bg transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0"
              >
                Gauti nemokamą eskizą
              </a>
              <p className="text-[0.9rem] text-ink-fg/60">
                Atsakome per dieną. Mokate tik tada, kai patinka.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
