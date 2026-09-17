import {
  SkalsaPage,
  skalsaMetadata,
} from "@/components/demo/skalsa/SkalsaPage";

export const metadata = skalsaMetadata("lt");

export default function Page() {
  return <SkalsaPage locale="lt" />;
}
