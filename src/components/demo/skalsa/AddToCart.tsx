"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { getSkalsaCopy } from "./copy";
import { useShop } from "./ShopProvider";

/** „Į krepšelį“, trumpam pereina į patvirtinimo būseną.
 *
 *  Vienintelis grįžtamasis ryšys, kurio čia reikia: mygtukas pasikeičia,
 *  antraštės skaitiklis pasislenka. Stalčius savaime neatsidaro, pirkėjas
 *  pats sprendžia, kada eiti prie užsakymo.
 *
 *  Abu užrašai guli tame pačiame tinklelio langelyje, todėl mygtuko plotis
 *  nešokinėja: keičiasi tik tai, kuris iš jų matomas.
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
  const locale = useLocale();
  const t = getSkalsaCopy(locale).addToBasket;
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

  /* "quiet" is the reference's underlined text action (sk-act, in
     SkalsaPage); it takes the colour of whatever it sits on, so the same
     button works in a ground row and on a photo. "solid" is the one brand
     block button. Both swap their label by opacity and a 7 px shift. */
  const skin = variant === "solid" ? "sk-solid" : "sk-act";

  const label =
    "transition-[opacity,translate] duration-[var(--d-ui)] ease-[var(--e-out)] col-start-1 row-start-1";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={added ? t.addedLabel(name) : t.addLabel(name)}
      data-added={added ? "" : undefined}
      className={`${skin} active:translate-y-[1px]`}
    >
      <span aria-hidden="true" className="grid place-items-end">
        <span
          className={`${label} whitespace-nowrap ${
            added ? "-translate-y-[7px] opacity-0" : "opacity-100"
          }`}
        >
          {t.label}
        </span>
        <span
          className={`${label} flex items-center gap-2 whitespace-nowrap ${
            added ? "opacity-100" : "translate-y-[7px] opacity-0"
          }`}
        >
          {t.added}
          <Check size={12} />
        </span>
      </span>
    </button>
  );
}

/** Varnelė piešiama SVG: nei „Host Grotesk“, nei „Gloock“ neturi ✓. */
export function Check({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
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
