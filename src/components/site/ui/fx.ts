"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import type { Init } from "./scene";

/* GSAP only understands CSS cubic-bezier() strings through CustomEase, so
   the house curves are registered once under names and used by name. */
gsap.registerPlugin(CustomEase);
CustomEase.create("v6-reveal", "0.32,0.72,0,1");
CustomEase.create("v6-ui", "0.4,0,0.2,1");
CustomEase.create("v6-move", "0.65,0,0.35,1");
CustomEase.create("v6-slide", "0.23,1,0.32,1");

/* Small building blocks for scene timelines. Every helper leaves the DOM in
   its final, server-rendered state when the timeline completes, and resets
   to its start state at time 0 of each loop (through `init`). Times are in
   seconds on the scene timeline. */

export const EASE = {
  out: "expo.out",
  reveal: "v6-reveal",
  ui: "v6-ui",
  move: "v6-move",
  slide: "v6-slide",
} as const;

/** Types the element's own text, character by character, with a caret.
 *  Pauses a little after commas and full stops. Returns the end time. */
export function typeText(tl: gsap.core.Timeline, init: Init, el: HTMLElement | null, at: number, cps = 32): number {
  if (!el) return at;
  if (!el.dataset.typed) {
    const text = el.textContent || "";
    el.textContent = "";
    for (const ch of Array.from(text)) {
      const s = document.createElement("span");
      s.className = "ch";
      s.style.whiteSpace = "pre-wrap";
      s.textContent = ch;
      el.appendChild(s);
    }
    el.dataset.typed = "1";
    el.setAttribute("aria-label", text);
  }
  const chars = Array.from(el.querySelectorAll<HTMLElement>(".ch"));
  const caret = document.createElement("span");
  caret.className = "caret";
  caret.setAttribute("aria-hidden", "true");
  init(chars, { visibility: "hidden" });
  tl.call(() => el.prepend(caret), [], 0);
  let t = at;
  chars.forEach((c, i) => {
    tl.set(c, { visibility: "visible" }, t);
    tl.call(() => c.after(caret), [], t);
    const ch = c.textContent || "";
    t += 1 / cps + (ch === "," || ch === "." ? 0.22 : 0) + (i % 7 === 3 ? 0.008 : 0);
  });
  tl.call(() => caret.remove(), [], t + 0.6);
  return t;
}

/** Blur-swaps the element's text from `from` to its final text at `at`. */
export function swapText(tl: gsap.core.Timeline, init: Init, el: HTMLElement | null, from: string, at: number): number {
  if (!el) return at;
  const final = el.textContent || "";
  tl.call(() => (el.textContent = from), [], 0);
  el.textContent = from;
  init(el, { filter: "blur(0px)", opacity: 1 });
  tl.to(el, { filter: "blur(4px)", opacity: 0.25, duration: 0.18, ease: EASE.ui }, at);
  tl.call(() => (el.textContent = final), [], at + 0.18);
  tl.to(el, { filter: "blur(0px)", opacity: 1, duration: 0.24, ease: EASE.ui }, at + 0.18);
  return at + 0.42;
}

/** A status circle ([data-status]) goes pending, then a short spinner,
 *  then done. Returns the time it is done. */
export function checkStatus(tl: gsap.core.Timeline, el: HTMLElement | null, at: number, spin = 0.3): number {
  if (!el) return at;
  const final = el.dataset.status || "done";
  tl.call(() => el.setAttribute("data-status", "pending"), [], 0);
  el.setAttribute("data-status", "pending");
  tl.call(() => el.setAttribute("data-status", "active"), [], at);
  tl.call(() => el.setAttribute("data-status", final), [], at + spin);
  return at + spin;
}

/** Sets a data attribute at a time (and back to `from` at loop start). */
export function setAttr(tl: gsap.core.Timeline, el: HTMLElement | null, name: string, from: string | null, to: string | null, at: number) {
  if (!el) return;
  const apply = (v: string | null) => (v === null ? el.removeAttribute(name) : el.setAttribute(name, v));
  apply(from);
  tl.call(() => apply(from), [], 0);
  tl.call(() => apply(to), [], at);
}

/** Rows appear one after another: opacity, 4px rise. */
export function rowsIn(tl: gsap.core.Timeline, init: Init, rows: HTMLElement[], at: number, gap = 0.42): number {
  init(rows, { opacity: 0, y: 4 });
  rows.forEach((r, i) => tl.to(r, { opacity: 1, y: 0, duration: 0.36, ease: EASE.ui }, at + i * gap));
  return at + rows.length * gap;
}

/** Panel or result reveal: blur and opacity to sharp. */
export function revealIn(tl: gsap.core.Timeline, init: Init, el: gsap.TweenTarget, at: number, dur = 0.7): number {
  init(el, { opacity: 0, filter: "blur(6px)", y: 8 });
  tl.to(el, { opacity: 1, filter: "blur(0px)", y: 0, duration: dur, ease: EASE.reveal }, at);
  return at + dur;
}

/** A button gets a focus ring and is pressed. */
export function press(tl: gsap.core.Timeline, el: HTMLElement | null, at: number): number {
  if (!el) return at;
  tl.call(() => el.setAttribute("data-focus", ""), [], at);
  tl.to(el, { scale: 0.97, duration: 0.1, ease: EASE.ui }, at + 0.3);
  tl.to(el, { scale: 1, duration: 0.14, ease: EASE.ui }, at + 0.4);
  tl.call(() => el.removeAttribute("data-focus"), [], at + 0.6);
  return at + 0.6;
}
