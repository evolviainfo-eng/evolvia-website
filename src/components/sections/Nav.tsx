"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/cn";

/** Floating glass header.
 *
 *  A capsule detached from every edge rather than a bar welded to the top —
 *  the page runs underneath and blurs through it. At the very top it is
 *  invisible so the hero owns the screen; the glass materialises once there
 *  is something behind it worth blurring.
 *
 *  Only paint properties are animated on that change (background, border,
 *  shadow, backdrop-filter). The capsule's geometry never moves, because
 *  animating its width or height would reflow the page on every scroll.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

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

  const lit = scrolled || open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="px-3 pt-3 sm:px-6 sm:pt-4">
        <nav
          className={cn(
            "pointer-events-auto relative z-50 mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-3",
            "rounded-pill border px-3 sm:h-[60px] sm:px-4",
            "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[var(--d-ui)] ease-[var(--e-out)]",
            lit ? "glass" : "border-transparent bg-transparent",
          )}
        >
          <a
            href="/"
            aria-label="evolvia. — į pradžią"
            className="shrink-0 rounded-md px-2 outline-none"
          >
            <Wordmark />
          </a>

          {/* desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-1 text-[0.95rem] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text",
                    // Ink at 70%, not the muted token. The glass composites
                    // against whatever is behind it, and over the always-dark
                    // section the muted grey fell to 1.9:1; this holds 4.8:1
                    // there and reads the same as before over a light page.
                    active ? "text-text" : "text-text/70",
                  )}
                >
                  {link.label}
                  {/* rule wipes in from the left rather than fading — the
                      same gesture the whole site uses, at nav scale */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-text transition-transform duration-[var(--d-ui)] ease-[var(--e-out)]",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <ThemeToggle />
            <Button href="/kontaktai" variant="primary">
              Susisiekti
            </Button>
          </div>

          {/* mobile controls */}
          <div className="flex shrink-0 items-center gap-1 md:hidden">
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
                    "absolute left-0 block h-[1.5px] w-6 bg-text transition-all duration-[var(--d-ui)] ease-[var(--e-out)]",
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 block h-[1.5px] w-6 bg-text transition-all duration-[var(--d-ui)] ease-[var(--e-out)]",
                    open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* mobile sheet — glass as well, so it reads as the capsule expanding
          rather than a different surface arriving */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="pointer-events-auto fixed inset-0 z-40 bg-bg/80 backdrop-blur-2xl backdrop-saturate-150 md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.1, 1] }}
          >
            <div className="flex h-full flex-col px-6 pb-12 pt-28">
              <nav className="flex flex-col gap-2" aria-label="Pagrindinė navigacija">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-5 text-2xl font-semibold tracking-[-0.02em] text-text"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.52,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.08 + i * 0.07,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto">
                <Button
                  href="/kontaktai"
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
