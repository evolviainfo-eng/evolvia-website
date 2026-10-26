"use client";

import { useEffect, useRef, useState } from "react";
import { AddToCart } from "./AddToCart";
import { Swap } from "./Swap";

export interface RowItem {
  id: string;
  name: string;
  scent: string;
  price: string;
  specs: string;
  img: string;
  w: number;
  h: number;
  alt: string;
}

/** The product row and its two text buttons.
 *
 *  The row is a native horizontal scroller with scroll snap, so it works
 *  with a finger, a trackpad and the keyboard (tabbing to an add button
 *  scrolls its candle into view) and without JS at all. JS only adds
 *  Prev / Next (shown under html.sk-js, from 1024 px; a phone swipes the
 *  row, the next candle peeking in at the edge): each moves the row by one
 *  candle and dims itself at the row's end. One passive scroll listener and one
 *  resize listener, both removed on unmount. Under reduced motion the row
 *  jumps instead of gliding. */
export function CatalogRow({
  title,
  label,
  prev,
  next,
  items,
}: {
  title: string;
  label: string;
  prev: string;
  next: string;
  items: RowItem[];
}) {
  const row = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };
    const onChange = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    onChange();
    el.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  const move = (dir: 1 | -1) => {
    const el = row.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({
      left: dir * (first.offsetWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const btn =
    "sk-nav inline-flex h-11 items-center px-2 underline-offset-[.3em] decoration-1 transition-opacity duration-150 enabled:hover:underline disabled:opacity-35";

  return (
    <>
      <div className="flex items-baseline justify-between gap-6 px-[30px] pb-[24px] lg:px-[60px] lg:pb-[28px]">
        <h2 data-rise className="sk-cap min-w-0 text-pretty">
          <Swap text={title} />
        </h2>
        <div className="sk-js-only -mr-2 hidden shrink-0 items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={atStart}
            aria-controls="sk-row"
            className={btn}
          >
            {prev}
          </button>
          <span aria-hidden="true" className="h-3 w-px bg-[rgba(90,42,30,0.25)]" />
          <button
            type="button"
            onClick={() => move(1)}
            disabled={atEnd}
            aria-controls="sk-row"
            className={btn}
          >
            {next}
          </button>
        </div>
      </div>

      <ul
        ref={row}
        id="sk-row"
        aria-label={label}
        className="sk-row flex snap-x snap-mandatory scroll-px-[30px] gap-3 overflow-x-auto px-[30px] lg:mx-[60px] lg:scroll-px-0 lg:gap-5 lg:px-0"
      >
        {items.map((p) => (
          <li
            key={p.id}
            className="group flex w-[78%] min-w-0 shrink-0 snap-start flex-col sm:w-[44%] md:w-[calc((100%-24px)/3)] lg:w-[calc((100%-60px)/4)]"
          >
            <div className="aspect-square overflow-hidden bg-[#ECE3DA]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.alt}
                width={p.w}
                height={p.h}
                decoding="async"
                loading="lazy"
                className="sk-zoom h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col pb-2 pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="min-w-0 text-[1rem] leading-[1.3] break-words">
                  {p.name}
                </h3>
                <span className="shrink-0 text-[1rem] leading-[1.3] tabular-nums">
                  {p.price}
                </span>
              </div>
              <p className="mt-1 text-[0.875rem] leading-[1.45] text-pretty text-[#7E5A50]">
                {p.scent}
              </p>
              <div className="mt-3 flex items-baseline justify-between gap-4 lg:mt-auto lg:pt-4">
                <span className="min-w-0 text-[0.875rem] tabular-nums text-[#7E5A50]">
                  {p.specs}
                </span>
                <AddToCart id={p.id} name={p.name} variant="quiet" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
