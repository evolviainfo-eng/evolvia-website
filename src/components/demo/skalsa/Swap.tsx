/** One word set in the display serif inside a sans line.
 *
 *  The reference's one typographic idea: the brand word changes typeface
 *  mid-sentence ("THIS IS The One."), same size, same baseline, never
 *  italic. The dictionaries mark that word with asterisks
 *  ("Vienas *vaškas*."); everything else stays in the sans.
 *
 *  No hooks, so server and client components can both use it. */
export function Swap({ text }: { text: string }) {
  const parts = text.split("*");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="sk-serif">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** The same string without its markers, for aria-labels and alt text. */
export function plain(text: string): string {
  return text.split("*").join("");
}
