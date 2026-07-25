"use client";

import { useEffect, useRef, useState } from "react";
import { useShop } from "./ShopProvider";

/** „Į krepšelį“ — trumpam pereina į patvirtinimo būseną.
 *
 *  Vienintelis grįžtamasis ryšys, kurio čia reikia: mygtukas pasikeičia,
 *  antraštės skaitiklis pasislenka. Stalčius savaime neatsidaro — pirkėjas
 *  pats sprendžia, kada eiti prie užsakymo.
 */
export function AddToCart({
  id,
  name,
  variant = "solid",
}: {
  id: string;
  name: string;
  variant?: "solid" | "quiet";
}) {
  const { add } = useShop();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const onClick = () => {
    add(id);
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1500);
  };

  const base =
    "inline-flex h-11 items-center justify-center rounded-full px-5 text-[0.86rem] transition-[background-color,color,border-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] active:translate-y-[1px]";

  const skin = added
    ? "border border-[#B4562F] bg-[#B4562F] text-[#FAF6F0]"
    : variant === "solid"
      ? "border border-[#241E19] bg-[#241E19] text-[#FAF6F0] hover:bg-[#3a3129] hover:border-[#3a3129]"
      : "border border-[rgba(36,30,25,0.13)] bg-transparent text-[#241E19] hover:border-[rgba(36,30,25,0.4)]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={added ? `${name} — pridėta į krepšelį` : `Įdėti „${name}“ į krepšelį`}
      className={`${base} ${skin}`}
    >
      {added ? (
        <span aria-hidden="true" className="inline-flex items-center gap-2">
          Pridėta
          <Check size={12} />
        </span>
      ) : (
        <span aria-hidden="true">Į krepšelį</span>
      )}
    </button>
  );
}

/** Varnelė piešiama SVG — nei „Bricolage Grotesque“, nei „Outfit“ neturi ✓. */
export function Check({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1.6 6.3 4.5 9.1 10.4 2.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
