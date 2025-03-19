import { constructMetadata } from "@/lib/utils";
import Portfolio from "@/components/sections/portfolio";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export const metadata = constructMetadata({
  title: "Portfolio",
  description: "Latest news and updates from Next UseEfficiently.",
  image: "/api/og?heading=Portfolio",
});

export default function PortfolioPage() {
  return (
    <MaxWidthWrapper page>
      <Portfolio view="all" category main />
    </MaxWidthWrapper>
  );
}
