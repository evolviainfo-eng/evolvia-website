import { cn } from "@/lib/cn";
import type { Demo } from "@/content/demos";

/* Demonstration websites rendered inside a clean browser frame.
   Four distinct, content-rich compositions so each reads as a different real
   site. The demo "screenshots" are deliberately IN COLOUR — the one colour
   moment on an otherwise monochrome page (the work carries colour, the chrome
   stays mono). The frame itself is theme-aware; the screenshot content uses
   fixed colours because it depicts a specific fictional site. */

function Chrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3.5 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full border border-border" />
      <span className="h-2.5 w-2.5 rounded-full border border-border" />
      <span className="h-2.5 w-2.5 rounded-full border border-border" />
      <div className="mx-auto flex h-5 w-1/2 max-w-[220px] items-center justify-center gap-1.5 rounded-full border border-border bg-surface text-[9px] tracking-[0.04em] text-text-muted">
        <svg
          viewBox="0 0 10 12"
          className="h-[9px] w-[8px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          aria-hidden="true"
        >
          <rect x="1.5" y="5" width="7" height="5.5" rx="1" />
          <path d="M3 5V3.5a2 2 0 0 1 4 0V5" />
        </svg>
        {url}
      </div>
      <span className="h-2.5 w-2.5" />
    </div>
  );
}

// taller than the frame so it can parallax without revealing edges
const imgClass =
  "work-img absolute left-0 top-[-6%] h-[112%] w-full object-cover";

/* ── Konstrukta — statybos bendrovė ─────────────────────────── */
function Architecture({ demo }: { demo: Demo }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={demo.image} alt="" className={imgClass} loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-black/10" />
      <div className="absolute inset-0 flex flex-col p-5 text-white sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-[0.8rem] font-bold tracking-[0.22em]">KONSTRUKTA</span>
          <div className="flex items-center gap-5">
            <div className="hidden gap-5 text-[11px] text-white/75 md:flex">
              <span>Projektai</span>
              <span>Paslaugos</span>
              <span>Apie</span>
            </div>
            <span className="hidden rounded-full border border-white/40 px-3.5 py-1.5 text-[10px] font-medium sm:inline-block">
              Susisiekti
            </span>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between gap-6">
          <div className="max-w-[17ch]">
            <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.24em] text-white/60 sm:text-[10px]">
              Statybos bendrovė — Kaunas
            </p>
            <h4 className="mt-2 text-[1.7rem] font-bold leading-[1.05] tracking-[-0.02em] md:text-[2.2rem] lg:text-[2.8rem]">
              Statome tai, kas išlieka.
            </h4>
            <div className="mt-4 flex items-center gap-4 sm:mt-5">
              <span className="inline-block whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-[11px] font-medium text-black sm:px-5 sm:py-2 sm:text-[12px]">
                Mūsų projektai
              </span>
              <span className="hidden whitespace-nowrap text-[11px] text-white/80 sm:inline">
                Paslaugos →
              </span>
            </div>
          </div>
          <div className="hidden border-l border-white/25 pl-5 text-right text-[10px] leading-[1.9] text-white/70 sm:block">
            <div>Pamatai</div>
            <div>Karkasai</div>
            <div>Stogai</div>
            <div>Fasadai</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Fumé — restoranas / vyno baras ─────────────────────────── */
function Restaurant({ demo }: { demo: Demo }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={demo.image} alt="" className={imgClass} loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />
      <div className="absolute inset-0 flex flex-col p-5 text-white sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-serif text-[1.25rem] italic">Fumé</span>
          <div className="hidden gap-4 text-[10px] text-white/70 sm:flex">
            <span>Meniu</span>
            <span>Apie</span>
            <span>Rezervacija</span>
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-[9px] uppercase tracking-[0.24em] text-white/60">
            Vyno baras · Vilnius
          </p>
          <h4 className="mt-1.5 max-w-[14ch] font-serif text-[1.5rem] leading-[1.12] sm:text-[2rem]">
            Vakarienė, kurią prisimeni.
          </h4>
          {/* rezervacijos juosta — makes it read like a working site */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-2 backdrop-blur-md sm:gap-2.5 sm:p-2.5">
            <div className="flex-1 rounded-lg border border-white/15 px-2.5 py-1.5">
              <div className="text-[7px] uppercase tracking-[0.14em] text-white/50">Data</div>
              <div className="text-[10px]">Šiandien</div>
            </div>
            <div className="flex-1 rounded-lg border border-white/15 px-2.5 py-1.5">
              <div className="text-[7px] uppercase tracking-[0.14em] text-white/50">Laikas</div>
              <div className="text-[10px]">19:00</div>
            </div>
            <div className="hidden flex-1 rounded-lg border border-white/15 px-2.5 py-1.5 sm:block">
              <div className="text-[7px] uppercase tracking-[0.14em] text-white/50">Svečiai</div>
              <div className="text-[10px]">2 asmenys</div>
            </div>
            <span className="shrink-0 rounded-lg bg-white px-3.5 py-2.5 text-[10px] font-medium text-black">
              Rezervuoti
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Forma — interjero studija ──────────────────────────────── */
function Interior({ demo }: { demo: Demo }) {
  const projects = [
    ["01", "Butas Žvėryne"],
    ["02", "Namas Pavilnyje"],
    ["03", "Studija Senamiestyje"],
  ] as const;
  return (
    <div className="absolute inset-0 grid grid-cols-[1fr_0.9fr]">
      <div className="flex flex-col bg-[#f5f2ec] p-5 text-neutral-900 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[1.05rem] font-semibold tracking-[-0.02em]">Forma</span>
          <span className="text-[9px] tracking-[0.12em] text-neutral-500">LT — EN</span>
        </div>
        <div className="mt-auto">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Interjero studija — Vilnius
          </p>
          <h4 className="mt-2 font-serif text-[1.15rem] leading-[1.12] tracking-[-0.01em] sm:text-[1.7rem]">
            Namai, kurie kvėpuoja.
          </h4>
          <ul className="mt-3 border-t border-neutral-300 sm:mt-5">
            {projects.map(([no, title], i) => (
              <li
                key={no}
                className={cn(
                  "items-baseline justify-between border-b border-neutral-300 py-1.5 sm:py-2",
                  i === 2 ? "hidden sm:flex" : "flex",
                )}
              >
                <span className="flex items-baseline gap-2.5">
                  <span className="text-[8px] tabular-nums text-neutral-400">{no}</span>
                  <span className="text-[10px] font-medium sm:text-[11px]">{title}</span>
                </span>
                <span className="text-[9px] text-neutral-400">→</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={demo.image} alt="" className={imgClass} loading="lazy" decoding="async" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[9px] font-medium text-neutral-900 shadow-sm sm:bottom-4 sm:left-4">
          Projektas Nº 01
        </span>
      </div>
    </div>
  );
}

/* ── Skalsa — el. parduotuvė ────────────────────────────────── */
function Shop({ demo }: { demo: Demo }) {
  const products = [
    { img: demo.imageAlt ?? demo.image, pos: "object-center", name: "Gintaras", price: "€24" },
    { img: demo.image, pos: "object-[18%_62%]", name: "Medaus dūmas", price: "€19" },
    // tight zoomed crop so the three cards read as distinct products
    { img: demo.image, pos: "scale-[1.9] object-[82%_38%]", name: "Vanilė ir kedras", price: "€22" },
  ] as const;
  return (
    <div className="absolute inset-0 flex flex-col bg-[#faf7f2]">
      {/* shop nav */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-[#faf7f2] px-5 py-2.5 text-neutral-900 sm:px-6">
        <span className="text-[0.95rem] font-semibold tracking-[-0.01em]">Skalsa</span>
        <div className="hidden gap-4 text-[10px] text-neutral-500 sm:flex">
          <span>Žvakės</span>
          <span>Rinkiniai</span>
          <span>Apie</span>
        </div>
        <span className="relative" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-neutral-800" fill="none" stroke="currentColor" strokeWidth={1.3}>
            <path d="M3 5h10l-1 8H4L3 5Z" />
            <path d="M5.5 5V4a2.5 2.5 0 0 1 5 0v1" />
          </svg>
          <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-neutral-900 text-[7px] font-semibold text-white">
            2
          </span>
        </span>
      </div>
      {/* hero band */}
      <div className="relative flex-[1.15] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={demo.image} alt="" className={imgClass} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c130c]/65 via-[#1c130c]/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-4 text-white sm:p-6">
          <p className="text-[8px] uppercase tracking-[0.24em] text-white/70 sm:text-[9px]">
            Rankų darbo žvakės
          </p>
          <h4 className="mt-1 max-w-[12ch] text-[1.05rem] font-semibold leading-[1.1] tracking-[-0.01em] sm:mt-1.5 sm:text-[1.7rem]">
            Šiluma jūsų namams.
          </h4>
          <span className="mt-2 inline-block w-fit whitespace-nowrap rounded-full bg-white px-3.5 py-1 text-[9px] font-medium text-neutral-900 sm:mt-3 sm:px-4 sm:py-1.5 sm:text-[10px]">
            Apsipirkti
          </span>
        </div>
      </div>
      {/* product row */}
      <div className="grid flex-1 grid-cols-3 gap-3 px-5 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
        {products.map((p) => (
          <div key={p.name} className="flex min-h-0 flex-col">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt=""
                className={cn("absolute inset-0 h-full w-full object-cover", p.pos)}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="mt-1.5 flex items-baseline justify-between gap-2">
              <span className="truncate text-[9px] font-medium text-neutral-800 sm:text-[10px]">
                {p.name}
              </span>
              <span className="text-[9px] font-semibold tabular-nums text-neutral-900 sm:text-[10px]">
                {p.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile mock — hangs off the frame corner (responsyvumo įrodymas) ── */
const phoneCopy: Record<Demo["variant"], { mark: string; markClass: string; cta: string; pos: string }> = {
  architecture: { mark: "KONSTRUKTA", markClass: "text-[8px] font-bold tracking-[0.18em]", cta: "Projektai", pos: "object-[62%_center]" },
  restaurant: { mark: "Fumé", markClass: "font-serif text-[11px] italic", cta: "Rezervuoti", pos: "object-[40%_center]" },
  interior: { mark: "Forma", markClass: "text-[10px] font-semibold", cta: "Projektai", pos: "object-[46%_center]" },
  shop: { mark: "Skalsa", markClass: "text-[10px] font-semibold", cta: "Apsipirkti", pos: "object-[24%_center]" },
};

function PhoneMock({ demo }: { demo: Demo }) {
  const c = phoneCopy[demo.variant];
  return (
    <div
      className="demo-phone absolute -bottom-8 right-5 hidden w-[22%] min-w-[96px] max-w-[136px] transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-y-1 lg:block"
      aria-hidden="true"
    >
      <div className="rounded-[20px] bg-[#101013] p-[5px] shadow-[var(--shadow-frame)]">
        <div className="relative aspect-[9/18.5] overflow-hidden rounded-[15px] bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={demo.image}
            alt=""
            className={cn("absolute inset-0 h-full w-full object-cover", c.pos)}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />
          {/* notch */}
          <span className="absolute left-1/2 top-[7px] h-[3px] w-8 -translate-x-1/2 rounded-full bg-black/90 ring-1 ring-white/10" />
          <div className="absolute inset-x-0 top-0 flex justify-center pt-4">
            <span className={cn("text-white", c.markClass)}>{c.mark}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 p-3">
            <span className="rounded-full bg-white px-3 py-1 text-[8px] font-medium text-black">
              {c.cta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoSite({
  demo,
  ratioClass = "aspect-[16/10]",
  phone = false,
  className,
}: {
  demo: Demo;
  ratioClass?: string;
  /** Show the overlapping mobile mock (desktop only). */
  phone?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("group relative", className)} aria-hidden="true">
      <div className="demo-browser overflow-hidden rounded-[14px] border border-border bg-surface shadow-[var(--shadow-frame)] transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-y-1">
        <Chrome url={demo.url} />
        <div className={cn("work-frame relative w-full overflow-hidden bg-black", ratioClass)}>
          {demo.variant === "architecture" && <Architecture demo={demo} />}
          {demo.variant === "restaurant" && <Restaurant demo={demo} />}
          {demo.variant === "interior" && <Interior demo={demo} />}
          {demo.variant === "shop" && <Shop demo={demo} />}
        </div>
      </div>
      {phone && <PhoneMock demo={demo} />}
    </div>
  );
}
