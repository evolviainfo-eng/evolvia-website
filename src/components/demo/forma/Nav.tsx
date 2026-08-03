import { HAIR, INK, MUTED } from "@/components/demo/forma/tokens";

const LINKS = [
  { href: "#projektai", label: "Projektai", always: true },
  { href: "#paslaugos", label: "Paslaugos", always: false },
  { href: "#procesas", label: "Procesas", always: false },
];

/** Slim sticky header. Sits directly under Evolvia's honesty bar, which
 *  publishes its own height as --demo-bar-h.
 *
 *  Section links are underlined rather than pilled: the rule draws itself in
 *  from the left, the same gesture every hairline on this page makes. The one
 *  filled control is the call to action, so there is never a question about
 *  which of the four is the button. */
export function FormaNav() {
  return (
    <header
      className="sticky z-40 border-b backdrop-blur-[10px]"
      style={{
        top: "var(--demo-bar-h)",
        borderColor: HAIR,
        background: "rgba(244,241,236,0.86)",
      }}
    >
      <div className="mx-auto flex h-[56px] w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:h-[68px] sm:px-8">
        <a
          href="#top"
          className="group flex min-w-0 items-baseline gap-3"
          aria-label="Forma — į puslapio viršų"
        >
          <span
            style={{ fontFamily: "var(--font-forma-display)" }}
            className="text-[1.45rem] leading-none tracking-[-0.01em] transition-opacity duration-[var(--d-tap)] ease-[var(--e-out)] group-hover:opacity-70 group-active:opacity-50 sm:text-[1.6rem]"
          >
            Forma
          </span>
          <span
            className="hidden truncate text-[0.7rem] uppercase tracking-[0.2em] md:inline"
            style={{ color: MUTED }}
          >
            Interjero architektūra
          </span>
        </a>

        <nav
          aria-label="Puslapio skyriai"
          className="flex min-w-0 items-center gap-1 sm:gap-2"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`${
                l.always ? "group inline-flex" : "group hidden sm:inline-flex"
              } relative h-9 items-center px-2 text-[0.82rem] transition-opacity duration-[var(--d-tap)] ease-[var(--e-out)] active:opacity-60`}
            >
              {l.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-2 bottom-[7px] h-px origin-left scale-x-0 transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                style={{ background: INK }}
              />
            </a>
          ))}
          <a
            href="#kontaktai"
            className="ml-1 inline-flex h-9 shrink-0 items-center rounded-full border border-[rgba(26,25,23,0.28)] px-4 text-[0.82rem] transition-[background-color,color,border-color,translate] duration-[var(--d-tap)] ease-[var(--e-out)] hover:-translate-y-px hover:border-[#1A1917] hover:bg-[#1A1917] hover:text-[#F4F1EC] active:translate-y-0 active:opacity-80"
          >
            Kontaktai
          </a>
        </nav>
      </div>
    </header>
  );
}
