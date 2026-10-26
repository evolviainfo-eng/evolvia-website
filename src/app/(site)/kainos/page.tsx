import { Pricing, pricingMetadata } from "@/components/site/pages/Pricing";

export const metadata = pricingMetadata("lt");

export default function Page() {
  return <Pricing locale="lt" />;
}
