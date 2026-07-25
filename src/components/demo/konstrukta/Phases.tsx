"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BAND, CONTAINER, SectionHead } from "./ui";

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

export function Phases() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.transform = "scaleY(1)";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 74%",
            end: "bottom 78%",
            scrub: true,
          },
        },
      );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="eiga"
      className="border-t border-white/[0.11]"
    >
      <div className="border-b border-white/[0.11]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/demo/konstrukta/aerial.webp"
          width={1400}
          height={1050}
          alt="Statybos aikštelė iš viršaus: paklota armatūra prieš betonavimą"
          decoding="async"
          loading="lazy"
          className="h-[clamp(200px,30vw,400px)] w-full object-cover"
        />
      </div>

      <div className={`${CONTAINER} ${BAND}`}>
        <SectionHead
          index="04"
          label="Kaip dirbame"
          title="Penki etapai su datomis, ne su pažadais."
          lead="Trukmės nurodytos vidutiniam 180–220 m² objektui. Į sutartį įrašomos konkrečios jūsų objekto datos, o kiekvieno etapo pabaiga fiksuojama aktu."
        />

        <div ref={scopeRef} className="relative mt-[clamp(40px,6vw,72px)] pl-6 sm:pl-9">
          <span
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.14]"
          />
          <span
            ref={lineRef}
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[#E8B14C]"
            style={{ transform: "scaleY(0)" }}
          />

          <ol
            data-rise
            className="border-t border-white/[0.11]"
          >
            {PHASES.map((p) => (
              <li
                key={p.no}
                className="grid gap-x-8 gap-y-3 border-b border-white/[0.11] py-7 md:grid-cols-[48px_minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-baseline md:py-8"
              >
                <span className="knst-mono text-[0.7rem] tracking-[0.18em] text-[#9A9791]">
                  {p.no}
                </span>
                <h3 className="min-w-0 text-[1.08rem] font-semibold leading-tight tracking-[-0.015em] text-[#E7E5E1] md:text-[1.15rem]">
                  {p.title}
                </h3>
                <p className="min-w-0 text-[0.93rem] leading-[1.6] text-[#9A9791]">
                  {p.body}
                </p>
                <span className="knst-mono shrink-0 whitespace-nowrap text-[0.72rem] uppercase tracking-[0.1em] text-[#E7E5E1] md:text-right">
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
