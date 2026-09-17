import { ServicesView, servicesMetadata } from "@/components/views/ServicesView";

export const metadata = servicesMetadata("lt");

export default function Page() {
  return <ServicesView locale="lt" />;
}
