const LINKS = [
  { href: "#katalogas", label: "Katalogas" },
  { href: "#rinkiniai", label: "Rinkiniai" },
  { href: "#dirbtuve", label: "Dirbtuvė" },
  { href: "#pristatymas", label: "Pristatymas ir grąžinimas" },
];

/** Parduotuvės pabaiga. Kontaktai — sąmoningai pavyzdiniai. */
export function ShopFooter() {
  return (
    <footer className="border-t border-[rgba(36,30,25,0.13)] bg-[#F1EAE0]">
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(52px,7vw,88px)] sm:px-8">
        <div data-rise className="grid gap-10 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div className="min-w-0">
            <p
              className="text-[1.5rem] leading-none tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
            >
              Skalsa
            </p>
            <p className="mt-4 max-w-[34ch] text-[0.94rem] leading-[1.65] text-[#6E6257]">
              Maža dirbtuvė, kurioje sojų vaško žvakės liejamos rankomis
              nedidelėmis partijomis. Siunčiame po visą Lietuvą.
            </p>
          </div>

          <nav aria-label="Puslapio apačia" className="min-w-0">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[#6E6257]">
              Parduotuvė
            </p>
            <ul className="mt-4 grid gap-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[0.94rem] text-[#241E19] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#6E6257]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[#6E6257]">
              Pavyzdiniai kontaktai
            </p>
            <ul className="mt-4 grid gap-2.5 text-[0.94rem]">
              <li>
                <a
                  href="tel:+37060000000"
                  className="transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#6E6257]"
                >
                  +370 600 00000
                </a>
              </li>
              <li className="break-words">
                <a
                  href="mailto:labas@skalsa.demo"
                  className="break-words transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#6E6257]"
                >
                  labas@skalsa.demo
                </a>
              </li>
              <li className="text-[#6E6257]">Dirbtuvė Vilniuje</li>
              <li className="text-[#6E6257]">I–V 10:00–17:00</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-[rgba(36,30,25,0.13)] pt-6 text-[0.8rem] text-[#6E6257]">
          © 2026 Skalsa · Sojų vaškas, medvilninis dagtis, perdirbamas stiklas
        </p>
      </div>
    </footer>
  );
}
