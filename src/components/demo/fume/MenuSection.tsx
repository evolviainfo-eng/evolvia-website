import type { Locale } from "@/i18n/config";
import type { FumeCopy } from "@/i18n/dictionaries/lt/fume";
import { getFumeCopy } from "./copy";
import { Body, Eyebrow, H2, HAIRLINE, Note, Shot } from "./Type";

type CourseCopy = FumeCopy["menu"]["courses"][number];

/** Layout only. Each plate's alt text is the entry at the same position in
 *  the copy's `plateAlts`. */
const PLATES = [
  {
    src: "/demo/fume/dish-1.webp",
    w: 1100,
    h: 732,
    cls: "sm:col-start-1 sm:col-span-7",
  },
  {
    src: "/demo/fume/dish-5.webp",
    w: 1100,
    h: 733,
    cls: "max-sm:w-[82%] max-sm:ml-auto sm:col-start-9 sm:col-span-4 sm:mt-[clamp(32px,6vw,84px)]",
  },
  {
    src: "/demo/fume/dish-3.webp",
    w: 1100,
    h: 732,
    cls: "sm:col-start-2 sm:col-span-5",
  },
  {
    src: "/demo/fume/dish-7.webp",
    w: 1100,
    h: 729,
    cls: "max-sm:w-[82%] sm:col-start-8 sm:col-span-4 sm:mt-[clamp(24px,4vw,60px)]",
  },
  {
    src: "/demo/fume/dish-6.webp",
    w: 1100,
    h: 735,
    cls: "sm:col-start-3 sm:col-span-8",
  },
];

/** A course, set the way a printed card sets one: name and price on the same
 *  baseline with leaders between them, the description dropped underneath, and
 *  every price landing in the same 3.4rem column so the figures form a line of
 *  their own down the page.
 *
 *  The leaders are hidden below 640px — at that width a name needs the whole
 *  measure, and dots would be filling a gap of two characters. */
function Course({
  title,
  note,
  items,
  price,
}: CourseCopy & { price: FumeCopy["price"] }) {
  return (
    <div>
      <div
        className="flex flex-col gap-1 border-b pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        style={{ borderColor: HAIRLINE }}
      >
        <h3 className="font-[family-name:var(--font-fume-display)] text-[clamp(1.25rem,3vw,1.875rem)] font-light italic leading-none text-[#ede6da]">
          {title}
        </h3>
        <p className="min-w-0 font-[family-name:var(--font-fume-ui)] text-[0.6875rem] uppercase tracking-[0.18em] text-[#9c948a] sm:text-right">
          {note}
        </p>
      </div>

      <ul>
        {items.map((it) => (
          <li
            key={it.n}
            style={{ borderColor: HAIRLINE }}
            className="fume-row -mx-2 border-b px-2 py-4 last:border-b-0"
          >
            <p className="flex items-baseline gap-x-3">
              <span className="min-w-0 flex-1 font-[family-name:var(--font-fume-display)] text-[1.0625rem] leading-[1.3] text-[#ede6da] sm:flex-initial">
                {it.n}
              </span>
              <span
                aria-hidden
                className="fume-leader hidden min-w-[2rem] flex-1 sm:block"
              />
              <span className="w-[3.4rem] shrink-0 text-right font-[family-name:var(--font-fume-display)] text-[1.0625rem] leading-[1.3] tabular-nums text-[rgba(237,230,218,0.9)]">
                {price(it.p)}
              </span>
            </p>
            <p className="mt-1.5 max-w-[46ch] font-[family-name:var(--font-fume-ui)] text-[0.8125rem] leading-[1.6] text-[#9c948a]">
              {it.d}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuSection({ locale }: { locale: Locale }) {
  const { menu: copy, price } = getFumeCopy(locale);

  return (
    <section id="meniu" className="bg-[#141210] py-[var(--sec)]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div data-rise className="mx-auto max-w-[760px]">
          {/* accent 2 of 4 — the one warm mark on the printed page */}
          <span aria-hidden className="block h-px w-9 bg-[#C0703A]" />
          <div className="mt-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </div>
          <H2 className="mt-5">{copy.title}</H2>
          <Body className="mt-5 max-w-[52ch]">{copy.lead}</Body>
        </div>

        <div className="mx-auto mt-[clamp(40px,6vw,72px)] max-w-[760px] space-y-[clamp(40px,5vw,64px)]">
          {copy.courses.map((c, i) => (
            <div
              key={c.title}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
            >
              <Course {...c} price={price} />
            </div>
          ))}
        </div>

        <div
          style={{ borderColor: HAIRLINE }}
          className="mx-auto mt-8 max-w-[760px] border-t pt-5"
        >
          <Note>{copy.footnote}</Note>
        </div>

        {/* Photography sits apart from the list: not cards, no captions —
            just plates arranged the way they would fall on a table. */}
        <div
          data-rise
          className="mt-[clamp(56px,8vw,112px)] grid grid-cols-1 gap-[clamp(16px,2.5vw,28px)] sm:grid-cols-12"
        >
          {PLATES.map((p, i) => (
            <Shot
              key={p.src}
              src={p.src}
              w={p.w}
              h={p.h}
              alt={copy.plateAlts[i]}
              className={p.cls}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
