import { BAND, CONTAINER, Plate, SectionHead, SpecRow, T_MICRO } from "./ui";

const PASS: Array<[string, string]> = [
  ["Įsteigta", "2009 m."],
  ["Teisinė forma", "UAB"],
  ["Veikla", "Generalinė ranga"],
  ["Teritorija", "Kaunas · 60 km spinduliu"],
  ["Komanda", "12 nuolatinių darbuotojų"],
  ["Objektų nuo 2009", "40"],
  ["Konstrukcijų garantija", "5 metai"],
  ["Objekto apžiūra", "Nemokama"],
];

export function Company() {
  return (
    <section id="bendrove" className={`${BAND} border-t border-white/[0.11]`}>
      <div className={CONTAINER}>
        <div className="grid gap-[clamp(36px,5vw,64px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="min-w-0">
            <SectionHead
              index="01"
              label="Bendrovė"
              title="Viena komanda, viena atsakomybė."
              lead="Konstrukta dirba Kaune nuo 2009-ųjų. Imamės objekto kaip generalinis rangovas: patys sudarome grafiką, patys samdome subrangovus ir patys atsakome, jei kas nors nukrypsta. Užsakovas turi vieną numerį ir vieną žmogų, kuris žino visą objektą."
            />

            <dl className="mt-10 border-t border-white/[0.11]">
              {PASS.map(([k, v]) => (
                <SpecRow key={k} k={k} v={v} />
              ))}
            </dl>
          </div>

          <figure className="min-w-0 lg:pt-[3.5rem]">
            <Plate
              src="/demo/konstrukta/texture.webp"
              width={1200}
              height={743}
              alt="Baltos betono formos — konstrukcijos paviršiaus tekstūra"
            />
            <figcaption
              className={`${T_MICRO} mt-3 max-w-[52ch] tracking-[0.12em] text-[#9A9791]`}
            >
              Monolitas be apdailos · paviršius paliekamas matomas tik tada, kai
              klojinys to vertas
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
