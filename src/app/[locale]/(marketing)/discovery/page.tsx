import { constructMetadata } from "@/lib/utils";
import FilloutForm from "@/components/shared/FilloutForm";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export const metadata = constructMetadata({
  title: "Schedule a Discovery Call",
  description: "Schedule a Discovery Call with UseEfficiently.",
  image: "/api/og?heading=Schedule a Discovery Call",
});

export default async function MeetingPage() {
  return (
    <MaxWidthWrapper page>
      <FilloutForm formId="21rvTSZqjUus" />
    </MaxWidthWrapper>
  );
}
