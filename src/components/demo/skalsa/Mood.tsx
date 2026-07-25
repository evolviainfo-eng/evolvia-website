export function Mood() {
  return (
    <section className="bg-[#F1EAE0]">
      <div className="mx-auto max-w-[1180px] px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
        <div data-rise className="max-w-[24ch]">
          <p
            className="text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.14] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-skalsa-display)", fontWeight: 500 }}
          >
            Viena žvakė vakarui — ne dekoras, o ženklas, kad diena baigėsi.
          </p>
        </div>

        <div
          data-rise
          style={{ "--i": 1, "--rise-y": "28px" } as React.CSSProperties}
          className="mt-[clamp(32px,4.5vw,56px)] grid gap-4 md:grid-cols-12 md:items-end"
        >
          <div className="min-w-0 overflow-hidden rounded-[10px] bg-[#FAF6F0] md:col-span-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-settle
              src="/demo/skalsa/mood-1.webp"
              alt="Žvakių eilė ant lygaus paviršiaus su atspindžiu"
              width={1400}
              height={1120}
              decoding="async"
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="min-w-0 overflow-hidden rounded-[10px] bg-[#FAF6F0] md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demo/skalsa/mood-2.webp"
              alt="Žvakių grupė tamsiame kambaryje"
              width={1400}
              height={1400}
              decoding="async"
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
