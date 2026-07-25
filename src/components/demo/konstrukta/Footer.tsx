import { CONTAINER } from "./ui";

export function KonstruktaFooter() {
  return (
    <footer className="border-t border-white/[0.11]">
      <div
        className={`${CONTAINER} flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between`}
      >
        <span className="text-[0.86rem] font-semibold uppercase tracking-[0.24em] text-[#E7E5E1]">
          Konstrukta
        </span>
        <p className="knst-mono min-w-0 break-words text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-[#9A9791]">
          Pavyzdiniai kontaktai · +370 600 00000 · info@konstrukta.demo
        </p>
      </div>
    </footer>
  );
}
