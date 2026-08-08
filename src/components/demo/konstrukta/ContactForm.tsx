"use client";

import { useEffect, useState } from "react";
import { ESTIMATE_EVENT, type EstimatePayload } from "./Estimator";
import { T_MICRO, T_SM } from "./ui";

const TYPES = ["Namas", "Butas", "Komercinės patalpos", "Kita"];

const FIELD =
  "w-full min-w-0 border border-white/[0.22] bg-transparent px-3.5 py-3 text-[0.9375rem] leading-[1.5] text-[#E7E5E1] placeholder:text-[#9A9791] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-white/[0.34] focus:border-white/[0.5]";

const LABEL = `${T_MICRO} mb-2 block text-[#9A9791]`;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [objectType, setObjectType] = useState(TYPES[0]);
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  /* The estimator hands its parameters over as a DOM event, so the two
     islands stay independent — no shared provider, no page-level state. */
  useEffect(() => {
    const onEstimate = (e: Event) => {
      const d = (e as CustomEvent<EstimatePayload>).detail;
      if (!d) return;
      setSent(false);
      setObjectType(TYPES.includes(d.typeLabel) ? d.typeLabel : "Kita");
      setArea(String(d.area));
      setMessage(d.message);
      setPrefilled(true);
    };
    window.addEventListener(ESTIMATE_EVENT, onEstimate);
    return () => window.removeEventListener(ESTIMATE_EVENT, onEstimate);
  }, []);

  if (sent) {
    return (
      <div
        data-rise
        style={{ "--i": 2 } as React.CSSProperties}
        className="min-w-0 border border-white/[0.11] bg-[#1A1C20]"
      >
        <span aria-hidden className="block h-px w-full bg-white/[0.22]" />
        <div className="p-6 sm:p-8">
          <p className={`${T_MICRO} tracking-[0.2em] text-[#9A9791]`}>
            Užklausa suformuota
          </p>
          <h3 className="mt-4 text-balance text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#E7E5E1]">
            Forma veikia — bet niekas neišsiųsta.
          </h3>
          <p
            className={`mt-4 max-w-[52ch] text-pretty text-[0.9375rem] leading-[1.62] text-[#9A9791]`}
          >
            Tai demonstracinė svetainė, todėl užklausa niekur nekeliavo ir jokio
            skambučio nebus. Tikroje svetainėje ši užklausa jau būtų nukeliavusi
            į jūsų el. paštą su visais skaičiuoklės parametrais.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className={`${T_MICRO} mt-7 inline-flex h-11 items-center border border-white/[0.22] px-5 tracking-[0.14em] text-[#E7E5E1] transition-[border-color,background-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-white/[0.5] hover:bg-white/[0.05] active:bg-white/[0.1]`}
          >
            Grįžti į formą
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      data-rise
      style={{ "--i": 2 } as React.CSSProperties}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="min-w-0 border border-white/[0.11] bg-[#1A1C20] p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
        <p className={`${T_MICRO} tracking-[0.2em] text-[#9A9791]`}>
          Užklausa dėl apžiūros
        </p>
        <p className={`${T_MICRO} tracking-[0.12em] text-[#9A9791]`}>
          Atsakome per 1 darbo dieną
        </p>
      </div>

      {prefilled ? (
        <p
          className={`${T_MICRO} mt-5 border border-white/[0.22] px-3 py-2.5 tracking-[0.12em] text-[#E7E5E1]`}
        >
          Parametrai perkelti iš skaičiuoklės
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={LABEL} htmlFor="knst-name">
            Vardas
          </label>
          <input
            id="knst-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Vardenis"
            className={FIELD}
          />
        </div>

        <div className="min-w-0">
          <label className={LABEL} htmlFor="knst-phone">
            Telefonas
          </label>
          <input
            id="knst-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+370 …"
            className={FIELD}
          />
        </div>

        <div className="min-w-0">
          <label className={LABEL} htmlFor="knst-type-select">
            Objekto tipas
          </label>
          <select
            id="knst-type-select"
            name="objectType"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
            className={FIELD}
          >
            {TYPES.map((t) => (
              <option key={t} value={t} className="bg-[#1A1C20]">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label className={LABEL} htmlFor="knst-area-field">
            Plotas, m²
          </label>
          <input
            id="knst-area-field"
            name="area"
            type="text"
            inputMode="numeric"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="180"
            className={FIELD}
          />
        </div>
      </div>

      <div className="mt-5 min-w-0">
        <label className={LABEL} htmlFor="knst-message">
          Apie objektą
        </label>
        <textarea
          id="knst-message"
          name="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Sklypas, terminai, ką jau turite (projektą, leidimą, sąmatą)…"
          className={`${FIELD} resize-y`}
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center bg-[#E8B14C] px-6 text-[0.9375rem] font-semibold text-[#121316] transition-[translate,background-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:bg-[#F2BE5F] active:translate-y-0 active:bg-[#D9A343] sm:w-auto sm:px-9"
        >
          Siųsti užklausą
        </button>
        <p className={`min-w-0 ${T_SM} max-w-[34ch] text-[#9A9791]`}>
          Demonstracinė forma — užklausa niekur neišsiunčiama.
        </p>
      </div>
    </form>
  );
}
