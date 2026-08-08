const STEPS = [
  {
    n: "01",
    title: "Lydome",
    body: "Grynas sojų vaškas lydomas iki 65 °C. Be parafino, be dažiklių — todėl vaškas lieka pieno spalvos, o ne balintai baltas.",
    img: "/demo/skalsa/studio-1.webp",
    w: 1300,
    h: 968,
    alt: "Dirbtuvėje liejamas išlydytas vaškas į stiklinį indą",
  },
  {
    n: "02",
    title: "Maišome ranka",
    body: "Kvapiąjį aliejų įmaišome, kai vaškas atvėsta iki 52 °C. Dvi minutės ranka — mišiniui to užtenka, ir kvapas neišgaruoja pirmą vakarą.",
    img: "/demo/skalsa/studio-2.webp",
    w: 1300,
    h: 965,
    alt: "Dvi poros rankų dirbtuvėje ruošia žvakes",
  },
  {
    n: "03",
    title: "Brandiname",
    body: "Sustingusi žvakė ilsisi dešimt dienų, tik tada gauna etiketę ir 5 mm dagtį. Pirmą kartą uždekite dviem valandoms — vaškas turi ištirpti iki kraštų.",
    img: "/demo/skalsa/match.webp",
    w: 1200,
    h: 803,
    alt: "Degtukas uždega medvilninį žvakės dagtį",
  },
];

export function Studio() {
  return (
    <section data-sk-sec="dirbtuve" className="relative">
      <span id="dirbtuve" aria-hidden="true" className="absolute -top-[30px]" />
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
        <div data-rise className="max-w-[54ch]">
          <p className="text-[0.8125rem] uppercase tracking-[0.16em] text-[#6E6257]">
            Dirbtuvė
          </p>
          <h2
            className="mt-4 text-[clamp(1.875rem,3.4vw,2.5rem)] leading-[1.08] text-balance"
            style={{
              fontFamily: "var(--font-skalsa-display)",
              fontWeight: 500,
            }}
          >
            Trys žingsniai, jokių skubotų partijų.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-pretty text-[#6E6257]">
            Vienu kartu išliejame apie keturiasdešimt žvakių. Tiek telpa ant
            stalo, tiek spėjame patikrinti rankomis.
          </p>
        </div>

        <ol className="mt-[clamp(40px,6vw,72px)] grid gap-x-6 gap-y-[clamp(40px,5vw,64px)] md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
              className="group min-w-0"
            >
              <div className="overflow-hidden rounded-[10px] bg-[#F1EAE0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  decoding="async"
                  loading="lazy"
                  className="aspect-[4/3] h-auto w-full object-cover transition-[scale] duration-[var(--d-el)] ease-[var(--e-out)] group-hover:scale-[1.04]"
                />
              </div>

              <div className="mt-5 flex items-baseline gap-3 border-t border-[rgba(36,30,25,0.13)] pt-4">
                <span className="text-[0.8125rem] tabular-nums tracking-[0.14em] text-[#6E6257]">
                  {s.n}
                </span>
                <h3
                  className="text-[1.0625rem] leading-tight tracking-[-0.015em]"
                  style={{
                    fontFamily: "var(--font-skalsa-display)",
                    fontWeight: 500,
                  }}
                >
                  {s.title}
                </h3>
              </div>

              <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-pretty text-[#6E6257]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
