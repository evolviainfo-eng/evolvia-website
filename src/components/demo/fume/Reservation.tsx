"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Body, Eyebrow, H2, HAIRLINE } from "./Type";

/* ── Calendar vocabulary ─────────────────────────────────────────────── */

const WD_SHORT = ["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Št"];
const WD_LONG = [
  "sekmadienis",
  "pirmadienis",
  "antradienis",
  "trečiadienis",
  "ketvirtadienis",
  "penktadienis",
  "šeštadienis",
];
const WD_ACC = [
  "sekmadienį",
  "pirmadienį",
  "antradienį",
  "trečiadienį",
  "ketvirtadienį",
  "penktadienį",
  "šeštadienį",
];
const MONTH_GEN = [
  "sausio",
  "vasario",
  "kovo",
  "balandžio",
  "gegužės",
  "birželio",
  "liepos",
  "rugpjūčio",
  "rugsėjo",
  "spalio",
  "lapkričio",
  "gruodžio",
];
const MONTH_SHORT = [
  "Sau",
  "Vas",
  "Kov",
  "Bal",
  "Geg",
  "Bir",
  "Lie",
  "Rgp",
  "Rgs",
  "Spa",
  "Lap",
  "Grd",
];

const TIMES = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

/** The evening the visitor can actually book, per weekday.
 *
 *  Sunday closes at 22:00 and the kitchen takes its last order at 21:30 (see
 *  the hours table in the footer), so the last table sits at 21:00 — nine
 *  slots, not eleven. Every other open evening seats until 22:00.
 *
 *  Always a *prefix* of TIMES, which is what lets a slot index mean the same
 *  thing on every day of the week. */
function slotsFor(wd: number): string[] {
  return wd === 0 ? TIMES.slice(0, 9) : TIMES;
}

function minutesOf(t: string): number {
  return Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
}

/** Nobody takes a booking for the half hour they are standing in. */
const NOTICE_MIN = 30;

type Day = {
  iso: string;
  day: number;
  month: number;
  wd: number;
  /** Monday — salė ilsisi. */
  closed: boolean;
  /** Today, and the last table of the night has already been seated. */
  late: boolean;
};

function bookable(d: Day): boolean {
  return !d.closed && !d.late;
}

type Snapshot = {
  days: Day[];
  /** How many of TIMES have already gone by today, notice included. Slots are
   *  a prefix of TIMES, so this doubles as an index into any day's list. */
  past: number;
};

function buildSnapshot(): Snapshot {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const past = TIMES.filter((t) => minutesOf(t) <= nowMinutes + NOTICE_MIN)
    .length;

  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate() + i,
    );
    const wd = d.getDay();
    const closed = wd === 1; // pirmadieniais nedirbame
    return {
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate(),
      ).padStart(2, "0")}`,
      day: d.getDate(),
      month: d.getMonth(),
      wd,
      closed,
      late: i === 0 && !closed && past >= slotsFor(wd).length,
    };
  });

  return { days, past };
}

/** FNV-1a. Occupancy has to be *derived* from the date, never random —
 *  otherwise the same evening would show different free tables on every
 *  re-render, which no real booking widget does. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function occupancy(d: Day, past: number, isToday: boolean): boolean[] {
  const slots = slotsFor(d.wd);
  // Fridays and Saturdays fill up; early week is quiet.
  const density = d.wd === 5 || d.wd === 6 ? 60 : d.wd === 0 ? 38 : 28;
  const taken = slots.map((t, i) => hash(`${d.iso}|${t}|${i}`) % 100 < density);
  if (taken.every(Boolean)) {
    taken[2] = false;
    taken[8] = false;
  }
  // Tonight, the hours that have already gone by are simply not on offer.
  // Deliberately after the "never a fully booked evening" rescue above, so a
  // passed hour can never be handed back.
  if (isToday) {
    for (let i = 0; i < past && i < taken.length; i++) taken[i] = true;
  }
  return taken;
}

/* Both the 14-day window and "which hours are left tonight" depend on now,
   which the server and the browser can disagree about across a midnight or a
   timezone. So the snapshot is published as an external store: the server
   snapshot is `null`, the client snapshot is a cached object. React swaps them
   after hydration — no mismatch, and no setState inside an effect.

   The store also ticks. The evening moves on while the page sits open, and a
   widget still offering 19:00 at 21:40 is the fastest way to read as a
   mock-up. It republishes only when a slot has actually passed (or the date
   rolled over), so the form re-renders about ten times an evening rather than
   once a minute. */
let cached: Snapshot | null = null;

function clientSnapshot(): Snapshot {
  if (!cached) cached = buildSnapshot();
  return cached;
}
const serverSnapshot = () => null;

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(() => {
    const next = buildSnapshot();
    if (
      cached &&
      next.past === cached.past &&
      next.days[0].iso === cached.days[0].iso
    ) {
      return;
    }
    cached = next;
    onStoreChange();
  }, 60_000);
  return () => window.clearInterval(id);
}

function longDate(d: Day) {
  return `${WD_LONG[d.wd]}, ${MONTH_GEN[d.month]} ${d.day} d.`;
}

/** Accusative — "laukiame jūsų penktadienį", not "…penktadienis". */
function whenDate(d: Day) {
  return `${WD_ACC[d.wd]}, ${MONTH_GEN[d.month]} ${d.day} d.`;
}

function guestsLabel(n: number) {
  return n === 1 ? "1 svečias" : `${n} svečiai`;
}

/** Lithuanian numeral agreement: 1 laikas · 2–9 laikai · 10–20 laikų. */
function freeLabel(n: number) {
  if (n === 0) return "šį vakarą laisvų laikų nebeliko";
  const last = n % 10;
  const tens = Math.floor(n / 10) % 10;
  if (last === 1 && tens !== 1) return `šį vakarą laisvas ${n} laikas`;
  if (last === 0 || tens === 1) return `šį vakarą laisva ${n} laikų`;
  return `šį vakarą laisvi ${n} laikai`;
}

/* ── Shared control styling ──────────────────────────────────────────── */

const chipBase =
  "rounded-[2px] border font-[family-name:var(--font-fume-ui)] transition-[border-color,color,background-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)]";

/* Chosen state is cream, not ember. Against the hairline default it reads as
   "selected" perfectly well, and it keeps the page's five accent marks for the
   things that are actually accents. */
const chipOn = "border-[#ede6da] bg-[rgba(237,230,218,0.08)] text-[#ede6da]";
const chipOff =
  "border-[rgba(237,230,218,0.14)] text-[#9c948a] hover:border-[rgba(237,230,218,0.45)] hover:text-[#ede6da]";
const chipDead =
  "cursor-not-allowed border-[rgba(237,230,218,0.07)] text-[rgba(156,148,138,0.5)]";

/* Placeholders carry the only formatting guidance these fields give, so they
   sit at the palette's muted token (6.5:1 on #0c0b0a) — no alpha. */
const fieldCls =
  "w-full rounded-[2px] border bg-transparent px-3 py-3 font-[family-name:var(--font-fume-ui)] text-[0.92rem] text-[#ede6da] placeholder:text-[#9c948a] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] focus:border-[#ede6da]";

const errCls =
  "font-[family-name:var(--font-fume-ui)] text-[0.76rem] text-[#e3b08a]";

type Errors = Partial<Record<"time" | "name" | "phone", string>>;

type Booking = {
  dateLabel: string;
  dateAcc: string;
  time: string;
  guests: number;
  name: string;
};

export function Reservation() {
  const snap = useSyncExternalStore<Snapshot | null>(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const days = snap?.days ?? null;

  const [dateIso, setDateIso] = useState<string | null>(null);
  const [timeChoice, setTimeChoice] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [booking, setBooking] = useState<Booking | null>(null);

  const doneRef = useRef<HTMLParagraphElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const timeGroupRef = useRef<HTMLFieldSetElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Selection is derived, not mirrored: the first bookable evening is chosen
  // for you until you pick another one. Tonight drops out of that once its
  // last table has been seated.
  const day = useMemo(() => {
    if (!days) return null;
    return (
      days.find((d) => d.iso === dateIso && bookable(d)) ??
      days.find(bookable) ??
      null
    );
  }, [days, dateIso]);

  // The evening's own slot list and its occupancy travel together — a Sunday
  // has nine slots, and tonight's have a floor under them.
  const { slots, taken } = useMemo(() => {
    if (!day || !snap) return { slots: TIMES, taken: TIMES.map(() => false) };
    return {
      slots: slotsFor(day.wd),
      taken: occupancy(day, snap.past, day.iso === snap.days[0].iso),
    };
  }, [day, snap]);

  // Switching evenings can make the chosen hour unavailable; deriving the
  // effective time means it simply falls away instead of needing a sync.
  const timeIdx = timeChoice ? slots.indexOf(timeChoice) : -1;
  const time = timeIdx >= 0 && !taken[timeIdx] ? timeChoice : null;

  useEffect(() => {
    if (booking) doneRef.current?.focus();
  }, [booking]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    if (!time) next.time = "Pasirinkite laiką.";
    if (name.trim().length < 2) next.name = "Įrašykite, kieno vardu rezervuoti.";
    if (phone.replace(/\D/g, "").length < 8)
      next.phone = "Įrašykite telefono numerį.";
    setErrors(next);

    // A failed submit has to *take* you to the problem. Left alone, focus
    // stays on the button and a screen-reader user hears nothing at all.
    if (next.time) return void timeGroupRef.current?.focus();
    if (next.name) return void nameRef.current?.focus();
    if (next.phone) return void phoneRef.current?.focus();

    // Unreachable: an hour cannot be chosen before an evening is, so passing
    // the time check means `day` is set. Narrows the types without a cast.
    if (!day || !time) return;

    setBooking({
      dateLabel: longDate(day),
      dateAcc: whenDate(day),
      time,
      guests,
      name: name.trim(),
    });
  }

  function reset() {
    setBooking(null);
    setErrors({});
    window.requestAnimationFrame(() => formTopRef.current?.focus());
  }

  const freeCount = taken.filter((t) => !t).length;

  return (
    <section
      id="rezervacija"
      className="bg-[#141210] py-[clamp(64px,9vw,120px)]"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-start gap-[clamp(36px,5vw,72px)] lg:grid-cols-12">
          {/* ── Left: what booking here actually means ── */}
          <div data-rise className="min-w-0 lg:col-span-4">
            <Eyebrow>Rezervacija</Eyebrow>
            <H2 className="mt-6">Rezervuokite stalą</H2>
            <Body className="mt-5 max-w-[40ch]">
              Stalas lieka jūsų visam vakarui — antro serviravimo nedarome.
              Pasirinkite vakarą ir laiką, o likusia dalimi pasirūpinsime mes.
            </Body>

            <dl
              className="mt-9 space-y-4 border-t pt-6 font-[family-name:var(--font-fume-ui)] text-[0.82rem] leading-relaxed"
              style={{ borderColor: HAIRLINE }}
            >
              <div>
                <dt className="text-[#ede6da]">Pirmadieniais nedirbame</dt>
                <dd className="text-[#9c948a]">
                  Salė ilsisi, virtuvė ruošia naują kortelę.
                </dd>
              </div>
              <div>
                <dt className="text-[#ede6da]">
                  Virtuvė iki 22:30, sekmadieniais — 21:30
                </dt>
                <dd className="text-[#9c948a]">
                  Paskutinį stalą sodiname 22:00, sekmadieniais — 21:00. Vynas
                  pilamas ilgiau.
                </dd>
              </div>
              <div>
                <dt className="text-[#ede6da]">Daugiau nei aštuoni?</dt>
                <dd className="text-[#9c948a]">
                  Parašykite mums — didesnes kompanijas deriname atskirai.
                </dd>
              </div>
            </dl>
          </div>

          {/* ── Right: the working widget ── */}
          <div
            data-rise
            style={
              { "--i": 1, borderColor: HAIRLINE } as React.CSSProperties
            }
            className="min-w-0 rounded-[2px] border bg-[#0c0b0a] p-4 sm:p-7 lg:col-span-8"
          >
            {booking ? (
              <div>
                {/* accent 5 of 5 */}
                <span aria-hidden className="block h-px w-9 bg-[#C0703A]" />
                <p
                  ref={doneRef}
                  tabIndex={-1}
                  className="mt-5 font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.24em] text-[#C0703A]"
                >
                  Rezervacija patvirtinta
                </p>
                <p className="mt-4 font-[family-name:var(--font-fume-display)] text-[clamp(1.5rem,3.4vw,2.1rem)] font-light leading-[1.2] text-[#ede6da]">
                  Laukiame jūsų {booking.dateAcc},{" "}
                  <span className="italic">{booking.time}</span>.
                </p>

                <dl
                  className="mt-8 grid gap-x-8 gap-y-4 border-t pt-6 font-[family-name:var(--font-fume-ui)] text-[0.88rem] sm:grid-cols-2"
                  style={{ borderColor: HAIRLINE }}
                >
                  {[
                    ["Data", booking.dateLabel],
                    ["Laikas", booking.time],
                    ["Svečiai", guestsLabel(booking.guests)],
                    ["Vardas", booking.name],
                  ].map(([k, v]) => (
                    <div key={k} className="min-w-0">
                      <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-[#9c948a]">
                        {k}
                      </dt>
                      <dd className="mt-1.5 break-words text-[#ede6da]">{v}</dd>
                    </div>
                  ))}
                  {note.trim() && (
                    <div className="min-w-0 sm:col-span-2">
                      <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-[#9c948a]">
                        Pastaba
                      </dt>
                      <dd className="mt-1.5 break-words text-[#ede6da]">
                        {note.trim()}
                      </dd>
                    </div>
                  )}
                </dl>

                <p
                  className="mt-8 border-t pt-5 font-[family-name:var(--font-fume-ui)] text-[0.8rem] leading-relaxed text-[#9c948a]"
                  style={{ borderColor: HAIRLINE }}
                >
                  Tai demonstracinė forma. Rezervacija nebuvo atlikta ir jokie
                  duomenys niekur neišsiųsti — Fumé neegzistuoja.
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className={`${chipBase} mt-6 inline-flex h-11 items-center px-6 text-[0.85rem] tracking-[0.04em] text-[#ede6da] hover:-translate-y-[1px] hover:border-[#ede6da]`}
                  style={{ borderColor: HAIRLINE }}
                >
                  Rinktis iš naujo
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div ref={formTopRef} tabIndex={-1}>
                  {/* ── Date ── */}
                  <fieldset className="min-w-0 border-0 p-0">
                    <legend className="mb-3 font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.22em] text-[#9c948a]">
                      Vakaras
                    </legend>
                    <div
                      className="grid grid-cols-4 gap-1.5 sm:grid-cols-7 sm:gap-2"
                      aria-busy={days === null}
                    >
                      {days === null
                        ? Array.from({ length: 14 }, (_, i) => (
                            <span
                              key={i}
                              aria-hidden
                              className="h-[74px] rounded-[2px] border"
                              style={{ borderColor: HAIRLINE }}
                            />
                          ))
                        : days.map((d) => {
                            const on = d.iso === day?.iso;
                            const open = bookable(d);
                            return (
                              <button
                                key={d.iso}
                                type="button"
                                disabled={!open}
                                aria-disabled={!open}
                                aria-pressed={on}
                                aria-label={
                                  d.closed
                                    ? `${longDate(d)} — nedirbame`
                                    : d.late
                                      ? `${longDate(d)} — šiandien laikų nebeliko`
                                      : longDate(d)
                                }
                                onClick={() => setDateIso(d.iso)}
                                className={`${chipBase} flex h-[74px] min-w-0 flex-col items-center justify-center gap-1 px-1 ${
                                  !open ? chipDead : on ? chipOn : chipOff
                                }`}
                              >
                                <span className="text-[0.6rem] uppercase tracking-[0.14em]">
                                  {WD_SHORT[d.wd]}
                                </span>
                                <span className="text-[1.15rem] leading-none tabular-nums">
                                  {d.day}
                                </span>
                                <span className="text-[0.52rem] uppercase tracking-[0.06em] sm:text-[0.56rem]">
                                  {d.closed
                                    ? "Nedirbame"
                                    : d.late
                                      ? "Jau vėlu"
                                      : MONTH_SHORT[d.month]}
                                </span>
                              </button>
                            );
                          })}
                    </div>
                  </fieldset>

                  {/* ── Time ── */}
                  <fieldset
                    ref={timeGroupRef}
                    tabIndex={-1}
                    className="mt-8 min-w-0 border-0 p-0"
                  >
                    <legend className="mb-3 font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.22em] text-[#9c948a]">
                      Laikas
                    </legend>
                    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6 sm:gap-2">
                      {slots.map((t, i) => {
                        const busy = taken[i];
                        const on = t === time;
                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={busy || !day}
                            aria-disabled={busy || !day}
                            aria-pressed={on}
                            aria-label={busy ? `${t} — užimta` : t}
                            onClick={() => {
                              setTimeChoice(t);
                              setErrors((p) => ({ ...p, time: undefined }));
                            }}
                            className={`${chipBase} h-11 min-w-0 px-1 text-[0.88rem] tabular-nums ${
                              busy
                                ? `${chipDead} line-through`
                                : on
                                  ? chipOn
                                  : chipOff
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    <p
                      aria-live="polite"
                      className="mt-2.5 font-[family-name:var(--font-fume-ui)] text-[0.74rem] text-[#9c948a]"
                    >
                      {day
                        ? `Perbraukti laikai užimti — ${freeLabel(freeCount)}.`
                        : "Perbraukti laikai užimti."}
                    </p>
                    {errors.time && (
                      <p role="alert" className={`mt-1.5 ${errCls}`}>
                        {errors.time}
                      </p>
                    )}
                  </fieldset>

                  {/* ── Guests ── */}
                  <fieldset className="mt-8 min-w-0 border-0 p-0">
                    <legend className="mb-3 font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.22em] text-[#9c948a]">
                      Svečiai
                    </legend>
                    <div className="grid grid-cols-8 gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-pressed={n === guests}
                          aria-label={guestsLabel(n)}
                          onClick={() => setGuests(n)}
                          className={`${chipBase} h-11 min-w-0 text-[0.9rem] tabular-nums ${
                            n === guests ? chipOn : chipOff
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* ── Details ── */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label
                        htmlFor="fume-name"
                        className="mb-2 block font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.22em] text-[#9c948a]"
                      >
                        Vardas
                      </label>
                      <input
                        ref={nameRef}
                        id="fume-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "fume-name-err" : undefined}
                        placeholder="Vardas Pavardė"
                        className={fieldCls}
                        style={{
                          borderColor: errors.name
                            ? "rgba(227,176,138,0.7)"
                            : HAIRLINE,
                        }}
                      />
                      {errors.name && (
                        <p
                          id="fume-name-err"
                          role="alert"
                          className={`mt-2 ${errCls}`}
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="min-w-0">
                      <label
                        htmlFor="fume-phone"
                        className="mb-2 block font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.22em] text-[#9c948a]"
                      >
                        Telefonas
                      </label>
                      <input
                        ref={phoneRef}
                        id="fume-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                          errors.phone ? "fume-phone-err" : undefined
                        }
                        placeholder="+370 600 00000"
                        className={fieldCls}
                        style={{
                          borderColor: errors.phone
                            ? "rgba(227,176,138,0.7)"
                            : HAIRLINE,
                        }}
                      />
                      {errors.phone && (
                        <p
                          id="fume-phone-err"
                          role="alert"
                          className={`mt-2 ${errCls}`}
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="min-w-0 sm:col-span-2">
                      <label
                        htmlFor="fume-note"
                        className="mb-2 block font-[family-name:var(--font-fume-ui)] text-[0.66rem] uppercase tracking-[0.22em] text-[#9c948a]"
                      >
                        Pastaba <span className="normal-case tracking-normal">(nebūtina)</span>
                      </label>
                      <textarea
                        id="fume-note"
                        name="note"
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Alergijos, gimtadienis, vieta prie lango…"
                        className={`${fieldCls} resize-y`}
                        style={{ borderColor: HAIRLINE }}
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* accent 4 of 5 */}
                    <button
                      type="submit"
                      className="inline-flex h-12 shrink-0 items-center justify-center rounded-[2px] bg-[#C0703A] px-7 font-[family-name:var(--font-fume-ui)] text-[0.9rem] font-medium tracking-[0.03em] text-[#0c0b0a] transition-transform duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-[2px]"
                    >
                      Rezervuoti
                    </button>
                    {/* The evening is always preselected, so the only thing
                        left to ask for is the hour. */}
                    <p className="min-w-0 font-[family-name:var(--font-fume-ui)] text-[0.78rem] leading-relaxed text-[#9c948a]">
                      {day && time
                        ? `${longDate(day)}, ${time} · ${guestsLabel(guests)}`
                        : "Pasirinkite laiką."}
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
