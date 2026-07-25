"use client";

import { useMemo, useState } from "react";
import { BAND, CONTAINER, SectionHead } from "./ui";

/* ── Model ──────────────────────────────────────────────────────────────
   Every group carries a €/m² band, not a single rate — the output has to
   be a range, because a real quote is. Multipliers are shown next to the
   options so the visitor can see what the calculator is doing to them.
   ────────────────────────────────────────────────────────────────────── */

const MIN_AREA = 30;
const MAX_AREA = 400;

const TYPES = [
  { id: "namas", label: "Namas", mul: 1, note: "×1,00" },
  { id: "butas", label: "Butas", mul: 0.92, note: "×0,92" },
  { id: "komercija", label: "Komercinės patalpos", mul: 1.12, note: "×1,12" },
] as const;

const FINISHES = [
  { id: "standartine", label: "Standartinė", mul: 1, note: "×1,00" },
  { id: "aukstesne", label: "Aukštesnė", mul: 1.24, note: "×1,24" },
  { id: "premium", label: "Premium", mul: 1.6, note: "×1,60" },
] as const;

const WORKS = [
  {
    id: "pamatai",
    label: "Pamatai",
    note: "Iškasos, pamatas, hidroizoliacija",
    lo: 180,
    hi: 260,
  },
  {
    id: "karkasas",
    label: "Karkasas ir sienos",
    note: "Konstrukcijos, perdangos",
    lo: 320,
    hi: 470,
  },
  {
    id: "stogas",
    label: "Stogas",
    note: "Santvaros, danga, lietaus sistema",
    lo: 150,
    hi: 230,
  },
  {
    id: "fasadas",
    label: "Fasadas",
    note: "Apšiltinimas, apdaila, langai",
    lo: 130,
    hi: 200,
  },
  {
    id: "apdaila",
    label: "Vidaus apdaila",
    note: "Nuo glaistymo iki grindų",
    lo: 380,
    hi: 620,
  },
  {
    id: "inzinerija",
    label: "Inžinerija",
    note: "Elektra, santechnika, vėdinimas",
    lo: 210,
    hi: 320,
  },
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

/** 84200 → "84 200" (non-breaking thin grouping, deterministic on server
 *  and client — Intl would be a hydration gamble). */
const fmt = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");

const round100 = (n: number) => Math.round(n / 100) * 100;
const round5 = (n: number) => Math.round(n / 5) * 5;

const RANGE_CSS = `
.knst-range{-webkit-appearance:none;appearance:none;width:100%;height:24px;background:transparent;cursor:pointer;display:block}
.knst-range::-webkit-slider-runnable-track{height:2px;border-radius:0;background:linear-gradient(90deg,#E7E5E1 0,#E7E5E1 var(--knst-p,0%),rgba(255,255,255,0.16) var(--knst-p,0%),rgba(255,255,255,0.16) 100%)}
.knst-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;margin-top:-7px;border:0;border-radius:0;background:#E7E5E1}
.knst-range::-moz-range-track{height:2px;border-radius:0;background:rgba(255,255,255,0.16)}
.knst-range::-moz-range-progress{height:2px;background:#E7E5E1}
.knst-range::-moz-range-thumb{width:16px;height:16px;border:0;border-radius:0;background:#E7E5E1}
.knst-range:focus-visible{outline:none}
.knst-range:focus-visible::-webkit-slider-thumb{outline:2px solid #E7E5E1;outline-offset:3px}
.knst-range:focus-visible::-moz-range-thumb{outline:2px solid #E7E5E1;outline-offset:3px}
.knst-numfield{appearance:textfield;-moz-appearance:textfield}
.knst-numfield::-webkit-outer-spin-button,.knst-numfield::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
`;

export function Estimator() {
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
    const chosen = WORKS.filter((w) => works[w.id]);
    const typeMul = TYPES.find((t) => t.id === type)!.mul;
    const finishMul = FINISHES.find((f) => f.id === finish)!.mul;

    /* The finish level belongs to the finishing and engineering packages,
       not to the project as a whole: choosing Premium taps cannot make a
       foundation cost 60 % more. Structural groups stay on typeMul alone. */
    const rate = (base: number, id: WorkId) =>
      base * (FINISH_SCOPED.has(id) ? finishMul : 1);

    const perLo = round5(
      typeMul * chosen.reduce((a, w) => a + rate(w.lo, w.id), 0),
    );
    const perHi = round5(
      typeMul * chosen.reduce((a, w) => a + rate(w.hi, w.id), 0),
    );

    return {
      chosen,
      empty: chosen.length === 0,
      perLo,
      perHi,
      totalLo: round100(perLo * area),
      totalHi: round100(perHi * area),
    };
  }, [works, type, finish, area]);

  const typeLabel = TYPES.find((t) => t.id === type)!.label;
  const finishLabel = FINISHES.find((f) => f.id === finish)!.label;

  /* The level is only ever part of the quote if one of the groups it prices
     is actually ticked — otherwise the honest answer is "not included". */
  const finishApplies = WORKS.some(
    (w) => works[w.id] && FINISH_SCOPED.has(w.id),
  );
  const finishSummary = finishApplies ? finishLabel : "Neįskaičiuota";

  const handOff = () => {
    if (result.empty) return;
    const message = [
      `Objekto tipas: ${typeLabel}`,
      `Plotas: ${area} m²`,
      `Darbai: ${result.chosen.map((w) => w.label).join(", ")}`,
      `Apdailos lygis: ${finishSummary}`,
      `Preliminari sąmata: ${fmt(result.totalLo)}–${fmt(result.totalHi)} € (${fmt(result.perLo)}–${fmt(result.perHi)} €/m²)`,
      "",
      "Norėčiau tikslios sąmatos po objekto apžiūros.",
    ].join("\n");

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
          label="Sąmatos skaičiuoklė"
          title="Pasitikrinkite tvarką prieš skambindami."
          lead="Įrašykite plotą, pažymėkite darbų grupes — intervalas atsinaujina iškart. Tai tie patys įkainiai, nuo kurių pradedame skaičiuoti tikrą sąmatą."
        />

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-[clamp(36px,5vw,60px)] grid gap-[clamp(28px,4vw,48px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start"
        >
          {/* ── Inputs ─────────────────────────────────────────────── */}
          <form
            className="min-w-0 space-y-9"
            onSubmit={(e) => e.preventDefault()}
          >
            <Segmented
              legend="Objekto tipas"
              name="knst-type"
              options={TYPES}
              value={type}
              onChange={(v) => setType(v as TypeId)}
            />

            {/* Plotas */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <label
                  htmlFor="knst-area"
                  className="knst-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#9A9791]"
                >
                  Plotas, m²
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
                    className="knst-mono knst-numfield w-[86px] border border-white/[0.22] bg-transparent px-3 py-2 text-right text-[0.92rem] text-[#E7E5E1] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-white/[0.4]"
                  />
                  <span className="knst-mono text-[0.78rem] text-[#9A9791]">
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
                aria-label="Objekto plotas kvadratiniais metrais"
                className="knst-range mt-5"
                style={{ "--knst-p": `${pct}%` } as React.CSSProperties}
              />
              <div className="knst-mono mt-1 flex justify-between text-[0.62rem] uppercase tracking-[0.12em] text-[#9A9791]">
                <span>{MIN_AREA} m²</span>
                <span>{MAX_AREA} m²</span>
              </div>
            </div>

            {/* Darbų apimtis */}
            <fieldset className="min-w-0">
              <legend className="knst-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#9A9791]">
                Darbų apimtis
              </legend>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {WORKS.map((w) => {
                  const on = works[w.id];
                  return (
                    <label
                      key={w.id}
                      className={`knst-opt flex min-w-0 cursor-pointer items-start gap-3 border p-3.5 transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] ${
                        on
                          ? "border-white/[0.3] bg-[#121316]"
                          : "border-white/[0.11] hover:border-white/[0.24]"
                      }`}
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
                        <span className="block text-[0.9rem] leading-snug text-[#E7E5E1]">
                          {w.label}
                        </span>
                        <span className="mt-1 block text-[0.76rem] leading-snug text-[#9A9791]">
                          {w.note}
                        </span>
                        <span className="knst-mono mt-2 block text-[0.63rem] uppercase tracking-[0.1em] text-[#9A9791]">
                          {w.lo}–{w.hi} €/m²
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Segmented
              legend="Apdailos lygis"
              name="knst-finish"
              options={FINISHES}
              value={finish}
              onChange={(v) => setFinish(v as FinishId)}
              hint="Lygis keičia tik vidaus apdailos ir inžinerijos įkainius — konstrukcijos kainuoja tiek pat."
            />
          </form>

          {/* ── Result ─────────────────────────────────────────────── */}
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--demo-bar-h)+72px)]">
            <div className="border border-white/[0.11] bg-[#121316]">
              <span aria-hidden className="block h-[2px] w-full bg-[#E8B14C]" />

              <div className="p-5 sm:p-7">
                <p className="knst-mono text-[0.63rem] uppercase tracking-[0.2em] text-[#9A9791]">
                  Preliminari sąmata
                </p>

                <div aria-live="polite" aria-atomic="true" className="mt-5">
                  {result.empty ? (
                    <p className="knst-mono text-[1.6rem] leading-none text-[#9A9791]">
                      — €
                    </p>
                  ) : (
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="knst-mono text-[0.63rem] uppercase tracking-[0.16em] text-[#9A9791]">
                        nuo
                      </span>
                      <span className="knst-mono text-[clamp(1.5rem,4.6vw,2.05rem)] leading-none tracking-[-0.01em] text-[#E7E5E1]">
                        {fmt(result.totalLo)} €
                      </span>
                      <span className="knst-mono text-[0.63rem] uppercase tracking-[0.16em] text-[#9A9791]">
                        iki
                      </span>
                      <span className="knst-mono text-[clamp(1.5rem,4.6vw,2.05rem)] leading-none tracking-[-0.01em] text-[#E7E5E1]">
                        {fmt(result.totalHi)} €
                      </span>
                    </div>
                  )}

                  <p className="knst-mono mt-4 text-[0.76rem] text-[#9A9791]">
                    {result.empty
                      ? "Pažymėkite bent vieną darbų grupę."
                      : `${fmt(result.perLo)}–${fmt(result.perHi)} €/m² · ${area} m² · ${typeLabel}`}
                  </p>
                </div>

                <dl className="mt-6 border-t border-white/[0.11] pt-4">
                  <dt className="knst-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#9A9791]">
                    Įskaičiuota
                  </dt>
                  <dd className="mt-2 text-[0.88rem] leading-[1.55] text-[#E7E5E1]">
                    {result.empty
                      ? "—"
                      : result.chosen.map((w) => w.label).join(" · ")}
                  </dd>

                  <dt className="knst-mono mt-4 text-[0.62rem] uppercase tracking-[0.16em] text-[#9A9791]">
                    Apdailos lygis
                  </dt>
                  <dd className="mt-2 text-[0.88rem] leading-[1.55] text-[#E7E5E1]">
                    {result.empty ? "—" : finishSummary}
                  </dd>
                </dl>

                <p className="mt-6 border-t border-white/[0.11] pt-4 text-[0.8rem] leading-[1.55] text-[#9A9791]">
                  Preliminaru. Tiksli kaina — po objekto apžiūros ir techninio
                  projekto peržiūros. Į skaičių neįeina sklypo darbai, baldai ir
                  projektavimas.
                </p>

                {result.empty ? (
                  <button
                    type="button"
                    disabled
                    className="mt-6 inline-flex h-12 w-full cursor-not-allowed items-center justify-center border border-white/[0.14] px-6 text-[0.9rem] font-semibold text-[#9A9791]"
                  >
                    Gauti tikslią sąmatą
                  </button>
                ) : (
                  <a
                    href="#kontaktai"
                    onClick={handOff}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center bg-[#E7E5E1] px-6 text-[0.9rem] font-semibold text-[#121316] transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90"
                  >
                    Gauti tikslią sąmatą
                  </a>
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
      <legend className="knst-mono text-[0.66rem] uppercase tracking-[0.18em] text-[#9A9791]">
        {legend}
      </legend>
      <div className="mt-4 grid grid-cols-3 gap-px border border-white/[0.11] bg-white/[0.11]">
        {options.map((o) => {
          const on = o.id === value;
          return (
            <label
              key={o.id}
              className={`knst-opt flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 px-2 py-3 text-center transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] ${
                on
                  ? "bg-[#E7E5E1] text-[#121316]"
                  : "bg-[#1A1C20] text-[#9A9791] hover:text-[#E7E5E1]"
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
                className={`text-[0.74rem] leading-tight sm:text-[0.85rem] ${on ? "font-semibold" : ""}`}
              >
                {o.label}
              </span>
              <span
                className={`knst-mono text-[0.6rem] tracking-[0.08em] ${on ? "text-[#121316]" : "text-[#9A9791]"}`}
              >
                {o.note}
              </span>
            </label>
          );
        })}
      </div>
      {hint ? (
        <p className="mt-3 max-w-[52ch] text-[0.76rem] leading-[1.5] text-[#9A9791]">
          {hint}
        </p>
      ) : null}
    </fieldset>
  );
}
