"use client";

import { useEffect } from "react";

/** One IntersectionObserver for the whole document.
 *
 *  Everything marked `data-rise` (or `data-settle`) is watched — including
 *  nodes mounted later, which a MutationObserver picks up. Elements reveal
 *  once and are then unobserved.
 *
 *  The hidden state lives behind `html[data-choreo]`, which the boot script in
 *  the root layout sets before first paint (setting it here instead would make
 *  everything above the fold flash visible, then snap hidden). All this does
 *  is claim the flag so the boot watchdog stands down, and start watching.
 *
 *  Under reduced motion the attribute is never set at all, so nothing animates
 *  and nothing needs releasing.
 */
export function Choreo() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = document.documentElement;
    // tell the boot watchdog the reveal system is alive
    (window as unknown as { __choreo?: boolean }).__choreo = true;
    root.setAttribute("data-choreo", "");

    const SELECTOR =
      "[data-rise], [data-settle], [data-line], [data-wipe], [data-sweep]";
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          // release any native lazy gate right before the frame is shown —
          // an instant scroll jump can otherwise leave the image stuck
          if (el.tagName === "IMG" && (el as HTMLImageElement).loading === "lazy") {
            (el as HTMLImageElement).loading = "eager";
          }
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      // fire a little before the element is fully on screen, so the gesture
      // is already underway by the time the eye lands on it
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    const watch = (scope: ParentNode) => {
      scope.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };
    watch(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches(SELECTOR) && !seen.has(el)) {
            seen.add(el);
            io.observe(el);
          }
          watch(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      // dropping the attribute reveals everything — the correct thing to do
      // if the observer is going away (dev fast-refresh, route teardown)
      root.removeAttribute("data-choreo");
      (window as unknown as { __choreo?: boolean }).__choreo = false;
    };
  }, []);

  return null;
}
