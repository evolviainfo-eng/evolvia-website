import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { DemoShell } from "@/components/demo/DemoShell";
import type { Locale } from "@/i18n/config";
import { FormaNav } from "@/components/demo/forma/Nav";
import { FormaMotion } from "@/components/demo/forma/FormaMotion";
import { ProjectIndex } from "@/components/demo/forma/ProjectIndex";
import { ContactForm } from "@/components/demo/forma/ContactForm";
import { SplitTitle } from "@/components/demo/forma/SplitTitle";
import { getFormaCopy } from "@/components/demo/forma/copy";
import {
  HAIR,
  HAIR_DARK,
  INK,
  MUTED,
  PAPER,
  SAND,
  SAND_MUTED,
  T_BODY,
  T_BODY_RAG,
  T_BODY_STRONG,
  T_CAPS,
  T_ITALIC,
  T_LABEL,
  T_LEAD,
  T_ROW,
  T_SMALL,
  WRAP,
} from "@/components/demo/forma/tokens";

/* Round 8, after TARQ Studio (Awwwards HM, Sep 2026): warm-grey paper, an
   extended uppercase grotesk split to the page margins, justified light
   body, one serif italic used only for ( ) and numerals.

   latin-ext is mandatory: ą č ę ė į š ų ū ž. Archivo is loaded as the
   variable font with its width axis (62 to 125), so the extended titles and
   the normal-width body are one file. */
const sans = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-forma-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-forma-serif",
});

/** Page metadata in the demo's language. */
export function formaMetadata(locale: Locale): Metadata {
  const { title, description } = getFormaCopy(locale).meta;
  return { title, description };
}

/* The hero photograph is the day zone of the house in Balsiai (p-4): the
   same concrete floor and forest windows as that project's bedroom. The
   hero names it and links to its card, as TARQ's hero does. */
const HERO_PROJECT = { id: "p-4", year: "2023" } as const;

/* The studio's one photograph, in black and white: the oak stair, the
   studio's joinery at its most sculptural. Square, at most 440px wide
   (1200 x 800 source, so it holds 1.8x). */
const STUDIO_PHOTO = { src: "/demo/forma/mood-3.webp", w: 1200, h: 800, alt: 1 };

/* One photograph per process step: the room as found, the empty volume
   being planned, the materials in a finished room, the built joinery. */
const STEP_PHOTOS = [
  { src: "/demo/forma/mood-4.webp", w: 1200, h: 828, alt: { mood: 2 } },
  { src: "/demo/forma/p-2.webp", w: 1400, h: 933, alt: { project: "p-2" } },
  { src: "/demo/forma/p-1.webp", w: 1400, h: 1050, alt: { project: "p-1" } },
  { src: "/demo/forma/p-3.webp", w: 1400, h: 933, alt: { project: "p-3" } },
] as const;

/* Labels come from the dictionary's section names. */
const FOOTER_LINKS = [
  { href: "#studija", section: "studio" },
  { href: "#projektai", section: "projects" },
  { href: "#paslaugos", section: "services" },
  { href: "#procesas", section: "process" },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/* Demo-scoped CSS.

   Every hidden state is behind `html[data-choreo]`, which the root layout's
   boot script sets before first paint, never sets under reduced motion, and
   drops after 4s if the reveal system fails to start. Only transform,
   opacity and clip-path move. No filter is ever animated; the one static
   filter is the studio photograph's grayscale. */
const FORMA_CSS = `
.forma{--f-ease:cubic-bezier(.22,1,.36,1);--f-pad:16px;--f-nav:56px;--mat:clamp(22px,3.5vw,50px);font-family:var(--font-forma-sans),system-ui,sans-serif}
@media (min-width:768px){.forma{--f-pad:clamp(24px,2.8vw,40px)}}
@media (min-width:1024px){.forma{--f-nav:72px}}
.forma .f-ext{font-stretch:125%;font-variation-settings:"wdth" 125}
.forma .f-it{font-family:var(--font-forma-serif),Georgia,serif;font-style:italic}
@media (min-width:1024px){.forma .f-just{text-align:justify;text-align-last:left;hyphens:auto;-webkit-hyphens:auto}}
/* The site's content-visibility:auto on main sections makes every section a
   containing block for position:fixed (the pinned process stage scrolled
   away with its section) and gives unrendered sections a guessed height
   that breaks ScrollTrigger's measurements. This page is short; render it. */
.forma main>section,.forma main>div>section{content-visibility:visible;contain-intrinsic-size:none}
.forma :focus-visible{outline:2px solid ${INK};outline-offset:3px}
.forma .f-dark :focus-visible,.forma .f-hero :focus-visible{outline-color:${SAND}}
.forma ::selection{background:${INK};color:${PAPER}}
.forma .f-sec{padding-top:clamp(96px,10vw,144px)}

.forma .f-head{position:absolute;left:0;right:0;top:var(--demo-bar-h);z-index:40;height:var(--f-nav);color:#fff;transition:transform .45s var(--f-ease)}
.forma .f-head[data-hidden]{transform:translateY(calc(-100% - var(--demo-bar-h) - 2px))}
.forma .f-head[data-live]{position:fixed}
.forma .f-head::before{content:"";position:absolute;inset:0;background:${PAPER};border-bottom:1px solid ${HAIR};opacity:0;transition:opacity .35s var(--f-ease)}
.forma .f-head>*{position:relative}
.forma .f-head[data-solid]{color:${INK}}
.forma .f-head[data-solid]::before{opacity:1}

.forma .f-ul{position:relative}
.forma .f-ul::after{content:"";position:absolute;left:0;right:0;bottom:9px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left center;transition:transform .25s var(--f-ease)}
.forma .f-ul:hover::after,.forma .f-ul:focus-visible::after{transform:none}
.forma .f-arrow>[aria-hidden]{display:inline-block;transition:transform .25s var(--f-ease)}
.forma .f-arrow:hover>[aria-hidden],.forma .f-arrow:focus-visible>[aria-hidden]{transform:translate(3px,3px)}
.forma .f-arrow-down:hover>[aria-hidden],.forma .f-arrow-down:focus-visible>[aria-hidden]{transform:translateY(3px)}

.forma .f-hero{position:relative;height:calc(100svh - var(--demo-bar-h));min-height:560px;overflow:hidden;color:#fff;background:#8f8b87}
.forma .f-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
html[data-choreo] .forma .f-hero-img{animation:f-hero-in 1.8s var(--f-ease) both}
@keyframes f-hero-in{from{transform:scale(1.045)}to{transform:none}}
.forma .f-hero-shade{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(23,23,23,.38) 0,rgba(23,23,23,0) 22%),linear-gradient(to top,rgba(23,23,23,.62) 0,rgba(23,23,23,.2) 32%,rgba(23,23,23,0) 55%),rgba(23,23,23,.1)}
.forma .f-hero-txt{text-shadow:0 1px 18px rgba(0,0,0,.28)}
@media (max-width:767px){.forma .f-hero-img{object-position:34% 50%}}
.forma .f-hero-row{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}

.forma .f-split{display:flex;flex-direction:column}
.forma .f-split>span{display:block}
.forma .f-split>span+span{align-self:flex-end}
@media (min-width:1024px){
.forma .f-split-spread{flex-direction:row;justify-content:space-between;gap:24px}
.forma .f-split-step{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:24px}
.forma .f-split-step>span:first-child{grid-column:1/5}
.forma .f-split-step>span+span{grid-column:5/13;align-self:auto}
}

.forma .f-rule{height:1px;background:${HAIR};margin-bottom:clamp(56px,6vw,88px)}
@media (min-width:1024px){
.forma .f-studio{grid-template-rows:auto auto auto 1fr auto}
.forma .f-studio>.f-studio-photo{grid-column:8/13;grid-row:1/-1;align-self:end}
.forma .f-studio>.f-studio-kinds{grid-row:5}
}

.forma .f-kinds li{display:flex;justify-content:flex-end;border-bottom:1px solid ${HAIR};margin-left:calc(-1 * var(--f-pad) - max(0px,(100vw - 1440px) / 2));padding:10px 0 6px}
.forma .f-kinds li>span{min-width:min(13em,62%)}

html[data-choreo] .forma [data-rise="img"]{opacity:1;transform:none}
html[data-choreo] .forma [data-rise="img"] .f-clip{clip-path:inset(8% 0 0 0);transition:clip-path .9s var(--f-ease)}
html[data-choreo] .forma [data-rise="img"] .f-zoom{transform:scale(1.04);transition:transform .9s var(--f-ease)}
html[data-choreo] .forma [data-rise="img"].is-in .f-clip{clip-path:inset(0 0 0 0)}
html[data-choreo] .forma [data-rise="img"].is-in .f-zoom{transform:none}

.forma .f-filters{display:grid;grid-template-columns:repeat(2,minmax(0,max-content));column-gap:28px}
@media (min-width:640px){.forma .f-filters{display:flex;flex-wrap:wrap;column-gap:clamp(20px,2.6vw,40px)}}
.forma .f-filter-word{color:${INK}}
.forma .f-filter[aria-pressed="false"] .f-filter-word{color:#7A7673}
.forma .f-filter:hover .f-filter-word,.forma .f-filter:focus-visible .f-filter-word{color:${INK}}

.forma .f-list{display:grid;grid-template-columns:minmax(0,1fr);row-gap:56px}
.forma .f-ph{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover}
@media (max-width:767px){.forma .f-item:nth-child(odd){margin-right:32px}.forma .f-item:nth-child(even){margin-left:32px}}
@media (min-width:768px){
.forma .f-list{grid-template-columns:repeat(12,minmax(0,1fr));column-gap:24px;row-gap:clamp(72px,8vw,112px)}
.forma .f-slot-a{grid-column:1/7}
.forma .f-slot-b{grid-column:7/13;margin-top:clamp(56px,7vw,104px)}
.forma .f-slot-c{grid-column:3/11}
.forma .f-slot-a .f-ph,.forma .f-slot-b .f-ph{aspect-ratio:4/3}
.forma .f-slot-c .f-ph{aspect-ratio:16/10}
}
.forma .f-card-head{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:baseline;gap:16px}
.forma .f-parens{display:none}
.forma .f-touch-meta{display:block}
.forma .f-mat{position:absolute;inset:0;background:${INK};opacity:0;transition:opacity .45s var(--f-ease)}
.forma .f-view{position:absolute;inset:0;overflow:hidden;opacity:0;clip-path:inset(41% 41% 41% 41%);transition:clip-path .45s var(--f-ease),opacity .2s linear .25s}
.forma .f-view img{display:block;width:100%;height:100%;object-fit:cover;transform:scale(1.15);transition:transform .45s var(--f-ease)}
.forma .f-lab{position:absolute;left:0;right:0;height:var(--mat);display:flex;align-items:center;justify-content:center;color:#fff;font-size:clamp(.875rem,1.25vw,1.125rem);opacity:0;transition:opacity .2s ease}
.forma .f-lab-t{top:0}
.forma .f-lab-b{bottom:0}
.forma .f-parens-stack{display:inline-grid;justify-items:center;min-width:0}.forma .f-parens-stack>span{grid-area:1/1;white-space:nowrap}.forma .f-parens-rest{font-size:1.0625rem;color:#6E6B69;transition:opacity .25s ease}.forma .f-parens-word{font-size:1.0625rem;opacity:0;clip-path:inset(0 50% 0 50%);transition:opacity .3s ease,clip-path .4s var(--f-ease)}
@media (hover:hover) and (pointer:fine){
.forma .f-card-head{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}
.forma .f-card-head>span:last-child{text-align:right}
.forma .f-parens{display:inline-flex;align-items:baseline;justify-content:space-between;gap:10px;width:clamp(150px,13vw,190px)}
.forma .f-touch-meta{display:none}
.forma .f-card:hover .f-mat{opacity:.9;transition-duration:.65s}
.forma .f-plain .f-ph{transition:transform .65s var(--f-ease)}
.forma .f-plain:hover .f-ph{transform:scale(1.03)}
.forma .f-card:hover .f-view{opacity:1;clip-path:inset(var(--mat) var(--mat) var(--mat) var(--mat));transition:clip-path .65s var(--f-ease),opacity .12s linear}
.forma .f-card:hover .f-view img{transform:none;transition-duration:.65s}
.forma .f-card:hover .f-lab{opacity:1;transition:opacity .3s ease .2s}
.forma .f-card:hover .f-parens-word{opacity:1;clip-path:inset(0 0 0 0)}.forma .f-card:hover .f-parens-rest{opacity:0}
}
.forma .f-card:focus-visible .f-mat{opacity:.9;transition-duration:.65s}
.forma .f-card:focus-visible .f-view{opacity:1;clip-path:inset(var(--mat) var(--mat) var(--mat) var(--mat));transition:clip-path .65s var(--f-ease),opacity .12s linear}
.forma .f-card:focus-visible .f-view img{transform:none;transition-duration:.65s}
.forma .f-card:focus-visible .f-lab{opacity:1;transition:opacity .3s ease .2s}
.forma .f-card:focus-visible .f-parens-word{opacity:1;clip-path:inset(0 0 0 0)}.forma .f-card:focus-visible .f-parens-rest{opacity:0}

.forma .f-proc{padding-bottom:clamp(96px,10vw,144px)}
.forma .f-track{--sg:24px;display:flex;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scroll-padding-inline:var(--f-pad);padding-inline:var(--f-pad);scrollbar-width:none}
.forma .f-track::-webkit-scrollbar{display:none}
.forma .f-step{flex:0 0 85vw;min-width:0;padding-right:var(--sg);scroll-snap-align:start}
.forma .f-step-head{display:flex;align-items:flex-end;gap:12px;min-height:3rem}
.forma .f-step-rule{display:block;position:relative;height:1px;background:${HAIR};margin:16px calc(-1 * var(--sg)) 24px 0}
.forma .f-step-rule::before{content:"";position:absolute;left:0;top:0;width:1px;height:12px;background:${INK}}
.forma .f-step-title{max-width:11em;text-wrap:balance}
.forma .f-step-img{display:block;width:100%;height:auto;aspect-ratio:345/330;object-fit:cover}
@media (min-width:768px){.forma .f-step{flex-basis:min(62vw,560px)}}
@media (min-width:1024px){
.forma .f-track{--sg:clamp(32px,3.5vw,56px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));row-gap:72px;overflow:visible;max-width:1440px;margin:clamp(48px,6vw,72px) auto 0;scroll-snap-type:none}
.forma .f-step-img{max-width:345px}
.forma .f-proc[data-pinned]{padding-top:0;padding-bottom:0}
.forma .f-proc[data-pinned] .f-stage{height:100svh;display:flex;flex-direction:column;justify-content:flex-start;padding-top:calc(var(--demo-bar-h) + var(--f-nav) + clamp(8px,3svh,40px));padding-bottom:24px;overflow:hidden}
.forma .f-proc[data-pinned] .f-rule{margin-bottom:clamp(24px,5svh,56px)}
.forma .f-proc[data-pinned] .f-track{display:flex;width:max-content;max-width:none;margin:clamp(56px,8svh,80px) 0 0;padding-inline:max(var(--f-pad),calc((100vw - 1440px) / 2 + var(--f-pad)));will-change:transform}
.forma .f-proc[data-pinned] .f-step{flex:0 0 min(780px,54vw)}
.forma .f-proc[data-pinned] .f-step-body{display:grid;grid-template-columns:auto minmax(0,1fr);gap:24px;align-items:start}
.forma .f-proc[data-pinned] .f-step-img{width:auto;max-width:none;height:min(390px,38svh)}
.forma .f-proc[data-pinned] .f-step-text{margin-top:0}
}

.forma .f-btn{position:relative;isolation:isolate;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(217,212,194,.5)}
.forma .f-btn-fill{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:${SAND};color:${INK};clip-path:inset(0 100% 0 0);transition:clip-path .6s var(--f-ease)}
.forma .f-btn:hover .f-btn-fill,.forma .f-btn:focus-visible .f-btn-fill{clip-path:inset(0 0 0 0)}
.forma .f-btn:active{opacity:.85}

@keyframes forma-plate-in{from{opacity:0}to{opacity:1}}
.forma-plate-in{animation:forma-plate-in var(--d-el) var(--e-out) both}

@media (prefers-reduced-motion:reduce){
.forma *,.forma *::before,.forma *::after{transition-duration:.01ms!important;transition-delay:0s!important;animation:none!important}
}
`;

export function FormaPage({ locale }: { locale: Locale }) {
  const t = getFormaCopy(locale);
  const heroProject = t.projects.items[HERO_PROJECT.id];
  const stepAlt = (a: (typeof STEP_PHOTOS)[number]["alt"]) =>
    "mood" in a ? t.mood.alts[a.mood] : t.projects.items[a.project].alt;

  return (
    <DemoShell
      locale={locale}
      slug="forma"
      bg={PAPER}
      fg={INK}
      className={`forma ${sans.variable} ${serif.variable} antialiased`}
    >
      <style>{FORMA_CSS}</style>
      <FormaMotion />
      <FormaNav />

      <main lang={locale}>
        {/* ── Hero: one project photograph, the name row across its middle ── */}
        <section id="top" className="f-hero" aria-labelledby="forma-h1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demo/forma/hero.webp"
            width={1800}
            height={1125}
            alt={t.hero.imageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="f-hero-img"
          />
          <div aria-hidden="true" className="f-hero-shade" />

          {/* the name row: year, ( name ), link. On a phone it collapses to
              the year above a centred ( name ). */}
          <div className="f-hero-row f-hero-txt">
            <div
              className={`${WRAP} flex flex-col items-center gap-3 lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-6`}
            >
              <p
                data-rise="fade"
                style={{ "--i": 2 } as CSSProperties}
                className={`${T_ROW} tabular-nums lg:col-span-3`}
              >
                {HERO_PROJECT.year}
              </p>
              <p
                data-rise="fade"
                style={{ "--i": 3 } as CSSProperties}
                className={`${T_ITALIC} flex w-full min-w-0 items-baseline justify-between gap-4 text-[clamp(2.125rem,4.2vw,3.75rem)] leading-[1.05] lg:col-span-6 lg:col-start-4`}
              >
                <span aria-hidden="true">(</span>
                <span className="min-w-0 text-center tracking-[0.04em]">
                  {heroProject.title}
                </span>
                <span aria-hidden="true">)</span>
              </p>
              <a
                data-rise="fade"
                style={{ "--i": 4 } as CSSProperties}
                href={`#projektas-${HERO_PROJECT.id}`}
                className={`f-arrow hidden items-center gap-1.5 justify-self-end lg:col-span-3 lg:inline-flex ${T_ROW}`}
              >
                {t.hero.view}
                <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>

          {/* bottom: the studio in one justified block, the way down */}
          <div className="f-hero-txt absolute inset-x-0 bottom-[clamp(20px,4.5svh,40px)]">
            <div
              className={`${WRAP} flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between`}
            >
              <div
                data-rise="fade"
                style={{ "--i": 5 } as CSSProperties}
                className="w-full min-w-0 max-w-[540px]"
              >
                <div className={T_LEAD}>
                  <h1 id="forma-h1" className="inline font-normal">
                    {t.hero.lines.join(" ")}
                  </h1>{" "}
                  <span>{t.hero.lead}</span>
                </div>
              </div>
              <div
                data-rise="fade"
                style={{ "--i": 6 } as CSSProperties}
                className="flex items-center justify-between gap-6"
              >
                <a
                  href={`#projektas-${HERO_PROJECT.id}`}
                  className={`f-arrow inline-flex min-h-11 items-center gap-1.5 lg:hidden ${T_ROW}`}
                >
                  {t.hero.view}
                  <span aria-hidden="true">↘</span>
                </a>
                <a
                  href="#studija"
                  className={`f-arrow f-arrow-down inline-flex min-h-11 items-center gap-2 ${T_ROW}`}
                >
                  {t.sections.studio}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Studija: THE   STUDIO, two justified columns' worth of
              principles, the kinds of work on hairlines, one B&W photo ── */}
        <section id="studija" className="f-sec overflow-x-clip">
          {/* Phone order: title, link, principles, photograph, kinds. From
              1024px the photograph takes columns 8 to 12 from the title's
              top, and the kinds sit on the last row, level with its foot. */}
          <div className={`${WRAP} f-studio grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6`}>
            <div className="min-w-0 lg:col-span-7">
              <SplitTitle words={t.studio.split} layout="step" />
            </div>

            <div className="mt-6 flex min-w-0 justify-end lg:col-span-7">
              <a
                href="#procesas"
                className={`f-arrow inline-flex min-h-11 items-center gap-1.5 ${T_ROW}`}
              >
                {t.studio.link}
                <span aria-hidden="true">↘</span>
              </a>
            </div>

            <div className="mt-[clamp(32px,4vw,56px)] flex min-w-0 max-w-[445px] flex-col gap-[clamp(28px,3vw,40px)] lg:col-span-7">
              {t.approach.items.map((m) => (
                <div key={m.title} className="min-w-0">
                  <h3 className={T_BODY_STRONG}>{m.title}</h3>
                  <p className={`mt-1 ${T_BODY}`}>{m.body}</p>
                </div>
              ))}
            </div>

            {/* the one photograph, black and white. 1200px source shown at
                most 560px wide. */}
            <figure className="f-studio-photo m-0 mt-[clamp(48px,7vw,96px)] min-w-0 lg:mt-0">
              <div data-rise="img" className="w-full">
                <div className="f-clip overflow-hidden bg-[rgba(23,23,23,0.08)]">
                  <div className="f-zoom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={STUDIO_PHOTO.src}
                      width={STUDIO_PHOTO.w}
                      height={STUDIO_PHOTO.h}
                      alt={t.mood.alts[STUDIO_PHOTO.alt]}
                      loading="lazy"
                      decoding="async"
                      className="block aspect-[4/5] h-auto w-full object-cover grayscale"
                    />
                  </div>
                </div>
              </div>
            </figure>

            <ul
              className={`f-studio-kinds f-kinds mt-[clamp(40px,6vw,56px)] min-w-0 max-w-[445px] lg:col-span-7 lg:self-end ${T_ROW}`}
            >
              {t.studio.kinds.map((k) => (
                <li key={k}>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Projektai ── */}
        <ProjectIndex />

        {/* ── Paslaugos ─────────────────────────────────────────── */}
        <section id="paslaugos" className="f-sec">
          <div className={WRAP}>
            <div aria-hidden="true" className="f-rule" />
            <SplitTitle words={t.services.split} layout="spread" />

            <div className="mt-[clamp(28px,4vw,56px)] grid lg:grid-cols-12 lg:gap-6">
              <p className={`min-w-0 ${T_BODY} lg:col-span-4 lg:col-start-9`}>
                <span className={T_BODY_STRONG}>{t.services.title}</span>{" "}
                {t.services.lead}
              </p>
            </div>

            <ol className="mt-[clamp(48px,6vw,96px)] border-b" style={{ borderColor: HAIR }}>
              {t.services.items.map((s, i) => (
                <li
                  key={s.title}
                  className="grid min-w-0 grid-cols-1 gap-y-4 border-t py-[clamp(28px,3vw,40px)] lg:grid-cols-12 lg:items-baseline lg:gap-x-6"
                  style={{ borderColor: HAIR }}
                >
                  <div className="flex min-w-0 items-baseline gap-4 lg:col-span-4">
                    <span
                      aria-hidden="true"
                      className={`${T_ITALIC} text-[clamp(2.25rem,3.3vw,3rem)] leading-[0.8]`}
                    >
                      {pad(i + 1)}
                    </span>
                    <div className="min-w-0">
                      <h3 className={`${T_CAPS} text-balance`}>{s.title}</h3>
                    </div>
                  </div>
                  <p className={`min-w-0 ${T_ROW} lg:col-span-2`}>{s.price}</p>
                  <p className={`min-w-0 ${T_BODY} lg:col-span-3`}>{s.body}</p>
                  <ul className={`min-w-0 ${T_SMALL} lg:col-span-3`} style={{ color: MUTED }}>
                    {s.points.map((it) => (
                      <li key={it} className="py-0.5">
                        {it}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <p className={`mt-6 max-w-[62ch] ${T_SMALL}`} style={{ color: MUTED }}>
              {t.services.note}
            </p>
          </div>
        </section>

        {/* ── Procesas: the one pinned section. The title stays, the steps
              travel sideways with the scroll (desktop). Phone: a native
              scroll-snap row. Reduced motion or no JS on a desktop: a
              two-column grid. ── */}
        <section id="procesas" data-f-proc className="f-proc f-sec">
          <div data-f-stage className="f-stage">
            <div className={WRAP}>
              <div aria-hidden="true" className="f-rule" />
              {/* from 1024px the line sits in the gap between the two title
                  words, on their baseline, so it never crowds the steps */}
              <div className="relative">
                <SplitTitle words={t.process.split} layout="spread" />
                <p
                  className={`mt-4 flex justify-end lg:absolute lg:inset-x-0 lg:bottom-[0.85rem] lg:mt-0 lg:justify-center ${T_ROW}`}
                >
                  <span className="max-w-[445px] text-right lg:text-center">
                    {t.process.title}
                  </span>
                </p>
              </div>
            </div>

            <ol
              data-f-track
              aria-label={t.process.label}
              className="f-track mt-[clamp(40px,6svh,64px)]"
            >
              {t.process.steps.map((p, i) => {
                const photo = STEP_PHOTOS[i];
                return (
                  <li key={p.title} className="f-step">
                    <div className="f-step-head">
                      <span
                        aria-hidden="true"
                        className={`${T_ITALIC} text-[clamp(2.5rem,3.3vw,3rem)] leading-[0.8]`}
                      >
                        {pad(i + 1)}
                      </span>
                      <h3 className={`f-step-title ${T_CAPS}`}>{p.title}</h3>
                    </div>
                    <span aria-hidden="true" className="f-step-rule" />
                    <div className="f-step-body">
                      {photo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photo.src}
                          width={photo.w}
                          height={photo.h}
                          alt={stepAlt(photo.alt)}
                          loading="lazy"
                          decoding="async"
                          className="f-step-img"
                        />
                      )}
                      <div className="f-step-text mt-4 min-w-0">
                        <p className={T_BODY_RAG}>{p.body}</p>
                        <p className={`mt-3 ${T_SMALL}`} style={{ color: MUTED }}>
                          {p.when}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ── Kontaktai: the dark ground, one light sentence, the form ── */}
        <div className="f-dark" style={{ background: INK, color: SAND }}>
          <section id="kontaktai" aria-labelledby="forma-kontaktai">
            <div
              className={`${WRAP} grid gap-[clamp(48px,6vw,88px)] pb-[clamp(80px,9vw,128px)] pt-[clamp(88px,10vw,150px)] lg:grid-cols-12 lg:gap-x-6`}
            >
              <div className="min-w-0 lg:col-span-5">
                <h2
                  id="forma-kontaktai"
                  className="text-[clamp(1.5rem,2.2vw,2rem)] font-light leading-[1.25]"
                >
                  {t.contact.title}
                </h2>
                <p className={`mt-5 max-w-[445px] ${T_BODY}`}>{t.contact.lead}</p>

                <p className={`mt-12 ${T_SMALL}`} style={{ color: SAND_MUTED }}>
                  {t.contact.sample}
                </p>
                <dl className="mt-3 border-t" style={{ borderColor: HAIR_DARK }}>
                  {t.contact.rows.map((c) => (
                    <div
                      key={c.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-3"
                      style={{ borderColor: HAIR_DARK }}
                    >
                      <dt className={T_SMALL} style={{ color: SAND_MUTED }}>
                        {c.label}
                      </dt>
                      <dd className={`min-w-0 break-words ${T_LABEL}`}>{c.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="min-w-0 lg:col-span-6 lg:col-start-7">
                <ContactForm />
              </div>
            </div>
          </section>

          <footer className="border-t" style={{ borderColor: HAIR_DARK }}>
            <div
              className={`${WRAP} flex flex-col gap-5 py-9 lg:flex-row lg:items-center lg:justify-between`}
            >
              <a
                href="#top"
                aria-label={t.nav.home}
                className="f-ext text-[1.125rem] uppercase leading-none tracking-[0.04em] transition-opacity duration-[var(--d-tap)] hover:opacity-70"
              >
                Forma
              </a>
              <nav
                aria-label={t.footer.nav}
                className={`flex flex-wrap gap-x-6 gap-y-2 ${T_SMALL}`}
              >
                {FOOTER_LINKS.map((l) => (
                  <a key={l.href} href={l.href} className="f-ul py-1">
                    {t.sections[l.section]}
                  </a>
                ))}
              </nav>
              <p className={T_SMALL} style={{ color: SAND_MUTED }}>
                {t.hero.eyebrow} · © 2026
              </p>
            </div>
          </footer>
        </div>
      </main>
    </DemoShell>
  );
}
