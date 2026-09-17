import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { fill } from "@/i18n/fill";
import { localizePath, type Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.footer;
  return (
    <footer className="border-t border-border bg-bg text-text">
      <Container>
        <div className="py-[clamp(56px,8vw,88px)]">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div>
              <Wordmark className="h-[38px] w-[95px]" />
              <p className="mt-3 text-[0.8125rem] font-medium uppercase tracking-[0.22em] text-text-muted">
                {t.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
              <nav
                className="flex flex-col gap-3"
                aria-label={t.nav}
              >
                {t.pages.map((page) => (
                  <a
                    key={page.path}
                    href={localizePath(page.path, locale)}
                    className="text-[0.9375rem] text-text-muted transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                  >
                    {page.label}
                  </a>
                ))}
                <a
                  href={localizePath("/kontaktai#privatumas", locale)}
                  className="text-[0.9375rem] text-text-muted transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                >
                  {t.privacy}
                </a>
              </nav>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.9375rem] text-text-muted transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                >
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-[0.9375rem] text-text-muted transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                >
                  {site.phone}
                </a>
                <p className="text-[0.9375rem] text-text-muted">
                  {d.location}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-[0.8125rem] text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.year} Evolvia · {d.location}
            </p>
            <p>
              {site.legalName} ·{" "}
              {fill(t.registration, { no: site.activityNo })}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
