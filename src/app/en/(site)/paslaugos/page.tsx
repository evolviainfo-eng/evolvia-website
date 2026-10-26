import { Services, servicesMetadata } from "@/components/site/pages/Services";

export const metadata = servicesMetadata("en");

export default function Page() {
  return <Services locale="en" />;
}
