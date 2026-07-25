"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { CATALOG, FREE_SHIPPING_FROM, eur } from "./data";
import { Check } from "./AddToCart";
import { useShop } from "./ShopProvider";

type Step = "cart" | "checkout" | "done";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    shipping,
    total,
    missing,
    freeShipping,
    bump,
    remove,
    open,
    closeCart,
  } = useShop();

  const [step, setStep] = useState<Step>("cart");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  /* Vieninteliai uždarymo vartai — kad kitas atidarymas visada prasidėtų
     nuo krepšelio, o ne nuo pusiau užpildytos užsakymo formos. */
  const close = useCallback(() => {
    closeCart();
    setStep("cart");
  }, [closeCart]);

  /* Užrakinam puslapio slinkimą, gaudom Esc ir laikom fokusą stalčiuje. */
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previous = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const barWidth = window.innerWidth - root.clientWidth;
    const prevOverflow = root.style.overflow;
    const prevPadding = root.style.paddingRight;
    // Locks the native scroller. Lenis is what actually scrolls this page, and
    // `overflow: hidden` does not stop it (it moves the page programmatically)
    // — but SmoothScroll watches the root for exactly this lock and calls
    // lenis.stop() itself, so setting it here is enough. Hand-adding a
    // `lenis-stopped` class, as this used to, achieved nothing: Lenis derives
    // that class from its own state and strips it on the next change.
    root.style.overflow = "hidden";
    if (barWidth > 0) root.style.paddingRight = `${barWidth}px`;

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0,
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active ? panel.contains(active) : false;
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPadding;
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, close]);

  /* Pakeitus žingsnį fokusas keliauja į naują antraštę. */
  useEffect(() => {
    if (!open || step === "cart") return;
    headingRef.current?.focus();
  }, [open, step]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("done");
  };

  const progress = freeShipping
    ? 1
    : Math.max(0.02, Math.min(subtotal / FREE_SHIPPING_FROM, 1));

  const title = step === "cart" ? "Krepšelis" : "Užsakymas";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[150] overflow-hidden ${
        open ? "" : "pointer-events-none"
      }`}
      style={{ top: "var(--demo-bar-h)" }}
    >
      {/* fonas */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`absolute inset-0 bg-[rgba(36,30,25,0.42)] transition-opacity duration-[var(--d-ui)] ease-[var(--e-out)] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        inert={!open}
        className={`absolute inset-y-0 right-0 flex w-[calc(100%-2.5rem)] max-w-[27rem] flex-col border-l border-[rgba(36,30,25,0.13)] bg-[#FAF6F0] transition-transform duration-[var(--d-el)] ease-[var(--e-mass)] sm:w-full ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* antraštė */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[rgba(36,30,25,0.13)] px-5 py-4 sm:px-6">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-[1.05rem] tracking-[-0.01em] outline-none"
            style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
          >
            {step === "cart" && (count > 0 ? `Krepšelis (${count})` : "Krepšelis")}
            {step === "checkout" && "Užsakymo santrauka"}
            {step === "done" && "Užsakymas nepateiktas"}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Uždaryti krepšelį"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] text-[1.2rem] leading-none text-[#241E19] transition-[border-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:border-[rgba(36,30,25,0.4)]"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {/* turinys */}
        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6"
        >
          {step === "cart" && count === 0 && (
            <div className="flex h-full flex-col items-start justify-center py-14">
              <p
                className="text-[1.3rem] leading-[1.2] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
              >
                Krepšelis kol kas tuščias.
              </p>
              <p className="mt-3 max-w-[30ch] text-[0.92rem] leading-[1.6] text-[#6E6257]">
                Kiekviena žvakė liejama rankomis, todėl partijos nedidelės.
                Nemokamas pristatymas nuo {FREE_SHIPPING_FROM} €.
              </p>
              <a
                href="#katalogas"
                onClick={close}
                className="mt-7 inline-flex h-11 items-center rounded-full bg-[#241E19] px-6 text-[0.88rem] text-[#FAF6F0] transition-[translate,background-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:bg-[#3a3129]"
              >
                Žiūrėti katalogą
              </a>
            </div>
          )}

          {step === "cart" && count > 0 && (
            <ul className="divide-y divide-[rgba(36,30,25,0.13)]">
              {lines.map((line) => {
                const item = CATALOG[line.id];
                if (!item) return null;
                return (
                  <li key={line.id} className="flex gap-4 py-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.alt}
                      width={item.w}
                      height={item.h}
                      decoding="async"
                      loading="lazy"
                      className="h-[68px] w-[68px] shrink-0 rounded-[6px] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="min-w-0 text-[0.95rem] leading-tight break-words">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          aria-label={`Pašalinti „${item.name}“ iš krepšelio`}
                          className="-mt-1 shrink-0 p-1 text-[1.05rem] leading-none text-[#6E6257] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#241E19]"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <p className="mt-1 text-[0.78rem] text-[#6E6257]">{item.meta}</p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => bump(line.id, -1)}
                            aria-label={`Sumažinti „${item.name}“ kiekį`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] text-[0.95rem] leading-none transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[rgba(36,30,25,0.4)]"
                          >
                            <span aria-hidden="true">−</span>
                          </button>
                          <span
                            aria-live="polite"
                            className="w-7 text-center text-[0.9rem] tabular-nums"
                          >
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => bump(line.id, 1)}
                            aria-label={`Padidinti „${item.name}“ kiekį`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] text-[0.95rem] leading-none transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[rgba(36,30,25,0.4)]"
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>
                        <span className="shrink-0 text-[0.92rem] tabular-nums">
                          {eur(item.price * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {step === "checkout" && (
            <form id="skalsa-order" onSubmit={onSubmit} className="py-5">
              <ul className="divide-y divide-[rgba(36,30,25,0.13)] border-y border-[rgba(36,30,25,0.13)]">
                {lines.map((line) => {
                  const item = CATALOG[line.id];
                  if (!item) return null;
                  return (
                    <li
                      key={line.id}
                      className="flex items-baseline justify-between gap-3 py-3"
                    >
                      <span className="min-w-0 text-[0.9rem] break-words">
                        {item.name}
                        <span className="text-[#6E6257]"> × {line.qty}</span>
                      </span>
                      <span className="shrink-0 text-[0.9rem] tabular-nums">
                        {eur(item.price * line.qty)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 grid gap-4">
                <Field id="skalsa-name" label="Vardas ir pavardė" autoComplete="name" />
                <Field
                  id="skalsa-email"
                  label="El. paštas"
                  type="email"
                  autoComplete="email"
                />
                <Field
                  id="skalsa-city"
                  label="Miestas ir pristatymo adresas"
                  autoComplete="street-address"
                />
              </div>

              <p className="mt-6 border-l border-[rgba(36,30,25,0.13)] pl-4 text-[0.82rem] leading-[1.6] text-[#6E6257]">
                Tai demonstracinė parduotuvė. Paspaudus „Patvirtinti užsakymą“
                niekas nebus pateikta, apmokėta ar išsiųsta — nei prekės, nei
                jūsų duomenys niekur nekeliauja.
              </p>
            </form>
          )}

          {step === "done" && (
            <div className="py-10">
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#B4562F] text-[#FAF6F0]"
              >
                <Check size={18} />
              </span>
              <p
                className="mt-5 text-[1.3rem] leading-[1.2] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
              >
                Taip atrodytų patvirtinimas.
              </p>
              <p className="mt-3 text-[0.92rem] leading-[1.65] text-[#6E6257]">
                Čia baigiasi demonstracija: užsakymas nebuvo pateiktas, mokėjimas
                neįvyko ir jokie duomenys nebuvo išsiųsti. Tikroje parduotuvėje
                šioje vietoje pirkėjas gautų užsakymo numerį ir laišką, o jūs —
                pranešimą apie naują užsakymą.
              </p>
              <dl className="mt-7 border-t border-[rgba(36,30,25,0.13)] pt-5 text-[0.88rem]">
                <div className="flex items-baseline justify-between gap-3 py-1">
                  <dt className="text-[#6E6257]">Prekės</dt>
                  <dd className="tabular-nums">{count} vnt.</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 py-1">
                  <dt className="text-[#6E6257]">Suma</dt>
                  <dd className="tabular-nums">{eur(total)}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        {/* apačia */}
        {step === "cart" && count > 0 && (
          <div className="shrink-0 border-t border-[rgba(36,30,25,0.13)] px-5 pb-6 pt-4 sm:px-6">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#F1EAE0]">
              <span
                aria-hidden="true"
                className="block h-full w-full origin-left rounded-full bg-[#B4562F] transition-transform duration-[var(--d-ui)] ease-[var(--e-out)]"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
            <p aria-live="polite" className="mt-2.5 text-[0.8rem] text-[#6E6257]">
              {freeShipping
                ? "Pristatymas nemokamas."
                : `Nemokamas pristatymas nuo ${FREE_SHIPPING_FROM} € — trūksta ${eur(missing)}.`}
            </p>

            <dl className="mt-4 text-[0.9rem]">
              <div className="flex items-baseline justify-between gap-3 py-1">
                <dt className="text-[#6E6257]">Tarpinė suma</dt>
                <dd className="tabular-nums">{eur(subtotal)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 py-1">
                <dt className="text-[#6E6257]">Pristatymas</dt>
                <dd className="tabular-nums">
                  {freeShipping ? "Nemokamas" : eur(shipping)}
                </dd>
              </div>
              <div className="mt-2 flex items-baseline justify-between gap-3 border-t border-[rgba(36,30,25,0.13)] pt-3">
                <dt className="text-[0.95rem]">Iš viso</dt>
                <dd className="text-[1.05rem] tabular-nums">{eur(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => setStep("checkout")}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#241E19] text-[0.95rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:bg-[#3a3129] active:translate-y-[1px]"
            >
              Apmokėti
            </button>
          </div>
        )}

        {step === "checkout" && (
          <div className="shrink-0 border-t border-[rgba(36,30,25,0.13)] px-5 pb-6 pt-4 sm:px-6">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.95rem]">Iš viso</span>
              <span className="text-[1.05rem] tabular-nums">{eur(total)}</span>
            </div>
            <p className="mt-1 text-[0.78rem] text-[#6E6257]">
              Įskaitant pristatymą: {freeShipping ? "nemokamas" : eur(shipping)}
            </p>
            <button
              type="submit"
              form="skalsa-order"
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#241E19] text-[0.95rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:bg-[#3a3129] active:translate-y-[1px]"
            >
              Patvirtinti užsakymą
            </button>
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] text-[0.9rem] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-[rgba(36,30,25,0.4)]"
            >
              Grįžti į krepšelį
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="shrink-0 border-t border-[rgba(36,30,25,0.13)] px-5 pb-6 pt-4 sm:px-6">
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#241E19] text-[0.95rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:bg-[#3a3129]"
            >
              Grįžti į krepšelį
            </button>
            <button
              type="button"
              onClick={close}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] text-[0.9rem] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-[rgba(36,30,25,0.4)]"
            >
              Tęsti apsipirkimą
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.76rem] uppercase tracking-[0.1em] text-[#6E6257]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full rounded-[6px] border border-[rgba(36,30,25,0.13)] bg-[#F1EAE0] px-3.5 text-[0.92rem] text-[#241E19] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] placeholder:text-[#6E6257] focus:border-[rgba(36,30,25,0.4)]"
      />
    </div>
  );
}
