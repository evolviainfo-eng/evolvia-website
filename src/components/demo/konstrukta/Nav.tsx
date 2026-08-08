import { CONTAINER, T_MICRO } from "./ui";

const LINKS = [
  { href: "#paslaugos", label: "Ką statome" },
  { href: "#objektai", label: "Objektai" },
  { href: "#eiga", label: "Eiga" },
  { href: "#samata", label: "Sąmata" },
  { href: "#kontaktai", label: "Kontaktai" },
];

/** Thin sticky rule at the top of the document. Sits directly under Evolvia's
 *  honesty bar, so its offset is the published bar height. */
export function KonstruktaNav() {
  return (
    <nav
      aria-label="Pagrindinė navigacija"
      className="chrome sticky z-50"
      style={{ top: "var(--demo-bar-h)" }}
    >
      <div className={`${CONTAINER} flex h-14 items-center gap-4`}>
        <a
          href="#top"
          className="flex shrink-0 items-baseline gap-2 transition-opacity duration-[var(--d-tap)] ease-[var(--e-out)] hover:opacity-70 active:opacity-50"
        >
          <span className="text-[0.92rem] font-semibold uppercase leading-none tracking-[0.2em] text-[#E7E5E1] sm:text-[0.98rem] sm:tracking-[0.24em]">
            Konstrukta
          </span>
          <span className="knst-mono hidden text-[0.58rem] uppercase tracking-[0.18em] text-[#9A9791] sm:inline">
            Uab
          </span>
        </a>

        {/* Links appear at lg, not md. Five uppercase mono labels plus the
            wordmark plus the CTA need ~780px of the ~704px available at
            exactly 768 — measured: the document went to 800px wide there. */}
        <ul className="ml-auto hidden min-w-0 items-center gap-6 lg:flex lg:gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative block py-1 text-[0.68rem] text-[#9A9791] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#E7E5E1] focus-visible:text-[#E7E5E1]"
              >
                <span className="knst-mono uppercase tracking-[0.16em]">
                  {l.label}
                </span>
                {/* the same rule-drawing-itself gesture the page uses at
                    section scale, here at 11px */}
                <span
                  aria-hidden
                  className="absolute -bottom-px left-0 block h-px w-full origin-left scale-x-0 bg-[#E7E5E1] transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#samata"
          className={`${T_MICRO} ml-auto shrink-0 border border-white/[0.22] px-3 py-2 tracking-[0.14em] text-[#E7E5E1] transition-[border-color,background-color] duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-white/[0.5] hover:bg-white/[0.05] active:bg-white/[0.1] lg:ml-8`}
        >
          <span className="sm:hidden">Sąmata</span>
          <span className="hidden sm:inline">Skaičiuoti sąmatą</span>
        </a>
      </div>
    </nav>
  );
}
