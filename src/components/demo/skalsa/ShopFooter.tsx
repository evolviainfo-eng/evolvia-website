import type { Locale } from "@/i18n/config";
import { getSkalsaCopy } from "./copy";

/* Nuorodų tekstai žodyne, po tuo pačiu `id`. */
const LINKS = [
  { href: "#katalogas", id: "katalogas" },
  { href: "#rinkiniai", id: "rinkiniai" },
  { href: "#dirbtuve", id: "dirbtuve" },
  { href: "#pristatymas", id: "pristatymas" },
] as const;

const LINK =
  "text-[1rem] leading-[1.4] transition-opacity duration-150 hover:opacity-60";

/** Parduotuvės pabaiga, giliausia prekės ženklo spalva. Kontaktai,
 *  sąmoningai pavyzdiniai. The wordmark in the serif at a modest 48 px top
 *  left (not a giant signature word), the blurb on the right half, then
 *  plain links and the workshop's details. */
export function ShopFooter({ locale }: { locale: Locale }) {
  const t = getSkalsaCopy(locale).footer;

  return (
    <footer
      data-sk-tone="dark"
      className="bg-[#2A1410] px-[30px] pb-[40px] pt-[64px] text-[#F2EFEA] lg:px-[60px] lg:pt-[80px]"
    >
      <div className="grid gap-x-[120px] gap-y-10 lg:grid-cols-2">
        <p className="sk-serif text-[2.5rem] leading-none lg:text-[3rem]">
          Skalsa
        </p>
        <p className="sk-cap max-w-[34ch] text-pretty">{t.blurb}</p>
      </div>

      <div className="mt-16 grid gap-x-[120px] lg:mt-24 lg:grid-cols-2">
        <div className="grid min-w-0 gap-x-[60px] gap-y-10 sm:grid-cols-2 lg:col-start-2">
          <nav aria-label={t.navLabel} className="min-w-0">
            <p className="sk-nav text-[rgba(242,239,234,0.68)]">{t.shop}</p>
            <ul className="mt-4 grid justify-items-start gap-2">
              {LINKS.map((l) => (
                <li key={l.href} className="min-w-0">
                  <a href={l.href} className={LINK}>
                    {t.links[l.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <p className="sk-nav text-[rgba(242,239,234,0.68)]">{t.contacts}</p>
            <ul className="mt-4 grid justify-items-start gap-2 text-[1rem] leading-[1.4]">
              <li className="min-w-0">
                <a href="tel:+37060000000" className={LINK}>
                  +370 600 00000
                </a>
              </li>
              <li className="min-w-0 break-words">
                <a
                  href="mailto:labas@skalsa.demo"
                  className={`${LINK} break-words`}
                >
                  labas@skalsa.demo
                </a>
              </li>
              <li className="text-[rgba(242,239,234,0.68)]">{t.workshop}</li>
              <li className="text-[rgba(242,239,234,0.68)]">{t.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 lg:mt-24">
        <p className="min-w-0 text-[0.875rem] text-[rgba(242,239,234,0.68)]">
          {t.legal}
        </p>
        <a href="#virsus" className="sk-link shrink-0">
          {t.toTop}
        </a>
      </div>
    </footer>
  );
}
