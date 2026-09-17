import { WorkView, workMetadata } from "@/components/views/WorkView";

export const metadata = workMetadata("en");

export default function Page() {
  return <WorkView locale="en" />;
}
