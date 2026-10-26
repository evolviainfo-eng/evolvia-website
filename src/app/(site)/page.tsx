import { Home, homeMetadata } from "@/components/site/Home";

export const metadata = homeMetadata("lt");

export default function Page() {
  return <Home locale="lt" />;
}
