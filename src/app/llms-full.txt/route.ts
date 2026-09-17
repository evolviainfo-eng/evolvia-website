import { llmsFullResponse } from "@/i18n/llms";

/* /llms-full.txt: every answer on the site as plain text, generated from the
 * same dictionaries the pages render. Nothing here is retyped, so it cannot
 * disagree with the site. The English copy is /en/llms-full.txt. */
export const dynamic = "force-static";

export function GET() {
  return llmsFullResponse("lt");
}
