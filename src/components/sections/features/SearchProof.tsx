"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Plate, PlateHead, caps, step, usePre, type ArtefactProps } from "./shared";

/** How long *this* page took to become usable, read from the browser's own
 *  Navigation Timing entry.
 *
 *  The bar chart that used to sit here raced an unnamed "template site" to an
 *  invented 58%. That is a statistic with no source dressed as evidence, and
 *  a sceptical buyer is right to ask where 58 came from. This is the opposite:
 *  one number, about the page they are already looking at, measured on their
 *  own machine, checkable in their own dev tools. If it is ever a bad number
 *  it is still the true one.
 *
 *  Returns null until a real measurement exists — never a placeholder figure.
 */
function useLoadSeconds(): number | null {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    let timer = 0;
    // `loadEventEnd` is the whole page — markup, styles, fonts, scripts, the
    // lot — which is the only reading a visitor would recognise as "how long
    // it took". It stays 0 until the load event has finished, so the fallback
    // is DOMContentLoaded rather than a printed zero.
    const read = () => {
      const [nav] = performance.getEntriesByType(
        "navigation",
      ) as PerformanceNavigationTiming[];
      const t = nav?.loadEventEnd || nav?.domContentLoadedEventEnd || 0;
      if (t <= 0) return false;
      setMs(t);
      return true;
    };
    if (document.readyState === "complete" && read()) return;
    const onLoad = () => {
      // a tick after the event, so loadEventEnd is populated
      timer = window.setTimeout(read, 0);
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return ms === null ? null : ms / 1000;
}

/** ARTEFACT 02 — found, and fast.
 *
 *  A plainly fictional listing ("Jūsų verslas") rendered the way a search
 *  engine renders one, and under it the one speed figure on this site that
 *  nobody has to take on trust.
 */
export function SearchProof({ play, armed, className }: ArtefactProps) {
  const pre = usePre(play, armed);
  const seconds = useLoadSeconds();

  const line = cn(
    "transition-[opacity,translate] duration-[var(--d-gesture)] ease-[var(--e-out)]",
    pre ? "translate-y-1.5 opacity-0" : "translate-y-0 opacity-100",
  );

  return (
    <Plate className={className}>
      <PlateHead no="02" name="Paieška ir greitis" />

      {/* the query */}
      <div
        className={cn(
          "mt-5 flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2.5",
          line,
        )}
        style={step(0)}
      >
        <span className="min-w-0 truncate text-[0.82rem] text-text">
          jūsų verslas vilniuje
        </span>
        <span aria-hidden="true" className="h-4 w-px shrink-0 bg-text/45" />
      </div>

      {/* the result */}
      <div className="mt-5 border-t border-border pt-4">
        <p
          className={cn("truncate text-[0.7rem] text-text-muted", line)}
          style={step(2)}
        >
          jusuverslas.lt › paslaugos
        </p>
        <p
          className={cn(
            "mt-1 text-[1rem] leading-[1.3] tracking-[-0.015em] text-text",
            line,
          )}
          style={step(3)}
        >
          Jūsų verslas — paslaugos, kainos, kontaktai
        </p>
        <p
          className={cn("mt-2 text-[0.8rem] leading-[1.5] text-text-muted", line)}
          style={step(4)}
        >
          Aiški struktūra, tvarkingi pavadinimai, greitas puslapis. Tiek reikia,
          kad jus rastų — ir kad liktų.
        </p>
      </div>

      {/* the measurement */}
      <div className="mt-6 border-t border-border pt-5">
        <p className={cn(caps, "text-text-muted", line)} style={step(5)}>
          Įkėlimas
        </p>
        <p
          className={cn(
            "mt-2 font-normal leading-none tracking-[-0.03em] tabular-nums text-text",
            line,
          )}
          style={{
            fontSize: "clamp(1.5rem, min(2.8vw, 4.4vh), 2.1rem)",
            ...step(6),
          }}
        >
          {seconds === null ? "—" : `${seconds.toFixed(2).replace(".", ",")} s`}
        </p>
        <p className={cn(caps, "mt-2 text-text-muted", line)} style={step(7)}>
          Šis puslapis — tikras matavimas jūsų naršyklėje
        </p>
      </div>
    </Plate>
  );
}
