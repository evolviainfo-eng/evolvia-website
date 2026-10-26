"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizePath } from "@/i18n/config";
import { site } from "@/content/site";
import { enquiry, fill, type EnquiryCopy } from "../copy/enquiry";
import s from "./EnquiryForm.module.css";

/* The enquiry form. One component for both places it lives: inline on
   /kontaktai (variant "page") and inside the enquiry sheet (variant
   "sheet"). It posts JSON to Formspree and never leaves the page.

   States: idle, submitting (button busy, fields locked), success (the form
   is replaced by what happens next) and error (the text stays, a retry and
   a mailto with everything pre-filled). Validation is inline: a field is
   checked when the visitor leaves it, and after a failed submit every
   field is checked as it is typed in. */

type Fields = {
  name: string;
  email: string;
  phone: string;
  business: string;
  website: string;
  need: string;
  message: string;
};
type Key = keyof Fields;
type Errors = Partial<Record<Key, string>>;
type Phase = "idle" | "sending" | "sent" | "failed";

const EMPTY: Fields = { name: "", email: "", phone: "", business: "", website: "", need: "", message: "" };
const ORDER: Key[] = ["name", "email", "phone", "business", "website", "need", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s./-]+$/;

function check(k: Key, v: string, t: EnquiryCopy["validation"]): string | undefined {
  const x = v.trim();
  switch (k) {
    case "name":
      return x ? undefined : t.nameMissing;
    case "email":
      if (!x) return t.emailMissing;
      return EMAIL_RE.test(x) ? undefined : t.emailInvalid;
    case "phone":
      if (!x) return undefined;
      return PHONE_RE.test(x) && x.replace(/\D/g, "").length >= 6 ? undefined : t.phoneInvalid;
    case "business":
      return x ? undefined : t.businessMissing;
    case "need":
      return x ? undefined : t.needMissing;
    case "message":
      if (!x) return t.messageMissing;
      return x.length < 12 ? t.messageShort : undefined;
    default:
      return undefined;
  }
}

export function EnquiryForm({
  variant,
  onClose,
}: {
  variant: "page" | "sheet";
  /** The sheet's close action, offered once the enquiry is sent. */
  onClose?: () => void;
}) {
  const locale = useLocale();
  const c = enquiry[locale] as EnquiryCopy;
  const uid = useId().replace(/:/g, "");
  const id = (k: string) => `${variant}-${uid}-${k}`;

  const [v, setV] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [gotcha, setGotcha] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLDivElement>(null);

  const needLabel = c.needs.find((n) => n.value === v.need)?.label ?? "";
  const sending = phase === "sending";

  const set = (k: Key, value: string) => {
    setV((p) => ({ ...p, [k]: value }));
    if (attempted || errors[k]) setErrors((e) => ({ ...e, [k]: check(k, value, c.validation) }));
  };
  const blur = (k: Key) => {
    const val = v[k];
    if (val.trim() || attempted) setErrors((e) => ({ ...e, [k]: check(k, val, c.validation) }));
  };

  const mailto = () => {
    const vars = {
      name: v.name.trim(),
      email: v.email.trim(),
      phone: v.phone.trim() || "-",
      business: v.business.trim(),
      website: v.website.trim() || "-",
      need: needLabel || "-",
      message: v.message.trim(),
    };
    const subject = fill(c.notification.mailSubject, vars);
    const body = fill(c.notification.mailBody, vars);
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setAttempted(true);
    const next: Errors = {};
    for (const k of ORDER) next[k] = check(k, v[k], c.validation);
    setErrors(next);
    const first = ORDER.find((k) => next[k]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      return;
    }

    setPhase("sending");
    const payload = {
      name: v.name.trim(),
      email: v.email.trim(),
      phone: v.phone.trim(),
      business: v.business.trim(),
      website: v.website.trim(),
      need: needLabel,
      message: v.message.trim(),
      language: locale,
      page: typeof window !== "undefined" ? window.location.pathname : "",
      _subject: fill(c.notification.subject, { name: v.name.trim() }),
      _replyto: v.email.trim(),
      _gotcha: gotcha,
    };
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(String(res.status));
      setPhase("sent");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setPhase("failed");
      requestAnimationFrame(() => failRef.current?.focus());
    } finally {
      window.clearTimeout(timer);
    }
  };

  const reset = () => {
    setV(EMPTY);
    setErrors({});
    setAttempted(false);
    setPhase("idle");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[data-field="name"]')?.focus());
  };

  if (phase === "sent") {
    return (
      <div className={s.done} ref={doneRef} tabIndex={-1} role="status" aria-live="polite" data-enquiry-done="">
        <span className={s.doneMark} aria-hidden="true">
          <svg viewBox="0 0 20 20">
            <path d="M5 10.4 L8.6 14 L15 6.6" />
          </svg>
        </span>
        <h3 className={`t-h3 ${s.doneTitle}`}>{c.success.title}</h3>
        <p className={s.doneThanks}>{fill(c.success.thanks, { name: v.name.trim() })}</p>
        <ol className={s.steps}>
          {c.success.steps.map((step, i) => (
            <li key={i}>
              <span className={`tnum ${s.stepNo}`} aria-hidden="true">
                {i + 1}
              </span>
              <span>{fill(step, { email: v.email.trim() })}</span>
            </li>
          ))}
        </ol>
        <div className={s.doneActions}>
          {onClose ? (
            <button type="button" className="btn btn-primary btn-lg" onClick={onClose}>
              {c.success.close}
            </button>
          ) : null}
          <button type="button" className={onClose ? s.textBtn : "btn btn-ghost btn-lg"} onClick={reset}>
            {c.success.again}
          </button>
        </div>
      </div>
    );
  }

  const err = (k: Key) => errors[k];
  const describe = (k: Key, extra?: string) =>
    [err(k) ? id(`${k}-err`) : "", extra ?? ""].filter(Boolean).join(" ") || undefined;
  const errorLine = (k: Key) =>
    err(k) ? (
      <p className={s.err} id={id(`${k}-err`)}>
        <Bang />
        {err(k)}
      </p>
    ) : null;
  const opt = <span className={s.opt}>{c.optional}</span>;

  const text = (k: Exclude<Key, "need" | "message">, props: { type: string; inputMode?: "email" | "tel" | "url" | "text"; required?: boolean; half?: boolean }) => {
    const f = c.fields[k] as { label: string; autocomplete: string; placeholder?: string };
    return (
      <div className={`${s.field} ${props.half ? s.half : ""}`}>
        <label className={s.label} htmlFor={id(k)}>
          {f.label}
          {props.required ? null : opt}
        </label>
        <input
          id={id(k)}
          name={k}
          data-field={k}
          className={s.input}
          type={props.type}
          inputMode={props.inputMode}
          autoComplete={f.autocomplete}
          placeholder={f.placeholder}
          spellCheck={k === "email" || k === "website" ? false : undefined}
          autoCapitalize={k === "email" || k === "website" ? "off" : undefined}
          required={props.required}
          aria-required={props.required ? true : undefined}
          aria-invalid={err(k) ? true : undefined}
          aria-describedby={describe(k)}
          value={v[k]}
          disabled={sending}
          onChange={(e) => set(k, e.target.value)}
          onBlur={() => blur(k)}
        />
        {errorLine(k)}
      </div>
    );
  };

  const hasErrors = attempted && ORDER.some((k) => errors[k]);
  const privacyHref = variant === "page" ? "#privatumas" : `${localizePath("/kontaktai", locale)}#privatumas`;

  return (
    <form
      ref={formRef}
      className={s.form}
      data-variant={variant}
      action={`https://formspree.io/f/${site.formspreeId}`}
      method="POST"
      noValidate
      onSubmit={submit}
      aria-busy={sending || undefined}
    >
      <div className={s.grid}>
        {text("name", { type: "text", required: true, half: true })}
        {text("email", { type: "email", inputMode: "email", required: true, half: true })}
        {text("business", { type: "text", required: true, half: true })}
        {text("phone", { type: "tel", inputMode: "tel", half: true })}
        {text("website", { type: "text", inputMode: "url" })}

        <fieldset
          className={`${s.field} ${s.fieldset}`}
          aria-describedby={describe("need")}
          aria-invalid={err("need") ? true : undefined}
          disabled={sending}
        >
          <legend className={s.label}>{c.fields.need.label}</legend>
          <div className={s.options}>
            {c.needs.map((n, i) => (
              <label key={n.value} className={s.option} data-checked={v.need === n.value ? "" : undefined}>
                <input
                  type="radio"
                  name="need"
                  value={n.value}
                  data-field={i === 0 ? "need" : undefined}
                  checked={v.need === n.value}
                  onChange={() => set("need", n.value)}
                  onBlur={(e) => {
                    if (!e.currentTarget.closest("fieldset")?.contains(e.relatedTarget as Node)) blur("need");
                  }}
                  required
                />
                <span className={s.dot} aria-hidden="true" />
                <span>{n.label}</span>
              </label>
            ))}
          </div>
          {errorLine("need")}
        </fieldset>

        <div className={s.field}>
          <label className={s.label} htmlFor={id("message")}>
            {c.fields.message.label}
          </label>
          <textarea
            id={id("message")}
            name="message"
            data-field="message"
            className={`${s.input} ${s.area}`}
            rows={variant === "sheet" ? 4 : 5}
            placeholder={c.fields.message.placeholder}
            required
            aria-required
            aria-invalid={err("message") ? true : undefined}
            aria-describedby={describe("message")}
            value={v.message}
            disabled={sending}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
          />
          {errorLine("message")}
        </div>
      </div>

      {/* Without JavaScript the form still posts, as a plain form. */}
      <input type="hidden" name="_subject" value={fill(c.notification.subject, { name: "" }).replace(/:\s*$/, "")} />
      <input type="hidden" name="language" value={locale} />

      {/* Spam trap: people never see or reach it; bots fill it in. */}
      <div className={s.trap} aria-hidden="true">
        <label>
          Website URL
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={gotcha}
            onChange={(e) => setGotcha(e.target.value)}
          />
        </label>
      </div>

      {phase === "failed" ? (
        <div className={s.fail} ref={failRef} tabIndex={-1} role="alert">
          <p className={s.failTitle}>
            <Bang />
            {c.error.title}
          </p>
          <p className={s.failBody}>{c.error.body}</p>
          <div className={s.failActions}>
            <a className="btn btn-ghost" href={mailto()}>
              {fill(c.error.mailto, { email: site.email })}
            </a>
            <button type="submit" className={s.textBtn}>
              {c.error.retry}
            </button>
          </div>
        </div>
      ) : null}

      <div className={s.submitRow}>
        <button type="submit" className={`btn btn-primary btn-lg ${s.submit}`} disabled={sending} aria-disabled={sending || undefined}>
          {sending ? <span className={s.spin} aria-hidden="true" /> : null}
          {sending ? c.sending : c.submit}
        </button>
        <p className={s.note} aria-live="polite">
          {hasErrors ? <span className={s.noteErr}>{c.validation.summary}</span> : c.replyNote}
        </p>
      </div>

      <p className={s.privacy}>
        {c.privacy}{" "}
        <a href={privacyHref} data-close-enquiry={variant === "sheet" ? "" : undefined}>
          {c.privacyLink}
        </a>
      </p>
    </form>
  );
}

function Bang() {
  return (
    <svg className={s.bang} viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6" />
      <path d="M7 3.9 V7.6" />
      <path d="M7 10 V10.1" />
    </svg>
  );
}
