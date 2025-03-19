import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  className,
  children,
  page,
}: {
  className?: string;
  large?: boolean;
  children: ReactNode;
  page?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-5xl px-[.8rem] md:px-6",
        className,
        page && "mt-16 space-y-24",
      )}
    >
      {children}
    </div>
  );
}
