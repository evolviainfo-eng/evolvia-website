import type { ReactNode } from "react";

/* Shared UI parts for the drawn product panels. All glyphs are drawn here
   (1.25 to 1.5 px strokes), no icon library. Styles live in v6.css under
   "Primitives". */

export function Window({
  address,
  tag,
  children,
  className = "",
  bar,
}: {
  /** Shown in the centred address field, in mono. */
  address?: ReactNode;
  /** A small chip beside the address, e.g. "Demo". */
  tag?: string;
  children: ReactNode;
  className?: string;
  /** Extra content at the right of the title bar. */
  bar?: ReactNode;
}) {
  return (
    <div className={`win ${className}`}>
      <div className="win-bar">
        <span className="win-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {address ? (
          <span className="win-addr">
            <Lock />
            <span className="win-addr-t">{address}</span>
            {tag ? <span className="chip chip-xs">{tag}</span> : null}
          </span>
        ) : (
          <span />
        )}
        <span className="win-bar-end">{bar}</span>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}

/** A status circle. data-status: pending | active (spinner) | half | done. */
export function Status({ state = "done" }: { state?: "pending" | "active" | "half" | "done" }) {
  return (
    <span className="status" data-status={state} aria-hidden="true">
      <svg viewBox="0 0 16 16">
        <circle className="status-ring" cx="8" cy="8" r="6.5" />
        <path className="status-half" d="M8 1.5 A6.5 6.5 0 0 1 8 14.5 Z" />
        <circle className="status-fill" cx="8" cy="8" r="7" />
        <path className="status-tick" d="M5 8.2 L7 10.2 L11 6" />
        <path className="status-spin" d="M8 1.5 A6.5 6.5 0 1 1 1.5 8" />
      </svg>
    </span>
  );
}

export function Lock() {
  return (
    <svg className="glyph glyph-lock" viewBox="0 0 12 12" aria-hidden="true">
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
      <path d="M4 5.5 V4 a2 2 0 0 1 4 0 V5.5" />
    </svg>
  );
}

export function Tick() {
  return (
    <svg className="glyph glyph-tick" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6.3 L5 8.6 L9.5 3.6" />
    </svg>
  );
}

export function Plus() {
  return (
    <svg className="glyph glyph-plus" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 2 V10 M2 6 H10" />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg className="glyph glyph-arrow" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 6 H10 M6.5 2.5 L10 6 L6.5 9.5" />
    </svg>
  );
}

export function External() {
  return (
    <svg className="glyph glyph-ext" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M4 2.5 H9.5 V8 M9.5 2.5 L3 9" />
    </svg>
  );
}

/** A small on/off switch. */
export function Toggle({ on = true }: { on?: boolean }) {
  return <span className="toggle" data-on={on ? "" : undefined} aria-hidden="true" />;
}

/** Chapter header in the Linear grammar: a two-line headline on the left,
 *  the lead from 52% on the right. `b` is the grey continuation. */
export function Chapter({ id, a, b, lead }: { id: string; a: ReactNode; b?: ReactNode; lead?: ReactNode }) {
  return (
    <header className="chapter">
      <h2 id={id} className="t-h2" data-split>
        {a}
        {b ? <span className="dim"> {b}</span> : null}
      </h2>
      {lead ? (
        <p className="t-lead chapter-lead" data-in>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
