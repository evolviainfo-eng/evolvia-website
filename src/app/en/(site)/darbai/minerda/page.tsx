import { MinerdaCase, minerdaCaseMetadata } from "@/components/site/pages/MinerdaCase";

export const metadata = minerdaCaseMetadata("en");

export default function Page() {
  return <MinerdaCase locale="en" />;
}
