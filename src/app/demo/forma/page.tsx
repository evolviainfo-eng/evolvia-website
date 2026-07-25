import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import { FormaNav } from "@/components/demo/forma/Nav";
import { ProjectIndex } from "@/components/demo/forma/ProjectIndex";
import { ContactForm } from "@/components/demo/forma/ContactForm";

/* latin-ext is mandatory: ą č ę ė į š ų ū ž. Both faces were checked at 92px
   for the macron pair ū / Ū, which is where narrow serifs usually break. */
const display = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-forma-display",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-forma-sans",
});

export const metadata: Metadata = {
  title: "Forma — interjero architektūros studija",
  description:
    "Demonstracinė svetainė: interjero architektūros studijos portfolio su filtruojamu projektų indeksu ir pilno ekrano galerija.",
};

const PAPER = "#F4F1EC";
const INK = "#1A1917";

const WRAP = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const SERIF = { fontFamily: "var(--font-forma-display)" } as const;
const EYEBROW = "text-[0.7rem] uppercase tracking-[0.22em] text-[#656059]";
const H2 =
  "min-w-0 text-[clamp(2rem,4.6vw,3.1rem)] font-normal leading-[1.06] tracking-[-0.015em]";
const HAIR = "border-[rgba(26,25,23,0.14)]";

const MANIFEST = [
  {
    t: "Pradedame nuo dienos, ne nuo nuotraukos.",
    b: "Pirmas pokalbis — apie tai, kaip praeina jūsų rytas, kiek žmonių sėda vakarieniauti ir kur vakare padedate raktus. Planas gimsta iš atsakymų, ne iš katalogo.",
  },
  {
    t: "Mažiau medžiagų, tiksliau parinktų.",
    b: "Trys ar keturios visame projekte. Jos turi derėti tarpusavyje dešimt metų, o ne vieną sezoną, todėl renkamės lėtai ir visada gyvai, ne iš ekrano.",
  },
  {
    t: "Brėžinys dar nėra interjeras.",
    b: "Todėl liekame objekte iki galo. Jei kažkas nesueina vietoje — o taip nutinka kiekvienoje statyboje — sprendžiame ten pat, o ne susirašinėdamos.",
  },
];

const SERVICES = [
  {
    t: "Pilnas interjero projektas",
    price: "nuo 45 €/m²",
    b: "Išplanavimas, vizualizacijos, darbo brėžiniai bei medžiagų ir baldų specifikacijos. Meistrai gauna dokumentą, pagal kurį galima dirbti be papildomų klausimų.",
    items: [
      "Du–trys išplanavimo variantai",
      "Baldų projektavimas ir brėžiniai",
      "Medžiagų sąrašas su kainomis ir tiekėjais",
    ],
  },
  {
    t: "Konsultacija",
    price: "180 € / vizitas",
    b: "Dvi valandos jūsų erdvėje arba prie jūsų plano. Tinka, kai reikia ne viso projekto, o kelių teisingų sprendimų prieš pradedant darbus.",
    items: [
      "Išplanavimo klaidų peržiūra",
      "Spalvų ir medžiagų kryptis",
      "Santrauka raštu per tris dienas",
    ],
  },
  {
    t: "Autorinė priežiūra",
    price: "nuo 12 €/m²",
    b: "Lankomės objekte, deriname su rangovais, tikriname mazgus ir tikrus matmenis. Kad nupieštas projektas ir pastatytas interjeras sutaptų.",
    items: [
      "Vizitai kas dvi savaites",
      "Brėžinių tikslinimas pagal faktą",
      "Bendravimas su rangovais ir tiekėjais",
    ],
  },
];

const PROCESS = [
  {
    t: "Susitikimas erdvėje",
    b: "Matuojame, fotografuojame ir daug klausiame. Per savaitę gaunate pasiūlymą su konkrečia kaina ir terminais.",
    when: "1 savaitė",
  },
  {
    t: "Išplanavimas",
    b: "Du–trys variantai popieriuje. Renkamės kartu, kol vienas tampa akivaizdus — tik tada judame toliau.",
    when: "2–3 savaitės",
  },
  {
    t: "Projektas ir medžiagos",
    b: "Vizualizacijos, darbo brėžiniai, specifikacijos. Į salonus einame kartu ir viską paliečiame rankomis.",
    when: "4–6 savaitės",
  },
  {
    t: "Autorinė priežiūra",
    b: "Objekte lankomės kas dvi savaites ir tada, kai reikia. Iki paskutinės rankenos ir paskutinio jungiklio.",
    when: "Statybų metu",
  },
];

const MOOD = [
  {
    src: "/demo/forma/mood-1.webp",
    w: 1200,
    h: 801,
    alt: "Svetainė prieblandoje, minkšta šviesa",
    cell: "col-span-12 md:col-span-7",
    ratio: "aspect-[3/2]",
    push: "",
  },
  {
    src: "/demo/forma/mood-3.webp",
    w: 1200,
    h: 800,
    alt: "Medinių laiptų detalė",
    cell: "col-span-8 col-start-5 md:col-span-4 md:col-start-9",
    ratio: "aspect-[3/4]",
    push: "md:mt-[clamp(24px,5vw,72px)]",
  },
  {
    src: "/demo/forma/mood-4.webp",
    w: 1200,
    h: 828,
    alt: "Trys mediniai langai ir šilta popietės šviesa",
    cell: "col-span-9 md:col-span-4 md:col-start-2",
    ratio: "aspect-[4/5] md:aspect-[4/5]",
    push: "",
  },
  {
    src: "/demo/forma/mood-2.webp",
    w: 1200,
    h: 800,
    alt: "Mansardos miegamasis vakare",
    cell: "col-span-11 col-start-2 md:col-span-5 md:col-start-7",
    ratio: "aspect-[3/2]",
    push: "md:mt-[clamp(32px,7vw,110px)]",
  },
];

const CONTACTS = [
  { k: "El. paštas", v: "labas@forma.demo" },
  { k: "Telefonas", v: "+370 600 00000" },
  { k: "Studija", v: "Vilnius, Naujamiestis" },
  { k: "Darbo laikas", v: "I–V 9:00–18:00" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* Demo-scoped CSS. The site's focus ring and selection both paint with
   `--accent`, which a visitor who left the main site in dark mode carries in
   as #ffffff — invisible on this paper (1.13:1). Forma states both in its own
   ink so the indicator cannot depend on the surrounding theme.

   Colour only, deliberately: the house rule also carries a `border-radius`,
   and repeating that here would put it in the unlayered origin where it beats
   Tailwind's `rounded-full` and would square every pill on focus. */
const FORMA_CSS = `
.forma :focus-visible{outline:2px solid ${INK};outline-offset:3px}
.forma ::selection{background:${INK};color:${PAPER}}
`;

export default function Page() {
  return (
    <DemoShell
      slug="forma"
      bg={PAPER}
      fg={INK}
      className={`forma ${display.variable} ${sans.variable} font-[family-name:var(--font-forma-sans)] antialiased`}
    >
      <style>{FORMA_CSS}</style>
      <FormaNav />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section id="top" className="pt-[clamp(44px,8vw,104px)]">
          <div className={WRAP}>
            <div
              data-rise
              className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-end lg:gap-14"
            >
              <div className="min-w-0">
                <p className={EYEBROW}>
                  Interjero architektūros studija · Vilnius
                </p>
                <h1
                  style={SERIF}
                  className="mt-6 max-w-[15ch] text-[clamp(2.6rem,7.2vw,4.4rem)] font-normal leading-[1.02] tracking-[-0.02em]"
                >
                  Erdvė, kurioje viskas savo vietoje.
                </h1>
              </div>
              <p className="min-w-0 max-w-[38ch] text-[0.97rem] leading-[1.7] text-[#6B6660] lg:pb-2">
                Dvi architektės. Butai, privatūs namai ir nedidelės komercinės
                erdvės — nuo pirmo plano iki paskutinės rankenos, be
                tarpininkų.
              </p>
            </div>
          </div>

          <div className="mt-[clamp(30px,5vw,60px)] px-5 sm:px-8">
            <figure className="mx-auto w-full max-w-[1680px]">
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-settle
                  src="/demo/forma/hero.webp"
                  width={1800}
                  height={1125}
                  alt="Šviesi svetainė su panoraminiu langu į medžius"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/5] h-full w-full object-cover sm:aspect-[3/2] lg:aspect-[16/9]"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[0.68rem] uppercase tracking-[0.18em] text-[#656059]">
                <span>Dienos zona · privatus namas</span>
                <span>Vilniaus r., 2025</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Požiūris ─────────────────────────────────────────── */}
        <section
          id="studija"
          className="scroll-mt-[120px] py-[clamp(76px,12vw,150px)]"
        >
          <div className={WRAP}>
            <h2 className={EYEBROW}>Požiūris</h2>
            <div className="mt-[clamp(32px,4.5vw,60px)] grid gap-[clamp(40px,5vw,64px)] md:grid-cols-3">
              {MANIFEST.map((m, i) => (
                <div
                  key={m.t}
                  data-rise
                  style={{ "--i": i } as CSSProperties}
                  className={`min-w-0 border-t ${HAIR} pt-6`}
                >
                  <span className="text-[0.68rem] tabular-nums tracking-[0.2em] text-[#656059]">
                    {pad(i + 1)}
                  </span>
                  <h3
                    style={SERIF}
                    className="mt-5 text-[clamp(1.45rem,2.4vw,1.9rem)] font-normal leading-[1.14]"
                  >
                    {m.t}
                  </h3>
                  <p className="mt-4 text-[0.93rem] leading-[1.75] text-[#6B6660]">
                    {m.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projektų indeksas (veikianti funkcija) ───────────── */}
        <ProjectIndex />

        {/* ── Paslaugos ────────────────────────────────────────── */}
        <section
          id="paslaugos"
          className="scroll-mt-[120px] bg-[#EAE5DD] py-[clamp(76px,12vw,150px)]"
        >
          <div className={WRAP}>
            <div data-rise className="min-w-0">
              <p className={EYEBROW}>Paslaugos</p>
              <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <h2 style={SERIF} className={`${H2} max-w-[16ch]`}>
                  Trys būdai dirbti kartu.
                </h2>
                <p className="min-w-0 max-w-[40ch] text-[0.95rem] leading-[1.7] text-[#6B6660]">
                  Dažniausiai renkamasi pilnas projektas su priežiūra. Bet jei
                  erdvė nedidelė arba sprendimas vienas — užtenka ir mažesnio
                  žingsnio.
                </p>
              </div>
            </div>

            <div className="mt-[clamp(34px,5vw,64px)] grid gap-[clamp(36px,4vw,48px)] md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <div
                  key={s.t}
                  data-rise
                  style={{ "--i": i } as CSSProperties}
                  className="min-w-0 border-t border-[rgba(26,25,23,0.20)] pt-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      style={SERIF}
                      className="min-w-0 text-[clamp(1.35rem,2.2vw,1.7rem)] font-normal leading-[1.15]"
                    >
                      {s.t}
                    </h3>
                    <span className="shrink-0 text-[0.72rem] uppercase tracking-[0.12em] text-[#1A1917]">
                      {s.price}
                    </span>
                  </div>
                  <p className="mt-4 text-[0.93rem] leading-[1.75] text-[#5F5B55]">
                    {s.b}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {s.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3 text-[0.85rem] leading-[1.55] text-[#5F5B55]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-px w-3 shrink-0 bg-[rgba(26,25,23,0.35)]"
                        />
                        <span className="min-w-0">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-[clamp(32px,4vw,48px)] max-w-[54ch] text-[0.8rem] leading-[1.6] text-[#6B6660]">
              Kainos orientacinės ir priklauso nuo erdvės sudėtingumo. Tikslią
              sumą pateikiame raštu po pirmo susitikimo — vėliau ji nesikeičia.
            </p>
          </div>
        </section>

        {/* ── Procesas ─────────────────────────────────────────── */}
        <section
          id="procesas"
          className="scroll-mt-[120px] py-[clamp(76px,12vw,150px)]"
        >
          <div className={WRAP}>
            <div data-rise className="min-w-0">
              <p className={EYEBROW}>Procesas</p>
              <h2 style={SERIF} className={`${H2} mt-5 max-w-[20ch]`}>
                Nuo pirmo matavimo iki paskutinės rankenos.
              </h2>
            </div>

            {/* four steps arrive as one gesture, not four */}
            <ol
              data-rise
              style={{ "--i": 1 } as CSSProperties}
              className="mt-[clamp(36px,5vw,64px)] grid gap-x-8 gap-y-[clamp(32px,4vw,44px)] md:grid-cols-4"
            >
              {PROCESS.map((p, i) => (
                <li key={p.t} className={`min-w-0 border-t ${HAIR} pt-5`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.68rem] tabular-nums tracking-[0.2em] text-[#656059]">
                      {pad(i + 1)}
                    </span>
                    <span className="shrink-0 text-[0.68rem] uppercase tracking-[0.12em] text-[#656059]">
                      {p.when}
                    </span>
                  </div>
                  <h3
                    style={SERIF}
                    className="mt-4 text-[clamp(1.25rem,2vw,1.5rem)] font-normal leading-[1.18]"
                  >
                    {p.t}
                  </h3>
                  <p className="mt-3 text-[0.89rem] leading-[1.7] text-[#6B6660]">
                    {p.b}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Nuotaika ─────────────────────────────────────────── */}
        <section className="pb-[clamp(76px,12vw,150px)]">
          <div className={WRAP}>
            <h2 className={EYEBROW}>Nuotaika</h2>
            <div className="mt-[clamp(28px,4vw,52px)] grid grid-cols-12 gap-x-4 gap-y-[clamp(28px,4vw,56px)] sm:gap-x-6">
              {MOOD.map((m) => (
                <figure
                  key={m.src}
                  className={`min-w-0 overflow-hidden ${m.cell} ${m.push}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    data-settle
                    src={m.src}
                    width={m.w}
                    height={m.h}
                    alt={m.alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${m.ratio}`}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Kontaktai ────────────────────────────────────────── */}
        <section
          id="kontaktai"
          className="scroll-mt-[120px] bg-[#EAE5DD] py-[clamp(76px,12vw,150px)]"
        >
          <div className={WRAP}>
            <div className="grid gap-[clamp(44px,6vw,80px)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
              <div data-rise className="min-w-0">
                <p className={EYEBROW}>Kontaktai</p>
                <h2 style={SERIF} className={`${H2} mt-5 max-w-[14ch]`}>
                  Pradėkime nuo pokalbio.
                </h2>
                <p className="mt-5 max-w-[38ch] text-[0.95rem] leading-[1.7] text-[#5F5B55]">
                  Parašykite kelis sakinius apie erdvę. Atsiųsime, ką joje
                  matome mes, ir kiek toks projektas kainuotų.
                </p>

                <span className="mt-8 inline-flex items-center rounded-full border border-[rgba(26,25,23,0.28)] px-3 py-[5px] text-[0.66rem] uppercase tracking-[0.16em] text-[#1A1917]">
                  Pavyzdiniai kontaktai
                </span>

                <dl className="mt-5 flex flex-col">
                  {CONTACTS.map((c) => (
                    <div
                      key={c.k}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[rgba(26,25,23,0.16)] py-3"
                    >
                      <dt className="text-[0.72rem] uppercase tracking-[0.16em] text-[#6B6660]">
                        {c.k}
                      </dt>
                      <dd className="min-w-0 break-words text-[0.95rem] text-[#1A1917]">
                        {c.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div
                data-rise
                style={{ "--i": 1 } as CSSProperties}
                className="min-w-0"
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`border-t ${HAIR}`}>
        <div
          className={`${WRAP} flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between`}
        >
          <span
            style={SERIF}
            className="text-[1.35rem] leading-none tracking-[-0.01em]"
          >
            Forma
          </span>
          <nav
            aria-label="Poraštės nuorodos"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] text-[#6B6660]"
          >
            <a
              href="#projektai"
              className="transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#1A1917]"
            >
              Projektai
            </a>
            <a
              href="#paslaugos"
              className="transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#1A1917]"
            >
              Paslaugos
            </a>
            <a
              href="#procesas"
              className="transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#1A1917]"
            >
              Procesas
            </a>
            <a
              href="#kontaktai"
              className="transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#1A1917]"
            >
              Kontaktai
            </a>
          </nav>
          <span className="text-[0.76rem] text-[#656059]">
            © 2026 Forma · Vilnius
          </span>
        </div>
      </footer>
    </DemoShell>
  );
}
