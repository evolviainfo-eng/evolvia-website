import {
  FumePage,
  fumeMetadata,
} from "@/components/demo/fume/FumePage";

export const metadata = fumeMetadata("en");

export default function Page() {
  return <FumePage locale="en" />;
}
