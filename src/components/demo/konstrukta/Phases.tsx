"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BAND, CONTAINER, SectionHead, T_BODY, T_MICRO } from "./ui";

const PHASES = [
  {
    no: "01",
    title: "Apžiūra ir sąmata",
    body: "Atvažiuojame į sklypą, matuojame, klausiame apie biudžetą atvirai. Grįžtame su sąmata, kurioje matosi kiekviena eilutė — ne viena suma apačioje.",
    time: "1–2 sav.",
  },
  {
    no: "02",
    title: "Projektas ir leidimai",
    body: "Techninis projektas, derinimai su tinklais, statybą leidžiantis dokumentas. Popierius tvarkome patys — užsakovui lieka tik pasirašyti.",
    time: "4–8 sav.",
  },
  {
    no: "03",
    title: "Pamatai ir konstrukcijos",
    body: "Iškasos, pamatai, sienos, perdangos. Nuo šio etapo aikštelėje dirbama kasdien, o kas penktadienį gaunate nuotraukas ir savaitės ataskaitą.",
    time: "6–12 sav.",
  },
  {
    no: "04",
    title: "Stogas, fasadas, inžinerija",
    body: "Uždaromas kontūras, tada elektra, santechnika, vėdinimas. Objektas paruošiamas apdailai dar iki šalčių — grafikas tam ir daromas.",
    time: "8–14 sav.",
  },
  {
    no: "05",
    title: "Apdaila ir perdavimas",
    body: "Vidaus apdaila, sutvarkyta aplinka, statybos užbaigimo aktas, raktai ir aplankas su visomis medžiagų deklaracijomis.",
    time: "6–10 sav.",
  },
];

const HEAD = 7; // px — the travelling marker's edge

export function Phases() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);

  /* The page's one scroll moment: the schedule draws itself. A marker walks
     the rail while the amber trail fills in behind it — the same thing a
     build programme does on paper, at the speed the visitor reads. Nothing
     is pinned and nothing is hidden, so 1366×768 and reduced motion both
     get the finished state rather than a broken one. */
  useEffect(() => {
    const scope = scopeRef.current;
    const fill = fillRef.current;
    const head = headRef.current;
    if (!scope || !fill || !head) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transform = "scaleY(1)";
      head.style.top = `calc(100% - ${HEAD}px)`;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 74%",
          end: "bottom 78%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0).fromTo(
        head,
        { y: 0 },
        { y: () => scope.clientHeight - HEAD, ease: "none" },
        0,
      );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="eiga" className="border-t border-white/[0.11]">
      <div className="border-b border-white/[0.11]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/demo/konstrukta/aerial.webp"
          width={1400}
          height={1050}
          alt="Statybos aikštelė iš viršaus: paklota armatūra prieš betonavimą"
          decoding="async"
          loading="lazy"
          className="h-[clamp(200px,30vw,400px)] w-full object-cover object-center"
        />
      </div>

      <div className={`${CONTAINER} ${BAND}`}>
        <SectionHead
          index="04"
          label="Kaip dirbame"
          title="Penki etapai su datomis, ne su pažadais."
          lead="Trukmės nurodytos vidutiniam 180–220 m² objektui. Į sutartį įrašomos konkrečios jūsų objekto datos, o kiekvieno etapo pabaiga fiksuojama aktu."
        />

        <div
          ref={scopeRef}
          className="relative mt-[clamp(40px,6vw,72px)] pl-6 sm:pl-9"
        >
          <span
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.14]"
          />
          <span
            ref={fillRef}
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[#E8B14C]"
            style={{ transform: "scaleY(0)" }}
          />
          <span
            ref={headRef}
            aria-hidden
            className="absolute left-[-3px] top-0 block bg-[#E8B14C]"
            style={{ width: HEAD, height: HEAD }}
          />

          <ol data-rise className="border-t border-white/[0.11]">
            {PHASES.map((p) => (
              <li
                key={p.no}
                className="grid gap-x-8 gap-y-3 border-b border-white/[0.11] py-7 md:grid-cols-[48px_minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-baseline md:py-8"
              >
                <span className={`${T_MICRO} tracking-[0.2em] text-[#9A9791]`}>
                  {p.no}
                </span>
                <h3 className="min-w-0 text-balance text-[1.0625rem] font-semibold leading-[1.22] tracking-[-0.015em] text-[#E7E5E1] md:text-[1.0625rem]">
                  {p.title}
                </h3>
                <p className={`min-w-0 text-pretty ${T_BODY} text-[#9A9791]`}>
                  {p.body}
                </p>
                <span
                  className={`${T_MICRO} shrink-0 whitespace-nowrap tracking-[0.12em] text-[#E7E5E1] md:text-right`}
                >
                  {p.time}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
