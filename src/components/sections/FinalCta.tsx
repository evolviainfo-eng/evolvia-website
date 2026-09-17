"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PrivacyNote } from "@/components/ui/PrivacyNote";
import { site } from "@/content/site";
import { fill } from "@/i18n/fill";
import { validityProps } from "@/i18n/validity";
import type { Dictionary } from "@/i18n/dictionaries/lt";

const fieldBase =
  "w-full rounded-card border border-border bg-surface px-4 py-3.5 text-text " +
  "placeholder:text-text-muted/70 outline-none transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] " +
  "focus:border-text";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export function FinalCta({
  t,
  privacy,
  location,
  standalone = false,
}: {
  t: Dictionary["contact"];
  privacy: Dictionary["privacy"];
  /** "Kaunas, Lietuva" in the page's language, for the privacy notice. */
  location: string;
  /** true on /kontaktai — the PageHeader already carries the heading. */
  standalone?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");

  /* The browser's validation bubble, in the page's language. */
  const v = t.validation;
  const nameValidity = validityProps({ missing: v.nameMissing });
  const emailValidity = validityProps({
    missing: v.emailMissing,
    invalid: v.emailInvalid,
  });
  const messageValidity = validityProps({ missing: v.messageMissing });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No form backend configured yet → open the visitor's mail app instead.
    if (!site.formspreeId) {
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const message = String(data.get("message") ?? "").trim();
      const subject = fill(t.mailto.subject, {
        name: name || t.mailto.fallbackName,
      });
      const body = fill(t.mailto.body, { name, email, message });
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="kontaktai" tone="secondary">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          {!standalone && (
            <>
              <h2 className="t-display">{t.title}</h2>
              <p className="t-body mx-auto mt-6 max-w-[40ch]">{t.lead}</p>
            </>
          )}
          <div
            className={`flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6 ${standalone ? "" : "mt-6"}`}
          >
            <a
              href={`mailto:${site.email}`}
              className="inline-block text-[1.0625rem] font-medium text-text underline decoration-border underline-offset-[6px] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:decoration-text"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-block text-[1.0625rem] font-medium text-text underline decoration-border underline-offset-[6px] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:decoration-text"
            >
              {site.phone}
            </a>
          </div>
        </Reveal>

        <Reveal
          delay={0.08}
          className={`mx-auto max-w-[560px] ${standalone ? "mt-10" : "mt-12"}`}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  {t.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={t.namePlaceholder}
                  {...nameValidity}
                  className={fieldBase}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  {t.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={t.emailPlaceholder}
                  {...emailValidity}
                  className={fieldBase}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                {t.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder={t.messagePlaceholder}
                {...messageValidity}
                className={`${fieldBase} resize-none`}
              />
            </div>
            {/* subject line for the Formspree notification email */}
            <input
              type="hidden"
              name="_subject"
              value={t.notificationSubject}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-[52px] items-center justify-center rounded-pill bg-accent px-8 text-base font-medium text-accent-text transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0 disabled:opacity-60"
            >
              {status === "sending" ? t.sending : t.submit}
            </button>
            {status === "sent" && (
              <p
                className="text-center text-[0.9375rem] text-text-muted"
                role="status"
              >
                {t.sent}
              </p>
            )}
            {status === "mailto" && (
              <p
                className="text-center text-[0.9375rem] text-text-muted"
                role="status"
              >
                {fill(t.mailtoOpening, { email: site.email })}
              </p>
            )}
            {status === "error" && (
              <p
                className="text-center text-[0.9375rem] text-text-muted"
                role="status"
              >
                {fill(t.error, { email: site.email })}
              </p>
            )}
          </form>

          {/* At the point of collection, not linked away from it. */}
          <PrivacyNote
            t={privacy}
            location={location}
            className="mx-auto mt-10 max-w-[560px]"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
