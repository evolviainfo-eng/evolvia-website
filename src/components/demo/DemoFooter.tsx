import { demoBySlug, demos } from "@/content/demos";

/** Closing strip under every demo. Same ink as the top bar, so the demo is
 *  visibly bracketed by Evolvia rather than blending into it. Repeats the
 *  disclosure in full (the top bar truncates on small screens) and offers the
 *  other demos plus the real next step. */
export function DemoFooter({ slug }: { slug: string }) {
  const current = demoBySlug(slug);
  const others = demos.filter((d) => d.slug !== slug);

  return (
    <section className="border-t border-white/12 bg-[#0a0a0a] text-[#f5f5f7]">
      <div className="mx-auto max-w-[1120px] px-6 py-[clamp(52px,7vw,84px)] sm:px-8">
        <div data-rise className="max-w-[62ch]">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/45">
            Demonstracinė svetainė
          </p>
          <h2 className="mt-4 text-[clamp(1.5rem,3.2vw,2.5rem)] font-normal leading-[1.15]">
            „{current?.name}“ neegzistuoja. Tai pavyzdinis darbas.
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">
            Įmonė, jos projektai, kainos ir kontaktai yra sugalvoti. Viskas kita
            — dizainas, tekstų struktūra, {current?.feature.toLowerCase()},
            greitis ir elgsena telefone — veikia lygiai taip, kaip veiktų jūsų
            svetainėje. Tokią ir gaunate.
          </p>
        </div>

        <div
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="/kontaktai"
            className="press inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[0.9375rem] font-medium text-[#0a0a0a] transition-[translate,opacity] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:opacity-90"
          >
            Noriu tokios svetainės
          </a>
          <a
            href="/darbai"
            className="press inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-[0.9375rem] text-white/85 transition-[translate,border-color] duration-[var(--d-ui)] ease-[var(--e-out)] hover:-translate-y-[2px] hover:border-white/60"
          >
            Visi pavyzdžiai
          </a>
        </div>

        <div
          data-rise
          style={{ "--i": 2 } as React.CSSProperties}
          className="mt-12 border-t border-white/12 pt-8"
        >
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/40">
            Kitos demonstracinės svetainės
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-3">
            {others.map((d) => (
              <li key={d.slug}>
                <a
                  href={d.href}
                  className="group flex items-baseline justify-between gap-3 border-b border-white/10 py-2.5 transition-colors duration-[var(--d-ui)] hover:border-white/40"
                >
                  <span className="text-[0.9375rem]">{d.name}</span>
                  <span className="text-[0.8125rem] text-white/45 transition-colors duration-[var(--d-ui)] group-hover:text-white/80">
                    {d.sector}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-[0.8125rem] text-white/35">
          © 2026 Evolvia · Nuotraukos: Unsplash
        </p>
      </div>
    </section>
  );
}
