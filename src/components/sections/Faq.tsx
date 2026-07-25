"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { faqItems } from "@/content/faq";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Faq({
  standalone = false,
  contactHref = "#kontaktai",
}: {
  /** true on /duk — the PageHeader already carries the heading. */
  standalone?: boolean;
  contactHref?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const baseId = useId();
  const dur = reduce ? 0 : 0.26; // --d-ui: an accordion should feel instant

  return (
    <Section id="duk" tone="light">
      <Container>
        <div
          className={
            standalone
              ? "mx-auto max-w-[780px]"
              : "grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
          }
        >
          {/* sticky editorial heading */}
          {!standalone && (
            <div className="md:sticky md:top-32 md:self-start">
              <Eyebrow>D.U.K.</Eyebrow>
              <h2 className="t-h2 mt-4">Dažni klausimai.</h2>
              <p className="t-body mt-5 max-w-[34ch]">
                Nerandate atsakymo?{" "}
                <a
                  href={contactHref}
                  className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
                >
                  Parašykite mums
                </a>{" "}
                — atsakysime per dieną.
              </p>
            </div>
          )}

          {/* accordion */}
          <ul className="border-t border-border">
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const btnId = `${baseId}-btn-${i}`;
              return (
                <li key={item.q} className="border-b border-border">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-[1.15rem] font-medium tracking-[-0.01em] text-text">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "relative h-4 w-4 shrink-0 text-text transition-transform duration-[var(--d-ui)] ease-[var(--e-out)]",
                          isOpen && "rotate-45",
                        )}
                        aria-hidden="true"
                      >
                        <span className="absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-1/2 h-4 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="t-body max-w-[58ch] pb-6">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {standalone && (
            <p className="t-body mt-8">
              Nerandate atsakymo?{" "}
              <a
                href={contactHref}
                className="text-text underline decoration-border underline-offset-4 transition-colors hover:decoration-text"
              >
                Parašykite mums
              </a>{" "}
              — atsakysime per dieną.
            </p>
          )}
        </div>

        {/* fallback contact for crawlers / no-JS clarity */}
        <p className="sr-only">
          Klausimai: {site.email}
        </p>
      </Container>
    </Section>
  );
}
