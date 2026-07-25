import { HAIRLINE } from "./Type";

const LINKS = [
  { href: "#meniu", label: "Meniu" },
  { href: "#vynas", label: "Vynas" },
  { href: "#erdve", label: "Erdvė" },
  { href: "#kontaktai", label: "Kontaktai" },
];

/** Sticky, but offset below Evolvia's honesty bar (--demo-bar-h) so the two
 *  never overlap. No hamburger: on small screens the links collapse to the one
 *  action that matters. */
export function Nav() {
  return (
    <nav
      aria-label="Pagrindinė navigacija"
      className="sticky z-50 border-b bg-[rgba(12,11,10,0.82)] backdrop-blur-md"
      style={{ top: "var(--demo-bar-h)", borderColor: HAIRLINE }}
    >
      <div className="mx-auto flex h-[58px] max-w-[1240px] items-center gap-4 px-5 sm:h-[66px] sm:px-8">
        <a
          href="#top"
          className="shrink-0 font-[family-name:var(--font-fume-display)] text-[1.35rem] font-light leading-none tracking-[0.02em] text-[#ede6da]"
        >
          Fumé
        </a>

        <ul className="ml-auto hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-[family-name:var(--font-fume-ui)] text-[0.82rem] tracking-[0.04em] text-[#9c948a] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-[#ede6da]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#rezervacija"
          className="ml-auto inline-flex h-9 shrink-0 items-center rounded-[2px] border px-4 font-[family-name:var(--font-fume-ui)] text-[0.78rem] tracking-[0.06em] text-[#ede6da] transition-[border-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:border-[#ede6da] md:ml-8"
          style={{ borderColor: HAIRLINE }}
        >
          Rezervuoti
        </a>
      </div>
    </nav>
  );
}
