"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Buttery smooth scrolling (desktop wheel) wired into GSAP ScrollTrigger.
 *  Disabled under reduced motion; mobile keeps native touch scroll. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    // LERP mode, never duration+easing. A duration tween fires a fixed-length
    // animation per wheel flick, so the page keeps gliding long after the
    // input stopped ("nuslysta iki kito section"). Lerp only chases the
    // target — soft, but still 1:1 with the wheel.
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    // Published so overlays can pause the smoothing directly instead of
    // fighting it with `overflow: hidden` — a modal that traps scroll needs
    // lenis.stop(), and there is no other way to reach the instance.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* Honour the conventional scroll lock.
     *
     * A modal or drawer traps scroll by setting `overflow: hidden` on <html>
     * or <body>. That works against native scrolling — but Lenis is what
     * scrolls this page, and it keeps running, so the page still slides behind
     * the overlay. Rather than requiring every overlay to know Lenis exists,
     * watch for the lock and stop the instance while it is on. */
     const isLocked = () =>
      getComputedStyle(document.documentElement).overflow === "hidden" ||
      getComputedStyle(document.body).overflow === "hidden";

    let locked = false;
    const syncLock = () => {
      const next = isLocked();
      if (next === locked) return;
      locked = next;
      if (next) lenis.stop();
      else lenis.start();
    };
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    lockObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    syncLock();

    // smooth in-page anchor navigation (account for the fixed nav)
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      // Anchors DO get a duration — a jump to a named target is a deliberate
      // trip, not a wheel flick.
      //
      // No `offset` here. Lenis honours the document's `scroll-padding-top`,
      // which globals.css already sets to clear the fixed nav (and DemoShell
      // raises for the demo pages' two stacked bars). The -72 that used to be
      // here was added on top of it, landing every anchor ~72px too low.
      lenis.scrollTo(el as HTMLElement, { duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lockObserver.disconnect();
      gsap.ticker.remove(tick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
