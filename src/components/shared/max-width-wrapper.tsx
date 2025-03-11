import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  className,
  children,
  large = false,
}: {
  className?: string;
  large?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-[.8rem] md:px-6", className)}>{children}</div>
  );
}
