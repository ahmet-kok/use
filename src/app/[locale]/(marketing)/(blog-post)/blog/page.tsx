import { constructMetadata } from "@/lib/utils";
import Blog from "@/components/sections/blog";

export const metadata = constructMetadata({
  title: "Blog - FFlow Next",
  description: "Latest news and updates from Next FFlow Next.",
});

export default function BlogPage() {
  return <Blog view="all" category />;
}
