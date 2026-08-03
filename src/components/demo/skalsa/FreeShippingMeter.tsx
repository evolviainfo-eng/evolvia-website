"use client";

import { FREE_SHIPPING_FROM, eur } from "./data";
import { Check } from "./AddToCart";
import { useShop } from "./ShopProvider";

/** Gyva nemokamo pristatymo juosta puslapyje — tas pats matas, kaip
 *  krepšelio stalčiuje, tik čia jis matomas neatidarius stalčiaus.
 *  Tuščias krepšelis irgi turi savo būseną: juosta lieka, tik tuščia. */
export function FreeShippingMeter() {
  const { count, subtotal, missing, freeShipping, openCart } = useShop();

  const progress = freeShipping
    ? 1
    : Math.max(0.015, Math.min(subtotal / FREE_SHIPPING_FROM, 1));

  return (
    <div className="mt-[clamp(40px,5vw,64px)] rounded-[10px] border border-[rgba(36,30,25,0.13)] bg-[#F1EAE0] p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div className="min-w-0">
          <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[#6E6257]">
            Jūsų krepšelis
          </p>
          <p
            className="mt-3 max-w-[34ch] text-[1.125rem] leading-[1.3] tracking-[-0.015em] text-pretty"
            style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
          >
            {count === 0
              ? `Nemokamas pristatymas prasideda nuo ${FREE_SHIPPING_FROM} €.`
              : freeShipping
                ? "Pristatymą jau padengėme mes."
                : `Iki nemokamo pristatymo trūksta ${eur(missing)}.`}
          </p>
        </div>

        <button
          type="button"
          onClick={openCart}
          className="group inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full border border-[rgba(36,30,25,0.13)] bg-[#FAF6F0] pl-6 pr-5 text-[0.875rem] text-[#241E19] transition-[background-color,border-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:border-[#241E19] hover:bg-[#241E19] hover:text-[#FAF6F0] active:translate-y-0"
        >
          {count === 0 ? "Atidaryti krepšelį" : "Peržiūrėti krepšelį"}
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:translate-x-[3px]"
          >
            <path
              d="M1 5h11.4M8.7 1.2 12.5 5 8.7 8.8"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        className="mt-7 h-[3px] w-full overflow-hidden rounded-full bg-[rgba(36,30,25,0.13)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_FROM}
        aria-valuenow={Math.min(Math.round(subtotal), FREE_SHIPPING_FROM)}
        aria-label={`Iki nemokamo pristatymo — riba ${FREE_SHIPPING_FROM} €`}
      >
        <span
          aria-hidden="true"
          className="block h-full w-full origin-left rounded-full bg-[#B4562F] transition-transform duration-[var(--d-el)] ease-[var(--e-out)]"
          style={{ transform: `scaleX(${count === 0 ? 0 : progress})` }}
        />
      </div>

      <p className="mt-3 flex items-center gap-2 text-[0.8125rem] tabular-nums text-[#6E6257]">
        {freeShipping && (
          <span aria-hidden="true" className="text-[#B4562F]">
            <Check size={11} />
          </span>
        )}
        {count === 0
          ? "Krepšelyje kol kas nieko nėra."
          : `Krepšelyje ${count} vnt. · ${eur(subtotal)}`}
      </p>
    </div>
  );
}
