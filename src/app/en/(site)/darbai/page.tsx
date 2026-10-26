import { Work, workMetadata } from "@/components/site/pages/Work";

export const metadata = workMetadata("en");

export default function Page() {
  return <Work locale="en" />;
}
