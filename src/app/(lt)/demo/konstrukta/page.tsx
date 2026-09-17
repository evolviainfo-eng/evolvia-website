import {
  KonstruktaPage,
  konstruktaMetadata,
} from "@/components/demo/konstrukta/KonstruktaPage";

export const metadata = konstruktaMetadata("lt");

export default function Page() {
  return <KonstruktaPage locale="lt" />;
}
