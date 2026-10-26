"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useScene, type Build } from "@/components/site/ui/scene";
import { Window, Status, Toggle, Lock } from "@/components/site/ui/Primitives";
import { Envelope } from "./glyphs";
import { useLocale } from "@/i18n/LocaleProvider";
import { hero, type HeroCopy } from "../../copy/hero";
import s from "../Hero.module.css";

/* "Kelias iki svetainės": a two-column window that plays Evolvia's four
   real steps. The STEP is the subject. LEFT a rail with the four steps
   numbered 1 to 4 and the price; RIGHT one view at a time: the step number
   and name as the title, one plain sentence that says what the visitor
   does at that point, and the step's object. Nothing else.

   Server render = the final frame: view 2 approved ("Patvirtinta"), steps 1
   and 2 done, step 3 in progress. The scene then loops (about 26 s, each
   view held at least 6 s so it can be read):
   1 an enquiry email is typed and sent, 2 the live draft loads, scrolls and
   is approved, 3 six launch rows stream in and the address bar padlock
   lights up, 4 the maintenance services switch on over a one-year bar.

   Which view shows and which step is active are two attributes on the root
   (data-view, data-step); CSS crossfades everything that hangs off them
   (0.5 s, the incoming object rises 12 px, no blur), so the timeline only
   flips attributes, types characters and moves a few values. Every tween
   here is opacity or position, 0.4 to 0.6 s. */

type StepT = HeroCopy["win"]["steps"][number];

/** Final-frame circle per step: 1 and 2 done, 3 in progress, 4 waiting. */
const SSR_STATE = ["done", "done", "half", "pending"] as const;

/** Spinner time per launch row; rows appear 0.42 s apart, the slow ones
 *  (domain, SSL) overlap the next row the way real checks do. */
const SPIN = [0.3, 0.3, 0.62, 0.48, 0.36, 0.42];
/** How far the live draft scrolls, percent of the screenshot height. */
const SCROLL = 30;
/** The house ease for state changes inside the window. */
const EASE_UI = "0.22,0.61,0.36,1";

/** A step circle: the Status ring, half or filled tick, with the step
 *  number inside it until the step is done. */
function StepCircle({ n, state }: { n: number; state: (typeof SSR_STATE)[number] }) {
  return (
    <span className={s.circ}>
      <Status state={state} />
      <span className={`${s.num} tnum`}>{n}</span>
    </span>
  );
}

function ViewHead({ step }: { step: StepT }) {
  return (
    <div className={s.vhead}>
      <p className={s.vtitle}>
        <span className="tnum">{step.n}.</span> {step.label}
      </p>
      <p className={s.vdesc}>{step.desc}</p>
    </div>
  );
}

function Swap({ a, b, className = "" }: { a: ReactNode; b: ReactNode; className?: string }) {
  return (
    <span className={`${s.swap} ${className}`}>
      <span className={s.sa}>{a}</span>
      <span className={s.sb}>{b}</span>
    </span>
  );
}

const build: Build = (tl, { q, one, init, root }) => {
  gsap.registerPlugin(CustomEase);
  const E = {
    ui: CustomEase.create("v7hUi", EASE_UI),
    move: CustomEase.create("v7hMove", "0.65,0,0.35,1"),
  };

  /* Everything that is an attribute or DOM change goes back to its start
     through `resets`: applied now, at time 0 of every loop, and once more
     while the pane is empty at the end of a loop. */
  const resets: Array<() => void> = [];
  const call = (t: number, fn: () => void) => {
    tl.call(fn, [], t);
  };
  const setStatus = (els: (Element | null)[], v: string) => els.forEach((e) => e?.setAttribute("data-status", v));
  const statusOf = (n: number) => q(`[data-st="${n}"] .status`);
  const go = (t: number, n: number) =>
    call(t, () => {
      root.setAttribute("data-view", String(n));
      root.setAttribute("data-step", String(n));
      if (n) setStatus(statusOf(n), "half");
    });
  const stepDone = (t: number, n: number) => call(t, () => setStatus(statusOf(n), "done"));
  const ok = (el: Element | null, t: number) => {
    if (!el) return;
    resets.push(() => el.removeAttribute("data-ok"));
    call(t, () => el.setAttribute("data-ok", ""));
  };
  /* A button gets its focus ring and a 1 px press: position only. */
  const press = (el: HTMLElement | null, at: number) => {
    if (!el) return;
    init(el, { y: 0 });
    resets.push(() => el.removeAttribute("data-focus"));
    call(at, () => el.setAttribute("data-focus", ""));
    tl.to(el, { y: 1, duration: 0.1, ease: E.ui }, at + 0.3);
    tl.to(el, { y: 0, duration: 0.16, ease: E.ui }, at + 0.4);
    call(at + 0.62, () => el.removeAttribute("data-focus"));
  };
  resets.push(() => {
    root.setAttribute("data-view", "0");
    root.setAttribute("data-step", "0");
    root.removeAttribute("data-live");
    for (let n = 1; n <= 4; n++) setStatus(statusOf(n), "pending");
  });

  /* One caret travels through every typed field. It has zero net width,
     and hidden characters keep their space, so nothing reflows. */
  const caret = document.createElement("span");
  caret.className = s.caret;
  caret.setAttribute("aria-hidden", "true");
  resets.push(() => caret.remove());
  const chars = (el: HTMLElement) => {
    if (!el.dataset.chars) {
      const text = el.textContent || "";
      el.textContent = "";
      for (const ch of Array.from(text)) {
        const sp = document.createElement("span");
        sp.className = s.ch;
        sp.textContent = ch;
        el.appendChild(sp);
      }
      el.dataset.chars = "1";
    }
    return (Array.from(el.children) as HTMLElement[]).filter((c) => c.classList.contains(s.ch));
  };
  const type = (el: HTMLElement | null, at: number, cps: number) => {
    if (!el) return at;
    const cs = chars(el);
    init(cs, { visibility: "hidden" });
    call(at, () => el.prepend(caret));
    let t = at + 0.12;
    cs.forEach((c, i) => {
      tl.set(c, { visibility: "visible" }, t);
      call(t, () => c.after(caret));
      const ch = c.textContent;
      t += 1 / cps + (ch === "," || ch === "." ? 0.16 : 0) + (((i * 37) % 17) - 8) / 1000;
    });
    return t;
  };

  /* 1 · Užklausa el. paštu (0 to about 7.4 s) */
  go(0.05, 1);
  const pop = one("[data-pop]");
  let t = type(one('[data-type="subj"]'), 1.0, 30);
  t = type(one('[data-type="a"]'), t + 0.3, 40);
  if (pop) {
    init(pop, { opacity: 0, y: 4 });
    call(t + 0.04, () => pop.after(caret));
    tl.to(pop, { opacity: 1, y: 0, duration: 0.4, ease: E.ui }, t + 0.04);
  }
  t = type(one('[data-type="b"]'), t + 0.3, 44);
  call(t + 0.35, () => caret.remove());
  const tp = t + 0.25;
  press(one("[data-send]"), tp);
  ok(one("[data-mail]"), tp + 0.5);
  stepDone(tp + 0.62, 1);

  /* 2 · Gyvas eskizas (6.2 s) */
  const T2 = tp + 2.2;
  go(T2, 2);
  const shot = one("[data-shot]");
  const thumb = one("[data-thumb]");
  init(one("[data-skel]"), { opacity: 1 });
  init(shot, { opacity: 0, y: 0, yPercent: 0 });
  init(thumb, { y: 0, yPercent: 0 });
  tl.to(one("[data-skel]"), { opacity: 0, duration: 0.4, ease: E.ui }, T2 + 0.8);
  tl.to(shot, { opacity: 1, duration: 0.6, ease: E.ui }, T2 + 0.75);
  tl.to(shot, { yPercent: -SCROLL, duration: 2.6, ease: E.move }, T2 + 1.4);
  tl.to(thumb, { yPercent: 110, duration: 2.6, ease: E.move }, T2 + 1.4);
  const approve = one("[data-approve]");
  press(approve, T2 + 4.2);
  ok(approve, T2 + 4.62);
  stepDone(T2 + 4.75, 2);

  /* 3 · Apmokėjimas ir paleidimas (6.0 s) */
  const T3 = T2 + 6.2;
  go(T3, 3);
  const rows = q("[data-row]");
  init(rows, { opacity: 0, y: 4 });
  resets.push(() => {
    rows.forEach((r) => {
      r.removeAttribute("data-done");
      r.querySelector("[data-l]")?.classList.remove("shimmer");
      r.querySelector(".status")?.setAttribute("data-status", "pending");
    });
  });
  let last = T3;
  rows.forEach((row, i) => {
    const at = T3 + 0.7 + i * 0.42;
    const st = row.querySelector(".status");
    const lbl = row.querySelector("[data-l]");
    const meta = row.querySelector("[data-m]");
    tl.to(row, { opacity: 1, y: 0, duration: 0.4, ease: E.ui }, at);
    call(at + 0.06, () => {
      st?.setAttribute("data-status", "active");
      lbl?.classList.add("shimmer");
    });
    const done = at + 0.06 + SPIN[i % SPIN.length];
    call(done, () => {
      st?.setAttribute("data-status", "done");
      lbl?.classList.remove("shimmer");
      row.setAttribute("data-done", "");
    });
    if (meta) {
      init(meta, { opacity: 0, y: 2 });
      tl.to(meta, { opacity: 1, y: 0, duration: 0.4, ease: E.ui }, done);
    }
    last = Math.max(last, done);
  });
  call(last + 0.1, () => root.setAttribute("data-live", ""));
  stepDone(last + 0.2, 3);

  /* 4 · Priežiūra (6.0 s) */
  const T4 = T3 + 6.0;
  go(T4, 4);
  const svcs = q("[data-svc]");
  resets.push(() =>
    svcs.forEach((r) => {
      r.removeAttribute("data-ok");
      r.querySelector(".toggle")?.removeAttribute("data-on");
    }),
  );
  let tv = T4 + 0.7;
  svcs.forEach((r) => {
    const tg = r.querySelector(".toggle");
    call(tv, () => tg?.setAttribute("data-on", ""));
    call(tv + 0.16, () => r.setAttribute("data-ok", ""));
    tv += 0.32;
  });
  const p1 = one("[data-tl1]");
  init(p1, { scaleX: 0 });
  init([one("[data-tl2]"), one("[data-tll1]"), one("[data-tll2]"), one("[data-file]")].filter(Boolean), { opacity: 0, y: 4 });
  tl.to(p1, { scaleX: 1, duration: 0.6, ease: E.move }, tv);
  tl.to(one("[data-tll1]"), { opacity: 1, y: 0, duration: 0.4, ease: E.ui }, tv + 0.2);
  tl.to(one("[data-tl2]"), { opacity: 1, y: 0, duration: 0.4, ease: E.ui }, tv + 0.5);
  tl.to(one("[data-tll2]"), { opacity: 1, y: 0, duration: 0.4, ease: E.ui }, tv + 0.6);
  tl.to(one("[data-file]"), { opacity: 1, y: 0, duration: 0.5, ease: E.ui }, tv + 1.0);
  stepDone(tv + 1.7, 4);

  /* End of loop: the pane empties, the rail unticks, all resets run
     while nothing is visible, and time 0 brings view 1 back in. */
  const END = T4 + 6.0;
  go(END, 0);
  const reset = () => resets.forEach((f) => f());
  call(END + 0.55, reset);
  tl.set({}, {}, END + 0.8);
  reset();
  call(0, reset);
};

export function HeroWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const w = hero[useLocale()].win;
  const STEPS = w.steps;
  useScene(ref, build, { loop: true, repeatDelay: 0, delay: 0.75, start: "top bottom" });

  return (
    <div ref={ref} className={s.shell} data-view="2" data-step="3" data-hi-win="">
      <div aria-hidden="true">
        <Window className={s.win} address={<span className={`chip chip-dash ${s.addrChip}`}>{w.address}</span>}>
          <div className={s.wbody}>
            {/* Rail: title, the four steps, the price */}
            <aside className={s.rail}>
              <p className={s.railTitle}>{w.railTitle}</p>
              <div className={s.steps}>
                <span className={s.hl} />
                {STEPS.map((st, i) => (
                  <div key={st.n} className={s.stepRow} data-st={st.n}>
                    <StepCircle n={st.n} state={SSR_STATE[i]} />
                    <span className={s.stepLbl}>{st.label}</span>
                  </div>
                ))}
              </div>
              <div className={s.railPrice}>
                <p className={s.price}>{w.price}</p>
                <p className={s.priceNote}>{w.priceNote}</p>
              </div>
            </aside>

            {/* Phone: the steps as a strip of chips */}
            <div className={s.strip}>
              {STEPS.map((st, i) => (
                <span key={st.n} className={s.schip} data-st={st.n}>
                  <StepCircle n={st.n} state={SSR_STATE[i]} />
                  <span className={s.slbl}>{st.short}</span>
                </span>
              ))}
            </div>

            {/* Pane: one view at a time */}
            <div className={s.views}>
              {/* 1 */}
              <div className={s.view} data-v="1">
                <ViewHead step={STEPS[0]} />
                <div className={s.obj}>
                  <div className={s.mail} data-mail="" data-ok="">
                    <div className={s.mhd}>
                      <Swap
                        a={
                          <>
                            <Envelope />
                            {w.mail.fresh}
                          </>
                        }
                        b={
                          <>
                            <Status state="done" />
                            {w.mail.sent} <span className={s.dot}>·</span> <span className="mono">info@evolvia.lt</span>
                          </>
                        }
                      />
                    </div>
                    <div className={s.mbody}>
                      <div className={s.mbodyIn}>
                        <div className={s.field}>
                          <span className={s.fl}>{w.mail.to}</span>
                          <span className="chip chip-mono">info@evolvia.lt</span>
                        </div>
                        <div className={s.field}>
                          <span className={s.fl}>{w.mail.subjectLabel}</span>
                          <span className={s.fv} data-type="subj">
                            {w.mail.subject}
                          </span>
                        </div>
                        <p className={s.mtext}>
                          <span data-type="a">{w.mail.a}</span>
                          <span className={`chip chip-dash ${s.inlineChip}`} data-pop="">
                            {w.mail.chip}
                          </span>
                          <span data-type="b">{w.mail.b}</span>
                        </p>
                        <div className={s.mfoot}>
                          <span className={`ui-btn ${s.ub}`} data-send="">
                            {w.mail.send}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 */}
              <div className={s.view} data-v="2">
                <ViewHead step={STEPS[1]} />
                <div className={s.obj}>
                  <div className={s.live}>
                    <div className={s.browser}>
                      <div className={s.bbar}>
                        <Lock />
                        <span className={`mono ${s.burl}`}>{w.live.url}</span>
                        <span className="chip chip-xs">{w.live.tag}</span>
                      </div>
                      <div className={s.vp}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={s.shot}
                          data-shot=""
                          src={w.live.src}
                          width={1200}
                          height={2182}
                          alt={w.live.alt}
                          loading="eager"
                          decoding="async"
                        />
                        <div className={s.skel} data-skel="">
                          <i className={s.sk1} />
                          <i className={s.sk2} />
                          <i className={s.sk3} />
                          <i className={s.sk4} />
                        </div>
                        <span className={s.thumb} data-thumb="" />
                      </div>
                    </div>
                    <div className={s.v2foot}>
                      <p className={s.cap}>{w.live.cap}</p>
                      <span className={s.v2btns}>
                        <span className={`ui-btn ui-btn-ghost ${s.ub}`}>{w.live.comment}</span>
                        <span className={`ui-btn ${s.ub} ${s.approve}`} data-approve="" data-ok="">
                          <Swap
                            a={w.live.approve}
                            b={
                              <>
                                <Status state="done" />
                                {w.live.approved}
                              </>
                            }
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 */}
              <div className={s.view} data-v="3">
                <ViewHead step={STEPS[2]} />
                <div className={s.obj}>
                  <div className={s.list}>
                    {w.launch.map((r) => (
                      <div key={r.l} className={s.row} data-row="" data-done="">
                        <Status state="done" />
                        <span className={s.rl}>
                          <span data-l="">{r.l}</span>
                          {r.chip ? <span className={`chip chip-dash ${s.rowChip}`}>{r.chip}</span> : null}
                          {r.m ? (
                            <span className={`${s.rm} tnum`} data-m="">
                              {r.chip ? null : <span className={s.dot}>·</span>}
                              {r.m}
                            </span>
                          ) : null}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4 */}
              <div className={s.view} data-v="4">
                <ViewHead step={STEPS[3]} />
                <div className={s.obj}>
                  <div className={s.list}>
                    {w.care.map((c) => (
                      <div key={c} className={`${s.row} ${s.svc}`} data-svc="" data-ok="">
                        <span className={s.svcL}>{c}</span>
                        <Swap className={s.badge} a={<span className="chip">{w.preparing}</span>} b={<span className="chip">{w.included}</span>} />
                        <Toggle on />
                      </div>
                    ))}
                    <div className={s.tline}>
                      <div className={s.tlBar}>
                        <span className={s.tl1} data-tl1="" />
                        <span className={s.tl2} data-tl2="" />
                      </div>
                      <div className={s.tlLbls}>
                        <span data-tll1="">{w.year1}</span>
                        <span data-tll2="">{w.later}</span>
                      </div>
                    </div>
                    <div className={`${s.row} ${s.file}`} data-file="">
                      <span className={s.svcL}>{w.files}</span>
                      <span className={s.dot}>·</span>
                      <span className={s.fileV}>{w.filesValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
}
