/** Fills `{name}` placeholders in a dictionary string.
 *
 *    fill("Atidaryti {domain}", { domain: "minerda.lt" }) → "Atidaryti minerda.lt"
 *
 *  Dictionary entries stay plain strings (so they can be handed to client
 *  components as props), and the few values that vary at render time are
 *  slotted in here. An unknown placeholder is left visible rather than
 *  silently dropped, so a typo shows up on the page instead of hiding. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
