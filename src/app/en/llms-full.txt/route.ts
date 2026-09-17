import { llmsFullResponse } from "@/i18n/llms";

/* /en/llms-full.txt: every English answer as plain text. */
export const dynamic = "force-static";

export function GET() {
  return llmsFullResponse("en");
}
