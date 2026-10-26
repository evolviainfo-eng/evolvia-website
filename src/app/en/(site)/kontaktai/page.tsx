import { Contact, contactMetadata } from "@/components/site/pages/Contact";

export const metadata = contactMetadata("en");

export default function Page() {
  return <Contact locale="en" />;
}
