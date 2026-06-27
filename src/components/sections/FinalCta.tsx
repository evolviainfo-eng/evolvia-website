"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const fieldBase =
  "w-full rounded-card border border-border bg-surface px-4 py-3.5 text-text " +
  "placeholder:text-text-muted/70 outline-none transition-colors duration-200 " +
  "focus:border-text";

export function FinalCta() {
  const [sent, setSent] = useState(false);

  // Works with no backend: composes a prefilled email. Swap for a Formspree
  // endpoint later if you want inbox capture without the mail client.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Užklausa iš svetainės — ${name || "naujas klientas"}`;
    const body = `Vardas: ${name}\nEl. paštas: ${email}\n\n${message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <Section id="kontaktai" tone="secondary">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <h2 className="t-display">Pradėkim.</h2>
          <p className="t-body mx-auto mt-6 max-w-[40ch]">
            Parašykite — atsakysime per dieną.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block text-[1.15rem] font-medium text-text underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text"
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto mt-12 max-w-[560px]">
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
            <button
              type="submit"
              className="inline-flex h-[52px] items-center justify-center rounded-pill bg-accent px-8 text-base font-medium text-accent-text transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:opacity-90 active:translate-y-0"
            >
              Siųsti užklausą
            </button>
            {sent && (
              <p className="text-center text-[0.95rem] text-text-muted" role="status">
                Atsidaro jūsų el. pašto programa. Jei ne — rašykite tiesiai{" "}
                {site.email}.
              </p>
            )}
          </form>
        </Reveal>
      </Container>
    </Section>
  );
}
