import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** /paslaugos — the four services as a numbered editorial list (not cards).
 *  Headings are claims, bodies are specific; every fact matches the offer. */
const items = [
  {
    no: "01",
    title: "Dizainas, kuris atrodo brangiai",
    body: "Kuriame nuo balto lapo, be jokių šablonų. Spalvos, šriftai ir struktūra parenkami pagal jūsų sritį ir jūsų klientus, todėl svetainė atrodo taip, lyg būtų kainavusi kelis kartus daugiau.",
  },
  {
    no: "02",
    title: "Greita ir matoma Google",
    body: "Švarus kodas, greitas krovimasis ir optimizacija paieškai nuo pirmos dienos. Svetainė puikiai veikia telefone, kur naršo dauguma jūsų klientų.",
  },
  {
    no: "03",
    title: "Paleidimas be jūsų rūpesčių",
    body: "Domenas, paleidimas ir perkėlimas: visus techninius darbus padarome už jus. Jums nereikia nieko diegti, konfigūruoti ar prižiūrėti paleidimo dieną.",
  },
  {
    no: "04",
    title: "Priežiūra, kad svetainė nesentų",
    body: "Hostingas, SSL, atnaujinimai ir smulkūs pakeitimai įskaičiuoti pirmus metus, vėliau kainuoja €50 per metus. Svetainė lieka gyva ir tvarkinga, o jums pakanka parašyti laišką, ką pakeisti.",
  },
] as const;

const fits = [
  "Verslui, kuris neturi svetainės arba turi pasenusią.",
  "Paslaugų įmonėms, kurių klientai pirmiausia ieško Google ir naršo telefonu.",
  "Tiems, kam reikia aiškios fiksuotos kainos ir vieno atsakingo žmogaus.",
  "Įmonėms, kurios nori atrodyti rimčiau nei konkurentai toje pačioje srityje.",
] as const;

export function ServiceDetail() {
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
            <h2 className="t-h3">Kam tinka</h2>
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
              Aiški kaina: €400 vienkartinai.{" "}
              <a
                href="/kainos"
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                Žiūrėti kainas
              </a>{" "}
              arba{" "}
              <a
                href="/darbai"
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                pavyzdžius
              </a>
              .
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
