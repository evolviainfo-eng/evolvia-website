import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n";
import { localizePath, type Locale } from "@/i18n/config";

/** /paslaugos — the four services as a numbered editorial list (not cards).
 *  Headings are claims, bodies are specific; every fact matches the offer. */
export function ServiceDetail({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).pages.services;
  const items = t.items.map((item, i) => ({
    ...item,
    no: String(i + 1).padStart(2, "0"),
  }));
  const fits = t.fits;

  return (
    <Section tone="secondary">
      <Container>
        <ul>
          {items.map((item, i) => (
            <Reveal key={item.no} delay={i * 0.05}>
              <li className="grid gap-3 border-t border-border py-[clamp(32px,5vw,56px)] lg:grid-cols-[110px_1fr_1.35fr] lg:gap-10">
                <span
                  className="select-none font-light leading-none tracking-[-0.04em] text-text-muted/50 tabular-nums [font-size:clamp(2rem,3.6vw,3rem)]"
                  aria-hidden="true"
                >
                  {item.no}
                </span>
                <h2 className="t-h3 max-w-[24ch]">{item.title}</h2>
                <p className="t-body max-w-[58ch]">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal>
          <div className="border-t border-border pt-[clamp(32px,5vw,56px)]">
            <h2 className="t-h3">{t.fitsTitle}</h2>
            <ul className="mt-6 grid gap-3 lg:grid-cols-2 lg:gap-x-16">
              {fits.map((item) => (
                <li key={item} className="t-body max-w-[46ch]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-[clamp(32px,5vw,56px)] border-t border-border pt-8">
            <p className="t-body">
              {t.priceLine}{" "}
              <a
                href={localizePath("/kainos", locale)}
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                {t.priceLink}
              </a>{" "}
              {t.or}{" "}
              <a
                href={localizePath("/darbai", locale)}
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                {t.examplesLink}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
