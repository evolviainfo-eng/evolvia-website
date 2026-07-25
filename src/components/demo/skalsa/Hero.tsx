export function Hero() {
  return (
    <section className="relative">
      <span id="virsus" aria-hidden="true" className="absolute -top-[30px]" />
      <div className="mx-auto max-w-[1180px] px-5 pb-[clamp(48px,6vw,80px)] pt-[clamp(56px,8vw,104px)] sm:px-8">
        <div className="grid gap-y-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-x-16">
          <div data-rise className="min-w-0">
            <p className="text-[0.76rem] uppercase tracking-[0.14em] text-[#6E6257]">
              Rankų darbo žvakės · liejame Vilniuje
            </p>
            <h1
              className="mt-5 max-w-[15ch] text-[clamp(2.5rem,6.2vw,4.4rem)] leading-[1.02] tracking-[-0.035em] text-[#241E19]"
              style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
            >
              Vakaras, kuris kvepia namais.
            </h1>
          </div>

          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="min-w-0 lg:pb-2"
          >
            <p className="max-w-[46ch] text-[1.02rem] leading-[1.65] text-[#6E6257]">
              Sojų vaškas, medvilninis dagtis ir perdirbtas stiklas. Liejame
              mažomis partijomis, todėl žvakė dega ilgai, tolygiai ir be
              aitraus dūmo.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#katalogas"
                className="inline-flex h-12 items-center rounded-full bg-[#241E19] px-7 text-[0.95rem] text-[#FAF6F0] transition-[background-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:bg-[#3a3129]"
              >
                Apsipirkti
              </a>
              <a
                href="#dirbtuve"
                className="inline-flex h-12 items-center rounded-full border border-[rgba(36,30,25,0.13)] px-7 text-[0.95rem] text-[#241E19] transition-[border-color,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:border-[rgba(36,30,25,0.4)]"
              >
                Kaip liejame
              </a>
            </div>
          </div>
        </div>

        <div
          data-rise
          style={{ "--i": 2, "--rise-y": "28px" } as React.CSSProperties}
          className="mt-[clamp(36px,5vw,64px)] overflow-hidden rounded-[10px] bg-[#F1EAE0]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-settle
            src="/demo/skalsa/hero.webp"
            alt="Trys degančios sojų vaško žvakės ant medinio stalo"
            width={1800}
            height={1286}
            decoding="async"
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
