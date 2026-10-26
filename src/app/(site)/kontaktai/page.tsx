import { Contact, contactMetadata } from "@/components/site/pages/Contact";

export const metadata = contactMetadata("lt");

export default function Page() {
  return <Contact locale="lt" />;
}
