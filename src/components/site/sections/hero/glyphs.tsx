/* Hero-only glyphs, drawn at 1.25 to 1.5 px like the shared ones in
   Primitives. They use the global .glyph stroke style and the g16 size
   class from the hero stylesheet. */

import s from "../Hero.module.css";

export function Envelope() {
  return (
    <svg className={`glyph ${s.g16}`} viewBox="0 0 16 16" aria-hidden="true">
      <rect x="2" y="3.5" width="12" height="9" rx="1.6" />
      <path d="M2.6 4.7 L8 8.6 L13.4 4.7" />
    </svg>
  );
}
