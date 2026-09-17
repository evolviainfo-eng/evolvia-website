import { llmsResponse } from "@/i18n/llms";

/* /en/llms.txt: the English fact sheet, prices in pounds. */
export const dynamic = "force-static";

export function GET() {
  return llmsResponse("en");
}
