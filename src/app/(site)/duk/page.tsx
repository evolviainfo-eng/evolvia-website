import { FaqPage, faqPageMetadata } from "@/components/site/pages/FaqPage";

export const metadata = faqPageMetadata("lt");

export default function Page() {
  return <FaqPage locale="lt" />;
}
