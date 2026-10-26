import type { Locale } from "@/i18n/config";
import { AddToCart } from "./AddToCart";
import { getSkalsaCopy } from "./copy";
import { eur, getBundles } from "./data";
import { SectionHead, Tile, type Tone } from "./Tile";

/* Each set's photograph, in the order of BUNDLES: the evening trio over the
   group of lit candles, the gift box over the row of candles among dried
   flowers. Both are dark, so both captions are set in the ground colour on
   the same line (the light flat lay put a brown caption on a busy, light
   surface). `position` keeps the calm part of each photo under the caption. */
const PHOTOS: Array<{
  src: string;
  w: number;
  h: number;
  tone: Tone;
  position: string;
}> = [
  { src: "/demo/skalsa/mood-2.webp", w: 1400, h: 1400, tone: "dark", position: "50% 55%" },
  { src: "/demo/skalsa/mood-1.webp", w: 1400, h: 1120, tone: "dark", position: "50% 50%" },
];

/** Gift sets as the reference's split pair: two exact halves touching in
 *  the middle, each a tall still photo with its own sticky caption row
 *  (name left, add right), so on a desktop both captions ride side by side
 *  on one line. The details a buyer needs (what is inside, the price) sit
 *  on the ground right under each photo. On a phone the two stack, each
 *  with its own details below it. */
export function Bundles({ locale }: { locale: Locale }) {
  const copy = getSkalsaCopy(locale);
  const t = copy.bundles;
  const bundles = getBundles(locale);
  const alts = [copy.mood.groupAlt, copy.mood.rowAlt];

  return (
    <section id="rinkiniai" data-sk-tone="light">
      <SectionHead label={t.eyebrow} line={t.title} />

      <ul className="grid lg:grid-cols-2">
        {bundles.map((b, i) => {
          const photo = PHOTOS[i] ?? PHOTOS[0];
          return (
            <li key={b.id} className="flex min-w-0 flex-col">
              <Tile
                src={photo.src}
                w={photo.w}
                h={photo.h}
                alt={alts[i] ?? t.imageAlt}
                tone={photo.tone}
                position={photo.position}
                className="h-[90svh] lg:h-[clamp(640px,100svh,1100px)]"
                label={<h3 className="sk-cap min-w-0 break-words">{b.name}</h3>}
                action={<AddToCart id={b.id} name={b.name} variant="quiet" />}
              />

              <div
                data-rise
                className="flex flex-1 flex-col px-[30px] pb-[56px] pt-[28px] lg:px-[60px] lg:pb-0 lg:pt-[36px]"
              >
                <p className="sk-cap max-w-[30ch] text-pretty">{b.lead}</p>
                <ul className="mt-5 text-[1rem] leading-[1.5] text-[#7E5A50]">
                  {b.contains.map((c) => (
                    <li key={c} className="min-w-0 break-words">
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="sk-cap tabular-nums">
                    {eur(b.price, locale)}
                  </span>
                  <span className="text-[0.875rem] text-[#7E5A50]">
                    {b.note ?? b.meta}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
