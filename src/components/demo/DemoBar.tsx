import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { demoBySlug } from "@/content/demos";
import { getDictionary } from "@/i18n";
import { fill } from "@/i18n/fill";
import { localizePath, type Locale } from "@/i18n/config";

/** The honesty bar.
 *
 *  Pinned above every demo site, in Evolvia's own ink colours rather than the
 *  demo's, so it can never be mistaken for part of the site underneath. It
 *  states plainly that the business is invented — because a demo that reads as
 *  a real company is a lie, no matter how good it looks.
 *
 *  Height is published as --demo-bar-h so each demo can offset its own
 *  sticky navigation.
 *
 *  It is also where the language switch lives on a demo: the demo's own
 *  header belongs to the invented company, and this bar is Evolvia's.
 */
export function DemoBar({ locale, slug }: { locale: Locale; slug: string }) {
  const d = getDictionary(locale);
  const t = d.demoShell;
  const demo = demoBySlug(locale, slug);
  const name = demo?.name ?? t.fallbackName;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[200] border-b border-white/12 bg-[#0a0a0a] text-[#f5f5f7]"
      style={{ height: "var(--demo-bar-h)" }}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center gap-3 px-4 sm:gap-5 sm:px-6">
        <span className="flex shrink-0 items-center gap-2.5">
          {/* On a phone the language switch needs the room, and the words
              "fictional company" matter more than a second Evolvia mark:
              the back button on the right already carries the name. */}
          <span
            className="wordmark text-[1.0625rem] leading-none max-sm:hidden"
            style={{ fontWeight: 300 }}
          >
            evolvia.
          </span>
          <span className="rounded-full border border-white/25 px-2 py-[3px] text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/70">
            {t.badge}
          </span>
        </span>

        <p className="min-w-0 flex-1 truncate text-[0.8125rem] leading-tight text-white/60 sm:text-[0.8125rem]">
          <span className="sm:hidden">{t.barShort}</span>
          <span className="hidden sm:inline">{fill(t.barLong, { name })}</span>
        </p>

        <LanguageSwitch
          locale={locale}
          path={`/demo/${slug}`}
          label={d.nav.language}
          names={d.nav.languageNames}
          tone="ink"
        />

        <a
          href={localizePath("/darbai", locale)}
          className="shrink-0 rounded-full bg-white px-3.5 py-[7px] text-[0.6875rem] font-medium text-[#0a0a0a] transition-[opacity,translate] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[1px] hover:opacity-90 sm:px-4 sm:text-[0.8125rem]"
        >
          <span className="sm:hidden">{t.backShort}</span>
          <span className="hidden sm:inline">{t.backLong}</span>
        </a>
      </div>
    </div>
  );
}
