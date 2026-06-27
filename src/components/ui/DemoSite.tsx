import { cn } from "@/lib/cn";
import type { Demo } from "@/content/demos";

/* A demonstration website rendered inside a clean browser frame.
   Three distinct hero compositions so each reads as a different real site.
   The "screenshot" content uses fixed colours (it depicts a specific site);
   the frame itself is theme-aware. Photos are real, shown grayscale. */

function Chrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3.5 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full border border-border" />
      <span className="h-2.5 w-2.5 rounded-full border border-border" />
      <span className="h-2.5 w-2.5 rounded-full border border-border" />
      <div className="mx-auto flex h-5 w-1/2 max-w-[220px] items-center justify-center rounded-full border border-border bg-surface text-[9px] tracking-[0.04em] text-text-muted">
        {url}
      </div>
      <span className="h-2.5 w-2.5" />
    </div>
  );
}

const imgClass =
  "absolute inset-0 h-full w-full object-cover grayscale";

function Architecture({ demo }: { demo: Demo }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={demo.image} alt="" className={imgClass} loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/45 to-black/10" />
      <div className="absolute inset-0 flex flex-col p-5 text-white sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-[0.8rem] font-bold tracking-[0.22em]">KONSTRUKTA</span>
          <div className="hidden gap-5 text-[11px] text-white/75 md:flex">
            <span>Projektai</span>
            <span>Paslaugos</span>
            <span>Apie</span>
            <span>Kontaktai</span>
          </div>
        </div>
        <div className="mt-auto max-w-[16ch]">
          <h4 className="text-[1.9rem] font-bold leading-[1.04] tracking-[-0.02em] sm:text-[3rem]">
            Statome tai, kas išlieka.
          </h4>
          <span className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-[12px] font-medium text-black">
            Mūsų projektai
          </span>
        </div>
      </div>
    </>
  );
}

function Restaurant({ demo }: { demo: Demo }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={demo.image} alt="" className={imgClass} loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45" />
      <div className="absolute inset-0 flex flex-col p-5 text-white sm:p-6">
        <div className="flex items-center justify-between">
          <span className="font-serif text-[1.25rem] italic">Fumé</span>
          <div className="hidden gap-3 text-[10px] text-white/70 sm:flex">
            <span>Meniu</span>
            <span>Apie</span>
            <span>Rezervacija</span>
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-[9px] uppercase tracking-[0.22em] text-white/60">
            Vyno baras · Vilnius
          </p>
          <h4 className="mt-1.5 max-w-[13ch] font-serif text-[1.5rem] leading-[1.1] sm:text-[2rem]">
            Vakarienė, kurią prisimeni.
          </h4>
          <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-[11px] font-medium text-black">
            Rezervuoti staliuką
          </span>
        </div>
      </div>
    </>
  );
}

function Interior({ demo }: { demo: Demo }) {
  return (
    <div className="absolute inset-0 grid grid-cols-[1fr_0.9fr]">
      <div className="flex flex-col justify-between bg-white p-5 sm:p-7">
        <span className="text-[1.05rem] font-semibold tracking-[-0.02em] text-neutral-900">
          Forma
        </span>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Interjero studija
          </p>
          <h4 className="mt-2 text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.02em] text-neutral-900 sm:text-[1.7rem]">
            Namai, kurie kvėpuoja.
          </h4>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-900">
            Projektai
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={demo.image} alt="" className={imgClass} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

export function DemoSite({
  demo,
  ratioClass = "aspect-[16/10]",
  className,
}: {
  demo: Demo;
  ratioClass?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border border-border bg-surface shadow-[var(--shadow-frame)]",
        className,
      )}
      aria-hidden="true"
    >
      <Chrome url={demo.url} />
      <div className={cn("relative w-full overflow-hidden bg-black", ratioClass)}>
        {demo.variant === "architecture" && <Architecture demo={demo} />}
        {demo.variant === "restaurant" && <Restaurant demo={demo} />}
        {demo.variant === "interior" && <Interior demo={demo} />}
      </div>
    </div>
  );
}
