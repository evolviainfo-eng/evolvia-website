import type { Locale } from "@/i18n/config";
import { getKonstruktaCopy } from "./copy";
import { T_SM, WRAP } from "./ui";

/** One hairline row. No giant wordmark: the name already opens the page. */
export function KonstruktaFooter({ locale }: { locale: Locale }) {
  const c = getKonstruktaCopy(locale).footer;
  return (
    <footer className="border-t border-[#E2E2E2]">
      <div
        className={`${WRAP} flex flex-col gap-4 py-9 sm:flex-row sm:items-center sm:justify-between sm:gap-8`}
      >
        <a
          href="#top"
          className="group flex shrink-0 items-baseline gap-2 text-[1.125rem] font-medium tracking-[-0.03em] text-[#0C388D]"
        >
          Konstrukta
          <span
            aria-hidden
            className="text-[0.875rem] font-normal transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:-translate-y-[3px]"
          >
            ↑
          </span>
          <span className="sr-only">{c.backToTop}</span>
        </a>
        <p className={`min-w-0 break-words ${T_SM} text-[#5E5E5E]`}>
          {c.contacts}
        </p>
      </div>
    </footer>
  );
}
