import { HAIRLINE, Photo } from "./Type";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{ minHeight: "clamp(560px, 86svh, 920px)" }}
    >
      <div className="absolute inset-0 -z-10">
        <Photo
          src="/demo/fume/hero.webp"
          w={1800}
          h={1206}
          alt="Prieblandoje skendinti Fumé salė su padengtais stalais"
          priority
          settle
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,11,10,0.62) 0%, rgba(12,11,10,0.30) 34%, rgba(12,11,10,0.82) 78%, #0C0B0A 100%)",
          }}
        />
      </div>

      <div
        className="mx-auto flex max-w-[1240px] flex-col px-5 pb-[clamp(40px,6vw,64px)] pt-[clamp(96px,16vw,180px)] sm:px-8"
        style={{ minHeight: "clamp(560px, 86svh, 920px)" }}
      >
        <div className="mt-auto max-w-[42ch]">
          <h1
            data-rise
            className="font-[family-name:var(--font-fume-display)] text-[clamp(3.6rem,11vw,4.5rem)] font-light leading-[0.95] tracking-[-0.005em] text-[#ede6da]"
          >
            Fumé
          </h1>

          <div
            data-rise
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-6"
          >
            <p className="max-w-[34ch] font-[family-name:var(--font-fume-display)] text-[clamp(1.15rem,2.6vw,1.55rem)] font-light italic leading-[1.45] text-[rgba(237,230,218,0.86)]">
              Atviros ugnies virtuvė ir vyno baras. Trisdešimt keturios vietos
              Užupyje.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#rezervacija"
                className="inline-flex h-12 items-center rounded-[2px] bg-[#C0703A] px-7 font-[family-name:var(--font-fume-ui)] text-[0.9rem] font-medium tracking-[0.03em] text-[#0c0b0a] transition-transform duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-[2px]"
              >
                Rezervuoti stalą
              </a>
              <a
                href="#meniu"
                className="border-b pb-1 font-[family-name:var(--font-fume-ui)] text-[0.88rem] tracking-[0.04em] text-[rgba(237,230,218,0.78)] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[#ede6da] hover:text-[#ede6da]"
                style={{ borderColor: HAIRLINE }}
              >
                Vakaro meniu
              </a>
            </div>
          </div>
        </div>

        <p
          style={{ borderColor: HAIRLINE }}
          className="mt-[clamp(48px,8vw,88px)] border-t pt-4 font-[family-name:var(--font-fume-ui)] text-[0.7rem] uppercase tracking-[0.18em] text-[#9c948a]"
        >
          Užupis, Vilnius · Antradienis–Sekmadienis · nuo 17:00
        </p>
      </div>
    </section>
  );
}
