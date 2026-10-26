"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { FREE_SHIPPING_FROM, eur } from "./data";
import { Check } from "./AddToCart";
import { getSkalsaCopy } from "./copy";
import { useShop } from "./ShopProvider";

/** Gyva nemokamo pristatymo juosta puslapyje, tas pats matas, kaip
 *  krepšelio stalčiuje, tik čia jis matomas neatidarius stalčiaus.
 *  Tuščias krepšelis irgi turi savo būseną: juosta lieka, tik tuščia.
 *
 *  Drawn as a solid brand block across the full width: a caption row
 *  (the basket's name left, the open action right), the state in one 28 px
 *  sentence, and a 1 px line that fills with the subtotal (scaleX only). */
export function FreeShippingMeter() {
  const { count, subtotal, missing, freeShipping, openCart } = useShop();
  const locale = useLocale();
  const copy = getSkalsaCopy(locale);
  const t = copy.meter;

  const progress = freeShipping
    ? 1
    : Math.max(0.015, Math.min(subtotal / FREE_SHIPPING_FROM, 1));

  return (
    <div
      data-sk-tone="dark"
      className="bg-[#5A2A1E] px-[30px] py-[48px] text-[#F2EFEA] lg:px-[60px] lg:py-[60px]"
    >
      <div className="flex items-baseline justify-between gap-6">
        <p className="sk-cap sk-up min-w-0">{t.eyebrow}</p>
        <button
          type="button"
          onClick={openCart}
          className="sk-link shrink-0"
        >
          {count === 0 ? t.open : t.view}
        </button>
      </div>

      <p className="mt-[clamp(40px,5vw,72px)] max-w-[30ch] text-[1.375rem] leading-[1.27] text-balance lg:text-[1.75rem] lg:leading-[1.25]">
        {count === 0
          ? t.empty(FREE_SHIPPING_FROM)
          : freeShipping
            ? t.covered
            : t.missing(eur(missing, locale))}
      </p>

      <div
        className="mt-8 h-px w-full overflow-hidden bg-[rgba(242,239,234,0.24)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_FROM}
        aria-valuenow={Math.min(Math.round(subtotal), FREE_SHIPPING_FROM)}
        aria-label={copy.progressLabel(FREE_SHIPPING_FROM)}
      >
        <span
          aria-hidden="true"
          className="block h-full w-full origin-left bg-[#F2EFEA] transition-transform duration-[var(--d-el)] ease-[var(--e-out)]"
          style={{ transform: `scaleX(${count === 0 ? 0 : progress})` }}
        />
      </div>

      <p className="mt-3 flex items-center gap-2 text-[0.875rem] tabular-nums text-[rgba(242,239,234,0.78)]">
        {freeShipping && (
          <span aria-hidden="true">
            <Check size={11} />
          </span>
        )}
        {count === 0 ? t.nothing : t.summary(count, eur(subtotal, locale))}
      </p>
    </div>
  );
}
