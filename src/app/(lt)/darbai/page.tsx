import { WorkView, workMetadata } from "@/components/views/WorkView";

export const metadata = workMetadata("lt");

export default function Page() {
  return <WorkView locale="lt" />;
}
