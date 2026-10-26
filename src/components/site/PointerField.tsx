"use client";

import { useEffect, useRef } from "react";

/* A code-like trace behind the pointer (after carterogunsola.com). The ground is an invisible 14 px grid; as the pointer moves,
   a few cells near it light up for a moment, most as a 1.5 px dot, some as
   a mono glyph, and fade out in about 0.75 s. Nothing is drawn and no frame
   loop runs while the pointer is still, so it costs nothing at rest.
   Off for touch screens and for reduced motion. Sits behind the content. */
const CELL = 14;
const LIFE = 760;
const GLYPHS = ["0", "1", "+", "/", ":", "_", "{", "}", "<", ">", "=", "*", ";", "."];
type Spark = { x: number; y: number; t0: number; g: string | null; a: number };

export function PointerField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    const size = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const plex = getComputedStyle(document.documentElement).getPropertyValue("--font-plex").trim();
      ctx.font = `11px ${plex || "ui-monospace"}, ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };
    size();

    const sparks = new Map<string, Spark>();
    let raf = 0;
    let lx = -1;
    let ly = -1;
    let last = 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const [k, s] of sparks) {
        const p = (now - s.t0) / LIFE;
        if (p >= 1) {
          sparks.delete(k);
          continue;
        }
        const alpha = s.a * (1 - p) * (1 - p);
        if (s.g) {
          ctx.fillStyle = `rgba(200,200,198,${alpha})`;
          ctx.fillText(s.g, s.x, s.y);
        } else {
          ctx.fillStyle = `rgba(200,200,198,${alpha})`;
          ctx.fillRect(s.x - 1, s.y - 1, 2, 2);
        }
      }
      raf = sparks.size ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const x = e.clientX;
      const y = e.clientY;
      const speed = lx < 0 ? 0 : Math.hypot(x - lx, y - ly);
      lx = x;
      ly = y;
      if (speed < 3) return;
      const now = performance.now();
      if (now - last < 24) return;
      last = now;
      const n = Math.min(6, 2 + Math.floor(speed / 12));
      for (let i = 0; i < n; i++) {
        const r = 6 + Math.random() * 48;
        const a = Math.random() * Math.PI * 2;
        const cx = Math.round((x + Math.cos(a) * r) / CELL) * CELL;
        const cy = Math.round((y + Math.sin(a) * r) / CELL) * CELL;
        const key = cx + ":" + cy;
        if (sparks.has(key)) continue;
        const glyph = Math.random() < 0.3 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : null;
        sparks.set(key, { x: cx, y: cy, t0: now, g: glyph, a: 0.34 + Math.random() * 0.18 });
      }
      if (sparks.size > 140) {
        const first = sparks.keys().next().value;
        if (first) sparks.delete(first);
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onLeave = () => {
      lx = -1;
      ly = -1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", size);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", size);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="pointer-field" aria-hidden="true" />;
}
