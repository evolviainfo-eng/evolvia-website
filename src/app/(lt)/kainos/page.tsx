import { PricingView, pricingMetadata } from "@/components/views/PricingView";

export const metadata = pricingMetadata("lt");

export default function Page() {
  return <PricingView locale="lt" />;
}
