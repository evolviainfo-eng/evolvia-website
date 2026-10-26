"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/i18n/LocaleProvider";
import { enquiry } from "../copy/enquiry";
import { EnquiryForm } from "./EnquiryForm";
import s from "./EnquirySheet.module.css";

/* The enquiry over the page: a 560 px panel from the right on desktop, a
   full-screen sheet from below on the phone. A modal dialog in every
   sense: the page behind is inert and does not scroll (Lenis stopped, the
   root overflow hidden), focus stays inside, Esc, the close button and a
   click on the dimmed page close it, and focus goes back to whatever
   opened it (EnquiryHost keeps that). */

type Lenisish = { stop: () => void; start: () => void };
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function EnquirySheet({ open, onClose, onExited }: { open: boolean; onClose: () => void; onExited: () => void }) {
  const locale = useLocale();
  const c = enquiry[locale];
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);
  const exitedRef = useRef(onExited);
  useEffect(() => {
    exitedRef.current = onExited;
  }, [onExited]);

  // Enter on the next frame so the transition runs; leave, then unmount.
  useEffect(() => {
    if (open) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(r);
    }
    const r = requestAnimationFrame(() => setShown(false));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => exitedRef.current(), reduce ? 0 : 420);
    return () => {
      cancelAnimationFrame(r);
      window.clearTimeout(t);
    };
  }, [open]);

  // Page behind: still, inert, not scrollable.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
    const gap = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, pad: html.style.paddingRight };
    html.style.overflow = "hidden";
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    html.setAttribute("data-enquiry-open", "");
    lenis?.stop();
    const root = rootRef.current;
    const made: Element[] = [];
    Array.from(document.body.children).forEach((el) => {
      if (el === root || el.tagName === "SCRIPT" || el.hasAttribute("inert")) return;
      el.setAttribute("inert", "");
      made.push(el);
    });
    return () => {
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.pad;
      html.removeAttribute("data-enquiry-open");
      made.forEach((el) => el.removeAttribute("inert"));
      if (!html.hasAttribute("data-sheet-open")) lenis?.start();
    };
  }, [open]);

  // First focus: the first field with a mouse; the title on a touch screen,
  // so the keyboard does not jump up over the sheet before it has opened.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      const first = panelRef.current?.querySelector<HTMLElement>('[data-field="name"]');
      if (fine && first) first.focus({ preventScroll: true });
      else titleRef.current?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(t);
  }, [open]);

  // Esc closes; Tab cycles inside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const list = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active ? panelRef.current.contains(active) : false;
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return createPortal(
    <div ref={rootRef} className={s.root} data-shown={shown ? "" : undefined}>
      <div className={s.scrim} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className={s.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-sheet-title"
        aria-describedby="enquiry-sheet-lead"
      >
        <div className={s.head}>
          <h2 id="enquiry-sheet-title" ref={titleRef} tabIndex={-1} className={s.title}>
            {c.sheet.title}
          </h2>
          <button type="button" className={s.close} onClick={onClose} aria-label={c.sheet.close}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 3.5 L12.5 12.5 M12.5 3.5 L3.5 12.5" />
            </svg>
          </button>
        </div>
        <div className={s.body} data-lenis-prevent="">
          <p id="enquiry-sheet-lead" className={s.lead}>
            {c.sheet.lead}
          </p>
          <EnquiryForm variant="sheet" onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
