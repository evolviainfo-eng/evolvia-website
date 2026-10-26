"use client";

import { useRef, useState, type FormEvent, type Ref } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getFormaCopy } from "@/components/demo/forma/copy";
import {
  HAIR_DARK,
  SAND,
  SAND_MUTED,
  T_BODY,
  T_SMALL,
} from "@/components/demo/forma/tokens";

/* No `outline-none` here on purpose: it compiles into Tailwind's utilities
   layer as `outline-style:none` and would leave every control with nothing but
   a 1px border tint to mark focus. The demo-scoped `.forma :focus-visible`
   ring in FormaPage (sand on this dark ground) is the visible indicator; the
   underline has three states, resting, under the pointer, focused, so no
   field is ever dead. Underlined inputs on the dark contact ground, labels
   14px sand, as TARQ's footer. Placeholders 5.2:1 on #171717. */
const FIELD =
  "mt-2 h-12 w-full min-w-0 rounded-none border-0 border-b border-[rgba(217,212,194,0.3)] bg-transparent px-0 text-[1rem] font-light text-[#D9D4C2] placeholder:text-[#8E897F] hover:border-[rgba(217,212,194,0.55)] focus:border-[#D9D4C2]";

const LABEL = `block ${T_SMALL}`;

/** The one button on the dark ground: a sand outline whose sand fill wipes
 *  in from the left by clip-path, carrying its own ink copy of the label, so
 *  no colour is ever transitioned. `.f-btn` lives in FormaPage's stylesheet. */
function WipeButton({
  label,
  type,
  onClick,
  btnRef,
}: {
  label: string;
  type: "submit" | "button";
  onClick?: () => void;
  btnRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      className={`f-btn h-12 shrink-0 px-8 ${T_SMALL}`}
      style={{ color: SAND }}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="f-btn-fill px-8">
        {label}
      </span>
    </button>
  );
}

export function ContactForm() {
  const locale = useLocale();
  const t = getFormaCopy(locale).form;
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    // move focus onto the confirmation so screen readers land on it
    window.requestAnimationFrame(() =>
      resetRef.current?.focus({ preventScroll: true }),
    );
  }

  if (sent) {
    return (
      <div className="border-t pt-8" style={{ borderColor: HAIR_DARK }}>
        <p className="max-w-[24ch] text-[clamp(1.375rem,2vw,1.75rem)] font-light leading-[1.25] text-balance">
          {t.sentTitle}
        </p>
        <p className={`mt-4 max-w-[46ch] ${T_BODY}`}>{t.sentBody}</p>
        <div className="mt-7">
          <WipeButton
            btnRef={resetRef}
            type="button"
            label={t.again}
            onClick={() => {
              setSent(false);
              formRef.current?.reset();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="border-t pt-8"
      style={{ borderColor: HAIR_DARK }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            className={LABEL}
            htmlFor="forma-vardas"
            style={{ color: SAND }}
          >
            {t.name}
          </label>
          <input
            id="forma-vardas"
            name="vardas"
            type="text"
            required
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={FIELD}
          />
        </div>
        <div className="min-w-0">
          <label
            className={LABEL}
            htmlFor="forma-pastas"
            style={{ color: SAND }}
          >
            {t.email}
          </label>
          <input
            id="forma-pastas"
            name="pastas"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={FIELD}
          />
        </div>
        <div className="min-w-0">
          <label
            className={LABEL}
            htmlFor="forma-tipas"
            style={{ color: SAND }}
          >
            {t.type}
          </label>
          {/* `appearance-none` strips the native arrow along with the native
              styling, so the affordance has to be drawn back, without it the
              select is indistinguishable from a text field. */}
          <div className="relative">
            <select
              id="forma-tipas"
              name="tipas"
              defaultValue="butas"
              className={`${FIELD} cursor-pointer appearance-none pr-7`}
            >
              <option value="butas">{t.types.butas}</option>
              <option value="namas">{t.types.namas}</option>
              <option value="komercine">{t.types.komercine}</option>
              <option value="nezinau">{t.types.nezinau}</option>
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[20px] right-[3px] h-[7px] w-[7px] rotate-45 border-b border-r"
              style={{ borderColor: SAND_MUTED }}
            />
          </div>
        </div>
        <div className="min-w-0">
          <label
            className={LABEL}
            htmlFor="forma-plotas"
            style={{ color: SAND }}
          >
            {t.area}
          </label>
          <input
            id="forma-plotas"
            name="plotas"
            type="text"
            inputMode="numeric"
            placeholder={t.areaPlaceholder}
            className={FIELD}
          />
        </div>
      </div>

      <div className="mt-6 min-w-0">
        <label
          className={LABEL}
          htmlFor="forma-zinute"
          style={{ color: SAND }}
        >
          {t.message}
        </label>
        <textarea
          id="forma-zinute"
          name="zinute"
          rows={3}
          placeholder={t.messagePlaceholder}
          className={`${FIELD} h-auto resize-none py-3 leading-[1.65]`}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <WipeButton type="submit" label={t.submit} />
        <p
          className={`min-w-0 max-w-[34ch] ${T_SMALL}`}
          style={{ color: SAND_MUTED }}
        >
          {t.note}
        </p>
      </div>
    </form>
  );
}
