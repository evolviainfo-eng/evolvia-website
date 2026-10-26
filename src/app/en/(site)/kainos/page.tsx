import { Pricing, pricingMetadata } from "@/components/site/pages/Pricing";

export const metadata = pricingMetadata("en");

export default function Page() {
  return <Pricing locale="en" />;
}
