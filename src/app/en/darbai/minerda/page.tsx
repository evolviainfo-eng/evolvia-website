import { MinerdaView, minerdaMetadata } from "@/components/views/MinerdaView";

export const metadata = minerdaMetadata("en");

export default function Page() {
  return <MinerdaView locale="en" />;
}
