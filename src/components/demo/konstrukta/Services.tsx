import { BAND, CONTAINER, SectionHead, Tag } from "./ui";

const SERVICES = [
  {
    no: "01",
    title: "Karkasinė statyba",
    body: "Medinis karkasas pjaunamas pagal gamyklinį brėžinį ir surenkamas aikštelėje. Uždaras kontūras — per 3–5 savaites nuo pamatų.",
    specs: ["Mediena C24", "Žingsnis 600 mm", "U ≤ 0,13 W/m²K"],
  },
  {
    no: "02",
    title: "Mūrinė statyba",
    body: "Keramzitblokių ir keraminių plytų mūras su monolitinėmis perdangomis. Sunkiau, lėčiau, bet šimtmečiui.",
    specs: ["Keramzitblokis", "Monolitinė perdanga", "A++ klasė"],
  },
  {
    no: "03",
    title: "Renovacija ir fasadai",
    body: "Senų namų apšiltinimas, tinkuojamos ir vėdinamos fasado sistemos, stogo keitimas. Pradedame nuo termovizinės nuotraukos, ne nuo katalogo.",
    specs: ["Tinkuojama sistema", "Vėdinamas fasadas", "Termovizinis auditas"],
  },
  {
    no: "04",
    title: "Vidaus apdaila",
    body: "Elektra, santechnika, vėdinimas, glaistymas, grindys, dažai. Ta pati komanda, kuri statė sienas — todėl nėra ko kaltinti.",
    specs: ["Inžinerinės sistemos", "Apdailos darbai", "Objekto perdavimas"],
  },
];

export function Services() {
  return (
    <section
      id="paslaugos"
      className={`${BAND} border-t border-white/[0.11]`}
    >
      <div className={CONTAINER}>
        <div className="grid gap-[clamp(32px,5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:items-end">
          <SectionHead
            index="02"
            label="Ką statome"
            title="Keturios sritys. Nė viena — „taip pat galime“."
            lead="Nesiimame darbų, kuriems neturime nei savo komandos, nei patikrinto subrangovo. Trumpesnis sąrašas — mažiau staigmenų grafike."
          />

          <figure className="min-w-0">
            <div className="border border-white/[0.11] p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demo/konstrukta/frame.webp"
                width={1400}
                height={933}
                alt="Medinis namo karkasas su pastoliais statybos aikštelėje"
                decoding="async"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="knst-mono mt-3 text-[0.63rem] uppercase leading-relaxed tracking-[0.12em] text-[#9A9791]">
              Karkasas · Ringaudai · 11 darbo dienų iki uždaro kontūro
            </figcaption>
          </figure>
        </div>

        <ol className="mt-[clamp(44px,6vw,72px)] border-t border-white/[0.11]">
          {SERVICES.map((s, i) => (
            <li
              key={s.no}
              data-rise
              style={{ "--i": i + 1 } as React.CSSProperties}
              className="border-b border-white/[0.11]"
            >
              <div className="grid gap-x-8 gap-y-4 px-1 py-7 transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:bg-[#1A1C20] md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.25fr)] md:py-9">
                <span className="knst-mono text-[0.7rem] tracking-[0.18em] text-[#9A9791]">
                  {s.no}
                </span>

                <h3 className="min-w-0 text-[1.18rem] font-semibold leading-tight tracking-[-0.018em] text-[#E7E5E1] md:text-[1.3rem]">
                  {s.title}
                </h3>

                <div className="min-w-0">
                  <p className="text-[0.95rem] leading-[1.62] text-[#9A9791]">
                    {s.body}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.specs.map((sp) => (
                      <li key={sp}>
                        <Tag>{sp}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
