"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  MUTED,
  SERIF,
  T_BODY,
  T_META,
  T_SMALL,
} from "@/components/demo/forma/tokens";

/* No `outline-none` here on purpose: it compiles into Tailwind's utilities
   layer as `outline-style:none` and would leave every control with nothing but
   a 1px border tint to mark focus. The demo-scoped `.forma :focus-visible`
   ring in page.tsx is the visible indicator; the border shift is the accent,
   and it now has three states — resting, under the pointer, focused — so no
   field is ever dead. */
const FIELD =
  "mt-2 h-12 w-full min-w-0 rounded-none border-0 border-b border-[rgba(26,25,23,0.24)] bg-transparent px-0 text-[0.9375rem] text-[#1A1917] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] placeholder:text-[#8A857C] hover:border-[rgba(26,25,23,0.5)] focus:border-[#1A1917]";

const LABEL = `block ${T_META}`;

export function ContactForm() {
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
      <div className="border-t border-[rgba(26,25,23,0.24)] pt-8">
        <p
          style={SERIF}
          className="max-w-[20ch] text-[clamp(1.5rem,3vw,1.875rem)] leading-[1.15] tracking-[-0.015em] text-balance"
        >
          Ačiū — bet nieko neišsiuntėme.
        </p>
        <p className={`mt-4 max-w-[46ch] ${T_BODY}`} style={{ color: MUTED }}>
          Tai demonstracinė svetainė, todėl užklausa niekur nekeliavo. Tikroje
          svetainėje ši forma per kelias sekundes atsidurtų studijos pašte, o
          jūs gautumėte patvirtinimą.
        </p>
        <button
          ref={resetRef}
          type="button"
          onClick={() => {
            setSent(false);
            formRef.current?.reset();
          }}
          className="mt-7 press inline-flex h-12 items-center rounded-full border border-[rgba(26,25,23,0.24)] px-6 text-[0.9375rem] transition-[background-color,color,border-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-px hover:border-[#1A1917] hover:bg-[#1A1917] hover:text-[#F4F1EC] active:translate-y-0 active:opacity-80"
        >
          Pildyti iš naujo
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="border-t border-[rgba(26,25,23,0.24)] pt-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            className={LABEL}
            htmlFor="forma-vardas"
            style={{ color: MUTED }}
          >
            Vardas
          </label>
          <input
            id="forma-vardas"
            name="vardas"
            type="text"
            required
            autoComplete="name"
            placeholder="Kaip į jus kreiptis"
            className={FIELD}
          />
        </div>
        <div className="min-w-0">
          <label
            className={LABEL}
            htmlFor="forma-pastas"
            style={{ color: MUTED }}
          >
            El. paštas
          </label>
          <input
            id="forma-pastas"
            name="pastas"
            type="email"
            required
            autoComplete="email"
            placeholder="vardas@pastas.lt"
            className={FIELD}
          />
        </div>
        <div className="min-w-0">
          <label
            className={LABEL}
            htmlFor="forma-tipas"
            style={{ color: MUTED }}
          >
            Objektas
          </label>
          {/* `appearance-none` strips the native arrow along with the native
              styling, so the affordance has to be drawn back — without it the
              select is indistinguishable from a text field. */}
          <div className="relative">
            <select
              id="forma-tipas"
              name="tipas"
              defaultValue="butas"
              className={`${FIELD} cursor-pointer appearance-none pr-7`}
            >
              <option value="butas">Butas</option>
              <option value="namas">Namas</option>
              <option value="komercine">Komercinė erdvė</option>
              <option value="nezinau">Dar nežinau</option>
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[20px] right-[3px] h-[7px] w-[7px] rotate-45 border-b border-r"
              style={{ borderColor: MUTED }}
            />
          </div>
        </div>
        <div className="min-w-0">
          <label
            className={LABEL}
            htmlFor="forma-plotas"
            style={{ color: MUTED }}
          >
            Plotas, m²
          </label>
          <input
            id="forma-plotas"
            name="plotas"
            type="text"
            inputMode="numeric"
            placeholder="pvz. 74"
            className={FIELD}
          />
        </div>
      </div>

      <div className="mt-6 min-w-0">
        <label
          className={LABEL}
          htmlFor="forma-zinute"
          style={{ color: MUTED }}
        >
          Trumpai apie erdvę
        </label>
        <textarea
          id="forma-zinute"
          name="zinute"
          rows={3}
          placeholder="Kada planuojate pradėti, kas erdvėje netinka, ko norėtumėte."
          className={`${FIELD} h-auto resize-none py-3 leading-[1.65]`}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="press inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#1A1917] px-7 text-[0.9375rem] text-[#F4F1EC] transition-[translate,opacity] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-px hover:opacity-90 active:translate-y-0 active:opacity-75"
        >
          Siųsti užklausą
        </button>
        <p
          className={`min-w-0 max-w-[34ch] ${T_SMALL}`}
          style={{ color: MUTED }}
        >
          Atsakome per vieną darbo dieną. Pirmas pokalbis — nemokamas.
        </p>
      </div>
    </form>
  );
}
