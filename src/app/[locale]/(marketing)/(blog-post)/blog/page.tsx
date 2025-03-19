import { constructMetadata } from "@/lib/utils";
import Blog from "@/components/sections/blog";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export const metadata = constructMetadata({
  title: "Blog",
  description: "Latest news and updates from Next UseEfficiently.",
  image: "/api/og?heading=Blog",
});

export default function BlogPage() {
  return (
    <MaxWidthWrapper page>
      <Blog view="all" category main />
    </MaxWidthWrapper>
  );
}
