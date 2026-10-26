import { Home, homeMetadata } from "@/components/site/Home";

export const metadata = homeMetadata("en");

export default function Page() {
  return <Home locale="en" />;
}
