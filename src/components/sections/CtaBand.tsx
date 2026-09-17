import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";

/** The single dark beat on every subpage — a closing conversion band on the
 *  constant ink surface (never flips with the theme). */
export function CtaBand({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).ctaBand;
  return (
    <section className="bg-ink-bg py-[clamp(72px,10vw,128px)] text-ink-fg">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ink-fg/50">
                {t.eyebrow}
              </p>
              <h2 className="mt-4 max-w-[16ch] text-balance font-normal leading-[1.08] [font-size:clamp(2.1rem,4.4vw,3.4rem)]">
                {t.title}
              </h2>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
              <a
                href={localizePath("/kontaktai", locale)}
                className="press inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-pill bg-ink-fg px-8 text-base font-medium leading-none text-ink-bg transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0"
              >
                {t.button}
              </a>
              <p className="text-[0.9375rem] text-ink-fg/60">
                {t.note}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
