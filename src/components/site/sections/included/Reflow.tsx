"use client";

import { useRef, type CSSProperties } from "react";
import { useScene } from "@/components/site/ui/scene";
import s from "../Included.module.css";

/* Cell 1: a page reflowing from desktop to tablet to phone, in a
   design-tool canvas (frame 560 x 240). A breakpoint bar (1440 / 768 / 390) slides its pill,
   the frame narrows to the true width ratio, and every part of the
   wireframe glides to its place for that screen. Each part carries its box
   for all three states as CSS variables, so one data-state change lets CSS
   do the move. Loops while on screen. Without motion (JavaScript off,
   reduced motion, ?qa) the three states stand side by side instead. */

type St = "w" | "t" | "p";
/** x (% of frame width), y (px of a 184-unit frame, drawn at 240), w (%), h (px), opacity */
type Box = readonly [number, number, number, number, number?];
type Part = { cls: string; img?: boolean; w: Box; t: Box; p: Box };

const H = 184;
const STATES: St[] = ["w", "t", "p"];
const TOKEN: Record<St, string> = { w: "1440", t: "768", p: "390" };

const PARTS: Part[] = [
  { cls: s.pLogo, w: [6, 12, 11, 5], t: [7, 12, 18, 5], p: [9, 12, 26, 5] },
  // nav links; on the phone they fold into the three lines of a menu
  { cls: s.pNav, w: [66, 13, 7, 3], t: [59, 13, 9, 3], p: [74, 11, 16, 1.5] },
  { cls: s.pNav, w: [76.5, 13, 7, 3], t: [71, 13, 9, 3], p: [74, 14.5, 16, 1.5] },
  { cls: s.pNav, w: [87, 13, 7, 3], t: [83, 13, 9, 3], p: [74, 18, 16, 1.5] },
  { cls: s.pRule, w: [0, 29, 100, 1], t: [0, 29, 100, 1], p: [0, 29, 100, 1] },
  // headline: two lines, three on the phone
  { cls: s.pH1, w: [6, 46, 40, 8], t: [7, 44, 72, 8], p: [9, 42, 82, 7] },
  { cls: s.pH1, w: [6, 59, 29, 8], t: [7, 57, 50, 8], p: [9, 53, 74, 7] },
  { cls: s.pH1, w: [35, 59, 0, 8, 0], t: [57, 57, 0, 8, 0], p: [9, 64, 46, 7] },
  { cls: s.pText, w: [6, 78, 38, 4], t: [7, 74, 82, 4], p: [9, 79, 82, 3.5] },
  { cls: s.pText, w: [6, 87, 34, 4], t: [7, 82, 70, 4], p: [9, 86, 76, 3.5] },
  { cls: s.pText, w: [6, 96, 24, 4], t: [7, 90, 46, 4], p: [9, 93, 52, 3.5] },
  { cls: s.pBtn, w: [6, 112, 15, 11], t: [7, 103, 24, 11], p: [9, 105, 82, 13] },
  { cls: s.pImg, img: true, w: [52, 42, 42, 110], t: [7, 124, 86, 48], p: [9, 128, 82, 44] },
];

const pct = (n: number) => `${+n.toFixed(3)}%`;

function partStyle(part: Part): CSSProperties {
  const v: Record<string, string | number> = {};
  for (const k of STATES) {
    const [x, y, w, h, o = 1] = part[k];
    v[`--${k}x`] = pct(x);
    v[`--${k}y`] = pct((y / H) * 100);
    v[`--${k}w`] = pct(w);
    v[`--${k}h`] = pct((h / H) * 100);
    v[`--${k}o`] = o;
  }
  return v as CSSProperties;
}

function Wire({ state, live }: { state: St; live?: boolean }) {
  return (
    <div className={s.frame} data-state={state} data-frame={live ? "" : undefined}>
      {PARTS.map((part, i) => (
        <span key={i} className={`${s.part} ${part.cls}`} style={partStyle(part)}>
          {part.img ? (
            <svg className={s.imgGlyph} viewBox="0 0 16 12">
              <circle cx="11.5" cy="3.5" r="1.5" />
              <path d="M1 11 L5.5 6 L9 9.5 L11 7.5 L15 11" />
            </svg>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/** Small drawn device glyphs for the breakpoint bar. */
function Device({ k }: { k: St }) {
  return (
    <svg className={s.dev} viewBox="0 0 14 12">
      {k === "w" ? (
        <>
          <rect x="1" y="1.5" width="12" height="7.5" rx="1.2" />
          <path d="M5 11 H9" />
        </>
      ) : k === "t" ? (
        <rect x="3" y="1" width="8" height="10" rx="1.4" />
      ) : (
        <rect x="4.75" y="1" width="4.5" height="10" rx="1.2" />
      )}
    </svg>
  );
}

export function Reflow() {
  const ref = useRef<HTMLDivElement>(null);

  useScene(
    ref,
    (tl, { one, init }) => {
      const tri = one("[data-tri]");
      const morph = one("[data-morph]");
      const frame = one("[data-frame]");
      const wrap = one("[data-wrap]");
      const bp = one("[data-bp]");
      if (!tri || !morph || !frame || !wrap || !bp) return;

      init(tri, { display: "none" });
      init(morph, { display: "grid" });

      const go = (st: St) => {
        frame.dataset.state = st;
        wrap.dataset.state = st;
        bp.dataset.state = st;
      };
      go("w");
      const at = (t: number, st: St) => {
        tl.call(go, [st], t);
        // the resize handles brighten while the frame moves
        tl.call(() => wrap.setAttribute("data-moving", ""), [], t);
        tl.call(() => wrap.removeAttribute("data-moving"), [], t + 0.5);
      };
      // 2.4 s per state: a hold, then the 0.45 s reflow runs in CSS.
      tl.call(go, ["w"], 0);
      at(1.4, "t");
      at(3.8, "p");
      at(6.2, "w");
      tl.to({}, { duration: 7.6 }, 0);
    },
    { loop: true, repeatDelay: 0, delay: 0.5 },
  );

  return (
    <div ref={ref} className={s.reflow} aria-hidden="true">
      <div className={s.tri} data-tri>
        {STATES.map((st) => (
          <div key={st} className={s.triItem} data-k={st}>
            <Wire state={st} />
            <span className={s.triTok}>{TOKEN[st]}</span>
          </div>
        ))}
      </div>

      <div className={s.morph} data-morph>
        <div className={s.bp} data-bp data-state="w">
          <i className={s.bpPill} />
          {STATES.map((st) => (
            <span key={st} className={s.bpSeg} data-k={st}>
              <Device k={st} />
              {TOKEN[st]}
            </span>
          ))}
        </div>
        <div className={s.canvas}>
          <div className={s.frameBox}>
            <div className={s.frameWrap} data-wrap data-state="w">
              <i className={s.handle} data-side="l" />
              <i className={s.handle} data-side="r" />
              <Wire state="w" live />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
