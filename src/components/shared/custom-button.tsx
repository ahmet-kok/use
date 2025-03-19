import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function CustomButton({
  text,
  link,
  icon,
  arrow = true,
  className,
  button = true,
}: {
  text?: string;
  link?: string | null;
  arrow?: boolean;
  icon?: React.ReactNode;
  className?: string;
  button?: boolean;
}) {
  if (link === null) {
    return null;
  }
  const Type = button ? Link : "span";
  return (
    <Type
      href={link || "/"}
      prefetch={button ? true : null}
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap transition-opacity duration-200 hover:opacity-90",
        className,
      )}
    >
      {icon}
      {text && <span>{text}</span>}
      {arrow && (
        <ArrowRightIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
      )}
    </Type>
  );
}
