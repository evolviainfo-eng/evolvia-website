"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const fieldBase =
  "w-full rounded-card border border-border bg-surface px-4 py-3.5 text-text " +
  "placeholder:text-text-muted/70 outline-none transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] " +
  "focus:border-text";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export function FinalCta({
  standalone = false,
}: {
  /** true on /kontaktai — the PageHeader already carries the heading. */
  standalone?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No form backend configured yet → open the visitor's mail app instead.
    if (!site.formspreeId) {
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const message = String(data.get("message") ?? "").trim();
      const subject = `Užklausa iš svetainės — ${name || "naujas klientas"}`;
      const body = `Vardas: ${name}\nEl. paštas: ${email}\n\n${message}`;
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
              <h2 className="t-display">Pradėkim.</h2>
              <p className="t-body mx-auto mt-6 max-w-[40ch]">
                Parašykite — atsakysime per dieną.
              </p>
            </>
          )}
          <a
            href={`mailto:${site.email}`}
            className={`inline-block text-[1.15rem] font-medium text-text underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text ${standalone ? "" : "mt-6"}`}
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.08} className={`mx-auto max-w-[560px] ${standalone ? "mt-10" : "mt-12"}`}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  Vardas
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Vardas"
                  className={fieldBase}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  El. paštas
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="El. paštas"
                  className={fieldBase}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Žinutė
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Trumpai apie jūsų verslą ir ko ieškote"
                className={`${fieldBase} resize-none`}
              />
            </div>
            {/* subject line for the Formspree notification email */}
            <input type="hidden" name="_subject" value="Nauja užklausa iš evolvia.lt" />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-[52px] items-center justify-center rounded-pill bg-accent px-8 text-base font-medium text-accent-text transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0 disabled:opacity-60"
            >
              {status === "sending" ? "Siunčiama…" : "Siųsti užklausą"}
            </button>
            {status === "sent" && (
              <p className="text-center text-[0.95rem] text-text-muted" role="status">
                Ačiū! Gavome jūsų žinutę — atsakysime per dieną.
              </p>
            )}
            {status === "mailto" && (
              <p className="text-center text-[0.95rem] text-text-muted" role="status">
                Atsidaro jūsų el. pašto programa. Jei ne — rašykite tiesiai{" "}
                {site.email}.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-[0.95rem] text-text-muted" role="status">
                Nepavyko išsiųsti. Parašykite tiesiai {site.email}.
              </p>
            )}
          </form>
        </Reveal>
      </Container>
    </Section>
  );
}
