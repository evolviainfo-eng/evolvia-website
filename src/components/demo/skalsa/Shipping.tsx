import type { Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";
import { FreeShippingMeter } from "./FreeShippingMeter";

export function Shipping({ locale }: { locale: Locale }) {
  const t = getSkalsaCopy(locale).shipping;

  return (
    <section data-sk-sec="pristatymas" className="relative">
      <span
        id="pristatymas"
        aria-hidden="true"
        className="absolute -top-[30px]"
      />
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
        <div data-rise className="max-w-[46ch]">
          <p className="text-[0.8125rem] uppercase tracking-[0.16em] text-[#6E6257]">
            {t.eyebrow}
          </p>
          <h2
            className="mt-4 text-[clamp(1.875rem,3.4vw,2.5rem)] leading-[1.08] text-balance"
            style={{
              fontFamily: "var(--font-skalsa-display)",
              fontWeight: 500,
            }}
          >
            {t.title}
          </h2>
        </div>

        <dl
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-[clamp(36px,5vw,64px)] grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.facts.map((f) => (
            <div
              key={f.title}
              className="min-w-0 border-t border-[rgba(36,30,25,0.13)] pt-5"
            >
              <dt className="text-[0.9375rem] leading-tight tracking-[-0.01em] text-pretty">
                {f.title}
              </dt>
              <dd className="mt-2.5 max-w-[40ch] text-[0.9375rem] leading-[1.6] text-pretty text-[#6E6257]">
                {f.body}
              </dd>
            </div>
          ))}
        </dl>

        <FreeShippingMeter />
      </div>
    </section>
  );
}
