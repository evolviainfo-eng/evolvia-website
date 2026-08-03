import { CONTAINER, T_MICRO } from "./ui";

export function KonstruktaFooter() {
  return (
    <footer className="border-t border-white/[0.11]">
      <div
        className={`${CONTAINER} flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:gap-8`}
      >
        <a
          href="#top"
          className="group flex shrink-0 items-baseline gap-3 text-[0.86rem] font-semibold uppercase tracking-[0.24em] text-[#E7E5E1] transition-opacity duration-[var(--d-tap)] ease-[var(--e-out)] hover:opacity-70 active:opacity-50"
        >
          Konstrukta
          <span
            aria-hidden
            className="knst-mono text-[0.6rem] font-normal tracking-[0.14em] text-[#9A9791] transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:-translate-y-[3px]"
          >
            ↑
          </span>
          <span className="sr-only">Grįžti į viršų</span>
        </a>

        <p
          className={`${T_MICRO} min-w-0 break-words tracking-[0.14em] text-[#9A9791]`}
        >
          Pavyzdiniai kontaktai · +370 600 00000 · info@konstrukta.demo
        </p>
      </div>
    </footer>
  );
}
