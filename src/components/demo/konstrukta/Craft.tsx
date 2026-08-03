import { BAND, CONTAINER, Plate, SectionHead, T_MICRO, T_SM } from "./ui";

const SHOTS = [
  {
    code: "A/01",
    src: "/demo/konstrukta/detail-cut.webp",
    w: 1200,
    h: 800,
    alt: "Betono pjovimas deimantiniu disku, kyla dulkės",
    caption:
      "Angos pjaunamos deimantiniu disku. Be smūgių — todėl aplink pjūvį nelieka įtrūkimų.",
  },
  {
    code: "A/02",
    src: "/demo/konstrukta/worker.webp",
    w: 1200,
    h: 800,
    alt: "Statybininkas dirba ant medinio karkaso konstrukcijos",
    caption:
      "Karkasas renkamas pagal gamyklinį brėžinį. Kiekviena jungtis turi savo numerį ir savo varžtą.",
  },
  {
    code: "A/03",
    src: "/demo/konstrukta/truss.webp",
    w: 1400,
    h: 933,
    alt: "Stogo santvarų konstrukcija iš vidaus",
    caption:
      "Santvaros — žingsnis 600 mm, mediena C24, apdorota antiseptiku dar sandėlyje.",
  },
  {
    code: "A/04",
    src: "/demo/konstrukta/scaffold.webp",
    w: 1400,
    h: 933,
    alt: "Pastoliai prie pastato fasado prieblandoje",
    caption:
      "Pastoliai statomi su apsauginiu tinklu, o aikštelė sutvarkoma kiekvieno etapo pabaigoje.",
  },
];

export function Craft() {
  return (
    <section id="amatas" className={`${BAND} border-t border-white/[0.11]`}>
      <div className={CONTAINER}>
        <SectionHead
          index="06"
          label="Amatas"
          title="Kokybė matosi ten, kur niekas nežiūri."
          lead="Keturios detalės iš eilinių darbo dienų. Ne rikiuotė prieš objektyvą — tiesiog tai, kaip atrodo tvarkinga aikštelė."
        />

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-x-[clamp(20px,3vw,36px)] gap-y-[clamp(32px,4vw,52px)] sm:grid-cols-2">
          {SHOTS.map((s, i) => (
            <figure
              key={s.code}
              data-rise
              style={{ "--i": i + 1 } as React.CSSProperties}
              className="min-w-0"
            >
              <Plate src={s.src} width={s.w} height={s.h} alt={s.alt} />
              <figcaption className="mt-4 border-t border-white/[0.11] pt-3">
                <span className={`${T_MICRO} block text-[#9A9791]`}>
                  {s.code}
                </span>
                <span
                  className={`mt-2 block max-w-[46ch] text-pretty ${T_SM} text-[#E7E5E1]`}
                >
                  {s.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
