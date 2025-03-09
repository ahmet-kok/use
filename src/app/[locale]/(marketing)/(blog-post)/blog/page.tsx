import { constructMetadata } from "@/lib/utils";
import Blog from "@/components/sections/blog";

export const metadata = constructMetadata({
  title: "Blog",
  description: "Latest news and updates from Next UseEfficiently.",
  image: "/api/og?heading=Blog",
});

export default function BlogPage() {
  return <Blog view="all" category main />;
}
