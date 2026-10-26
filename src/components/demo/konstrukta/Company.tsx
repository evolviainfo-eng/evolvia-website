import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { BAND, Photo, SectionHead, SpecRow, T_SM, WRAP } from "./ui";

/** Haven's "guiding values" page: heading, hairline, the square label and
 *  one photograph in the left half, the reading column in the right half.
 *  The company facts follow the lead as a quiet hairline table, level with
 *  the photograph. Phone: label, lead, table, photograph. */
export function Company({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).company;
  const photo = (
    <figure className="min-w-0">
      <Photo
        src="/demo/konstrukta/company.webp"
        width={2000}
        height={1333}
        alt={c.alt}
        settle
      />
      <figcaption
        className={`mt-4 max-w-[52ch] text-pretty ${T_SM} text-[#5E5E5E]`}
      >
        {c.caption}
      </figcaption>
    </figure>
  );
  return (
    <section id="bendrove" className={BAND}>
      <div className={WRAP}>
        <SectionHead
          label={c.label}
          title={c.title}
          lead={c.lead}
          aside={photo}
        >
          <dl
            data-rise
            className="mt-10 max-w-[640px] border-t border-[#E2E2E2]"
          >
            {c.facts.map(([k, v]) => (
              <SpecRow key={k} k={k} v={v} />
            ))}
          </dl>
        </SectionHead>
      </div>
    </section>
  );
}
