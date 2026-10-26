"use client";

import { useCallback, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import type { FormaCopy } from "@/i18n/dictionaries/lt/forma";
import { getFormaCopy } from "@/components/demo/forma/copy";
import {
  ProjectLightbox,
  type FormaProject,
  type FormaProjectKind,
} from "@/components/demo/forma/ProjectLightbox";
import { SplitTitle } from "@/components/demo/forma/SplitTitle";
import {
  HAIR,
  MUTED,
  T_BODY,
  T_BODY_STRONG,
  T_ITALIC,
  T_ROW,
  T_SMALL,
  WRAP,
} from "@/components/demo/forma/tokens";

type ProjectId = keyof FormaCopy["projects"]["items"];

/* Display order is deliberately mixed, so filtering visibly re-orders the
   list rather than just hiding rows. Only the facts that need no words live
   here; each project's title, place, scope, note and alt text are in the
   dictionary under the same id.

   `second` is the project's second view, the photograph that opens inside
   the passe-partout under the pointer. Each one is a different real
   photograph chosen to read as another room or hour of the same place
   (the old-town flat's deep window reveals, the new-build flat at dusk,
   the house's stair, the attic room in Užupis, the Balsiai day zone that
   is also the hero). The beauty studio has no second photograph, so its
   card has no reveal: a crop of the cover would be a fake second view. */
const PROJECTS: {
  id: ProjectId;
  kind: FormaProjectKind;
  area: string;
  year: string;
  src: string;
  w: number;
  h: number;
  second?: { src: string; w: number; h: number };
}[] = [
  {
    id: "p-1",
    kind: "butas",
    area: "78 m²",
    year: "2025",
    src: "/demo/forma/p-1.webp",
    w: 1400,
    h: 1050,
    second: { src: "/demo/forma/mood-4.webp", w: 1200, h: 828 },
  },
  {
    id: "p-5",
    kind: "namas",
    area: "186 m²",
    year: "2024",
    src: "/demo/forma/p-5.webp",
    w: 1400,
    h: 788,
    second: { src: "/demo/forma/mood-3.webp", w: 1200, h: 800 },
  },
  {
    id: "p-2",
    kind: "komercine",
    area: "54 m²",
    year: "2025",
    src: "/demo/forma/p-2.webp",
    w: 1400,
    h: 933,
  },
  {
    id: "p-3",
    kind: "butas",
    area: "92 m²",
    year: "2025",
    src: "/demo/forma/p-3.webp",
    w: 1400,
    h: 933,
    second: { src: "/demo/forma/mood-1.webp", w: 1200, h: 801 },
  },
  {
    id: "p-6",
    kind: "komercine",
    area: "46 m²",
    year: "2024",
    src: "/demo/forma/p-6.webp",
    w: 1400,
    h: 933,
    second: { src: "/demo/forma/mood-2.webp", w: 1200, h: 800 },
  },
  {
    id: "p-4",
    kind: "namas",
    area: "142 m²",
    year: "2023",
    src: "/demo/forma/p-4.webp",
    w: 1400,
    h: 933,
    second: { src: "/demo/forma/hero.webp", w: 1800, h: 1125 },
  },
];

/** The index in one language: the facts above joined with that language's
 *  words. Built once per language, so the array a render reads is stable. */
function projectsIn(locale: Locale): FormaProject[] {
  const t = getFormaCopy(locale).projects;
  return PROJECTS.map((p) => ({
    ...p,
    ...t.items[p.id],
    kindLabel: t.kinds[p.kind],
  }));
}

const PROJECTS_BY_LOCALE: Record<Locale, FormaProject[]> = {
  lt: projectsIn("lt"),
  en: projectsIn("en"),
};

/* Filter words are in the dictionary under the same ids. */
const FILTERS = ["visi", "butas", "namas", "komercine"] as const;

type FilterId = (typeof FILTERS)[number];

const countOf = (id: FilterId) =>
  id === "visi"
    ? PROJECTS.length
    : PROJECTS.filter((p) => p.kind === (id as FormaProjectKind)).length;

const pad = (n: number) => String(n).padStart(2, "0");

/* TARQ's rhythm: two half-width items, the right one pushed down, then one
   item set in from the left; repeat. Assigned from the position in the
   VISIBLE list, so a filtered list rebuilds its own pairs. */
const SLOT = ["f-slot-a", "f-slot-b", "f-slot-c"] as const;

export function ProjectIndex() {
  const locale = useLocale();
  /* Memoised only so the React Compiler lint treats the dictionary as the
     immutable value it is. The render calls its functions (cardLabel,
     announce), and on a plain call result the compiler assumes those calls
     mutate it, which stops it from preserving closeLightbox below. */
  const t = useMemo(() => getFormaCopy(locale), [locale]);
  const projects = PROJECTS_BY_LOCALE[locale];
  const [filter, setFilter] = useState<FilterId>("visi");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null);

  const visible = useMemo(
    () =>
      filter === "visi"
        ? projects
        : projects.filter((p) => p.kind === (filter as FormaProjectKind)),
    [filter, projects],
  );

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
    // focus goes back to the card the visitor opened
    trigger?.focus({ preventScroll: true });
  }, [trigger]);

  return (
    <>
      <section id="projektai" className="f-sec">
        <div className={WRAP}>
          <div aria-hidden="true" className="f-rule" />
          <SplitTitle words={t.projects.split} layout="spread" />

          <div className="mt-[clamp(28px,4vw,56px)] grid gap-8 lg:grid-cols-12 lg:gap-6">
            {/* AS's text index: plain words, a tiny count, inactive words
                grey. The pressed word is ink. */}
            <div
              role="group"
              aria-label={t.projects.filterLabel}
              className="f-filters min-w-0 items-baseline gap-y-1 lg:col-span-7"
            >
              {FILTERS.map((f) => {
                const on = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f)}
                    className="f-filter group inline-flex min-h-11 items-baseline gap-1.5 text-left"
                  >
                    <span className="f-filter-word text-[clamp(1.375rem,2.5vw,2.25rem)] leading-[1.1]">
                      {t.projects.filters[f]}
                    </span>
                    <span
                      className="text-[0.75rem] tabular-nums leading-none"
                      style={{ color: MUTED }}
                    >
                      ({countOf(f)})
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="min-w-0 lg:col-span-4 lg:col-start-9">
              <p className={T_BODY}>
                <span className={T_BODY_STRONG}>{t.projects.title}</span>{" "}
                {t.projects.lead}
              </p>
              {/* the same fact the live region announces, said out loud in
                  the layout */}
              <p className={`mt-4 tabular-nums ${T_SMALL}`} style={{ color: MUTED }}>
                {t.projects.showing} {pad(visible.length)} / {pad(PROJECTS.length)}
              </p>
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            {t.projects.announce(visible.length, PROJECTS.length)}
          </p>

          {visible.length === 0 ? (
            <div
              className="mt-[clamp(40px,6vw,96px)] border-t pt-8"
              style={{ borderColor: HAIR }}
            >
              <p className={T_ROW}>{t.projects.emptyTitle}</p>
              <p className={`mt-3 max-w-[46ch] ${T_BODY}`}>
                {t.projects.emptyBody}
              </p>
              <button
                type="button"
                onClick={() => setFilter("visi")}
                className={`f-arrow mt-6 inline-flex min-h-11 items-center gap-1.5 ${T_ROW}`}
              >
                {t.projects.showAll}
                <span aria-hidden="true">↘</span>
              </button>
            </div>
          ) : (
            <ul className="f-list mt-[clamp(48px,7vw,104px)]">
              {visible.map((p, i) => (
                /* key carries the filter on purpose: every remaining card
                   re-mounts, so the list re-enters as one gesture. */
                <li
                  key={`${filter}:${p.id}`}
                  id={`projektas-${p.id}`}
                  className={`f-item ${SLOT[i % 3]} min-w-0`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      setTrigger(e.currentTarget);
                      setOpenIndex(i);
                    }}
                    aria-label={t.projects.cardLabel(p)}
                    className={`f-card block w-full min-w-0 text-left${p.second ? "" : " f-plain"}`}
                  >
                    {/* header row: name, ( kind ) that turns into
                        ( Žiūrėti ) under the pointer, year */}
                    <span className={`f-card-head ${T_ROW}`}>
                      <span className="min-w-0">{p.title}</span>
                      <span
                        aria-hidden="true"
                        className={`f-parens ${T_ITALIC} text-[1.375rem] leading-none`}
                      >
                        <span>(</span>
                        <span className="f-parens-stack">
                          <span className="f-parens-rest">{p.kindLabel}</span>
                          <span className="f-parens-word">{t.projects.view}</span>
                        </span>
                        <span>)</span>
                      </span>
                      <span className="tabular-nums">{p.year}</span>
                    </span>

                    {/* The figure. The outer span is what the reveal
                        observer watches; the clip and the settle are on its
                        children, never on the observed box. */}
                    <span data-rise="img" className="mt-4 block">
                      <span className="f-clip relative block overflow-hidden bg-[rgba(23,23,23,0.08)]">
                        <span className="f-zoom block">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.src}
                            width={p.w}
                            height={p.h}
                            alt={p.alt}
                            loading="lazy"
                            decoding="async"
                            className="f-ph"
                          />
                        </span>

                        {/* THE SIGNATURE: the second view in a passe-partout.
                            The mat darkens the cover (opacity, no filter),
                            the second photograph opens from a small centred
                            window to an inset frame, the category and place
                            sit in the mat's top and bottom margins. */}
                        {p.second && (
                          <>
                            <span aria-hidden="true" className="f-mat" />
                            <span aria-hidden="true" className="f-view">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={p.second.src}
                                width={p.second.w}
                                height={p.second.h}
                                alt=""
                                loading="lazy"
                                decoding="async"
                              />
                            </span>
                            <span aria-hidden="true" className="f-lab f-lab-t">
                              {p.kindLabel}
                            </span>
                            <span aria-hidden="true" className="f-lab f-lab-b">
                              {p.place}
                            </span>
                          </>
                        )}
                      </span>
                    </span>

                    {/* touch screens have no hover: the mat's two words
                        are said here instead, under the photograph */}
                    <span
                      className={`f-touch-meta mt-3 ${T_SMALL}`}
                      style={{ color: MUTED }}
                    >
                      {p.kindLabel}, {p.area}, {p.place}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
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
