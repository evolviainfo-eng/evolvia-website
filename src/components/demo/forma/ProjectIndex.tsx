"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import {
  ProjectLightbox,
  type FormaProject,
  type FormaProjectKind,
} from "@/components/demo/forma/ProjectLightbox";

/* Display order is deliberately mixed, so filtering visibly re-orders the
   grid rather than just hiding rows. */
const PROJECTS: FormaProject[] = [
  {
    id: "p-1",
    title: "Butas Žvėryne",
    kind: "butas",
    kindLabel: "Butas",
    area: "78 m²",
    year: "2025",
    place: "Vilnius",
    scope: "Pilnas projektas · autorinė priežiūra",
    note: "Trijų kambarių butas tarpukario name. Nugriovėme vieną pertvarą ir atsirado ilga dienos zona su vaizdu į kiemo medžius. Baldai — pagal projektą, kad tilptų į nelygias sienas.",
    src: "/demo/forma/p-1.webp",
    w: 1400,
    h: 1050,
    alt: "Neutralių tonų svetainė su sofa ir dienos šviesa",
  },
  {
    id: "p-5",
    title: "Namas Sudervėje",
    kind: "namas",
    kindLabel: "Namas",
    area: "186 m²",
    year: "2024",
    place: "Vilniaus r.",
    scope: "Pilnas projektas · autorinė priežiūra",
    note: "Namas šeimai su dviem vaikais. Židinys — vienintelė sunki masė šviesioje erdvėje; visa kita atitraukta nuo sienų, kad grindys liktų vientisos.",
    src: "/demo/forma/p-5.webp",
    w: 1400,
    h: 788,
    alt: "Šviesi svetainė su židiniu ir minkštais baldais",
  },
  {
    id: "p-2",
    title: "Grožio studija Naujamiestyje",
    kind: "komercine",
    kindLabel: "Komercinė",
    area: "54 m²",
    year: "2025",
    place: "Vilnius",
    scope: "Pilnas projektas",
    note: "Studija pirmame gyvenamojo namo aukšte. Uosio grindys ir viena nišų linija palei sieną — kad įranga ir priemonės nekristų į akis, o klientė matytų tik šviesą ir save.",
    src: "/demo/forma/p-2.webp",
    w: 1400,
    h: 933,
    alt: "Šviesi erdvė medinėmis grindimis ir dideliais langais",
  },
  {
    id: "p-3",
    title: "Butas Šnipiškėse",
    kind: "butas",
    kindLabel: "Butas",
    area: "92 m²",
    year: "2025",
    place: "Vilnius",
    scope: "Pilnas projektas · baldų projektavimas",
    note: "Butas naujos statybos name, kur virtuvė ir svetainė yra viena erdvė. Sala projektuota pagal šeimos ūgį ir galiausiai tapo pagrindiniu namų stalu — valgomojo taip ir neprireikė.",
    src: "/demo/forma/p-3.webp",
    w: 1400,
    h: 933,
    alt: "Virtuvė su sala ir aukštomis spintelėmis",
  },
  {
    id: "p-6",
    title: "Svečių apartamentai Užupyje",
    kind: "komercine",
    kindLabel: "Komercinė",
    area: "46 m²",
    year: "2024",
    place: "Vilnius",
    scope: "Pilnas projektas · autorinė priežiūra",
    note: "Du nuomojami apartamentai senamiesčio pakraštyje. Šilta paletė ir tekstilė vietoj dekoro: kambarys turi atrodyti gyvenamas, o ne viešbutinis, ir turi būti išvalomas per keturiasdešimt minučių.",
    src: "/demo/forma/p-6.webp",
    w: 1400,
    h: 933,
    alt: "Miegamasis šiltos paletės tonais su tekstile",
  },
  {
    id: "p-4",
    title: "Namas Balsiuose",
    kind: "namas",
    kindLabel: "Namas",
    area: "142 m²",
    year: "2023",
    place: "Vilnius",
    scope: "Konsultacija · pilnas projektas",
    note: "Miegamasis su dviem langais į skirtingas puses — rytinį ir vakarinį. Spinta paslėpta už tos pačios sienos plokštumos, todėl kambaryje matosi tik lova ir šviesa.",
    src: "/demo/forma/p-4.webp",
    w: 1400,
    h: 933,
    alt: "Miegamasis su dviem langais ir ramia lovos zona",
  },
];

const FILTERS = [
  { id: "visi", label: "Visi" },
  { id: "butas", label: "Butai" },
  { id: "namas", label: "Namai" },
  { id: "komercine", label: "Komercinės" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const countOf = (id: FilterId) =>
  id === "visi"
    ? PROJECTS.length
    : PROJECTS.filter((p) => p.kind === (id as FormaProjectKind)).length;

const pad = (n: number) => String(n).padStart(2, "0");

/** An aria-label replaces the name a browser would compute from the button's
 *  contents, and every piece of card information lives inside that button — so
 *  the metadata has to be folded in, or a screen-reader user hears the title
 *  alone and loses the whole point of an index. */
const cardLabel = (p: FormaProject) =>
  `Atverti projektą ${p.title} — ${p.kindLabel}, ${p.area}, ${p.place}, ${p.year}. ${p.scope}`;

export function ProjectIndex() {
  const [filter, setFilter] = useState<FilterId>("visi");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null);

  const visible = useMemo(
    () =>
      filter === "visi"
        ? PROJECTS
        : PROJECTS.filter((p) => p.kind === (filter as FormaProjectKind)),
    [filter],
  );

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
    // focus goes back to the card the visitor opened
    trigger?.focus({ preventScroll: true });
  }, [trigger]);

  return (
    <>
      <section
        id="projektai"
        className="scroll-mt-[120px] py-[clamp(72px,11vw,140px)]"
      >
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
          <div data-rise className="min-w-0">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#656059]">
              Projektai
            </p>
            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                style={{ fontFamily: "var(--font-forma-display)" }}
                className="min-w-0 max-w-[18ch] text-[clamp(2rem,4.6vw,3.1rem)] font-normal leading-[1.06] tracking-[-0.015em]"
              >
                Šeši darbai, kuriuos parodome pirmiausia.
              </h2>
              <p className="min-w-0 max-w-[40ch] text-[0.95rem] leading-[1.7] text-[#6B6660]">
                Butai, namai ir nedidelės komercinės erdvės Vilniuje bei
                aplinkui. Atverkite projektą — atsivers didelė nuotrauka ir
                trumpas sprendimo paaiškinimas.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filtruoti projektus pagal tipą"
              className="mt-[clamp(28px,4vw,44px)] flex flex-wrap gap-2"
            >
              {FILTERS.map((f) => {
                const on = f.id === filter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f.id)}
                    className={[
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.82rem] leading-none transition-[background-color,color,border-color] duration-[var(--d-tap)] ease-[var(--e-out)]",
                      on
                        ? "border-[#1A1917] bg-[#1A1917] text-[#F4F1EC]"
                        : "border-[rgba(26,25,23,0.18)] text-[#1A1917] hover:border-[#1A1917]",
                    ].join(" ")}
                  >
                    {f.label}
                    <span
                      className={`text-[0.68rem] tabular-nums ${on ? "text-[#F4F1EC]/60" : "text-[#656059]"}`}
                    >
                      {countOf(f.id)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            Rodoma {visible.length} iš {PROJECTS.length} projektų.
          </p>

          <ul className="mt-[clamp(30px,4.5vw,52px)] grid grid-cols-1 gap-x-6 gap-y-[clamp(34px,4.5vw,64px)] sm:grid-cols-2">
            {visible.map((p, i) => (
              /* key carries the filter on purpose: every remaining card
                 re-mounts, so the whole grid re-enters as ONE choreography
                 with --i set from its new position — not card by card. */
              <li
                key={`${filter}:${p.id}`}
                data-rise
                style={{ "--i": i } as CSSProperties}
                className="min-w-0"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    setTrigger(e.currentTarget);
                    setOpenIndex(i);
                  }}
                  aria-label={cardLabel(p)}
                  className="group block w-full min-w-0 text-left"
                >
                  <span className="block overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      width={p.w}
                      height={p.h}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-[1.02]"
                    />
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-4 border-t border-[rgba(26,25,23,0.14)] pt-3">
                    <span
                      style={{ fontFamily: "var(--font-forma-display)" }}
                      className="min-w-0 text-[clamp(1.15rem,2.2vw,1.45rem)] leading-[1.15]"
                    >
                      {p.title}
                    </span>
                    <span className="shrink-0 text-[0.7rem] tabular-nums tracking-[0.16em] text-[#656059]">
                      {pad(i + 1)}
                    </span>
                  </span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.75rem] uppercase tracking-[0.13em] text-[#6B6660]">
                    <span>{p.kindLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.area}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.place}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.year}</span>
                  </span>
                  <span className="mt-2 block text-[0.8rem] text-[#656059]">
                    {p.scope}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {openIndex !== null && visible[openIndex] && (
        <ProjectLightbox
          items={visible}
          index={openIndex}
          onClose={closeLightbox}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
