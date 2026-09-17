import { HomeView, homeMetadata } from "@/components/views/HomeView";

export const metadata = homeMetadata("lt");

export default function Page() {
  return <HomeView locale="lt" />;
}
