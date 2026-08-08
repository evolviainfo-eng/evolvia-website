"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useTransform } from "framer-motion";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSheet } from "@/lib/useSheet";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/cn";

/** Floating glass header.
 *
 *  A capsule detached from every edge rather than a bar welded to the top —
 *  the page runs underneath and blurs through it. At the very top the material
 *  is absent so the hero owns the screen; it thickens into place once there is
 *  something behind it worth blurring. See `.glass` in globals.css: the blur
 *  radius and the scale ramp together, so it reads as a material arriving
 *  rather than a rectangle fading in.
 *
 *  Nothing about the capsule's geometry animates. Only the material does,
 *  on its own layer, because animating width or height would reflow the page
 *  on every scroll event.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  // The menu drops from under the header and leaves the same way. Enter and
  // exit share one path — a panel that arrives from above and dismisses
  // sideways makes the space unreadable.
  const sheet = useSheet({
    open,
    onDismiss: () => setOpen(false),
    axis: "y",
    sign: -1,
    /* Larger than any phone sheet could be. It only governs the pre-hydration
       frame — the ref callback measures the real height before the first
       effect — and erring high means the sheet is parked further off-screen
       rather than showing a sliver of itself in the static HTML. */
    fallback: 900,
    keepMounted: true,
  });

  // The scrim is tied to the panel's actual position, not to the open flag —
  // so it dims and lifts continuously under the finger during a drag instead
  // of waiting for the gesture to finish.
  const scrim = useTransform(sheet.offset, [sheet.closed, 0], [0, 1]);

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
          data-lit={lit}
          className={cn(
            "glass pointer-events-auto relative z-50 mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-3",
            "rounded-pill px-3 sm:h-[60px] sm:px-4",
          )}
        >
          <a
            href="/"
            aria-label="evolvia. — į pradžią"
            className="press shrink-0 rounded-md px-2 outline-none"
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
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
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
              aria-controls="mobile-menu"
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

      {/* ── Mobile menu ─────────────────────────────────────────────
          Dimmed to focus (a modal task), and dismissable three ways:
          tap the scrim, tap a link, or push the panel back up with a
          finger. The panel is always mounted and parked off-screen —
          `inert` keeps it out of the tab order and out of the
          accessibility tree while it is up there — because unmounting
          it would make the sheet un-grabbable exactly when it is
          moving, which is when grabbing matters most. */}
      <motion.button
        type="button"
        aria-label="Uždaryti meniu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        style={{ opacity: scrim }}
        className={cn(
          "fixed inset-0 z-30 bg-black/45 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      />

      <motion.div
        id="mobile-menu"
        ref={(node) => {
          panelRef.current = node;
          sheet.measure(node);
        }}
        inert={!open}
        drag={sheet.reduce ? false : "y"}
        dragDirectionLock
        dragConstraints={{ top: sheet.closed, bottom: 0 }}
        /* Elastic only downward: the panel is already home at 0, so pulling it
           further down should resist rather than tear it off the header. Push
           it up and it tracks the finger 1:1, because that direction is a real
           dismissal and 1:1 is what makes it feel attached. */
        dragElastic={{ top: 0, bottom: 0.06 }}
        dragMomentum={false}
        onDragEnd={(_, info) => sheet.onDragEnd(info.velocity.y)}
        style={{ y: sheet.offset, touchAction: "pan-x" }}
        className={cn(
          "pointer-events-auto fixed inset-x-0 top-0 z-40 md:hidden",
          "rounded-b-[28px] border-b border-border bg-bg/85 pb-4 pt-24 backdrop-blur-2xl backdrop-saturate-150",
          "shadow-[0_24px_60px_rgba(0,0,0,0.18)]",
          open ? "" : "pointer-events-none",
        )}
      >
        <nav className="flex flex-col px-6" aria-label="Pagrindinė navigacija">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="press border-b border-border py-5 text-2xl font-medium tracking-[-0.02em] text-text [--press:0.985]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="px-6 pt-6">
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

        {/* The grabbable edge. It is a real affordance, not decoration: without
            it nothing tells you the panel can be pushed back up. */}
        <div className="flex justify-center pb-2 pt-5">
          <span
            aria-hidden="true"
            className="h-1 w-10 rounded-full bg-text/20"
          />
        </div>
      </motion.div>
    </header>
  );
}
