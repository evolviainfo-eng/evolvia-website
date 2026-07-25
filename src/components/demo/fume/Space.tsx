import { Body, Eyebrow, Frame, H2, Photo } from "./Type";

export function Space() {
  return (
    <section
      id="erdve"
      className="mx-auto max-w-[1240px] px-5 pb-[clamp(64px,9vw,120px)] sm:px-8"
    >
      <div data-rise className="max-w-[46ch]">
        <Eyebrow>Erdvė</Eyebrow>
        <H2 className="mt-6">Viena salė, dešimt žvakių.</H2>
        <Body className="mt-5">
          Plytų siena, ąžuolo stalai be staltiesių ir tiek šviesos, kad
          užtektų perskaityti kortelę. Muzika tyliai — kad girdėtųsi pokalbis
          prie savo stalo, o ne prie gretimo.
        </Body>
      </div>

      <div className="mt-[clamp(36px,5vw,64px)] grid gap-[clamp(16px,2.5vw,28px)] lg:grid-cols-12">
        <Frame
          className="min-w-0 lg:col-span-7"
          src="/demo/fume/room-bar.webp"
          w={1400}
          h={933}
          ratio="1400 / 933"
          alt="Fumé baras su degančiomis žvakėmis"
          caption="Baras — dešimt vietų prie prekystalio, be išankstinės rezervacijos."
          settle
        />

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="grid min-w-0 gap-[clamp(16px,2.5vw,28px)] lg:col-span-5 lg:mt-[clamp(28px,5vw,72px)]"
        >
          <figure
            className="min-w-0 overflow-hidden bg-[#141210]"
            style={{ aspectRatio: "1400 / 933" }}
          >
            <Photo
              src="/demo/fume/room-glass.webp"
              w={1400}
              h={933}
              alt="Svytintis prekystalis matomas pro stiklą iš gatvės"
              className="h-full w-full object-cover"
            />
          </figure>
          <figure
            className="min-w-0 overflow-hidden bg-[#141210]"
            style={{ aspectRatio: "1200 / 800" }}
          >
            <Photo
              src="/demo/fume/lamps.webp"
              w={1200}
              h={800}
              alt="Pakabinami šviestuvai virš salės stalų"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
