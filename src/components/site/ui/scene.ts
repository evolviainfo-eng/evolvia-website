"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Live UI panels ("scenes") in v6 all work the same way.

   1. The server-rendered DOM is the FINAL frame. JavaScript off, reduced
      motion, screenshots taken before hydration: all of them show the
      finished panel, never an empty one.
   2. A scene builds one paused GSAP timeline. Starting states are declared
      with `init(targets, vars)`, which applies them now and again at time 0
      of every loop. Everything after that animates TO the final state.
   3. The timeline plays once the panel is 22% into the viewport (or at once
      if it is already on screen), pauses off screen and in a hidden tab, and
      loops only when asked. Unmounting reverts every inline style. */

export type Q = (selector: string) => HTMLElement[];
export type Init = (targets: gsap.TweenTarget, vars: gsap.TweenVars) => void;
export type Build = (tl: gsap.core.Timeline, api: { q: Q; one: (selector: string) => HTMLElement | null; init: Init; root: HTMLElement }) => void;

export type SceneOptions = {
  /** Repeat forever (pausing off screen). Default false: play once and hold. */
  loop?: boolean;
  /** Pause between loops, seconds. */
  repeatDelay?: number;
  /** Seconds after entering view before the script starts. */
  delay?: number;
  /** ScrollTrigger start. Default "top 78%". */
  start?: string;
  /** Start on load instead of on scroll (hero). */
  onLoad?: boolean;
};

export function useScene(ref: RefObject<HTMLElement | null>, build: Build, opts: SceneOptions = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new URLSearchParams(window.location.search).has("qa")) return;
    gsap.registerPlugin(ScrollTrigger);

    let cleanupVis = () => {};
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        repeat: opts.loop ? -1 : 0,
        repeatDelay: opts.repeatDelay ?? 1.4,
        delay: opts.delay ?? 0.2,
      });
      const q: Q = (s) => Array.from(root.querySelectorAll<HTMLElement>(s));
      const one = (s: string) => root.querySelector<HTMLElement>(s);
      const init: Init = (targets, vars) => {
        gsap.set(targets, vars);
        tl.set(targets, vars, 0);
      };
      build(tl, { q, one, init, root });

      let active = false;
      const play = () => {
        active = true;
        if (!document.hidden) tl.play();
      };
      const pause = () => {
        active = false;
        if (opts.loop) tl.pause();
      };
      {
        ScrollTrigger.create({
          trigger: root,
          start: opts.start ?? "top 78%",
          end: "bottom top",
          onEnter: play,
          onEnterBack: play,
          onLeave: pause,
          onLeaveBack: () => {
            active = false;
            if (opts.loop) tl.pause();
          },
        });
        const r = root.getBoundingClientRect();
        if (opts.onLoad || (r.top < window.innerHeight * 0.78 && r.bottom > 0)) play();
      }
      const onVis = () => {
        if (document.hidden) tl.pause();
        else if (active) tl.play();
      };
      document.addEventListener("visibilitychange", onVis);
      cleanupVis = () => document.removeEventListener("visibilitychange", onVis);
    }, root);

    return () => {
      cleanupVis();
      ctx.revert();
    };
    // the scene is built once per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
