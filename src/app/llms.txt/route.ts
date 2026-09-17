import { llmsResponse } from "@/i18n/llms";

/* /llms.txt: the fact sheet an answer engine reads instead of the page.
 *
 * A route rather than a file in public/, for one reason: the prices are
 * interpolated from the dictionaries. A hand-kept copy of this file would
 * quietly drift the first time a price changed, and a stale number in the
 * machine-readable summary is exactly the failure this file exists to
 * prevent. The English copy is /en/llms.txt. */
export const dynamic = "force-static";

export function GET() {
  return llmsResponse("lt");
}
