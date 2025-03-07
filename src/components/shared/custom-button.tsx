import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function CustomButton({
  text,
  link,
}: {
  text: string;
  link?: string;
}) {
  if (link?.length) {
    return (
      <Link href={link} className="inline-flex items-center gap-2 whitespace-nowrap text-sm">
        <span>{text}</span>
        <ArrowRightIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>
    );
  }
  return (
    <div className="flex items-center gap-2 whitespace-nowrap text-sm transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
      <span>{text}</span>
      <ArrowRightIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
    </div>
  );
}
