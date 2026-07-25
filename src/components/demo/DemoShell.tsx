import type { ReactNode } from "react";
import { DemoBar } from "@/components/demo/DemoBar";
import { DemoFooter } from "@/components/demo/DemoFooter";

/** Perceived lightness of a `#rrggbb` string, 0–1. Used only to decide which
 *  `color-scheme` a demo should declare. */
function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  const n =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(n.slice(0, 2), 16) / 255;
  const g = parseInt(n.slice(2, 4), 16) / 255;
  const b = parseInt(n.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.5;
}

/** Wraps a demo site: honesty bar on top, the demo's own world in the middle,
 *  a closing Evolvia strip at the bottom.
 *
 *  A demo lives in its own colour world, unaffected by the visitor's dark-mode
 *  preference for the surrounding site. Three things have to be forced for
 *  that to actually hold — see the comments on the injected stylesheet.
 */
export function DemoShell({
  slug,
  bg,
  fg,
  children,
  className,
}: {
  slug: string;
  bg: string;
  fg: string;
  children: ReactNode;
  className?: string;
}) {
  /* `color-scheme` is inherited from :root, where the site sets it from the
     theme toggle. Left alone, a visitor browsing Evolvia in dark mode would
     get dark-rendered form controls, caret and scrollbars inside a bright
     demo like Forma or Skalsa — native UA widgets follow the scheme, not the
     page's own colours. It is derived from `bg` so a demo can never declare
     one that contradicts how it looks. */
  const scheme = isLight(bg) ? "light" : "dark";

  return (
    <>
      {/* The document itself is painted, not just this element — otherwise
          overscroll and the area under a short page show the Evolvia theme
          colour bleeding through the demo. scroll-padding clears BOTH fixed
          bars an anchor has to land under: the honesty bar plus the demo's
          own sticky header. */}
      <style>{`html{background:${bg};color-scheme:${scheme};scroll-padding-top:calc(var(--demo-bar-h) + 76px)}body{background:${bg};color:${fg}}`}</style>
      <DemoBar slug={slug} />
      <div
        className={className}
        style={
          {
            background: bg,
            color: fg,
            paddingTop: "var(--demo-bar-h)",
            /* Re-point the inherited site tokens at this demo's own palette.
               globals.css styles focus with `outline: 2px solid var(--accent)`,
               and --accent flips to white when the visitor has dark mode on —
               which makes every focus ring invisible on a light demo like
               Forma or Skalsa. Overriding the tokens here fixes it for all
               four demos at once, and for any other token-based site rule that
               reaches in later. */
            "--accent": fg,
            "--accent-text": bg,
            "--text": fg,
            "--bg": bg,
          } as React.CSSProperties
        }
      >
        {children}
        <DemoFooter slug={slug} />
      </div>
    </>
  );
}
