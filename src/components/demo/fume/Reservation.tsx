"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getFumeCopy } from "./copy";
import { Body, H2, HAIRLINE, Label, Note, RULE } from "./Type";

/* ── Calendar ────────────────────────────────────────────────────────── */

/* Day and month names, and every date the widget prints, come from the copy
   as fixed word lists (not Intl), so the text is the same on the server and
   in every browser. */

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
 *  the hours table in the footer), so the last table sits at 21:00: nine
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
  /** Monday: salė ilsisi. */
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
  const past = TIMES.filter(
    (t) => minutesOf(t) <= nowMinutes + NOTICE_MIN,
  ).length;

  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
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

/** FNV-1a. Occupancy has to be *derived* from the date, never random:
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
   after hydration: no mismatch, and no setState inside an effect.

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

/* ── Shared control styling ──────────────────────────────────────────── */

const chipBase =
  "rounded-[2px] border font-[family-name:var(--font-fume-ui)] transition-[border-color,color,background-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)]";

/* Hairline cells; the chosen one is filled paper with charcoal figures
   (Studenterkilden's selected cell, inverted for the dark page). Copper is
   kept for the frame and the submit button.
   Pressed states darken rather than move: a 25-chip grid that lifts under the
   pointer reads as a toy. */
const chipOn =
  "border-[#efe7dc] bg-[#efe7dc] text-[#1b1714] active:bg-[#d9cfc1]";
const chipOff =
  "border-[rgba(239,231,220,0.16)] text-[#c4b8a9] hover:border-[rgba(239,231,220,0.5)] hover:text-[#efe7dc] active:bg-[rgba(239,231,220,0.1)]";
const chipDead =
  "cursor-not-allowed border-[rgba(239,231,220,0.07)] text-[rgba(174,162,148,0.45)]";

/* The submit is the copper reservation button, the same one as in the nav,
   the hero and the menu card (`.fume-btn--cu` in FumePage). */
const submitBtn = "fume-btn fume-btn--cu shrink-0";

/* Legends and labels are the page's small spaced capitals. */
const legendCls = "fume-label mb-3 block";
const labelCls = "fume-label mb-2 block";

/* Placeholders carry the only formatting guidance these fields give, so they
   sit at the palette's muted token (6.5:1 on #0c0b0a), no alpha. */
const fieldCls =
  "w-full rounded-[2px] border bg-transparent px-3 py-3 font-[family-name:var(--font-fume-ui)] text-[0.9375rem] text-[#efe7dc] placeholder:text-[#a59a8d] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] focus:border-[#efe7dc]";

const errCls =
  "font-[family-name:var(--font-fume-ui)] text-[0.875rem] text-[#e3b08a]";

type Errors = Partial<Record<"time" | "name" | "phone", string>>;

type Booking = {
  dateLabel: string;
  /** The date as it reads inside the confirmation sentence (Lithuanian puts
   *  it in the accusative there). */
  dateInSentence: string;
  time: string;
  guests: number;
  name: string;
};

export function Reservation() {
  const copy = getFumeCopy(useLocale()).reservation;
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

  // The evening's own slot list and its occupancy travel together: a Sunday
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
    if (!time) next.time = copy.errors.time;
    if (name.trim().length < 2) next.name = copy.errors.name;
    if (phone.replace(/\D/g, "").length < 8) next.phone = copy.errors.phone;
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
      dateLabel: copy.dateLabel(day),
      dateInSentence: copy.dateInSentence(day),
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

  // An evening can legitimately run out: late on a busy Tuesday the only slot
  // left may already be taken. That is a designed state, not a dead end: the
  // next open evening is offered by name.
  const nextOpen = useMemo(() => {
    if (!days || !day) return null;
    return days.find((d) => bookable(d) && d.iso > day.iso) ?? null;
  }, [days, day]);

  const helper = !day
    ? copy.helper.noDay
    : freeCount === 0
      ? copy.helper.full
      : copy.helper.free(freeCount);

  return (
    <section id="rezervacija" className="py-[var(--sec)]">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8">
        {/* The header is Zimmerl's calm centred block; the widget below it is
            unchanged in behaviour, restyled only. */}
        <div
          data-group
          className="mx-auto flex max-w-[720px] flex-col items-center text-center"
        >
          <Label>{copy.eyebrow}</Label>
          <H2 className="mt-6">{copy.title}</H2>
          <Body lines className="mt-8 max-w-[48ch]">
            {copy.lead}
          </Body>
        </div>

        {/* What booking here actually means: three short notes in a ruled
            row over the widget (stacked on a phone), so neither column is
            left beside a void. */}
        <div data-group className="mx-auto mt-[var(--gap)] max-w-[880px]">
          <dl
            className="grid border-t font-[family-name:var(--font-fume-ui)] text-[0.9375rem] leading-[1.6] sm:grid-cols-3"
            style={{ borderColor: RULE }}
          >
            {[copy.facts.closed, copy.facts.kitchen, copy.facts.groups].map(
              (f, i) => (
                <div
                  key={f.dt}
                  className={`min-w-0 py-5 sm:px-6 sm:py-7 ${
                    i > 0 ? "max-sm:border-t sm:border-l" : "sm:pl-0"
                  } ${i === 2 ? "sm:pr-0" : ""}`}
                  style={{ borderColor: HAIRLINE }}
                >
                  <dt className="text-[#efe7dc]">{f.dt}</dt>
                  <dd className="mt-1 text-[#b9ad9f]">{f.dd}</dd>
                </div>
              ),
            )}
          </dl>

          {/* ── The working widget ── */}
          <div className="fume-frame mt-6 min-w-0 bg-[#231e1a] px-3 py-5 sm:mt-8 sm:p-10">
            {booking ? (
              /* The confirmation is the one place on the page that arrives
                 without being scrolled to, so it gets its own short gesture:
                 five parts, 100 ms apart, the same rhythm the scroll groups
                 use. */
              <div className="fume-arrive">
                <span
                  aria-hidden
                  className="block h-px w-9 bg-[#b8794a]"
                  style={{ "--n": 0 } as React.CSSProperties}
                />
                <p
                  ref={doneRef}
                  tabIndex={-1}
                  style={{ "--n": 1 } as React.CSSProperties}
                  className="fume-label mt-5 text-[#efe7dc]"
                >
                  {copy.done.title}
                </p>
                <p
                  style={{ "--n": 2 } as React.CSSProperties}
                  className="mt-4 text-balance font-[family-name:var(--font-fume-display)] text-[clamp(1.5rem,3.4vw,1.875rem)] font-light leading-[1.2] text-[#efe7dc]"
                >
                  {copy.done.lead}
                  {booking.dateInSentence}
                  {copy.done.join}
                  <span className="italic">{booking.time}</span>
                  {copy.done.end}
                </p>

                <dl
                  className="mt-8 grid gap-x-8 gap-y-4 border-t pt-6 font-[family-name:var(--font-fume-ui)] text-[0.9375rem] sm:grid-cols-2"
                  style={
                    { borderColor: HAIRLINE, "--n": 3 } as React.CSSProperties
                  }
                >
                  {[
                    [copy.labels.date, booking.dateLabel],
                    [copy.labels.time, booking.time],
                    [copy.labels.guests, copy.guests(booking.guests)],
                    [copy.labels.name, booking.name],
                  ].map(([k, v]) => (
                    <div key={k} className="min-w-0">
                      <dt className="fume-label text-[0.75rem] text-[#c4b8a9]">
                        {k}
                      </dt>
                      <dd className="mt-1.5 break-words text-[#efe7dc]">{v}</dd>
                    </div>
                  ))}
                  {note.trim() && (
                    <div className="min-w-0 sm:col-span-2">
                      <dt className="fume-label text-[0.75rem] text-[#c4b8a9]">
                        {copy.labels.note}
                      </dt>
                      <dd className="mt-1.5 break-words text-[#efe7dc]">
                        {note.trim()}
                      </dd>
                    </div>
                  )}
                </dl>

                <div
                  className="mt-8 border-t pt-5"
                  style={
                    { borderColor: HAIRLINE, "--n": 4 } as React.CSSProperties
                  }
                >
                  <Note>{copy.done.note}</Note>

                  <button
                    type="button"
                    onClick={reset}
                    className={`${chipBase} mt-6 inline-flex h-11 items-center px-6 text-[0.875rem] tracking-[0.04em] text-[#efe7dc] hover:-translate-y-[1px] hover:border-[#efe7dc] hover:bg-[rgba(239,231,220,0.06)] active:translate-y-0 active:bg-[rgba(239,231,220,0.12)]`}
                    style={{ borderColor: HAIRLINE }}
                  >
                    {copy.done.again}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div ref={formTopRef} tabIndex={-1}>
                  {/* ── Date ── */}
                  <fieldset className="min-w-0 border-0 p-0">
                    <legend className={legendCls}>
                      {copy.labels.evening}
                    </legend>
                    <div
                      className="grid grid-cols-4 gap-1 sm:grid-cols-7 sm:gap-2"
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
                        : days.map((d, i) => {
                            const on = d.iso === day?.iso;
                            const open = bookable(d);
                            const date = copy.dateLabel(d);
                            const when =
                              i === 0
                                ? copy.day.today
                                : i === 1
                                  ? copy.day.tomorrow
                                  : copy.monthShort[d.month];
                            return (
                              <button
                                key={d.iso}
                                type="button"
                                disabled={!open}
                                aria-disabled={!open}
                                aria-pressed={on}
                                aria-label={
                                  d.closed
                                    ? copy.dayAria(date, copy.closedAria)
                                    : d.late
                                      ? copy.dayAria(date, copy.lateAria)
                                      : i === 1
                                        ? copy.dayAria(
                                            date,
                                            copy.day.tomorrowSpoken,
                                          )
                                        : i === 0
                                          ? copy.dayAria(
                                              date,
                                              when.toLowerCase(),
                                            )
                                          : date
                                }
                                onClick={() => setDateIso(d.iso)}
                                className={`${chipBase} flex h-[74px] min-w-0 flex-col items-center justify-center gap-1 px-0.5 ${
                                  !open ? chipDead : on ? chipOn : chipOff
                                }`}
                              >
                                <span className="text-[0.75rem] uppercase tracking-[0.1em]">
                                  {copy.weekdayShort[d.wd]}
                                </span>
                                <span className="text-[1.0625rem] leading-none tabular-nums">
                                  {d.day}
                                </span>
                                <span className="max-w-full truncate text-[0.75rem] uppercase tracking-normal sm:tracking-[0.04em]">
                                  {d.closed
                                    ? copy.day.closed
                                    : d.late
                                      ? copy.day.late
                                      : when}
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
                    <legend className={legendCls}>
                      {copy.labels.time}
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
                            aria-label={busy ? copy.takenAria(t) : t}
                            onClick={() => {
                              setTimeChoice(t);
                              setErrors((p) => ({ ...p, time: undefined }));
                            }}
                            className={`${chipBase} h-11 min-w-0 px-1 text-[0.9375rem] tabular-nums ${
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
                      className="mt-2.5 font-[family-name:var(--font-fume-ui)] text-[0.875rem] text-[#b9ad9f]"
                    >
                      {helper}
                    </p>
                    {day && freeCount === 0 && (
                      <div
                        className="mt-4 rounded-[2px] border p-4"
                        style={{ borderColor: HAIRLINE }}
                      >
                        <p className="font-[family-name:var(--font-fume-ui)] text-[0.9375rem] leading-[1.6] text-[#efe7dc]">
                          {copy.full.title}
                        </p>
                        <Note className="mt-1.5 max-w-[46ch]">
                          {copy.full.note}
                        </Note>
                        {nextOpen && (
                          <button
                            type="button"
                            onClick={() => setDateIso(nextOpen.iso)}
                            className={`${chipBase} ${chipOff} mt-4 inline-flex h-11 items-center px-5 text-[0.875rem] tracking-[0.03em]`}
                          >
                            {copy.full.pick(nextOpen)}
                          </button>
                        )}
                      </div>
                    )}
                    {errors.time && (
                      <p role="alert" className={`mt-3 ${errCls}`}>
                        {errors.time}
                      </p>
                    )}
                  </fieldset>

                  {/* ── Guests ── */}
                  <fieldset className="mt-8 min-w-0 border-0 p-0">
                    <legend className={legendCls}>
                      {copy.labels.guests}
                    </legend>
                    <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-8 sm:gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-pressed={n === guests}
                          aria-label={copy.guests(n)}
                          onClick={() => setGuests(n)}
                          className={`${chipBase} h-11 min-w-0 text-[0.9375rem] tabular-nums ${
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
                        className={labelCls}
                      >
                        {copy.labels.name}
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
                        aria-describedby={
                          errors.name ? "fume-name-err" : undefined
                        }
                        placeholder={copy.namePlaceholder}
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
                        className={labelCls}
                      >
                        {copy.labels.phone}
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
                        className={labelCls}
                      >
                        {copy.labels.note}{" "}
                        <span className="normal-case tracking-normal">
                          {copy.optional}
                        </span>
                      </label>
                      <textarea
                        id="fume-note"
                        name="note"
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={copy.notePlaceholder}
                        className={`${fieldCls} resize-y`}
                        style={{ borderColor: HAIRLINE }}
                      />
                    </div>
                  </div>

                  <div
                    className="mt-8 border-t pt-6"
                    style={{ borderColor: HAIRLINE }}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                            <button type="submit" className={submitBtn}>
                        {copy.submit}
                      </button>
                      {/* The evening is always preselected, so the only thing
                          left to ask for is the hour. */}
                      <p
                        aria-live="polite"
                        className="min-w-0 font-[family-name:var(--font-fume-ui)] text-[0.9375rem] leading-[1.6] text-[rgba(239,231,220,0.9)]"
                      >
                        {day && time
                          ? `${copy.dateLabel(day)}, ${time} · ${copy.guests(guests)}`
                          : copy.summaryEmpty}
                      </p>
                    </div>
                    <Note className="mt-4 max-w-[52ch]">{copy.formNote}</Note>
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
