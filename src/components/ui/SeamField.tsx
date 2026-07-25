"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   SeamField — the signature.

   One website layout, drawn twice. Ahead of a slow vertical seam it is a
   hairline wireframe with its twelve column guides showing; behind the seam
   the same geometry has filled with tone and the guides are gone. The seam
   takes about half a minute to cross, and alternate passes reverse polarity —
   build, then re-draft — so the loop never snaps back.

   It depicts the studio's actual job rather than decorating around it: unbuilt
   on one side, built on the other. An earlier attempt used domain-warped noise
   and was rejected for exactly the right reason — an abstract cloud is just a
   weird background, it says nothing about the work.

   The pointer is an aperture, not a glow: inside it the unbuilt side previews
   as rendered, so moving the mouse finishes the page locally.

   Why raw GL and not three.js: this site sells "greita ir matoma Google".
   Shipping 150 KB of library for one background would contradict its own
   pitch. The whole effect is one quad, one shader, no dependency.

   It never runs unless it earns the frames: not under reduced motion, not off
   screen, not on a hidden tab, not without WebGL2. In every one of those cases
   the CSS gradient underneath is what the visitor sees, and it is designed to
   stand on its own.
   ───────────────────────────────────────────────────────────── */

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 o;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;
uniform float uPointerAmt;
uniform float uProgress;

/* ------------------------------------------------------------------
   RIBA — the seam where a wireframe becomes a rendered page.
   One layout, drawn twice: hairlines ahead of the seam, tone behind it.
   Coordinates: q = (uv.x, 1.0 - uv.y), so q.y = 0 is the top of the page.
   ------------------------------------------------------------------ */

const float ML = 0.075;   /* page margins */
const float MR = 0.925;

/* x0, y0, x1, y1 — one page layout, top to bottom */
const vec4 R[18] = vec4[18](
  vec4(0.075, 0.055, 0.165, 0.092),   /* 0  logo mark          */
  vec4(0.640, 0.062, 0.712, 0.086),   /* 1  nav item           */
  vec4(0.728, 0.062, 0.800, 0.086),   /* 2  nav item           */
  vec4(0.816, 0.056, 0.925, 0.092),   /* 3  nav cta            */
  vec4(0.075, 0.135, 0.925, 0.470),   /* 4  hero section frame */
  vec4(0.105, 0.200, 0.455, 0.232),   /* 5  headline line 1    */
  vec4(0.105, 0.244, 0.395, 0.276),   /* 6  headline line 2    */
  vec4(0.105, 0.312, 0.430, 0.324),   /* 7  standfirst 1       */
  vec4(0.105, 0.334, 0.375, 0.346),   /* 8  standfirst 2       */
  vec4(0.105, 0.382, 0.245, 0.422),   /* 9  button             */
  vec4(0.500, 0.165, 0.895, 0.440),   /* 10 hero media box     */
  vec4(0.075, 0.520, 0.480, 0.700),   /* 11 text column A      */
  vec4(0.520, 0.520, 0.925, 0.700),   /* 12 text column B      */
  vec4(0.075, 0.745, 0.274, 0.905),   /* 13 card 1             */
  vec4(0.292, 0.745, 0.491, 0.905),   /* 14 card 2             */
  vec4(0.509, 0.745, 0.708, 0.905),   /* 15 card 3             */
  vec4(0.726, 0.745, 0.925, 0.905),   /* 16 card 4             */
  vec4(0.075, 0.945, 0.925, 0.962)    /* 17 footer band        */
);

/* rendered-side tone of each block (they layer additively) */
const float TONE[18] = float[18](
  0.070, 0.042, 0.042, 0.085,
  0.018,
  0.082, 0.082, 0.048, 0.048, 0.090,
  0.070,
  0.030, 0.030,
  0.045, 0.045, 0.045, 0.045,
  0.026
);

/* signed distance to a rectangle, measured in PIXELS on each axis,
   so hairlines stay exactly one pixel wide at any aspect / resolution */
float rectPix(vec2 q, vec4 r, vec2 pxs) {
  vec2 c = 0.5 * (r.xy + r.zw);
  vec2 h = 0.5 * (r.zw - r.xy);
  vec2 d = (abs(q - c) - h) / pxs;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

/* distance in pixels to a horizontal segment y = yy, x in [x0, x1] */
float segPix(vec2 q, float x0, float x1, float yy, vec2 pxs) {
  float dx = max(max(x0 - q.x, q.x - x1), 0.0) / pxs.x;
  float dy = (q.y - yy) / pxs.y;
  return length(vec2(dx, dy));
}

/* distance in pixels to a corner-to-corner diagonal of rect r */
float diagPix(vec2 q, vec4 r, float sgn, vec2 pxs) {
  vec2 s = max(r.zw - r.xy, vec2(1e-4));
  vec2 l = (q - r.xy) / s;
  float f = (sgn > 0.0) ? (l.y - l.x) : (l.y + l.x - 1.0);
  vec2 g = pxs / s;
  return abs(f) / max(length(g), 1e-6);
}

float hair(float dpix) { return 1.0 - smoothstep(0.0, 1.0, dpix); }

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2  uv  = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2  q   = vec2(uv.x, 1.0 - uv.y);
  vec2  pxs = max(fwidth(q), vec2(1e-6));   /* uv units per pixel, per axis */

  /* ---- the seam: ~34 s to cross the visible field, always left to right.
          Alternate passes build and re-draft the page, so the loop never
          snaps back — 88 s before anything repeats.                    ---- */
  float cyc  = uTime / 34.0;
  float par  = mod(floor(cyc), 2.0);
  float ph   = fract(cyc);
  float seam = mix(-0.16, 1.16, ph);
  float s    = q.x - seam;

  float gain   = smoothstep(0.0, 0.50, uProgress);
  float seamOn = smoothstep(0.22, 0.72, uProgress);

  float band   = 0.05;
  float behind = 1.0 - smoothstep(-band, band, s);
  float rend   = mix(behind, 1.0 - behind, par) * seamOn;

  /* ---- pointer: a lens that previews the rendered page locally ---- */
  vec2  pd   = (uv - uPointer) * vec2(asp, 1.0);
  float pr   = length(pd);
  float lens = uPointerAmt * (1.0 - smoothstep(0.09, 0.26, pr));
  float ring = uPointerAmt * hair(abs(pr - 0.235) / pxs.y);
  float rl   = clamp(rend + lens * 0.60 * (1.0 - rend), 0.0, 1.0);

  /* ---- layout pass: outlines + rendered fills ---- */
  float edge = 0.0;
  float fill = 0.0;
  for (int i = 0; i < 18; i++) {
    float sd = rectPix(q, R[i], pxs);
    edge = max(edge, hair(abs(sd)));
    fill += (1.0 - smoothstep(-0.5, 0.5, sd)) * TONE[i];
  }

  /* ---- hero media box: placeholder cross ---- */
  vec4  hb  = R[10];
  float inH = 1.0 - smoothstep(-0.5, 0.5, rectPix(q, hb, pxs));
  float xln = hair(min(diagPix(q, hb, 1.0, pxs), diagPix(q, hb, -1.0, pxs))) * inH;

  /* ---- text columns: seven rules, ragged right ---- */
  float ci  = step(0.5, q.x);
  float cx0 = ML + ci * 0.445;
  vec4  cr  = vec4(cx0, 0.520, cx0 + 0.405, 0.700);
  float inC = 1.0 - smoothstep(-0.5, 0.5, rectPix(q, cr, pxs));
  float row = clamp((q.y - 0.520) / 0.180, 0.0, 0.999) * 7.0;
  float ri  = floor(row);
  float len = mix(0.52, 1.0, hash21(vec2(ri, ci) + 3.7));
  float ry  = 0.520 + (ri + 0.45) * (0.180 / 7.0);
  float lx0 = cx0 + 0.026;
  float lx1 = lx0 + (0.405 - 0.052) * len;
  float dCol = segPix(q, lx0, lx1, ry, pxs);
  float colLn  = hair(dCol) * inC;
  float colBar = (1.0 - smoothstep(1.6, 2.9, dCol)) * inC;

  /* ---- card row: divider + caption rules ---- */
  float k   = clamp(floor((q.x - ML) / 0.217), 0.0, 3.0);
  float kx0 = ML + k * 0.217;
  vec4  kr  = vec4(kx0, 0.745, kx0 + 0.199, 0.905);
  float inK = 1.0 - smoothstep(-0.5, 0.5, rectPix(q, kr, pxs));
  float dK  = min(segPix(q, kx0, kx0 + 0.199, 0.844, pxs),
              min(segPix(q, kx0 + 0.018, kx0 + 0.138, 0.866, pxs),
                  segPix(q, kx0 + 0.018, kx0 + 0.093, 0.884, pxs)));
  float cardLn  = hair(dK) * inK;
  float cardBar = (1.0 - smoothstep(1.5, 2.8, dK)) * inK;

  /* ---- twelve column guides, only on the unbuilt side ---- */
  float colf  = (q.x - ML) / (MR - ML) * 12.0;
  float gpix  = abs(fract(colf + 0.5) - 0.5) * ((MR - ML) / 12.0) / pxs.x;
  float inPg  = step(ML - 0.001, q.x) * step(q.x, MR + 0.001)
              * step(0.030, q.y) * step(q.y, 0.985);
  float guide = hair(gpix) * inPg;

  /* ---- unbuilt: hairlines only ---- */
  float wireL = edge   * 0.200
              + xln    * 0.110
              + colLn  * 0.098
              + cardLn * 0.124
              + guide  * 0.040;

  /* ---- built: soft tone, the outlines almost gone ---- */
  float n    = vnoise(q * vec2(3.0, 2.2) + vec2(uTime * 0.013, uTime * 0.009));
  float grad = 0.86 + 0.28 * (1.0 - q.y);
  float rendL = fill * grad * (0.88 + 0.24 * n) * 1.28
              + edge    * 0.045
              + colBar  * 0.039
              + cardBar * 0.039;

  float lum = mix(wireL, rendL, rl);

  /* ---- the seam itself: one bright pixel, a breath of halo ---- */
  float onBlk = clamp(fill * 9.0, 0.0, 1.0);
  float core  = hair(abs(s) / pxs.x);
  float halo  = exp(-abs(s) / 0.022);
  float lit = mix(lum, 0.28 + 0.10 * onBlk, core * seamOn);
  lum = lit + halo * 0.034 * seamOn;

  /* ---- lamp ---- */
  lum += ring * 0.038 + lens * 0.010;

  /* ---- the section builds itself as it arrives, then holds ---- */
  float front = uProgress * 1.35 - (q.x * 0.5 + q.y * 0.5) * 0.9;
  lum *= gain * smoothstep(0.0, 0.22, front);

  /* ---- clearing behind the statement: opens on whichever axis escapes
          the type block first, so the page still reads above and below ---- */
  vec2  ce   = (uv - vec2(0.5, 0.52)) * vec2(asp, 1.0);
  float open = max(smoothstep(0.34, 0.66, abs(ce.x)),
                   smoothstep(0.19, 0.44, abs(ce.y)));
  lum *= mix(0.18, 1.0, open);

  /* ---- ceiling: nothing here ever rivals the type ---- */
  lum = min(lum, 0.44);

  /* ---- the near-black the section sits on ---- */
  float base = 0.032 + 0.010 * (1.0 - q.y) + 0.006 * n;
  lum = clamp(lum + base * gain, 0.0, 1.0);
  o = vec4(vec3(lum), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function SeamField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS gradient underneath carries it

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uPointer = gl.getUniformLocation(prog, "uPointer");
    const uPointerAmt = gl.getUniformLocation(prog, "uPointerAmt");
    const uProgress = gl.getUniformLocation(prog, "uProgress");

    // Near-native: crisp rules are the whole point, and half-res would blur
    // the one-pixel hairlines into the grey mush this replaced.
    // Hairlines are the whole point here, and a hairline drawn into a buffer
    // smaller than the display is a grey smudge. Follow the device pixel
    // ratio so the 1px rules land on real pixels — capped at 1.5 because a
    // full 2x on a 4K panel quadruples the fill cost for no visible gain.
    const SCALE = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const nw = Math.max(1, Math.round(r.width * SCALE));
      const nh = Math.max(1, Math.round(r.height * SCALE));
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer, smoothed on the CPU so the shader stays branch-free.
    const target = { x: 0.5, y: 0.55 };
    const cur = { x: 0.5, y: 0.55 };
    let amt = 0;
    let amtTarget = 0;
    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      amtTarget = 1;
    };
    const onLeave = () => {
      amtTarget = 0;
    };
    // Fine pointers only — on touch there is nothing to follow.
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerleave", onLeave, { passive: true });
    }

    // Frames are only spent when the section is actually on screen.
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && raf === 0) raf = requestAnimationFrame(frame);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    let raf = 0;
    let t0 = 0;
    const frame = (now: number) => {
      if (!t0) t0 = now;
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      amt += (amtTarget - amt) * 0.05;

      const r = canvas.getBoundingClientRect();
      // 0 as the section enters, 1 once it is settled in the viewport
      const prog01 = Math.min(
        1,
        Math.max(0, 1 - (r.top + r.height * 0.25) / window.innerHeight),
      );

      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform2f(uPointer, cur.x, cur.y);
      gl.uniform1f(uPointerAmt, amt);
      gl.uniform1f(uProgress, prog01);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (!document.hidden && visible && raf === 0) {
        t0 = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (fine) {
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("pointerleave", onLeave);
      }
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      // The canvas is decorative; the statement above it carries the meaning.
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
