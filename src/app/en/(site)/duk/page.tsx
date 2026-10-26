import { FaqPage, faqPageMetadata } from "@/components/site/pages/FaqPage";

export const metadata = faqPageMetadata("en");

export default function Page() {
  return <FaqPage locale="en" />;
}
