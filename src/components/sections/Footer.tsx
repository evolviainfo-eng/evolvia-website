import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { pages, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg text-text">
      <Container>
        <div className="py-[clamp(56px,8vw,88px)]">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div>
              <Wordmark className="text-[1.6rem]" />
              <p className="mt-3 text-[0.8rem] font-medium uppercase tracking-[0.22em] text-text-muted">
                web design
              </p>
            </div>

            <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
              <nav className="flex flex-col gap-3" aria-label="Poraštės navigacija">
                {pages.map((page) => (
                  <a
                    key={page.path}
                    href={page.path}
                    className="text-[0.95rem] text-text-muted transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                  >
                    {page.label}
                  </a>
                ))}
                <a
                  href="/kontaktai#privatumas"
                  className="text-[0.95rem] text-text-muted transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                >
                  Privatumas
                </a>
              </nav>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.95rem] text-text-muted transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                >
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-[0.95rem] text-text-muted transition-colors duration-[var(--d-tap)] ease-[var(--e-out)] hover:text-text"
                >
                  {site.phone}
                </a>
                <p className="text-[0.95rem] text-text-muted">{site.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-[0.85rem] text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.year} Evolvia · {site.location}
            </p>
            <p>Svetainės, kurios atrodo brangiai.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
