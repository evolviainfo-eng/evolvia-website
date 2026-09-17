"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import type { FormaCopy } from "@/i18n/dictionaries/lt/forma";
import { getFormaCopy } from "@/components/demo/forma/copy";
import {
  ProjectLightbox,
  type FormaProject,
  type FormaProjectKind,
} from "@/components/demo/forma/ProjectLightbox";
import {
  HAIR,
  INK,
  MUTED,
  SECTION,
  SERIF,
  T_BODY,
  T_EYEBROW,
  T_H2,
  T_META,
  T_NUM,
  T_SMALL,
  WRAP,
} from "@/components/demo/forma/tokens";

type ProjectId = keyof FormaCopy["projects"]["items"];

/* Display order is deliberately mixed, so filtering visibly re-orders the
   grid rather than just hiding rows. Only the facts that need no words live
   here; each project's title, place, scope, note and alt text are in the
   dictionary under the same id. */
const PROJECTS: {
  id: ProjectId;
  kind: FormaProjectKind;
  area: string;
  year: string;
  src: string;
  w: number;
  h: number;
}[] = [
  {
    id: "p-1",
    kind: "butas",
    area: "78 m²",
    year: "2025",
    src: "/demo/forma/p-1.webp",
    w: 1400,
    h: 1050,
  },
  {
    id: "p-5",
    kind: "namas",
    area: "186 m²",
    year: "2024",
    src: "/demo/forma/p-5.webp",
    w: 1400,
    h: 788,
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
  },
  {
    id: "p-6",
    kind: "komercine",
    area: "46 m²",
    year: "2024",
    src: "/demo/forma/p-6.webp",
    w: 1400,
    h: 933,
  },
  {
    id: "p-4",
    kind: "namas",
    area: "142 m²",
    year: "2023",
    src: "/demo/forma/p-4.webp",
    w: 1400,
    h: 933,
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

/* Chip labels are in the dictionary under the same ids. */
const FILTERS = ["visi", "butas", "namas", "komercine"] as const;

type FilterId = (typeof FILTERS)[number];

const countOf = (id: FilterId) =>
  id === "visi"
    ? PROJECTS.length
    : PROJECTS.filter((p) => p.kind === (id as FormaProjectKind)).length;

const pad = (n: number) => String(n).padStart(2, "0");

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
      <section id="projektai" className={SECTION}>
        <div className={WRAP}>
          <div data-rise className="min-w-0">
            <p className={T_EYEBROW} style={{ color: MUTED }}>
              {t.sections.projects}
            </p>
            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 style={SERIF} className={`${T_H2} max-w-[18ch]`}>
                {t.projects.title}
              </h2>
              <p
                className={`min-w-0 max-w-[40ch] ${T_BODY}`}
                style={{ color: MUTED }}
              >
                {t.projects.lead}
              </p>
            </div>

            <div className="mt-[clamp(30px,4vw,46px)] flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              <div
                role="group"
                aria-label={t.projects.filterLabel}
                className="flex min-w-0 flex-wrap gap-2"
              >
                {FILTERS.map((f) => {
                  const on = f === filter;
                  return (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setFilter(f)}
                      className={[
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.8125rem] leading-none transition-[background-color,color,border-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] active:translate-y-px",
                        on
                          ? "border-[#1A1917] bg-[#1A1917] text-[#F4F1EC]"
                          : "border-[rgba(26,25,23,0.18)] hover:border-[#1A1917] hover:bg-[rgba(26,25,23,0.05)]",
                      ].join(" ")}
                    >
                      {t.projects.filters[f]}
                      <span
                        className={`tabular-nums text-[0.6875rem] ${
                          on ? "text-[#F4F1EC]/65" : "text-[#5E5952]"
                        }`}
                      >
                        {countOf(f)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* the same fact the live region announces, said out loud in the
                  layout — so a sighted visitor sees the filter took effect even
                  when the grid is below the fold */}
              <p className={`shrink-0 ${T_NUM}`} style={{ color: MUTED }}>
                {t.projects.showing} {pad(visible.length)} /{" "}
                {pad(PROJECTS.length)}
              </p>
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            {t.projects.announce(visible.length, PROJECTS.length)}
          </p>

          {visible.length === 0 ? (
            <div
              className="mt-[clamp(30px,4.5vw,52px)] border-t pt-8"
              style={{ borderColor: HAIR }}
            >
              <p
                style={SERIF}
                className="max-w-[24ch] text-[clamp(1.25rem,2.6vw,1.875rem)] leading-[1.16] text-pretty"
              >
                {t.projects.emptyTitle}
              </p>
              <p
                className={`mt-3 max-w-[46ch] ${T_BODY}`}
                style={{ color: MUTED }}
              >
                {t.projects.emptyBody}
              </p>
              <button
                type="button"
                onClick={() => setFilter("visi")}
                className="mt-6 press inline-flex h-11 items-center rounded-full border border-[rgba(26,25,23,0.18)] px-5 text-[0.8125rem] leading-none transition-[background-color,color,border-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[#1A1917] hover:bg-[#1A1917] hover:text-[#F4F1EC] active:translate-y-px"
              >
                {t.projects.showAll}
              </button>
            </div>
          ) : (
            <ul className="mt-[clamp(30px,4.5vw,52px)] grid grid-cols-1 gap-x-6 gap-y-[clamp(34px,4.5vw,64px)] sm:grid-cols-2">
              {visible.map((p, i) => (
                /* key carries the filter on purpose: every remaining card
                   re-mounts, so the whole grid re-enters as ONE choreography
                   with --i set from its new position — not card by card. */
                <li
                  key={`${filter}:${p.id}`}
                  data-rise
                  style={{ "--i": i } as CSSProperties}
                  className="min-w-0 sm:even:mt-[clamp(28px,4vw,64px)]"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      setTrigger(e.currentTarget);
                      setOpenIndex(i);
                    }}
                    aria-label={t.projects.cardLabel(p)}
                    className="group block w-full min-w-0 text-left"
                  >
                    <span className="block overflow-hidden bg-[rgba(26,25,23,0.06)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.src}
                        width={p.w}
                        height={p.h}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-[1.035] group-focus-visible:scale-[1.035] group-active:scale-[1.015]"
                      />
                    </span>

                    {/* the card's own hairline, and the ink rule that draws
                        across it under the pointer — the page's one hover
                        signature, repeated from the header links */}
                    <span className="relative mt-4 block pt-3">
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px"
                        style={{ background: HAIR }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        style={{ background: INK }}
                      />

                      <span className="flex items-baseline justify-between gap-4">
                        <span
                          style={SERIF}
                          className="min-w-0 text-[clamp(1.0625rem,2.2vw,1.5rem)] leading-[1.15] text-pretty"
                        >
                          {p.title}
                        </span>
                        <span
                          className={`shrink-0 ${T_NUM}`}
                          style={{ color: MUTED }}
                        >
                          {pad(i + 1)}
                        </span>
                      </span>
                      <span
                        className={`mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 ${T_META}`}
                        style={{ color: MUTED }}
                      >
                        <span>{p.kindLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.area}</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.place}</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.year}</span>
                      </span>
                      <span
                        className={`mt-2 block ${T_SMALL}`}
                        style={{ color: MUTED }}
                      >
                        {p.scope}
                      </span>
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
