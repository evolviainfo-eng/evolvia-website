import {
  SkalsaPage,
  skalsaMetadata,
} from "@/components/demo/skalsa/SkalsaPage";

export const metadata = skalsaMetadata("en");

export default function Page() {
  return <SkalsaPage locale="en" />;
}
