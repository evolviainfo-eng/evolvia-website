import { ServicesView, servicesMetadata } from "@/components/views/ServicesView";

export const metadata = servicesMetadata("en");

export default function Page() {
  return <ServicesView locale="en" />;
}
