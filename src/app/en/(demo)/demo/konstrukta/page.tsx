import {
  KonstruktaPage,
  konstruktaMetadata,
} from "@/components/demo/konstrukta/KonstruktaPage";

export const metadata = konstruktaMetadata("en");

export default function Page() {
  return <KonstruktaPage locale="en" />;
}
