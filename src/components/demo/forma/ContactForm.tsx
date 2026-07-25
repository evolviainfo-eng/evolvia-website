"use client";

import { useRef, useState, type FormEvent } from "react";

/* No `outline-none` here on purpose: it compiles into Tailwind's utilities
   layer as `outline-style:none` and would leave every control with nothing but
   a 1px border tint to mark focus. The demo-scoped `.forma :focus-visible`
   ring in page.tsx is the visible indicator; the border shift is the accent. */
const FIELD =
  "mt-2 h-12 w-full min-w-0 rounded-none border-0 border-b border-[rgba(26,25,23,0.24)] bg-transparent px-0 text-[0.95rem] text-[#1A1917] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] placeholder:text-[#6B6660] focus:border-[#1A1917]";

const LABEL = "block text-[0.72rem] uppercase tracking-[0.16em] text-[#6B6660]";

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
          style={{ fontFamily: "var(--font-forma-display)" }}
          className="text-[clamp(1.5rem,3vw,2rem)] leading-[1.15]"
        >
          Ačiū — bet nieko neišsiuntėme.
        </p>
        <p className="mt-4 max-w-[46ch] text-[0.92rem] leading-[1.7] text-[#6B6660]">
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
          className="mt-7 inline-flex h-12 items-center rounded-full border border-[rgba(26,25,23,0.24)] px-6 text-[0.9rem] transition-[background-color,color,border-color] duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[#1A1917] hover:bg-[#1A1917] hover:text-[#F4F1EC]"
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
          <label className={LABEL} htmlFor="forma-vardas">
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
          <label className={LABEL} htmlFor="forma-pastas">
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
          <label className={LABEL} htmlFor="forma-tipas">
            Objektas
          </label>
          <select
            id="forma-tipas"
            name="tipas"
            defaultValue="butas"
            className={`${FIELD} appearance-none`}
          >
            <option value="butas">Butas</option>
            <option value="namas">Namas</option>
            <option value="komercine">Komercinė erdvė</option>
            <option value="nezinau">Dar nežinau</option>
          </select>
        </div>
        <div className="min-w-0">
          <label className={LABEL} htmlFor="forma-plotas">
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
        <label className={LABEL} htmlFor="forma-zinute">
          Trumpai apie erdvę
        </label>
        <textarea
          id="forma-zinute"
          name="zinute"
          rows={3}
          placeholder="Kada planuojate pradėti, kas erdvėje netinka, ko norėtumėte."
          className={`${FIELD} h-auto resize-none py-3 leading-[1.6]`}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#1A1917] px-7 text-[0.92rem] text-[#F4F1EC] transition-[translate,opacity] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:opacity-90"
        >
          Siųsti užklausą
        </button>
        <p className="min-w-0 text-[0.78rem] leading-[1.6] text-[#656059]">
          Atsakome per vieną darbo dieną. Pirmas pokalbis — nemokamas.
        </p>
      </div>
    </form>
  );
}
