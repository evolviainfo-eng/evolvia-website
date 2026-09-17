import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import type { Locale } from "@/i18n/config";
import { FormaNav } from "@/components/demo/forma/Nav";
import { HeroPlate } from "@/components/demo/forma/HeroPlate";
import { ProjectIndex } from "@/components/demo/forma/ProjectIndex";
import { ContactForm } from "@/components/demo/forma/ContactForm";
import { getFormaCopy } from "@/components/demo/forma/copy";
import {
  BAND,
  HAIR,
  INK,
  MUTED,
  PAPER,
  SECTION,
  SERIF,
  T_BODY,
  T_EYEBROW,
  T_H2,
  T_H3,
  T_LEAD,
  T_META,
  T_NUM,
  T_SMALL,
  WRAP,
} from "@/components/demo/forma/tokens";

/* latin-ext is mandatory: ą č ę ė į š ų ū ž. Both faces were checked at 92px
   for the macron pair ū / Ū, which is where narrow serifs usually break. */
const display = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-forma-display",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-forma-sans",
});

/** Page metadata in the demo's language. */
export function formaMetadata(locale: Locale): Metadata {
  const { title, description } = getFormaCopy(locale).meta;
  return { title, description };
}

/* All words on this page, the hero's hand-broken lines included, live in the
   demo's dictionary (see copy.ts). What stays here is what has no language:
   pictures, sizes, crops and anchors. */

/* Crops are chosen per picture, not per cell. The three windows are a
   symmetrical composition and would lose their outer pair in a portrait
   frame, so only the abstract stair detail is cut tall. The alt texts are in
   the dictionary, in this same order. */
const MOOD = [
  {
    src: "/demo/forma/mood-1.webp",
    w: 1200,
    h: 801,
    cell: "col-span-12 md:col-span-7",
    ratio: "aspect-[3/2]",
    push: "",
  },
  {
    src: "/demo/forma/mood-3.webp",
    w: 1200,
    h: 800,
    cell: "col-span-8 col-start-5 md:col-span-4 md:col-start-9",
    ratio: "aspect-[4/5]",
    push: "md:mt-[clamp(24px,5vw,72px)]",
  },
  {
    src: "/demo/forma/mood-4.webp",
    w: 1200,
    h: 828,
    cell: "col-span-11 md:col-span-5 md:col-start-2",
    ratio: "aspect-[3/2]",
    push: "",
  },
  {
    src: "/demo/forma/mood-2.webp",
    w: 1200,
    h: 800,
    cell: "col-span-10 col-start-3 md:col-span-5 md:col-start-8",
    ratio: "aspect-[3/2]",
    push: "md:mt-[clamp(32px,7vw,110px)]",
  },
];

/* Labels come from the dictionary's section names. */
const FOOTER_LINKS = [
  { href: "#projektai", section: "projects" },
  { href: "#paslaugos", section: "services" },
  { href: "#procesas", section: "process" },
  { href: "#kontaktai", section: "contact" },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/* Demo-scoped CSS. The site's focus ring and selection both paint with
   `--accent`, which a visitor who left the main site in dark mode carries in
   as #ffffff — invisible on this paper (1.13:1). Forma states both in its own
   ink so the indicator cannot depend on the surrounding theme.

   Colour only, deliberately: the house rule also carries a `border-radius`,
   and repeating that here would put it in the unlayered origin where it beats
   Tailwind's `rounded-full` and would square every pill on focus.

   The one keyframe is the lightbox picture landing after a navigation — it
   runs once per swap, never loops, and globals.css collapses it under reduced
   motion along with everything else. */
const FORMA_CSS = `
.forma :focus-visible{outline:2px solid ${INK};outline-offset:3px}
.forma ::selection{background:${INK};color:${PAPER}}
@keyframes forma-plate-in{from{opacity:0}to{opacity:1}}
.forma-plate-in{animation:forma-plate-in var(--d-el) var(--e-out) both}
`;

export function FormaPage({ locale }: { locale: Locale }) {
  const t = getFormaCopy(locale);

  return (
    <DemoShell
      locale={locale}
      slug="forma"
      bg={PAPER}
      fg={INK}
      className={`forma ${display.variable} ${sans.variable} font-[family-name:var(--font-forma-sans)] antialiased`}
    >
      <style>{FORMA_CSS}</style>
      <FormaNav locale={locale} />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section id="top" className="pt-[clamp(48px,8vw,104px)]">
          <div className={WRAP}>
            <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-end lg:gap-14">
              <div className="min-w-0">
                <p
                  data-rise
                  className={T_EYEBROW}
                  style={{ color: MUTED } as CSSProperties}
                >
                  {t.hero.eyebrow}
                </p>
                {/* The headline is broken by hand, not by the browser: each
                    line is its own mask, and a mask can only slide up a line
                    it actually contains. Every break holds from 375px to
                    1440px at this clamp, in both languages. */}
                <h1
                  style={SERIF}
                  className="mt-6 text-[clamp(2.5rem,7.2vw,4.625rem)] font-normal leading-[1.05]"
                >
                  {t.hero.lines.map((line, i) => (
                    <span
                      key={line}
                      data-line
                      style={{ "--i": i } as CSSProperties}
                      className="-mb-[0.14em] block overflow-hidden pb-[0.14em]"
                    >
                      <span>{line}</span>
                    </span>
                  ))}
                </h1>
              </div>
              <p
                data-rise
                style={{ "--i": 3, color: MUTED } as CSSProperties}
                className={`min-w-0 max-w-[38ch] ${T_BODY} lg:pb-2`}
              >
                {t.hero.lead}
              </p>
            </div>
          </div>

          <div className="mt-[clamp(32px,5vw,60px)] px-5 sm:px-8">
            <HeroPlate />
          </div>
        </section>

        {/* ── Požiūris ─────────────────────────────────────────── */}
        <section id="studija" className={SECTION}>
          <div className={WRAP}>
            <h2 className={T_EYEBROW} style={{ color: MUTED }}>
              {t.sections.approach}
            </h2>
            <div className="mt-[clamp(32px,4.5vw,60px)] grid gap-[clamp(40px,5vw,64px)] md:grid-cols-3">
              {t.approach.items.map((m, i) => (
                <div
                  key={m.title}
                  data-rise
                  style={{ "--i": i, borderColor: HAIR } as CSSProperties}
                  className="min-w-0 border-t pt-6"
                >
                  <span
                    className={`tabular-nums ${T_META}`}
                    style={{ color: MUTED }}
                  >
                    {pad(i + 1)}
                  </span>
                  <h3
                    style={SERIF}
                    className={`mt-5 ${T_H3} text-[clamp(1.5rem,2.4vw,1.875rem)]`}
                  >
                    {m.title}
                  </h3>
                  <p className={`mt-4 ${T_BODY}`} style={{ color: MUTED }}>
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projektų indeksas (veikianti funkcija) ───────────── */}
        <ProjectIndex />

        {/* ── Paslaugos ────────────────────────────────────────── */}
        <section
          id="paslaugos"
          className={SECTION}
          style={{ background: BAND }}
        >
          <div className={WRAP}>
            <div data-rise className="min-w-0">
              <p className={T_EYEBROW} style={{ color: MUTED }}>
                {t.sections.services}
              </p>
              <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <h2 style={SERIF} className={`${T_H2} max-w-[16ch]`}>
                  {t.services.title}
                </h2>
                <p
                  className={`min-w-0 max-w-[40ch] ${T_BODY}`}
                  style={{ color: MUTED }}
                >
                  {t.services.lead}
                </p>
              </div>
            </div>

            <div className="mt-[clamp(34px,5vw,64px)] grid gap-[clamp(36px,4vw,48px)] md:grid-cols-3">
              {t.services.items.map((s, i) => (
                <div
                  key={s.title}
                  data-rise
                  style={{ "--i": i, borderColor: HAIR } as CSSProperties}
                  className="min-w-0 border-t pt-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      style={SERIF}
                      className={`${T_H3} text-[clamp(1.25rem,2.2vw,1.875rem)]`}
                    >
                      {s.title}
                    </h3>
                    <span className={`shrink-0 ${T_NUM}`}>{s.price}</span>
                  </div>
                  <p className={`mt-4 ${T_BODY}`} style={{ color: MUTED }}>
                    {s.body}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {s.points.map((it) => (
                      <li
                        key={it}
                        className={`flex gap-3 ${T_SMALL}`}
                        style={{ color: MUTED }}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] h-px w-3 shrink-0"
                          style={{ background: "rgba(26,25,23,0.4)" }}
                        />
                        <span className="min-w-0">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p
              className={`mt-[clamp(34px,4vw,52px)] max-w-[62ch] ${T_SMALL}`}
              style={{ color: MUTED }}
            >
              {t.services.note}
            </p>
          </div>
        </section>

        {/* ── Procesas ─────────────────────────────────────────── */}
        <section id="procesas" className={SECTION}>
          <div className={WRAP}>
            <div data-rise className="min-w-0">
              <p className={T_EYEBROW} style={{ color: MUTED }}>
                {t.sections.process}
              </p>
              <h2 style={SERIF} className={`${T_H2} mt-5 max-w-[20ch]`}>
                {t.process.title}
              </h2>
            </div>

            {/* four steps arrive as one gesture, not four */}
            <ol
              data-rise
              style={{ "--i": 1 } as CSSProperties}
              className="mt-[clamp(36px,5vw,64px)] grid gap-x-8 gap-y-[clamp(32px,4vw,44px)] md:grid-cols-4"
            >
              {t.process.steps.map((p, i) => (
                <li
                  key={p.title}
                  className="min-w-0 border-t pt-5"
                  style={{ borderColor: HAIR }}
                >
                  <div
                    className={`flex items-baseline justify-between gap-3 ${T_META}`}
                    style={{ color: MUTED }}
                  >
                    <span className="tabular-nums">{pad(i + 1)}</span>
                    <span className="shrink-0">{p.when}</span>
                  </div>
                  <h3
                    style={SERIF}
                    className={`mt-4 ${T_H3} text-[clamp(1.25rem,2vw,1.5rem)]`}
                  >
                    {p.title}
                  </h3>
                  <p className={`mt-3 ${T_SMALL}`} style={{ color: MUTED }}>
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Nuotaika ─────────────────────────────────────────── */}
        <section className={SECTION}>
          <div className={WRAP}>
            <h2 className={T_EYEBROW} style={{ color: MUTED }}>
              {t.sections.mood}
            </h2>
            <div className="mt-[clamp(28px,4vw,52px)] grid grid-cols-12 gap-x-4 gap-y-[clamp(28px,4vw,56px)] sm:gap-x-6">
              {MOOD.map((m, i) => (
                <figure
                  key={m.src}
                  className={`min-w-0 overflow-hidden bg-[rgba(26,25,23,0.06)] ${m.cell} ${m.push}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    data-settle
                    src={m.src}
                    width={m.w}
                    height={m.h}
                    alt={t.mood.alts[i]}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${m.ratio}`}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Kontaktai ────────────────────────────────────────── */}
        <section
          id="kontaktai"
          className={SECTION}
          style={{ background: BAND }}
        >
          <div className={WRAP}>
            <div className="grid gap-[clamp(44px,6vw,80px)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
              <div data-rise className="min-w-0">
                <p className={T_EYEBROW} style={{ color: MUTED }}>
                  {t.sections.contact}
                </p>
                <h2 style={SERIF} className={`${T_H2} mt-5 max-w-[14ch]`}>
                  {t.contact.title}
                </h2>
                <p
                  className={`mt-5 max-w-[40ch] ${T_LEAD}`}
                  style={{ color: MUTED }}
                >
                  {t.contact.lead}
                </p>

                <span
                  className={`mt-8 inline-flex items-center rounded-full border px-3 py-[5px] ${T_META}`}
                  style={{ borderColor: "rgba(26,25,23,0.32)" }}
                >
                  {t.contact.sample}
                </span>

                <dl className="mt-5 flex flex-col">
                  {t.contact.rows.map((c) => (
                    <div
                      key={c.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-3"
                      style={{ borderColor: HAIR }}
                    >
                      <dt className={T_META} style={{ color: MUTED }}>
                        {c.label}
                      </dt>
                      <dd className="min-w-0 break-words text-[0.9375rem]">
                        {c.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div
                data-rise
                style={{ "--i": 1 } as CSSProperties}
                className="min-w-0"
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t" style={{ borderColor: HAIR }}>
        <div
          className={`${WRAP} flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:justify-between`}
        >
          <a
            href="#top"
            style={SERIF}
            className="text-[1.25rem] leading-none tracking-[-0.01em] transition-opacity duration-[var(--d-tap)] ease-[var(--e-out)] hover:opacity-70 active:opacity-50"
          >
            Forma
          </a>
          <nav
            aria-label={t.footer.nav}
            className={`flex flex-wrap gap-x-6 gap-y-2 ${T_SMALL}`}
          >
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative py-1 transition-colors duration-[var(--d-tap)] ease-[var(--e-out)]"
                style={{ color: MUTED }}
              >
                {t.sections[l.section]}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-[var(--d-ui)] ease-[var(--e-out)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  style={{ background: INK }}
                />
              </a>
            ))}
          </nav>
          <span className={T_SMALL} style={{ color: MUTED }}>
            © 2026 Forma · Vilnius
          </span>
        </div>
      </footer>
    </DemoShell>
  );
}
