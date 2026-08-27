"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Theme = "dark" | "light";

/** Flips the whole site between the dark ground and a full light mode.
 *  Dark is the default; light is a stored preference. The no-flash script in
 *  layout applies it before first paint. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {}
    // Dark unless the visitor has chosen light. One rule, and it matches
    // the boot script exactly; two different rules is how the toggle ends up
    // disagreeing with the page it is sitting on.
    const current: Theme = stored === "light" ? "light" : "dark";
    // Keep the attribute in sync in case the init script didn't run.
    if (current === "dark")
      document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    setTheme(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    const root = document.documentElement;
    if (next === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Įjungti šviesų režimą" : "Įjungti tamsų režimą"}
      title={isDark ? "Šviesus režimas" : "Tamsus režimas"}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-pill border border-border text-text transition-[translate,border-color,background-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:border-text",
        className,
      )}
    >
      {/* Render only after mount to avoid hydration mismatch on the icon */}
      <span className="relative block h-[18px] w-[18px]">
        {mounted && isDark ? (
          // sun (tap → light)
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </svg>
        ) : mounted ? (
          // moon (tap → dark)
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.2 6.2 0 0 0 10.5 10.5Z" />
          </svg>
        ) : null}
      </span>
    </button>
  );
}
