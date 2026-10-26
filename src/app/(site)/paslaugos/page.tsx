import { Services, servicesMetadata } from "@/components/site/pages/Services";

export const metadata = servicesMetadata("lt");

export default function Page() {
  return <Services locale="lt" />;
}
