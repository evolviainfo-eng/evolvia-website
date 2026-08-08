# evolvia-web

Evolvia's own site — a web-design studio selling to Lithuanian small
businesses. Next.js 16 (App Router, Turbopack), TypeScript, Tailwind v4,
`output: "export"` so it ships as plain static files.

```bash
npm run dev     # http://localhost:3030
npm run build   # static export into out/
```

## Deployment

Two platform configs live in the repo on purpose.

- **`vercel.json`** — the live one. Holds the 301s for pre-redesign URLs that
  are still in Google's index, and the `X-Robots-Tag: noindex` header for
  `/demo/*`. Vercel's schema rejects unknown keys, so it cannot carry comments;
  this section is its documentation.
- **`netlify.toml` + `public/_redirects`** — the previous host. Both are
  Netlify syntax and are inert on Vercel. Kept so the old deploy keeps working
  during the switch; delete them once it is retired, but port anything in them
  to `vercel.json` first — they are not equivalent files and nothing warns you
  if a redirect quietly stops existing.

## The demo sites

`/demo/{konstrukta,fume,forma,skalsa}` are four complete websites for companies
that **do not exist**, each with one genuinely working feature. Every surface
that shows one says so: a pinned honesty bar, a closing strip, example contacts
on `.demo` domains, and forms whose confirmation states nothing was sent.

They are `noindex` twice over — a meta tag from `app/demo/layout.tsx` and the
HTTP header above. `robots.txt` deliberately does **not** disallow `/demo/`: a
crawler has to be allowed to fetch a page in order to read that it says
noindex.

If you touch these, the rule is that nothing may imply a real business.

## Motion

Two easing curves and five durations, defined as CSS custom properties in
`globals.css`. Nothing anywhere writes a raw `cubic-bezier()` or a raw
millisecond value.

**The two curves are springs, not beziers.** `--e-out` (damping 1.0) and
`--e-mass` (damping 0.8) are sampled off a damped harmonic oscillator and
emitted as CSS `linear()`, so the whole site gets real spring shape without a
line of JavaScript — which is what keeps server components from having to
become client components just to feel alive.

A `linear()` curve has a fixed duration, so it cannot inherit a finger's
velocity or be re-targeted mid-flight. **Anything a user can grab uses a real
JS spring instead**: `lib/spring.ts` holds the physics (Apple's momentum
projection, the presets, rubber-banding) and `lib/useSheet.ts` is the hook both
draggable surfaces share — the cart drawer on X, the mobile menu on Y. Adding a
third grabbable surface means extending that hook, not writing new physics.

Scroll reveals go through one primitive set — `data-rise`, `data-line`,
`data-wipe`, `data-sweep`, `data-settle` — watched by a single observer in
`components/ui/Choreo.tsx`. The hidden state is gated behind
`html[data-choreo]`, which the boot script sets before first paint and a
watchdog removes if the observer never arrives, so a JS failure can only ever
leave content visible.

**Never clip, scale to zero, or collapse the element being observed.** A
fully clipped element has no visible area, `IntersectionObserver` never reports
it, and the content stays blank forever. Clip a child instead — that is what
`data-sweep` does.

**Tailwind v4 emits `translate` and `scale` as their own CSS properties**, not
as `transform`. A transition list must name `translate`;
`transition-[transform,…]` next to a `translate-*` utility animates nothing.
The named `transition-transform` utility is fine — it covers all four.

**A custom property only animates if it is `@property`-registered.**
`--glass-blur` and `--glass-sat` are, which is what lets the header's material
thicken into place instead of jumping in one frame.

**Do not put `isolation: isolate` on an element containing a
`backdrop-filter`.** Isolation creates a backdrop root, and a backdrop root
means the filter samples only what is *inside* that element — so the glass
silently stops blurring. It is tempting when you want a negative `z-index`
layer; use the existing stacking context instead.

## Typography

Tracking is a function of size, not a value anyone picks per element:
`letter-spacing: calc(1.14px - 0.056em)` on every heading. The px term is
constant and the em term scales with the font, so the ratio shifts
continuously — about `+0.011em` at 17px, `−0.031em` at 45px, `−0.042em` at
80px. An `em` value alone cannot do this: em keeps the gap *proportionally
identical* at every size, and proportionally identical is exactly what looks
too loose on large text.

Leading is the one thing still solved per class, because it has to be solved
against that class's own `clamp()` — and the middle terms are fitted through
the viewport widths where the font-size clamp changes slope, or the ramp pins
to a bound mid-viewport instead of interpolating.

## Before shipping

```bash
npm run build
npx tsc --noEmit --incremental false
```

Plus the viewport-fit gate — horizontal overflow is invisible to every tool
that lies about mobile widths, so it is measured inside a real iframe at each
width and checked against `document.scrollWidth`. A failure is a layout bug, not
an artifact.
