import type { Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";
import { eur, getProducts } from "./data";
import { CatalogRow, type RowItem } from "./CatalogRow";

/** The shop: the reference's "Curated for you" row. A 20 px label top
 *  left, Prev / Next as plain text top right, then the six candles side by
 *  side as square photographs on the gutter grid, each with one small line
 *  of name and price, its scent, and the add action. No cards, borders,
 *  badges or stars. Four in view on a desktop, 1.2 on a phone, where the
 *  row is simply swiped. */
export function Catalog({ locale }: { locale: Locale }) {
  const copy = getSkalsaCopy(locale);
  const t = copy.catalog;
  const items: RowItem[] = getProducts(locale).map((p) => ({
    id: p.id,
    name: p.name,
    scent: p.scent,
    price: eur(p.price, locale),
    specs: copy.units.specs(p.burn, p.weight),
    img: p.img,
    w: p.w,
    h: p.h,
    alt: p.alt,
  }));

  return (
    <section
      id="katalogas"
      data-sk-tone="light"
      className="pt-[clamp(80px,8vw,120px)]"
    >
      <CatalogRow
        title={t.title}
        label={t.eyebrow}
        prev={t.prev}
        next={t.next}
        items={items}
      />
    </section>
  );
}
