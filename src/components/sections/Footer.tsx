import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { navLinks, site } from "@/content/site";

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
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[0.95rem] text-text-muted transition-colors duration-200 hover:text-text"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.95rem] text-text-muted transition-colors duration-200 hover:text-text"
                >
                  {site.email}
                </a>
                <a
                  href="#kontaktai"
                  className="text-[0.95rem] text-text-muted transition-colors duration-200 hover:text-text"
                >
                  Susisiekti
                </a>
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
