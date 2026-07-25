import { Body, Eyebrow, Frame, H2, Photo } from "./Type";

export function Fire() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-[clamp(64px,9vw,120px)] sm:px-8">
      <div className="grid items-end gap-[clamp(28px,4vw,56px)] lg:grid-cols-12">
        <Frame
          className="min-w-0 lg:col-span-7"
          src="/demo/fume/kitchen.webp"
          w={1400}
          h={936}
          ratio="1400 / 936"
          alt="Fumé virtuvė darbo metu — virėjai prie atviros ugnies"
          settle
        />

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="min-w-0 lg:col-span-5"
        >
          <Eyebrow>Virtuvė</Eyebrow>
          <H2 className="mt-6">
            Viskas praeina
            <br />
            pro <span className="italic">ugnį</span>.
          </H2>
          <div className="mt-6 space-y-5">
            <Body className="max-w-[44ch]">
              Židinys užkuriamas antrą valandą dienos ir dega iki paskutinio
              užsakymo. Ąžuolas ir alksnis, jokių dujų. Iš čia ir pavadinimas:
              fumé — rūkyta.
            </Body>
            <Body className="max-w-[44ch]">
              Anglių karštis per vakarą keičiasi, tad tas pats šonkaulis
              šeštą ir dešimtą valandą nebūna visiškai vienodas. Mums tai
              atrodo teisinga.
            </Body>
          </div>
        </div>
      </div>

      <div
        data-rise
        style={{ "--i": 2 } as React.CSSProperties}
        className="mt-[clamp(20px,3vw,36px)] grid gap-[clamp(16px,3vw,32px)] sm:grid-cols-2"
      >
        <figure
          className="min-w-0 overflow-hidden bg-[#141210] sm:mt-[clamp(24px,5vw,72px)]"
          style={{ aspectRatio: "1100 / 732" }}
        >
          <Photo
            src="/demo/fume/dish-4.webp"
            w={1100}
            h={732}
            alt="Ėrienos petys dubenyje su baltosiomis pupelėmis"
            className="h-full w-full object-cover"
          />
        </figure>
        <figure
          className="min-w-0 overflow-hidden bg-[#141210]"
          style={{ aspectRatio: "1100 / 733" }}
        >
          <Photo
            src="/demo/fume/dish-2.webp"
            w={1100}
            h={733}
            alt="Ant anglių keptas mėsos patiekalas baltoje lėkštėje"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
