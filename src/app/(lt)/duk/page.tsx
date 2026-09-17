import { FaqView, faqMetadata } from "@/components/views/FaqView";

export const metadata = faqMetadata("lt");

export default function Page() {
  return <FaqView locale="lt" />;
}
