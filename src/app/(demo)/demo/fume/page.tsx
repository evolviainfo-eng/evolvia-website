import {
  FumePage,
  fumeMetadata,
} from "@/components/demo/fume/FumePage";

export const metadata = fumeMetadata("lt");

export default function Page() {
  return <FumePage locale="lt" />;
}
