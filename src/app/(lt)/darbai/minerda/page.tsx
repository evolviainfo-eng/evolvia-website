import { MinerdaView, minerdaMetadata } from "@/components/views/MinerdaView";

export const metadata = minerdaMetadata("lt");

export default function Page() {
  return <MinerdaView locale="lt" />;
}
