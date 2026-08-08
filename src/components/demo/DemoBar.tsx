import { demoBySlug } from "@/content/demos";

/** The honesty bar.
 *
 *  Pinned above every demo site, in Evolvia's own ink colours rather than the
 *  demo's, so it can never be mistaken for part of the site underneath. It
 *  states plainly that the business is invented — because a demo that reads as
 *  a real company is a lie, no matter how good it looks.
 *
 *  Height is published as --demo-bar-h so each demo can offset its own
 *  sticky navigation.
 */
export function DemoBar({ slug }: { slug: string }) {
  const demo = demoBySlug(slug);
  const name = demo?.name ?? "Ši svetainė";

  return (
    <div
      className="fixed inset-x-0 top-0 z-[200] border-b border-white/12 bg-[#0a0a0a] text-[#f5f5f7]"
      style={{ height: "var(--demo-bar-h)" }}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <span className="flex shrink-0 items-center gap-2.5">
          <span
            className="wordmark text-[1.0625rem] leading-none"
            style={{ fontWeight: 300 }}
          >
            evolvia.
          </span>
          <span className="rounded-full border border-white/25 px-2 py-[3px] text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/70">
            Demo
          </span>
        </span>

        <p className="min-w-0 flex-1 truncate text-[0.8125rem] leading-tight text-white/60 sm:text-[0.8125rem]">
          <span className="sm:hidden">
            Išgalvota įmonė · pavyzdinė svetainė
          </span>
          <span className="hidden sm:inline">
            Demonstracinė svetainė. „{name}“ — išgalvota įmonė; pavadinimas,
            kontaktai, kainos ir projektai yra pavyzdiniai.
          </span>
        </p>

        <a
          href="/darbai"
          className="shrink-0 rounded-full bg-white px-3.5 py-[7px] text-[0.6875rem] font-medium text-[#0a0a0a] transition-[opacity,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:opacity-90 sm:px-4 sm:text-[0.8125rem]"
        >
          <span className="sm:hidden">Evolvia</span>
          <span className="hidden sm:inline">Grįžti į Evolvia</span>
        </a>
      </div>
    </div>
  );
}
