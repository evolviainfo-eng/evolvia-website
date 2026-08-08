"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { motion, useTransform } from "framer-motion";
import { useSheetGesture } from "./useSheetGesture";
import { CATALOG, FREE_SHIPPING_FROM, PRODUCTS, eur } from "./data";
import { Check } from "./AddToCart";
import { useShop } from "./ShopProvider";

type Step = "cart" | "checkout" | "done";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const STEPS: { key: Step; label: string }[] = [
  { key: "cart", label: "Krepšelis" },
  { key: "checkout", label: "Duomenys" },
  { key: "done", label: "Patvirtinimas" },
];

/* Tuščias krepšelis irgi turi ką pasiūlyti — du katalogo įrašai, tos pačios
   kainos, tas pats „pridėti“. Jokių „populiariausių“: tai būtų prasimanytas
   faktas apie neegzistuojančią parduotuvę. */
const SUGGESTED = [PRODUCTS[0], PRODUCTS[2]];

export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    shipping,
    total,
    missing,
    freeShipping,
    add,
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
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0);
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

  /* The panel is grabbable, so its motion cannot be a CSS transition — those
     finish what they started. See useSheetGesture for the projection maths. */
  const sheet = useSheetGesture(open, close);
  /* The scrim tracks the drag 1:1 the whole way, not just at the ends: the
     further the panel is thrown, the more the page behind comes back. */
  const scrim = useTransform(sheet.x, [0, sheet.width], [1, 0]);

  const progress = freeShipping
    ? 1
    : Math.max(0.015, Math.min(subtotal / FREE_SHIPPING_FROM, 1));

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const title = step === "cart" ? "Krepšelis" : "Užsakymas";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[150] overflow-hidden ${
        open ? "" : "pointer-events-none"
      }`}
      style={{ top: "var(--demo-bar-h)" }}
    >
      {/* fonas */}
      <motion.div
        onClick={close}
        aria-hidden="true"
        style={sheet.reduce ? undefined : { opacity: scrim }}
        className={`absolute inset-0 bg-[rgba(36,30,25,0.42)] backdrop-blur-[3px] ${
          sheet.reduce
            ? `transition-opacity duration-[var(--d-el)] ease-[var(--e-out)] ${open ? "opacity-100" : "opacity-0"}`
            : ""
        }`}
      />

      <motion.div
        ref={(el) => {
          panelRef.current = el;
          sheet.measure(el);
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
        inert={!open}
        /* Drag right to dismiss — the same path it arrived along. Dragging the
           other way finds nothing, so it rubber-bands instead of stopping dead.
           dragDirectionLock keeps a horizontal throw from stealing the
           vertical scroll of the item list. */
        drag={sheet.reduce ? false : "x"}
        dragDirectionLock
        dragConstraints={{ left: 0, right: sheet.width }}
        dragElastic={{ left: 0.06, right: 0 }}
        dragMomentum={false}
        onDragEnd={(_, info) => sheet.onDragEnd(info.velocity.x)}
        style={sheet.reduce ? undefined : { x: sheet.x, touchAction: "pan-y" }}
        className={`absolute inset-y-0 right-0 flex w-[calc(100%-2.5rem)] max-w-[27rem] flex-col border-l border-[rgba(36,30,25,0.13)] bg-[#FAF6F0] shadow-[-24px_0_60px_-30px_rgba(36,30,25,0.55)] sm:w-full ${
          sheet.reduce
            ? `transition-transform duration-[var(--d-el)] ease-[var(--e-out)] ${open ? "translate-x-0" : "translate-x-full"}`
            : ""
        }`}
      >
        {/* antraštė */}
        <div className="shrink-0 border-b border-[rgba(36,30,25,0.13)] px-5 pb-4 pt-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="min-w-0 truncate text-[1.0625rem] tracking-[-0.01em] outline-none"
              style={{
                fontFamily: "var(--font-skalsa-display)",
                fontWeight: 500,
              }}
            >
              {step === "cart" &&
                (count > 0 ? `Krepšelis (${count})` : "Krepšelis")}
              {step === "checkout" && "Užsakymo santrauka"}
              {step === "done" && "Užsakymas nepateiktas"}
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Uždaryti krepšelį"
              className="press inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] text-[#241E19] transition-[background-color,border-color,rotate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:rotate-90 hover:border-[rgba(36,30,25,0.34)] hover:bg-[#F1EAE0]"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M1 1l9 9M10 1l-9 9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {(count > 0 || step !== "cart") && (
            <ol className="mt-4 flex items-center gap-2">
              {STEPS.map((s, i) => {
                const state =
                  i < stepIndex ? "done" : i === stepIndex ? "now" : "next";
                return (
                  <li
                    key={s.key}
                    className="flex min-w-0 flex-1 items-center gap-2 last:flex-none"
                  >
                    <span
                      aria-current={state === "now" ? "step" : undefined}
                      className={`shrink-0 text-[0.6875rem] uppercase tracking-[0.1em] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] sm:text-[0.6875rem] sm:tracking-[0.12em] ${
                        state === "next" ? "text-[#A79C90]" : "text-[#241E19]"
                      }`}
                    >
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="h-px min-w-0 flex-1 overflow-hidden bg-[rgba(36,30,25,0.13)]"
                      >
                        <span
                          className={`block h-full w-full origin-left bg-[#B4562F] transition-transform duration-[var(--d-el)] ease-[var(--e-out)] ${
                            i < stepIndex ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* turinys */}
        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6"
        >
          {step === "cart" && count === 0 && (
            <div className="flex flex-col py-12">
              <span aria-hidden="true" className="text-[#B4562F]">
                <Candle />
              </span>
              <p
                className="mt-6 text-[1.25rem] leading-[1.2] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-skalsa-display)",
                  fontWeight: 500,
                }}
              >
                Krepšelis kol kas tuščias.
              </p>
              <p className="mt-3 max-w-[32ch] text-[0.9375rem] leading-[1.6] text-pretty text-[#6E6257]">
                Kiekviena žvakė liejama rankomis, todėl partijos nedidelės.
                Nemokamas pristatymas nuo {FREE_SHIPPING_FROM} €.
              </p>
              <a
                href="#katalogas"
                onClick={close}
                className="group mt-7 press inline-flex h-11 w-fit items-center gap-2.5 rounded-full bg-[#241E19] pl-6 pr-5 text-[0.8125rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:bg-[#3A3129] active:translate-y-0"
              >
                Žiūrėti katalogą
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                  className="transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-x-[3px]"
                >
                  <path
                    d="M1 5h11.4M8.7 1.2 12.5 5 8.7 8.8"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <p className="mt-10 border-t border-[rgba(36,30,25,0.13)] pt-6 text-[0.6875rem] uppercase tracking-[0.14em] text-[#6E6257]">
                Galima pradėti nuo šių
              </p>
              <ul className="mt-4 grid gap-3">
                {SUGGESTED.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => add(p.id)}
                      aria-label={`Įdėti „${p.name}“ į krepšelį`}
                      className="group flex w-full items-center gap-3.5 rounded-[10px] border border-[rgba(36,30,25,0.13)] bg-[#F1EAE0] p-2.5 text-left transition-[background-color,border-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-[rgba(36,30,25,0.34)] hover:bg-[#EDE4D8]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.img}
                        alt=""
                        width={p.w}
                        height={p.h}
                        decoding="async"
                        loading="lazy"
                        className="h-12 w-12 shrink-0 rounded-[6px] object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.9375rem] leading-tight">
                          {p.name}
                        </span>
                        <span className="mt-1 block text-[0.8125rem] tabular-nums text-[#6E6257]">
                          {eur(p.price)} · {p.burn} val.
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] bg-[#FAF6F0] text-[0.9375rem] leading-none transition-[background-color,color,border-color] duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:border-[#241E19] group-hover:bg-[#241E19] group-hover:text-[#FAF6F0]"
                      >
                        +
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === "cart" && count > 0 && (
            <ul className="divide-y divide-[rgba(36,30,25,0.13)]">
              {lines.map((line, i) => {
                const item = CATALOG[line.id];
                if (!item) return null;
                return (
                  <li
                    key={line.id}
                    /* Pakopa įsijungia tik atidarytam stalčiui: uždarius klasė
                       nukrenta, todėl kitą kartą animacija paleidžiama iš naujo
                       — ir būtent tada, kai eilutės iš tikrųjų matomos. */
                    className={`flex gap-4 py-5 ${open ? "sk-row" : ""}`}
                    style={{ "--i": i } as React.CSSProperties}
                  >
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
                        <p className="min-w-0 text-[0.9375rem] leading-tight break-words">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          aria-label={`Pašalinti „${item.name}“ iš krepšelio`}
                          className="-mr-1 -mt-1 press inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#6E6257] transition-[background-color,color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:bg-[#F1EAE0] hover:text-[#B4562F]"
                        >
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 11 11"
                            fill="none"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              d="M1 1l9 9M10 1l-9 9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-1 text-[0.8125rem] text-[#6E6257]">
                        {item.meta}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div
                          aria-live="polite"
                          className="inline-flex items-center rounded-full border border-[rgba(36,30,25,0.13)]"
                        >
                          <QtyButton
                            onClick={() => bump(line.id, -1)}
                            label={
                              line.qty > 1
                                ? `Sumažinti „${item.name}“ kiekį`
                                : `Pašalinti „${item.name}“ iš krepšelio`
                            }
                            side="left"
                          >
                            <span aria-hidden="true">−</span>
                          </QtyButton>
                          <span
                            key={line.qty}
                            className="sk-pop w-7 text-center text-[0.8125rem] tabular-nums"
                          >
                            {line.qty}
                          </span>
                          <QtyButton
                            onClick={() => bump(line.id, 1)}
                            label={`Padidinti „${item.name}“ kiekį`}
                            side="right"
                            disabled={line.qty >= 99}
                          >
                            <span aria-hidden="true">+</span>
                          </QtyButton>
                        </div>
                        <span className="shrink-0 text-[0.9375rem] tabular-nums">
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
                      <span className="min-w-0 text-[0.9375rem] break-words">
                        {item.name}
                        <span className="text-[#6E6257]"> × {line.qty}</span>
                      </span>
                      <span className="shrink-0 text-[0.9375rem] tabular-nums">
                        {eur(item.price * line.qty)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-7 grid gap-4">
                <Field
                  id="skalsa-name"
                  label="Vardas ir pavardė"
                  autoComplete="name"
                />
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

              <p className="mt-7 border-l-2 border-[#B4562F] pl-4 text-[0.8125rem] leading-[1.6] text-pretty text-[#6E6257]">
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
                className="sk-stamp press inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#B4562F] text-[#FAF6F0]"
              >
                <Check size={18} />
              </span>
              <p
                className="mt-5 text-[1.25rem] leading-[1.2] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-skalsa-display)",
                  fontWeight: 500,
                }}
              >
                Taip atrodytų patvirtinimas.
              </p>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-pretty text-[#6E6257]">
                Čia baigiasi demonstracija: užsakymas nebuvo pateiktas,
                mokėjimas neįvyko ir jokie duomenys nebuvo išsiųsti. Tikroje
                parduotuvėje šioje vietoje pirkėjas gautų užsakymo numerį ir
                laišką, o jūs — pranešimą apie naują užsakymą.
              </p>
              <dl className="mt-7 border-t border-[rgba(36,30,25,0.13)] pt-5 text-[0.8125rem]">
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
          <div className="shrink-0 border-t border-[rgba(36,30,25,0.13)] px-5 pb-6 pt-5 sm:px-6">
            <div
              className="h-[3px] w-full overflow-hidden rounded-full bg-[#F1EAE0]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={FREE_SHIPPING_FROM}
              aria-valuenow={Math.min(Math.round(subtotal), FREE_SHIPPING_FROM)}
              aria-label={`Iki nemokamo pristatymo — riba ${FREE_SHIPPING_FROM} €`}
            >
              <span
                aria-hidden="true"
                className="block h-full w-full origin-left rounded-full bg-[#B4562F] transition-transform duration-[var(--d-el)] ease-[var(--e-out)]"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
            <p
              aria-live="polite"
              className="mt-3 flex items-center gap-2 text-[0.8125rem] text-[#6E6257]"
            >
              {freeShipping ? (
                <>
                  <span aria-hidden="true" className="text-[#B4562F]">
                    <Check size={11} />
                  </span>
                  Pristatymas nemokamas.
                </>
              ) : (
                `Nemokamas pristatymas nuo ${FREE_SHIPPING_FROM} € — trūksta ${eur(missing)}.`
              )}
            </p>

            <dl className="mt-5 text-[0.9375rem]">
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
                <dt className="text-[0.9375rem]">Iš viso</dt>
                <dd className="text-[1.0625rem] tabular-nums">{eur(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => setStep("checkout")}
              className="group mt-5 press inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#241E19] text-[0.9375rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:bg-[#3A3129] active:translate-y-[1px]"
            >
              Pereiti prie užsakymo
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
                focusable="false"
                className="transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-x-[3px]"
              >
                <path
                  d="M1 5h11.4M8.7 1.2 12.5 5 8.7 8.8"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        {step === "checkout" && (
          <div className="shrink-0 border-t border-[rgba(36,30,25,0.13)] px-5 pb-6 pt-5 sm:px-6">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.9375rem]">Iš viso</span>
              <span className="text-[1.0625rem] tabular-nums">
                {eur(total)}
              </span>
            </div>
            <p className="mt-1 text-[0.8125rem] text-[#6E6257]">
              Įskaitant pristatymą: {freeShipping ? "nemokamas" : eur(shipping)}
            </p>
            <button
              type="submit"
              form="skalsa-order"
              className="mt-4 press inline-flex h-12 w-full items-center justify-center rounded-full bg-[#241E19] text-[0.9375rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:bg-[#3A3129] active:translate-y-[1px]"
            >
              Patvirtinti užsakymą
            </button>
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="mt-2.5 press inline-flex h-11 w-full items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] text-[0.8125rem] transition-[background-color,border-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-[rgba(36,30,25,0.34)] hover:bg-[#F1EAE0]"
            >
              Grįžti į krepšelį
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="shrink-0 border-t border-[rgba(36,30,25,0.13)] px-5 pb-6 pt-5 sm:px-6">
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="press inline-flex h-12 w-full items-center justify-center rounded-full bg-[#241E19] text-[0.9375rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:bg-[#3A3129] active:translate-y-[1px]"
            >
              Grįžti į krepšelį
            </button>
            <button
              type="button"
              onClick={close}
              className="mt-2.5 press inline-flex h-11 w-full items-center justify-center rounded-full border border-[rgba(36,30,25,0.13)] text-[0.8125rem] transition-[background-color,border-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-[rgba(36,30,25,0.34)] hover:bg-[#F1EAE0]"
            >
              Tęsti apsipirkimą
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/** Kiekio mygtukas — kairė arba dešinė segmento pusė. */
function QtyButton({
  onClick,
  label,
  side,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  side: "left" | "right";
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className={`inline-flex h-8 w-8 items-center justify-center text-[0.9375rem] leading-none transition-[background-color,color] duration-[var(--d-tap)] ease-[var(--e-out)] hover:bg-[#F1EAE0] active:bg-[#E7DCCD] disabled:pointer-events-none disabled:text-[#BDB2A5] ${
        side === "left" ? "rounded-l-full" : "rounded-r-full"
      }`}
    >
      {children}
    </button>
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
        className="block text-[0.6875rem] uppercase tracking-[0.14em] text-[#6E6257]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full rounded-[6px] border border-[rgba(36,30,25,0.13)] bg-[#F1EAE0] px-3.5 text-[0.9375rem] text-[#241E19] transition-[background-color,border-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:border-[rgba(36,30,25,0.34)] focus:border-[rgba(36,30,25,0.4)] focus:bg-[#FAF6F0]"
      />
    </div>
  );
}

/** Žvakė — tuščio krepšelio ženklas. Piešiama, o ne emoji. */
function Candle() {
  return (
    <svg
      width="30"
      height="38"
      viewBox="0 0 30 38"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 1.6c2.9 3.2 4.3 5.7 4.3 7.6a4.3 4.3 0 1 1-8.6 0c0-1.9 1.4-4.4 4.3-7.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M15 14v3.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect
        x="4.7"
        y="17.4"
        width="20.6"
        height="19"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.55"
      />
      <path
        d="M4.7 23.4h20.6"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.35"
      />
    </svg>
  );
}
