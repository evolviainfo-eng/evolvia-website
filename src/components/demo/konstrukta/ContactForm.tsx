"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getKonstruktaCopy } from "./copy";
import { ESTIMATE_EVENT, type EstimatePayload } from "./Estimator";
import { BTN_LINK, BTN_PRIMARY, T_SM } from "./ui";

/* Hairline fields on white: 16px text so iOS Safari never zooms in, a
   4px radius like the menu bar, blue only on focus. */
const FIELD =
  "w-full min-w-0 rounded-[4px] border border-[#D6D6D6] bg-[#FFFFFF] px-3.5 py-3 text-[1rem] leading-[1.5] text-[#111111] placeholder:text-[#8A8A8A] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-[#9A9A9A] focus:border-[#0C388D]";

const LABEL = "mb-2 block text-[0.875rem] leading-[1.4] text-[#5E5E5E]";

export function ContactForm() {
  const copy = getKonstruktaCopy(useLocale());
  const f = copy.form;
  /* The same labels the estimator sends, so its hand-off can preselect one. */
  const kinds = copy.objectTypes;
  const types = [kinds.namas, kinds.butas, kinds.komercija, kinds.kita];

  const [sent, setSent] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [objectType, setObjectType] = useState(types[0]);
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");

  /* The estimator hands its parameters over as a DOM event, so the two
     islands stay independent: no shared provider, no page-level state. */
  useEffect(() => {
    const known = Object.values(kinds);
    const onEstimate = (e: Event) => {
      const d = (e as CustomEvent<EstimatePayload>).detail;
      if (!d) return;
      setSent(false);
      setObjectType(known.includes(d.typeLabel) ? d.typeLabel : kinds.kita);
      setArea(String(d.area));
      setMessage(d.message);
      setPrefilled(true);
    };
    window.addEventListener(ESTIMATE_EVENT, onEstimate);
    return () => window.removeEventListener(ESTIMATE_EVENT, onEstimate);
  }, [kinds]);

  if (sent) {
    return (
      <div
        data-rise
        style={{ "--i": 2 } as React.CSSProperties}
        className="min-w-0 border-t border-[#0C388D] pt-6"
      >
        <div>
          <p className={`${T_SM} text-[#5E5E5E]`}>{f.sentEyebrow}</p>
          <h3 className="mt-3 text-balance text-[1.5rem] font-medium leading-[1.2] tracking-[-0.02em] text-[#111111]">
            {f.sentTitle}
          </h3>
          <p className="mt-4 max-w-[52ch] text-pretty text-[1rem] leading-[1.6] text-[#5E5E5E]">
            {f.sentBody}
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className={`${BTN_LINK} mt-7`}
          >
            {f.back}
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
      className="min-w-0"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b border-[#E2E2E2] pb-4">
        <h3 className="text-[1.375rem] font-medium leading-[1.2] tracking-[-0.015em] text-[#111111]">
          {f.title}
        </h3>
        <p className={`${T_SM} text-[#5E5E5E]`}>{f.replyTime}</p>
      </div>

      {prefilled ? (
        <p
          className={`mt-5 flex items-start gap-3 ${T_SM} text-[#111111]`}
        >
          <span
            aria-hidden
            className="mt-[0.42em] inline-block h-[9px] w-[9px] shrink-0 bg-[#0C388D]"
          />
          {f.prefilled}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label className={LABEL} htmlFor="knst-name">
            {f.nameLabel}
          </label>
          <input
            id="knst-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={f.namePlaceholder}
            className={FIELD}
          />
        </div>

        <div className="min-w-0">
          <label className={LABEL} htmlFor="knst-phone">
            {f.phoneLabel}
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
            {f.typeLabel}
          </label>
          <select
            id="knst-type-select"
            name="objectType"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
            className={FIELD}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label className={LABEL} htmlFor="knst-area-field">
            {f.areaLabel}
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
          {f.messageLabel}
        </label>
        <textarea
          id="knst-message"
          name="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={f.messagePlaceholder}
          className={`${FIELD} resize-y`}
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className={`${BTN_PRIMARY} w-full sm:w-auto`}
        >
          {f.submit}
          <span aria-hidden className="k-arrow">
            →
          </span>
        </button>
        <p className={`min-w-0 ${T_SM} max-w-[34ch] text-[#5E5E5E]`}>
          {f.demoNote}
        </p>
      </div>
    </form>
  );
}
