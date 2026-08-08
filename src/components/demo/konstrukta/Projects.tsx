import {
  BAND,
  CONTAINER,
  Plate,
  SectionHead,
  SpecRow,
  T_BODY,
  T_MICRO,
} from "./ui";

type Project = {
  no: string;
  title: string;
  body: string;
  img: { src: string; w: number; h: number; alt: string };
  specs: Array<[string, string]>;
};

const PROJECTS: Project[] = [
  {
    no: "OBJ-24-07",
    title: "Vienbutis namas, Ringaudai",
    body: "Karkasinis namas su pusiau įleista terasa. Sklypo nuolydis 2,4 m — pamatai suprojektuoti pakopomis, kad nereikėtų vežti grunto.",
    img: {
      src: "/demo/konstrukta/project-1.webp",
      w: 1400,
      h: 1050,
      alt: "Baigtas modernus vienbutis namas su tamsia fasado apdaila",
    },
    specs: [
      ["Plotas", "186 m²"],
      ["Metai", "2024"],
      ["Tipas", "Karkasinė statyba iki raktų"],
      ["Trukmė", "7 mėn."],
      ["Statusas", "Perduotas"],
    ],
  },
  {
    no: "OBJ-23-02",
    title: "Namas su panoraminiais langais, Domeikava",
    body: "Mūrinis namas, kurio pietinė siena beveik visa stiklinė. Perdanga monolitinė — kitaip nebūtų atlaikiusi 4,8 m tarpatramio virš svetainės.",
    img: {
      src: "/demo/konstrukta/project-2.webp",
      w: 1400,
      h: 788,
      alt: "Namas su dideliais langais ir prižiūrėta veja prieš jį",
    },
    specs: [
      ["Plotas", "214 m²"],
      ["Metai", "2023"],
      ["Tipas", "Mūrinė statyba"],
      ["Trukmė", "11 mėn."],
      ["Statusas", "Perduotas"],
    ],
  },
  {
    no: "OBJ-25-01",
    title: "Biurų pastatas, Kaunas, Aleksotas",
    body: "Trijų aukštų komercinis pastatas smulkiam verslui. Fasadas — matomas betonas, todėl klojinys buvo perkamas naujas, o ne nuomojamas.",
    img: {
      src: "/demo/konstrukta/project-3.webp",
      w: 1400,
      h: 860,
      alt: "Betono viešasis pastatas su ritmiškais langų blokais",
    },
    specs: [
      ["Plotas", "640 m²"],
      ["Metai", "2025"],
      ["Tipas", "Komercinė statyba"],
      ["Trukmė", "14 mėn."],
      ["Statusas", "Perduotas"],
    ],
  },
  {
    no: "OBJ-25-06",
    title: "Monolitinės perdangos, Garliava",
    body: "Konstrukcijų darbai kito rangovo objekte. Betonuota trimis etapais, kiekvienas — per vieną dieną, kad nebūtų šaltų siūlių.",
    img: {
      src: "/demo/konstrukta/project-4.webp",
      w: 1400,
      h: 1106,
      alt: "Monolitinė betono perdanga, fotografuota iš apačios",
    },
    specs: [
      ["Plotas", "1 240 m² perdangų"],
      ["Metai", "2025"],
      ["Tipas", "Konstrukcijų darbai"],
      ["Trukmė", "5 mėn."],
      ["Statusas", "Vykdomas"],
    ],
  },
];

export function Projects() {
  return (
    <section
      id="objektai"
      className={`${BAND} border-t border-white/[0.11] bg-[#1A1C20]`}
    >
      <div className={CONTAINER}>
        <SectionHead
          index="03"
          label="Objektai"
          title="Keturi objektai iš keturiasdešimties."
          lead="Kiekvienas įrašas — su tuo, kas iš tikrųjų rūpi: plotas, metai, trukmė ir viena techninė aplinkybė, kuri nulėmė sprendimą."
        />

        <div className="mt-[clamp(40px,6vw,72px)] flex flex-col gap-[clamp(48px,6vw,80px)]">
          {PROJECTS.map((p, i) => (
            <article
              key={p.no}
              data-rise
              style={{ "--i": i + 1 } as React.CSSProperties}
              className="grid gap-7 border-t border-white/[0.11] pt-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12"
            >
              <Plate
                src={p.img.src}
                width={p.img.w}
                height={p.img.h}
                alt={p.img.alt}
                className="min-w-0"
              />

              <div className="min-w-0">
                <p className={`${T_MICRO} tracking-[0.2em] text-[#9A9791]`}>
                  {p.no}
                </p>
                <h3 className="mt-3 text-balance text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#E7E5E1] md:text-[1.25rem]">
                  {p.title}
                </h3>
                <p
                  className={`mt-4 max-w-[52ch] text-pretty ${T_BODY} text-[#9A9791]`}
                >
                  {p.body}
                </p>

                <dl className="mt-7 border-t border-white/[0.11]">
                  {p.specs.map(([k, v]) => (
                    <SpecRow key={k} k={k} v={v} />
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
