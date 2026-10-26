"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { getKonstruktaCopy } from "./copy";
import { BAND, BTN_PRIMARY, SectionHead, T_SM, WRAP } from "./ui";

/** Small sentence-case label: the field names, the legends, the notes. */
const LBL = "text-[0.875rem] leading-[1.4]";

/* ── Model ──────────────────────────────────────────────────────────────
   Every group carries a €/m² band, not a single rate: the output has to
   be a range, because a real quote is. Multipliers are shown next to the
   options so the visitor can see what the calculator is doing to them.
   Only numbers live here: every label and note comes from the dictionary,
   keyed by the same ids.
   ────────────────────────────────────────────────────────────────────── */

const MIN_AREA = 30;
const MAX_AREA = 400;

const TYPES = [
  { id: "namas", mul: 1 },
  { id: "butas", mul: 0.92 },
  { id: "komercija", mul: 1.12 },
] as const;

const FINISHES = [
  { id: "standartine", mul: 1 },
  { id: "aukstesne", mul: 1.24 },
  { id: "premium", mul: 1.6 },
] as const;

const WORKS = [
  { id: "pamatai", lo: 180, hi: 260 },
  { id: "karkasas", lo: 320, hi: 470 },
  { id: "stogas", lo: 150, hi: 230 },
  { id: "fasadas", lo: 130, hi: 200 },
  { id: "apdaila", lo: 380, hi: 620 },
  { id: "inzinerija", lo: 210, hi: 320 },
] as const;

type TypeId = (typeof TYPES)[number]["id"];
type FinishId = (typeof FINISHES)[number]["id"];
type WorkId = (typeof WORKS)[number]["id"];

/** The two groups whose €/m² the finish level legitimately moves. Everything
 *  else is structure: its price does not change because the taps got nicer. */
const FINISH_SCOPED: ReadonlySet<WorkId> = new Set<WorkId>([
  "apdaila",
  "inzinerija",
]);

export const ESTIMATE_EVENT = "konstrukta:estimate";

export type EstimatePayload = {
  typeLabel: string;
  area: number;
  message: string;
};

/** Digit grouping and decimal mark per language, written out by hand so the
 *  server and the client agree to the character (Intl would be a hydration
 *  gamble). Lithuanian groups with a no-break space, English with a comma. */
const NUMBER_FORMAT: Record<Locale, { group: string; decimal: string }> = {
  lt: { group: "\u00a0", decimal: "," },
  en: { group: ",", decimal: "." },
};

/** 84200 → "84 200" (lt) / "84,200" (en). */
const fmt = (n: number, locale: Locale) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NUMBER_FORMAT[locale].group);

/** A price multiplier as shown next to its option: 0.92 → "×0,92" (lt) /
 *  "×0.92" (en). */
const fmtMul = (m: number, locale: Locale) =>
  `×${m.toFixed(2).replace(".", NUMBER_FORMAT[locale].decimal)}`;

const round100 = (n: number) => Math.round(n / 100) * 100;

const RANGE_CSS = `
.knst-range{-webkit-appearance:none;appearance:none;width:100%;height:24px;background:transparent;cursor:pointer;display:block}
.knst-range::-webkit-slider-runnable-track{height:2px;border-radius:0;background:linear-gradient(90deg,#0C388D 0,#0C388D var(--knst-p,0%),#E2E2E2 var(--knst-p,0%),#E2E2E2 100%)}
.knst-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;margin-top:-7px;border:0;border-radius:0;background:#0C388D;transition:transform var(--d-tap) var(--e-out)}
.knst-range:hover::-webkit-slider-thumb{transform:scale(1.2)}
.knst-range:active::-webkit-slider-thumb{transform:scale(.9)}
.knst-range::-moz-range-track{height:2px;border-radius:0;background:#E2E2E2}
.knst-range::-moz-range-progress{height:2px;background:#0C388D}
.knst-range::-moz-range-thumb{width:16px;height:16px;border:0;border-radius:0;background:#0C388D;transition:transform var(--d-tap) var(--e-out)}
.knst-range:hover::-moz-range-thumb{transform:scale(1.2)}
.knst-range:active::-moz-range-thumb{transform:scale(.9)}
.knst-range:focus-visible{outline:none}
.knst-range:focus-visible::-webkit-slider-thumb{outline:2px solid #0C388D;outline-offset:3px}
.knst-range:focus-visible::-moz-range-thumb{outline:2px solid #0C388D;outline-offset:3px}
.knst-numfield{appearance:textfield;-moz-appearance:textfield}
.knst-numfield::-webkit-outer-spin-button,.knst-numfield::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
@keyframes knst-pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:none}}
.knst-pop{animation:knst-pop var(--d-tap) var(--e-out)}
@media (prefers-reduced-motion:reduce){.knst-pop{animation:none}.knst-range::-webkit-slider-thumb,.knst-range::-moz-range-thumb{transition:none}}
`;

export function Estimator() {
  const locale = useLocale();
  const copy = getKonstruktaCopy(locale);
  const c = copy.estimator;
  const workCopy = c.works;
  /** "180-260" in the page's number format (a plain hyphen, the same
   *  range mark the dictionaries use). */
  const range = (lo: number, hi: number) =>
    `${fmt(lo, locale)}-${fmt(hi, locale)}`;

  const [type, setType] = useState<TypeId>("namas");
  const [finish, setFinish] = useState<FinishId>("standartine");
  const [area, setArea] = useState(180);
  const [areaText, setAreaText] = useState("180");
  const [works, setWorks] = useState<Record<WorkId, boolean>>({
    pamatai: true,
    karkasas: true,
    stogas: true,
    fasadas: true,
    apdaila: true,
    inzinerija: false,
  });

  const setBoth = (n: number) => {
    setArea(n);
    setAreaText(String(n));
  };

  const onAreaText = (raw: string) => {
    setAreaText(raw);
    const n = Number.parseInt(raw.replace(/[^\d]/g, ""), 10);
    if (!Number.isNaN(n) && n >= MIN_AREA && n <= MAX_AREA) setArea(n);
  };

  const onAreaBlur = () => {
    const n = Number.parseInt(areaText.replace(/[^\d]/g, ""), 10);
    const next = Number.isNaN(n)
      ? area
      : Math.min(MAX_AREA, Math.max(MIN_AREA, n));
    setBoth(next);
  };

  const result = useMemo(() => {
    const typeMul = TYPES.find((t) => t.id === type)!.mul;
    const finishMul = FINISHES.find((f) => f.id === finish)!.mul;

    /* The finish level belongs to the finishing and engineering packages,
       not to the project as a whole: choosing Premium taps cannot make a
       foundation cost 60 % more. Structural groups stay on typeMul alone.

       Each group is rounded FIRST and the totals are the exact sum of those
       rounded lines, so a visitor who adds the breakdown up on paper gets
       the number printed at the top, to the euro. */
    const chosen = WORKS.filter((w) => works[w.id]).map((w) => {
      const f = FINISH_SCOPED.has(w.id) ? finishMul : 1;
      return {
        id: w.id,
        lo: Math.round(typeMul * w.lo * f),
        hi: Math.round(typeMul * w.hi * f),
      };
    });

    const perLo = chosen.reduce((a, w) => a + w.lo, 0);
    const perHi = chosen.reduce((a, w) => a + w.hi, 0);
    const span = perLo + perHi;

    return {
      chosen,
      empty: chosen.length === 0,
      perLo,
      perHi,
      span,
      totalLo: round100(perLo * area),
      totalHi: round100(perHi * area),
    };
  }, [works, type, finish, area]);

  const typeLabel = copy.objectTypes[type];
  const finishLabel = c.finishes[finish];

  /* The level is only ever part of the quote if one of the groups it prices
     is actually ticked; otherwise the honest answer is "not included". */
  const finishApplies = WORKS.some(
    (w) => works[w.id] && FINISH_SCOPED.has(w.id),
  );
  const finishSummary = finishApplies ? finishLabel : c.finishNotIncluded;

  const handOff = () => {
    if (result.empty) return;
    const message = c.message({
      type: typeLabel,
      area,
      works: result.chosen.map((w) => workCopy[w.id].label),
      finish: finishSummary,
      total: c.price(range(result.totalLo, result.totalHi)),
      perM2: c.pricePerM2(range(result.perLo, result.perHi)),
    });

    const payload: EstimatePayload = { typeLabel, area, message };
    window.dispatchEvent(new CustomEvent(ESTIMATE_EVENT, { detail: payload }));
  };

  const pct = ((area - MIN_AREA) / (MAX_AREA - MIN_AREA)) * 100;

  return (
    <section
      id="samata"
      className={BAND}
    >
      <style>{RANGE_CSS}</style>

      <div className={WRAP}>
        <SectionHead
          label={c.label}
          title={c.title}
          lead={c.lead}
        />

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-[clamp(40px,5vw,64px)] grid gap-[clamp(32px,4vw,48px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start"
        >
          {/* ── Inputs ─────────────────────────────────────────────── */}
          <form
            className="min-w-0 space-y-9"
            onSubmit={(e) => e.preventDefault()}
          >
            <Segmented
              legend={c.typeLegend}
              name="knst-type"
              options={TYPES.map((t) => ({
                id: t.id,
                label: copy.objectTypes[t.id],
                note: fmtMul(t.mul, locale),
              }))}
              value={type}
              onChange={(v) => setType(v as TypeId)}
            />

            {/* Plotas */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <label
                  htmlFor="knst-area"
                  className={`${LBL} text-[#5E5E5E]`}
                >
                  {c.areaLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="knst-area"
                    type="number"
                    inputMode="numeric"
                    min={MIN_AREA}
                    max={MAX_AREA}
                    step={1}
                    value={areaText}
                    onChange={(e) => onAreaText(e.target.value)}
                    onBlur={onAreaBlur}
                    className="k-num knst-numfield w-[92px] rounded-[4px] border border-[#D6D6D6] bg-[#FFFFFF] px-3 py-2 text-right text-[1rem] text-[#111111] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-[#9A9A9A] focus:border-[#0C388D]"
                  />
                  <span className="text-[0.875rem] text-[#5E5E5E]">
                    m²
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={MIN_AREA}
                max={MAX_AREA}
                step={5}
                value={area}
                onChange={(e) => setBoth(Number(e.target.value))}
                aria-label={c.areaSlider}
                className="knst-range mt-5"
                style={{ "--knst-p": `${pct}%` } as React.CSSProperties}
              />
              <div
                className="k-num mt-1 flex justify-between text-[0.875rem] text-[#5E5E5E]"
              >
                <span>{MIN_AREA} m²</span>
                <span>{MAX_AREA} m²</span>
              </div>
            </div>

            {/* Darbų apimtis */}
            <fieldset className="min-w-0">
              <legend className={`${LBL} text-[#5E5E5E]`}>
                {c.worksLegend}
              </legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {WORKS.map((w) => {
                  const on = works[w.id];
                  const t = workCopy[w.id];
                  return (
                    <label
                      key={w.id}
                      className={`knst-opt flex min-w-0 cursor-pointer items-start gap-3 rounded-[4px] border p-3.5 transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] ${
                        on
                          ? "border-[#0C388D]"
                          : "border-[#E2E2E2] hover:border-[#9A9A9A]"
                      } active:border-[#0C388D]`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={on}
                        onChange={(e) =>
                          setWorks((p) => ({ ...p, [w.id]: e.target.checked }))
                        }
                      />
                      <span
                        aria-hidden
                        className={`mt-[3px] flex h-[15px] w-[15px] shrink-0 items-center justify-center border transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] ${
                          on
                            ? "border-[#0C388D] bg-[#0C388D]"
                            : "border-[#9A9A9A]"
                        }`}
                      >
                        {on ? (
                          <svg
                            width="9"
                            height="7"
                            viewBox="0 0 9 7"
                            fill="none"
                            aria-hidden
                            className="knst-pop"
                          >
                            <path
                              d="M1 3.4 3.3 5.7 8 1"
                              stroke="#FFFFFF"
                              strokeWidth="1.8"
                            />
                          </svg>
                        ) : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[1rem] leading-[1.35] text-[#111111]">
                          {t.label}
                        </span>
                        <span className="mt-1 block text-[0.875rem] leading-[1.4] text-[#5E5E5E]">
                          {t.note}
                        </span>
                        <span
                          className="k-num mt-2 block text-[0.875rem] text-[#5E5E5E]"
                        >
                          {c.pricePerM2(range(w.lo, w.hi))}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Segmented
              legend={c.finishLevel}
              name="knst-finish"
              options={FINISHES.map((f) => ({
                id: f.id,
                label: c.finishes[f.id],
                note: fmtMul(f.mul, locale),
              }))}
              value={finish}
              onChange={(v) => setFinish(v as FinishId)}
              hint={c.finishHint}
            />
          </form>

          {/* ── Result ─────────────────────────────────────────────────
              The one thing on this page a visitor has to trust. It reads
              like a quotation sheet: a ruled header, the range, then the
              lines it is made of, which add up to exactly the number
              printed above them.
              Sticky only where there is genuinely room for it: a 1366×768
              laptop must not get a card taller than the space it is pinned
              into. ─────────────────────────────────────────────────── */}
          <div className="min-w-0 lg:top-[calc(var(--demo-bar-h)+72px)] [@media(min-width:1024px)_and_(min-height:720px)]:sticky">
            <div className="rounded-[4px] border border-[#E2E2E2] bg-[#FFFFFF]">
              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-[1.125rem] font-medium leading-[1.3] tracking-[-0.01em] text-[#111111]">
                    {c.resultTitle}
                  </p>
                  <p className={`k-num ${LBL} text-[#5E5E5E]`}>
                    {typeLabel} · {area} m²
                  </p>
                </div>

                <div aria-live="polite" aria-atomic="true" className="mt-6">
                  {result.empty ? (
                    <p className="k-num text-[clamp(1.75rem,4.6vw,2.25rem)] font-medium leading-none text-[#5E5E5E]">
                      {c.emptyTotal}
                    </p>
                  ) : (
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      {/* "nuo X" and "iki Y" wrap as pairs, never a word
                          left alone at a line end. */}
                      <span className="inline-flex items-baseline gap-x-2.5 whitespace-nowrap">
                        <span className={`${LBL} text-[#5E5E5E]`}>{c.from}</span>
                        <span className="k-num text-[clamp(1.75rem,4.6vw,2.25rem)] font-medium leading-none tracking-[-0.025em] text-[#0C388D]">
                          {c.price(fmt(result.totalLo, locale))}
                        </span>
                      </span>
                      <span className="inline-flex items-baseline gap-x-2.5 whitespace-nowrap">
                        <span className={`${LBL} text-[#5E5E5E]`}>{c.to}</span>
                        <span className="k-num text-[clamp(1.75rem,4.6vw,2.25rem)] font-medium leading-none tracking-[-0.025em] text-[#0C388D]">
                          {c.price(fmt(result.totalHi, locale))}
                        </span>
                      </span>
                    </div>
                  )}

                  <p className="k-num mt-4 text-[0.875rem] leading-[1.5] text-[#5E5E5E]">
                    {result.empty
                      ? c.emptyPrompt
                      : `${c.pricePerM2(range(result.perLo, result.perHi))} · ${c.groups(result.chosen.length)}`}
                  </p>
                </div>

                {/* Sudėtis: the lines the range is made of. The bars are
                    proportional to each group's share of the range, so the
                    weight of a decision is visible before the number is
                    even read. */}
                <div className="mt-7 border-t border-[#E2E2E2] pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className={`${LBL} text-[#5E5E5E]`}>{c.breakdown}</p>
                    <p
                      className={`${LBL} shrink-0 text-[#5E5E5E]`}
                    >
                      {c.breakdownUnit}
                    </p>
                  </div>

                  {result.empty ? (
                    <p className={`mt-4 max-w-[46ch] ${T_SM} text-[#5E5E5E]`}>
                      {c.breakdownEmpty}
                    </p>
                  ) : (
                    <ul className="mt-4 space-y-3">
                      {result.chosen.map((w) => (
                        <li key={w.id} className="min-w-0">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="min-w-0 text-[0.9375rem] leading-[1.45] text-[#111111]">
                              {workCopy[w.id].label}
                            </span>
                            <span className="k-num shrink-0 text-[0.9375rem] leading-[1.45] text-[#5E5E5E]">
                              {range(w.lo, w.hi)}
                            </span>
                          </div>
                          {/* Share bar: a full-width line scaled on X, so
                              only transform ever animates. */}
                          <span
                            aria-hidden
                            className="mt-2 block h-[2px] w-full overflow-hidden bg-[#EFEFEF]"
                          >
                            <span
                              className="block h-[2px] w-full origin-left bg-[#111111] transition-transform duration-[var(--d-el)] ease-[var(--e-out)] motion-reduce:transition-none"
                              style={{
                                transform: `scaleX(${result.span ? (w.lo + w.hi) / result.span : 0})`,
                              }}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-[#E2E2E2] pt-4">
                  <span className={`${LBL} text-[#5E5E5E]`}>
                    {c.finishLevel}
                  </span>
                  <span className="shrink-0 text-[0.9375rem] leading-[1.45] text-[#111111]">
                    {result.empty ? c.finishNone : finishSummary}
                  </span>
                </div>

                <p
                  className={`mt-6 border-t border-[#E2E2E2] pt-4 text-pretty ${T_SM} text-[#5E5E5E]`}
                >
                  {c.disclaimer}
                </p>

                {result.empty ? (
                  <>
                    <button
                      type="button"
                      disabled
                      className="mt-6 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-[4px] border border-[#E2E2E2] bg-[#F5F5F5] px-6 text-[0.9375rem] font-medium text-[#5E5E5E]"
                    >
                      {c.cta}
                    </button>
                    <p
                      className={`${LBL} mt-3 text-[#5E5E5E]`}
                    >
                      {c.ctaDisabledNote}
                    </p>
                  </>
                ) : (
                  <>
                    <a
                      href="#kontaktai"
                      onClick={handOff}
                      className={`${BTN_PRIMARY} mt-6 w-full`}
                    >
                      {c.cta}
                      <span aria-hidden className="k-arrow">
                        →
                      </span>
                    </a>
                    <p
                      className={`${LBL} mt-3 text-[#5E5E5E]`}
                    >
                      {c.ctaNote}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Segmented radio group ────────────────────────────────────────────
   Real radios under sr-only labels: arrow-key navigation, screen-reader
   grouping and form semantics come free.
   ─────────────────────────────────────────────────────────────────── */
function Segmented({
  legend,
  name,
  options,
  value,
  onChange,
  hint,
}: {
  legend: string;
  name: string;
  options: ReadonlyArray<{ id: string; label: string; note: string }>;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className={`${LBL} text-[#5E5E5E]`}>{legend}</legend>
      <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-[4px] border border-[#E2E2E2] bg-[#E2E2E2]">
        {options.map((o) => {
          const on = o.id === value;
          return (
            <label
              key={o.id}
              className={`knst-opt flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 px-2 py-3 text-center transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] ${
                on
                  ? "bg-[#0C388D] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#111111] hover:bg-[#F5F5F5] active:bg-[#EDEDED]"
              }`}
            >
              <input
                type="radio"
                name={name}
                className="sr-only"
                checked={on}
                onChange={() => onChange(o.id)}
              />
              <span
                className={`text-balance text-[0.875rem] leading-[1.25] sm:text-[0.9375rem] ${on ? "font-medium" : ""}`}
              >
                {o.label}
              </span>
              <span
                className={`k-num text-[0.8125rem] ${on ? "text-[rgba(255,255,255,0.78)]" : "text-[#5E5E5E]"}`}
              >
                {o.note}
              </span>
            </label>
          );
        })}
      </div>
      {hint ? (
        <p className={`mt-3 max-w-[56ch] text-pretty ${T_SM} text-[#5E5E5E]`}>
          {hint}
        </p>
      ) : null}
    </fieldset>
  );
}
