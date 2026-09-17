"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { getKonstruktaCopy } from "./copy";
import { BAND, CONTAINER, SectionHead, T_MICRO, T_SM } from "./ui";

/* ── Model ──────────────────────────────────────────────────────────────
   Every group carries a €/m² band, not a single rate — the output has to
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
.knst-range::-webkit-slider-runnable-track{height:2px;border-radius:0;background:linear-gradient(90deg,#E7E5E1 0,#E7E5E1 var(--knst-p,0%),rgba(255,255,255,0.16) var(--knst-p,0%),rgba(255,255,255,0.16) 100%)}
.knst-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;margin-top:-7px;border:0;border-radius:0;background:#E7E5E1;transition:transform var(--d-tap) var(--e-out)}
.knst-range:hover::-webkit-slider-thumb{transform:scale(1.2)}
.knst-range:active::-webkit-slider-thumb{transform:scale(.9)}
.knst-range::-moz-range-track{height:2px;border-radius:0;background:rgba(255,255,255,0.16)}
.knst-range::-moz-range-progress{height:2px;background:#E7E5E1}
.knst-range::-moz-range-thumb{width:16px;height:16px;border:0;border-radius:0;background:#E7E5E1;transition:transform var(--d-tap) var(--e-out)}
.knst-range:hover::-moz-range-thumb{transform:scale(1.2)}
.knst-range:active::-moz-range-thumb{transform:scale(.9)}
.knst-range:focus-visible{outline:none}
.knst-range:focus-visible::-webkit-slider-thumb{outline:2px solid #E7E5E1;outline-offset:3px}
.knst-range:focus-visible::-moz-range-thumb{outline:2px solid #E7E5E1;outline-offset:3px}
.knst-numfield{appearance:textfield;-moz-appearance:textfield}
.knst-numfield::-webkit-outer-spin-button,.knst-numfield::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
@keyframes knst-pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:none}}
.knst-pop{animation:knst-pop var(--d-tap) var(--e-out)}
`;

export function Estimator() {
  const locale = useLocale();
  const copy = getKonstruktaCopy(locale);
  const c = copy.estimator;
  const workCopy = c.works;
  /** "180–260" in the page's number format. */
  const range = (lo: number, hi: number) =>
    `${fmt(lo, locale)}–${fmt(hi, locale)}`;

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
       rounded lines — so a visitor who adds the breakdown up on paper gets
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
     is actually ticked — otherwise the honest answer is "not included". */
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
      className={`${BAND} border-t border-white/[0.11] bg-[#1A1C20]`}
    >
      <style>{RANGE_CSS}</style>

      <div className={CONTAINER}>
        <SectionHead
          index="05"
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
                  className={`${T_MICRO} text-[#9A9791]`}
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
                    className="knst-mono knst-numfield w-[86px] border border-white/[0.22] bg-transparent px-3 py-2 text-right text-[0.9375rem] text-[#E7E5E1] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-white/[0.5] focus:border-white/[0.5]"
                  />
                  <span className="knst-mono text-[0.8125rem] text-[#9A9791]">
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
                className={`${T_MICRO} mt-1 flex justify-between tracking-[0.12em] text-[#9A9791]`}
              >
                <span>{MIN_AREA} m²</span>
                <span>{MAX_AREA} m²</span>
              </div>
            </div>

            {/* Darbų apimtis */}
            <fieldset className="min-w-0">
              <legend className={`${T_MICRO} text-[#9A9791]`}>
                {c.worksLegend}
              </legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {WORKS.map((w) => {
                  const on = works[w.id];
                  const t = workCopy[w.id];
                  return (
                    <label
                      key={w.id}
                      className={`knst-opt flex min-w-0 cursor-pointer items-start gap-3 border p-3.5 transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] ${
                        on
                          ? "border-white/[0.3] bg-[#121316] hover:border-white/[0.5]"
                          : "border-white/[0.11] hover:border-white/[0.3] hover:bg-white/[0.02]"
                      } active:border-white/[0.7]`}
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
                            ? "border-[#E8B14C] bg-[#E8B14C]"
                            : "border-white/[0.28]"
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
                              stroke="#121316"
                              strokeWidth="1.8"
                            />
                          </svg>
                        ) : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.9375rem] leading-[1.35] text-[#E7E5E1]">
                          {t.label}
                        </span>
                        <span className="mt-1 block text-[0.8125rem] leading-[1.4] text-[#9A9791]">
                          {t.note}
                        </span>
                        <span
                          className={`${T_MICRO} mt-2 block tracking-[0.1em] text-[#9A9791]`}
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
              lines it is made of — which add up to exactly the number
              printed above them.
              Sticky only where there is genuinely room for it: a 1366×768
              laptop must not get a card taller than the space it is pinned
              into. ─────────────────────────────────────────────────── */}
          <div className="min-w-0 lg:top-[calc(var(--demo-bar-h)+72px)] [@media(min-width:1024px)_and_(min-height:720px)]:sticky">
            <div className="border border-white/[0.11] bg-[#121316]">
              <span aria-hidden className="block h-[2px] w-full bg-[#E8B14C]" />

              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className={`${T_MICRO} tracking-[0.2em] text-[#9A9791]`}>
                    {c.resultTitle}
                  </p>
                  <p className={`${T_MICRO} tracking-[0.12em] text-[#9A9791]`}>
                    {typeLabel} · {area} m²
                  </p>
                </div>

                <div aria-live="polite" aria-atomic="true" className="mt-6">
                  {result.empty ? (
                    <p className="knst-mono text-[clamp(1.5rem,4.6vw,1.875rem)] leading-none text-[#9A9791]">
                      {c.emptyTotal}
                    </p>
                  ) : (
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className={`${T_MICRO} tracking-[0.16em] text-[#9A9791]`}
                      >
                        {c.from}
                      </span>
                      <span className="knst-mono text-[clamp(1.5rem,4.6vw,1.875rem)] leading-none tracking-[-0.01em] text-[#E7E5E1]">
                        {c.price(fmt(result.totalLo, locale))}
                      </span>
                      <span
                        className={`${T_MICRO} tracking-[0.16em] text-[#9A9791]`}
                      >
                        {c.to}
                      </span>
                      <span className="knst-mono text-[clamp(1.5rem,4.6vw,1.875rem)] leading-none tracking-[-0.01em] text-[#E7E5E1]">
                        {c.price(fmt(result.totalHi, locale))}
                      </span>
                    </div>
                  )}

                  <p className="knst-mono mt-4 text-[0.8125rem] leading-[1.5] text-[#9A9791]">
                    {result.empty
                      ? c.emptyPrompt
                      : `${c.pricePerM2(range(result.perLo, result.perHi))} · ${c.groups(result.chosen.length)}`}
                  </p>
                </div>

                {/* Sudėtis — the lines the range is made of. The bars are
                    proportional to each group's share of the range, so the
                    weight of a decision is visible before the number is
                    even read. */}
                <div className="mt-7 border-t border-white/[0.11] pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className={`${T_MICRO} text-[#9A9791]`}>{c.breakdown}</p>
                    <p
                      className={`${T_MICRO} shrink-0 tracking-[0.12em] text-[#9A9791]`}
                    >
                      {c.breakdownUnit}
                    </p>
                  </div>

                  {result.empty ? (
                    <p className={`mt-4 max-w-[46ch] ${T_SM} text-[#9A9791]`}>
                      {c.breakdownEmpty}
                    </p>
                  ) : (
                    <ul className="mt-4 space-y-3">
                      {result.chosen.map((w) => (
                        <li key={w.id} className="min-w-0">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="min-w-0 text-[0.8125rem] leading-[1.45] text-[#E7E5E1]">
                              {workCopy[w.id].label}
                            </span>
                            <span className="knst-mono shrink-0 text-[0.6875rem] leading-[1.45] text-[#9A9791]">
                              {range(w.lo, w.hi)}
                            </span>
                          </div>
                          <span
                            aria-hidden
                            className="mt-2 block h-[2px] w-full bg-white/[0.09]"
                          >
                            <span
                              className="block h-[2px] bg-white/[0.5] transition-[width] duration-[var(--d-el)] ease-[var(--e-out)]"
                              style={{
                                width: `${result.span ? ((w.lo + w.hi) / result.span) * 100 : 0}%`,
                              }}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-white/[0.11] pt-4">
                  <span className={`${T_MICRO} text-[#9A9791]`}>
                    {c.finishLevel}
                  </span>
                  <span className="shrink-0 text-[0.8125rem] leading-[1.45] text-[#E7E5E1]">
                    {result.empty ? c.finishNone : finishSummary}
                  </span>
                </div>

                <p
                  className={`mt-6 border-t border-white/[0.11] pt-4 text-pretty ${T_SM} text-[#9A9791]`}
                >
                  {c.disclaimer}
                </p>

                {result.empty ? (
                  <>
                    <button
                      type="button"
                      disabled
                      className="mt-6 inline-flex h-12 w-full cursor-not-allowed items-center justify-center border border-white/[0.11] bg-white/[0.02] px-6 text-[0.9375rem] font-semibold text-[#9A9791] opacity-70"
                    >
                      {c.cta}
                    </button>
                    <p
                      className={`${T_MICRO} mt-3 tracking-[0.12em] text-[#9A9791]`}
                    >
                      {c.ctaDisabledNote}
                    </p>
                  </>
                ) : (
                  <>
                    <a
                      href="#kontaktai"
                      onClick={handOff}
                      className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#E7E5E1] px-6 text-[0.9375rem] font-semibold text-[#121316] transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0 active:opacity-80"
                    >
                      {c.cta}
                    </a>
                    <p
                      className={`${T_MICRO} mt-3 tracking-[0.12em] text-[#9A9791]`}
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
      <legend className={`${T_MICRO} text-[#9A9791]`}>{legend}</legend>
      <div className="mt-4 grid grid-cols-3 gap-px border border-white/[0.11] bg-white/[0.11]">
        {options.map((o) => {
          const on = o.id === value;
          return (
            <label
              key={o.id}
              className={`knst-opt flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 px-2 py-3 text-center transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] ${
                on
                  ? "bg-[#E7E5E1] text-[#121316]"
                  : "bg-[#1A1C20] text-[#9A9791] hover:bg-[#212329] hover:text-[#E7E5E1] active:bg-[#121316]"
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
                className={`text-balance text-[0.6875rem] leading-[1.25] sm:text-[0.8125rem] ${on ? "font-semibold" : ""}`}
              >
                {o.label}
              </span>
              <span
                className={`knst-mono text-[0.6875rem] tracking-[0.08em] ${on ? "text-[#121316]" : "text-[#9A9791]"}`}
              >
                {o.note}
              </span>
            </label>
          );
        })}
      </div>
      {hint ? (
        <p className={`mt-3 max-w-[56ch] text-pretty ${T_SM} text-[#9A9791]`}>
          {hint}
        </p>
      ) : null}
    </fieldset>
  );
}
