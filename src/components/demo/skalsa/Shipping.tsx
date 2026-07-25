const FACTS = [
  {
    title: "Išsiunčiame per 1–2 d. d.",
    body: "Užsakymai renkami rytais. Kurjeris pristato per 2–4 darbo dienas visoje Lietuvoje.",
  },
  {
    title: "Nemokamai nuo 40 €",
    body: "Mažesniems užsakymams pristatymas kainuoja 3,50 €. Atsiimti dirbtuvėje — nemokama.",
  },
  {
    title: "14 dienų grąžinimas",
    body: "Neuždegtą žvakę priimame atgal be klausimų. Grąžinimo išlaidas padengiame mes.",
  },
  {
    title: "Supakuota dovanai",
    body: "Perdirbtas kartonas, medžio drožlės ir ranka rašyta kortelė — be plastiko.",
  },
];

export function Shipping() {
  return (
    <section className="relative border-t border-[rgba(36,30,25,0.13)]">
      <span id="pristatymas" aria-hidden="true" className="absolute -top-[30px]" />
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
        <div data-rise className="max-w-[46ch]">
          <p className="text-[0.76rem] uppercase tracking-[0.14em] text-[#6E6257]">
            Pristatymas ir grąžinimas
          </p>
          <h2
            className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.08] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
          >
            Keturi dalykai, kuriuos verta žinoti.
          </h2>
        </div>

        <dl
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-[clamp(36px,5vw,64px)] grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FACTS.map((f) => (
            <div
              key={f.title}
              className="min-w-0 border-t border-[rgba(36,30,25,0.13)] pt-5"
            >
              <dt className="text-[1rem] leading-tight tracking-[-0.01em]">
                {f.title}
              </dt>
              <dd className="mt-2.5 text-[0.92rem] leading-[1.6] text-[#6E6257]">
                {f.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
