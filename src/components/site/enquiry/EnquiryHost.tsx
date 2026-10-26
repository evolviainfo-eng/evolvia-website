"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { splitLocale } from "@/i18n/config";
import { EnquirySheet } from "./EnquirySheet";

/* Mounted once by SiteShell. Turns every [data-enquiry] link (the
   EnquiryLink in Chrome.tsx, wherever it is used) into the enquiry sheet,
   with one delegated click listener. Without JavaScript the same links go
   to the form on /kontaktai#uzklausa.

   On /kontaktai itself the form is already on the page, so a click there
   scrolls to it and puts the cursor in the first field instead. On every
   other page, arriving with #uzklausa in the address opens the sheet. */

type Lenisish = { scrollTo: (t: Element | number, o?: { offset?: number; duration?: number }) => void };

function onContactPage() {
  return splitLocale(window.location.pathname.replace(/\/+$/, "") || "/").path === "/kontaktai";
}

export function EnquiryHost() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const returnTo = useRef<HTMLElement | null>(null);

  const openSheet = useCallback((trigger: HTMLElement | null) => {
    returnTo.current = trigger;
    setMounted(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === "#uzklausa") {
      history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }
  }, []);

  const exited = useCallback(() => {
    setMounted(false);
    const el = returnTo.current;
    returnTo.current = null;
    if (el && el.isConnected) el.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const goToForm = () => {
      const form = document.getElementById("uzklausa");
      if (!form) return false;
      const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
      if (lenis) lenis.scrollTo(form, { offset: -96, duration: 0.9 });
      else form.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(
        () => form.querySelector<HTMLElement>('[data-field="name"]')?.focus({ preventScroll: true }),
        lenis ? 700 : 400,
      );
      return true;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLElement>("[data-enquiry]");
      if (!link) return;
      e.preventDefault();

      // A trigger inside the phone menu: close the menu first, and give
      // focus back to the menu button afterwards (the link is gone then).
      let trigger: HTMLElement = link;
      if (link.closest("#site-sheet")) {
        const menu = document.querySelector<HTMLElement>('.nav-menu[aria-expanded="true"]');
        if (menu) {
          menu.click();
          trigger = menu;
        }
      }
      if (onContactPage() && goToForm()) return;
      openSheet(trigger);
    };

    const fromHash = () => {
      if (window.location.hash !== "#uzklausa" || onContactPage()) return;
      openSheet(null);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", fromHash);
    const first = window.setTimeout(fromHash, 0);
    return () => {
      window.clearTimeout(first);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [openSheet]);

  return mounted ? <EnquirySheet open={open} onClose={close} onExited={exited} /> : null;
}
