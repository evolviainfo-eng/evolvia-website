import { ContactView, contactMetadata } from "@/components/views/ContactView";

export const metadata = contactMetadata("lt");

export default function Page() {
  return <ContactView locale="lt" />;
}
