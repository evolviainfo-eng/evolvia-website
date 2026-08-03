const LINKS = [
  { href: "#katalogas", label: "Katalogas" },
  { href: "#rinkiniai", label: "Rinkiniai" },
  { href: "#dirbtuve", label: "Dirbtuvė" },
  { href: "#pristatymas", label: "Pristatymas ir grąžinimas" },
];

/* Ta pati linija, kurią brėžia antraštės nuoroda — kad visas puslapis
   į pelę atsakytų vienu gestu. */
const LINK =
  "relative inline-block text-[0.9375rem] text-[#241E19] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#241E19] after:transition-transform after:duration-[var(--d-ui)] after:ease-[var(--e-out)] hover:after:scale-x-100";

/** Parduotuvės pabaiga. Kontaktai — sąmoningai pavyzdiniai. */
export function ShopFooter() {
  return (
    <footer className="bg-[#F1EAE0]">
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(56px,7vw,96px)] sm:px-8">
        <div data-rise className="grid gap-10 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div className="min-w-0">
            <p
              className="text-[1.5rem] leading-none tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
            >
              Skalsa
            </p>
            <p className="mt-4 max-w-[36ch] text-[0.9375rem] leading-[1.65] text-pretty text-[#6E6257]">
              Maža dirbtuvė, kurioje sojų vaško žvakės liejamos rankomis
              nedidelėmis partijomis. Siunčiame po visą Lietuvą.
            </p>
          </div>

          <nav aria-label="Puslapio apačia" className="min-w-0">
            <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[#6E6257]">
              Parduotuvė
            </p>
            <ul className="mt-5 grid justify-items-start gap-3">
              {LINKS.map((l) => (
                <li key={l.href} className="min-w-0">
                  <a href={l.href} className={LINK}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <p className="text-[0.75rem] uppercase tracking-[0.16em] text-[#6E6257]">
              Pavyzdiniai kontaktai
            </p>
            <ul className="mt-5 grid justify-items-start gap-3 text-[0.9375rem]">
              <li className="min-w-0">
                <a href="tel:+37060000000" className={LINK}>
                  +370 600 00000
                </a>
              </li>
              <li className="min-w-0 break-words">
                <a href="mailto:labas@skalsa.demo" className={`${LINK} break-words`}>
                  labas@skalsa.demo
                </a>
              </li>
              <li className="text-[#6E6257]">Dirbtuvė Vilniuje</li>
              <li className="text-[#6E6257]">I–V 10:00–17:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-[rgba(36,30,25,0.13)] pt-6">
          <p className="min-w-0 text-[0.8125rem] text-[#6E6257]">
            © 2026 Skalsa · Sojų vaškas, medvilninis dagtis, perdirbamas stiklas
          </p>
          <a
            href="#virsus"
            className="shrink-0 text-[0.8125rem] text-[#6E6257] transition-colors duration-[var(--d-ui)] ease-[var(--e-out)] hover:text-[#241E19]"
          >
            Į viršų
          </a>
        </div>
      </div>
    </footer>
  );
}
