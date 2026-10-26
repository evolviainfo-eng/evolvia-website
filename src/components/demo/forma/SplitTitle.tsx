import type { CSSProperties } from "react";
import { T_TITLE } from "@/components/demo/forma/tokens";

/** TARQ's section title: two extended uppercase words held apart.
 *
 *  `spread`: first word on the left margin, second on the right margin
 *  (PROYECTOS ... DESTACADOS). `step`: the second word starts at the fourth
 *  column (THE   STUDIO); used where a photograph owns the right half.
 *  On a phone both stack, word one left and word two right aligned, so the
 *  margin-to-margin tension survives at 390px.
 *
 *  The words rise 24px and fade once, 80ms apart, through the site's one
 *  reveal observer (`data-rise`, hidden only under html[data-choreo]). A
 *  real space sits between them, so the heading reads as one phrase. */
export function SplitTitle({
  words,
  layout,
  id,
  tone,
}: {
  words: readonly string[];
  layout: "spread" | "step";
  id?: string;
  tone?: string;
}) {
  const [a, b] = words;
  return (
    <h2
      id={id}
      className={`f-split f-split-${layout} ${T_TITLE}`}
      style={tone ? { color: tone } : undefined}
    >
      <span data-rise style={{ "--i": 0, "--rise-y": "24px" } as CSSProperties}>
        {a}
      </span>{" "}
      <span data-rise style={{ "--i": 1, "--rise-y": "24px" } as CSSProperties}>
        {b}
      </span>
    </h2>
  );
}
