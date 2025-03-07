import { constructMetadata } from "@/lib/utils";
import Portfolio from "@/components/sections/portfolio";

export const metadata = constructMetadata({
  title: "Portfolio",
  description: "Latest news and updates from Next UseEfficiently.",
});

export default function PortfolioPage() {
  return <Portfolio view="all" category main />;
}
