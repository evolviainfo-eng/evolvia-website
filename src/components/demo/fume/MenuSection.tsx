import { Body, Eyebrow, H2, HAIRLINE, Photo } from "./Type";

type Item = { n: string; d: string; p: number };

const COURSES: { title: string; note: string; items: Item[] }[] = [
  {
    title: "Pradžiai",
    note: "Skirta dalintis",
    items: [
      {
        n: "Duona ant anglių su lašinių sviestu",
        d: "svogūnų pelenai, jūros druska",
        p: 6,
      },
      {
        n: "Keptos porų širdelės",
        d: "dūmų grietinėlė, skrudinti lazdyno riešutai",
        p: 11,
      },
      {
        n: "Sūdyta menkė",
        d: "burokėlis, grietinė, krapų aliejus",
        p: 12,
      },
      {
        n: "Rūkyto ungurio tartinė",
        d: "ruginė duona, obuolys, krienai",
        p: 14,
      },
      {
        n: "Jautienos tartaras",
        d: "kepta duona, kaulų čiulpai, kaparėliai",
        p: 15,
      },
    ],
  },
  {
    title: "Pagrindiniai",
    note: "Visi — nuo atviros ugnies",
    items: [
      {
        n: "Ugnyje keptas kopūstas",
        d: "lęšiai, rūkyta grietinė, graikiniai riešutai",
        p: 19,
      },
      {
        n: "Ant alksnio anglių kepta lašiša",
        d: "pastarnokas, sviesto ir citrinos padažas",
        p: 24,
      },
      {
        n: "Ėrienos petys, troškintas dvylika valandų",
        d: "baltosios pupelės, mėtų aliejus",
        p: 28,
      },
      {
        n: "Ant anglių keptas jautienos šonkaulis",
        d: "keptas topinambas, juodųjų česnakų padažas",
        p: 32,
      },
    ],
  },
  {
    title: "Desertai",
    note: "Prie jų siūlome saldų vyną taurėmis",
    items: [
      { n: "Deginto cukraus kremas", d: "šaltalankiai, medaus krekeris", p: 9 },
      {
        n: "Šokoladinis pyragas su dūmų druska",
        d: "grietinėlės ledai",
        p: 10,
      },
      {
        n: "Lietuviškų sūrių rinkinys",
        d: "medus, riešutinė duona",
        p: 14,
      },
    ],
  },
];

const PLATES = [
  {
    src: "/demo/fume/dish-1.webp",
    w: 1100,
    h: 732,
    alt: "Ant anglių kepta jautiena juodoje lėkštėje",
    cls: "sm:col-start-1 sm:col-span-7",
  },
  {
    src: "/demo/fume/dish-5.webp",
    w: 1100,
    h: 733,
    alt: "Sezoninių daržovių patiekalas",
    cls: "max-sm:w-[82%] max-sm:ml-auto sm:col-start-9 sm:col-span-4 sm:mt-[clamp(32px,6vw,84px)]",
  },
  {
    src: "/demo/fume/dish-3.webp",
    w: 1100,
    h: 732,
    alt: "Žuvies patiekalas šviesiame padaže",
    cls: "sm:col-start-2 sm:col-span-5",
  },
  {
    src: "/demo/fume/dish-7.webp",
    w: 1100,
    h: 729,
    alt: "Lašiša juodame dubenyje",
    cls: "max-sm:w-[82%] sm:col-start-8 sm:col-span-4 sm:mt-[clamp(24px,4vw,60px)]",
  },
  {
    src: "/demo/fume/dish-6.webp",
    w: 1100,
    h: 735,
    alt: "Desertų eilė ant medinio stalo",
    cls: "sm:col-start-3 sm:col-span-8",
  },
];

function Course({ title, note, items }: (typeof COURSES)[number]) {
  return (
    <div>
      <div
        className="flex items-baseline justify-between gap-4 border-b pb-3"
        style={{ borderColor: HAIRLINE }}
      >
        <h3 className="font-[family-name:var(--font-fume-display)] text-[clamp(1.35rem,3vw,1.7rem)] font-light italic leading-none text-[#ede6da]">
          {title}
        </h3>
        <p className="min-w-0 text-right font-[family-name:var(--font-fume-ui)] text-[0.68rem] uppercase tracking-[0.16em] text-[#9c948a]">
          {note}
        </p>
      </div>

      <ul>
        {items.map((it) => (
          <li
            key={it.n}
            className="flex items-baseline gap-5 border-b border-[rgba(237,230,218,0.07)] py-4 last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--font-fume-display)] text-[1.12rem] font-normal leading-[1.3] text-[#ede6da]">
                {it.n}
              </p>
              <p className="mt-1.5 font-[family-name:var(--font-fume-ui)] text-[0.8rem] leading-[1.6] text-[#9c948a]">
                {it.d}
              </p>
            </div>
            <span className="shrink-0 font-[family-name:var(--font-fume-ui)] text-[0.92rem] tabular-nums text-[rgba(237,230,218,0.88)]">
              {it.p}&nbsp;€
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuSection() {
  return (
    <section
      id="meniu"
      className="bg-[#141210] py-[clamp(64px,9vw,120px)]"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div data-rise className="mx-auto max-w-[760px]">
          {/* accent 2 of 5 — the one warm mark on the printed page */}
          <span
            aria-hidden
            className="block h-px w-9 bg-[#C0703A]"
          />
          <div className="mt-5">
            <Eyebrow>Meniu</Eyebrow>
          </div>
          <H2 className="mt-5">Sezoninė kortelė</H2>
          <Body className="mt-5 max-w-[52ch]">
            Kortelę perrašome kas tris–keturias savaites. Jei turite alergijų
            ar nevalgote mėsos — pasakykite salės vadovui, pritaikysime beveik
            viską.
          </Body>
        </div>

        <div className="mx-auto mt-[clamp(40px,6vw,72px)] max-w-[760px] space-y-[clamp(40px,5vw,64px)]">
          {COURSES.map((c, i) => (
            <div
              key={c.title}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
            >
              <Course {...c} />
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-8 max-w-[760px] border-t pt-5 font-[family-name:var(--font-fume-ui)] text-[0.76rem] leading-relaxed text-[#9c948a]"
          style={{ borderColor: HAIRLINE }}
        >
          Aptarnavimas į kainą neįskaičiuotas. Degustacinis vakaras — penki
          patiekalai, 58 € asmeniui — vyksta trečiadieniais, iš anksto.
        </p>

        {/* Photography sits apart from the list: not cards, no captions —
            just plates arranged the way they would fall on a table. */}
        <div
          data-rise
          className="mt-[clamp(56px,8vw,112px)] grid grid-cols-1 gap-[clamp(16px,2.5vw,28px)] sm:grid-cols-12"
        >
          {PLATES.map((p) => (
            <figure
              key={p.src}
              className={`min-w-0 overflow-hidden bg-[#0c0b0a] ${p.cls}`}
              style={{ aspectRatio: `${p.w} / ${p.h}` }}
            >
              <Photo
                src={p.src}
                w={p.w}
                h={p.h}
                alt={p.alt}
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
