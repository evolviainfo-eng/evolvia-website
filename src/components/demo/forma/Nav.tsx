const LINKS = [
  { href: "#projektai", label: "Projektai", always: true },
  { href: "#paslaugos", label: "Paslaugos", always: false },
  { href: "#procesas", label: "Procesas", always: false },
];

/** Slim sticky header. Sits directly under Evolvia's honesty bar, which
 *  publishes its own height as --demo-bar-h. */
export function FormaNav() {
  return (
    <header
      className="sticky z-40 border-b border-[rgba(26,25,23,0.10)] bg-[rgba(244,241,236,0.88)] backdrop-blur-[10px]"
      style={{ top: "var(--demo-bar-h)" }}
    >
      <div className="mx-auto flex h-[56px] w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:h-[68px] sm:px-8">
        <a
          href="#top"
          className="flex min-w-0 items-baseline gap-3"
          aria-label="Forma — į puslapio viršų"
        >
          <span
            style={{ fontFamily: "var(--font-forma-display)" }}
            className="text-[1.45rem] leading-none tracking-[-0.01em] sm:text-[1.6rem]"
          >
            Forma
          </span>
          <span className="hidden truncate text-[0.64rem] uppercase tracking-[0.2em] text-[#656059] md:inline">
            Interjero architektūra
          </span>
        </a>

        <nav
          aria-label="Puslapio skyriai"
          className="flex min-w-0 items-center gap-1"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`${l.always ? "inline-flex" : "hidden sm:inline-flex"} h-9 items-center rounded-full px-3 text-[0.82rem] text-[#1A1917] transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:bg-[rgba(26,25,23,0.06)]`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontaktai"
            className="ml-1 inline-flex h-9 shrink-0 items-center rounded-full border border-[rgba(26,25,23,0.22)] px-4 text-[0.82rem] text-[#1A1917] transition-[background-color,color,border-color] duration-[var(--d-tap)] ease-[var(--e-out)] hover:border-[#1A1917] hover:bg-[#1A1917] hover:text-[#F4F1EC]"
          >
            Kontaktai
          </a>
        </nav>
      </div>
    </header>
  );
}
