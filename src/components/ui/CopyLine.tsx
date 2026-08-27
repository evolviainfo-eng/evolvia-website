"use client";

import { useEffect, useRef, useState } from "react";

/** A contact detail that can be taken away in one click.
 *
 *  The link still does what a link does (opens the mail app, dials), and a
 *  second, quieter control copies the value to the clipboard, because on a
 *  desktop that is what somebody actually wants from an email address. The
 *  confirmation replaces the control in place rather than appearing as a
 *  toast somewhere else on the screen. */
export function CopyLine({ value, href }: { value: string; href: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setDone(false), 1800);
    } catch {
      /* no clipboard permission: the link beside it still works */
    }
  }

  return (
    <span className="group/copy inline-flex items-baseline gap-3">
      <a
        href={href}
        className="underline decoration-border underline-offset-4 transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:decoration-text"
      >
        {value}
      </a>
      <button
        type="button"
        onClick={copy}
        className="press text-[0.8125rem] text-text-muted opacity-0 transition-[opacity,color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:text-text focus-visible:opacity-100 group-hover/copy:opacity-100"
      >
        {done ? "Nukopijuota" : "Kopijuoti"}
      </button>
    </span>
  );
}
