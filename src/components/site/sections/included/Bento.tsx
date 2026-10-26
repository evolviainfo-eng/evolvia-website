"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "../Included.module.css";

/* The bento block. It enters with the scroll (data-scrub: the shared
   engine rises and settles it while it scrolls into view). One pointer
   listener on the whole block writes the pointer position into the
   hovered cell as --mx / --my (once per frame, no React state), and CSS
   draws the spotlight and the lit top edge from them. Only for a real
   mouse: under (hover: hover) and (pointer: fine). */

export function Bento({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let inside = false;

    const apply = () => {
      raf = 0;
      if (!inside) return;
      const cell = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-cell]");
      if (!cell || !el.contains(cell)) return;
      const r = cell.getBoundingClientRect();
      cell.style.setProperty("--mx", `${Math.round(x - r.left)}px`);
      cell.style.setProperty("--my", `${Math.round(y - r.top)}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      inside = true;
      queue();
    };
    const onLeave = () => {
      inside = false;
    };
    // The page can scroll under a still pointer (wheel, Lenis): keep the
    // light under the pointer.
    const onScroll = () => {
      if (inside) queue();
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={s.bento} data-scrub>
      {children}
    </div>
  );
}
