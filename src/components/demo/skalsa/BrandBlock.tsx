import type { Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";

/** The solid brand block: the whole width in the deep brown, two halves
 *  split by a hairline, each a caption row (name left, "Atrasti" right)
 *  and its one sentence under it. The reference hangs line drawings of its
 *  two salons here; Skalsa owns none, so the block is sized to its words
 *  instead of standing as an empty brown field. */
export function BrandBlock({ locale }: { locale: Locale }) {
  const copy = getSkalsaCopy(locale);
  const cols = [
    {
      name: copy.header.links.katalogas,
      href: "#katalogas",
      line: copy.catalog.lead,
    },
    {
      name: copy.header.links.rinkiniai,
      href: "#rinkiniai",
      line: copy.bundles.blockLine,
    },
  ];

  return (
    <section
      data-sk-tone="dark"
      className="grid bg-[#5A2A1E] text-[#F2EFEA] lg:grid-cols-2"
    >
      {cols.map((c, i) => (
        <div
          key={c.href}
          className={`flex min-w-0 flex-col gap-10 px-[30px] py-[44px] lg:gap-[clamp(56px,7vw,104px)] lg:px-[60px] lg:py-[56px] ${
            i > 0
              ? "border-t border-[rgba(242,239,234,0.18)] lg:border-l lg:border-t-0"
              : ""
          }`}
        >
          <div
            data-rise
            style={{ "--i": i } as React.CSSProperties}
            className="flex items-baseline justify-between gap-6"
          >
            <h2 className="sk-cap sk-up min-w-0">{c.name}</h2>
            <a href={c.href} className="sk-link shrink-0">
              {copy.discover}
            </a>
          </div>
          <p
            data-rise
            style={{ "--i": i + 1 } as React.CSSProperties}
            className="sk-cap max-w-[34ch] text-pretty"
          >
            {c.line}
          </p>
        </div>
      ))}
    </section>
  );
}
