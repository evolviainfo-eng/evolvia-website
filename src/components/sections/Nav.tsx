"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled || open
            ? "border-b border-border bg-bg/72 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <nav className="flex h-16 items-center justify-between sm:h-[72px]">
            <a
              href="#top"
              aria-label="evolvia. — į viršų"
              className="rounded-md outline-none"
            >
              <Wordmark />
            </a>

            {/* desktop links */}
            <div className="hidden items-center gap-9 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[0.95rem] text-text-muted transition-colors duration-200 hover:text-text"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <Button href="#kontaktai" variant="primary">
                Susisiekti
              </Button>
            </div>

            {/* mobile controls */}
            <div className="flex items-center gap-1.5 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative z-50 flex h-10 w-10 items-center justify-center"
              >
                <span className="sr-only">Meniu</span>
                <span className="relative block h-4 w-6">
                  <span
                    className={cn(
                      "absolute left-0 block h-[1.5px] w-6 bg-text transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 block h-[1.5px] w-6 bg-text transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-bg md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full flex-col px-6 pt-28 pb-12">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-5 text-2xl font-semibold tracking-[-0.02em] text-text"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.08 + i * 0.06,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto">
                <Button
                  href="#kontaktai"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Susisiekti
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
