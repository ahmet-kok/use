import Link from "next/link";
import { Mail } from "lucide-react";
import { SiLinkedin, SiX } from "react-icons/si";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

export default function ShareButton({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  console.log(link);
  return (
    <div className="mb-8 flex flex-col space-y-4">
      <p className="text-[15px] font-medium">Share this article</p>
      <div className="flex space-x-4">
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}&via=useefficiently`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              size: "sm",
              rounded: "lg",
              variant: "outline",
            }),
            "group text-nowrap",
          )}
          aria-label="Share on Twitter"
        >
          <SiX className="size-4" />
        </Link>
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}&title=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              size: "sm",
              rounded: "lg",
              variant: "outline",
            }),
            "group text-nowrap",
          )}
          aria-label="Share on LinkedIn"
        >
          <SiLinkedin className="size-4" />
        </Link>
        <Link
          href={`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`Check out this article: ${link}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              size: "sm",
              rounded: "lg",
              variant: "outline",
            }),
            "group text-nowrap",
          )}
          aria-label="Share by Email"
        >
          <Mail className="size-4" />
        </Link>
      </div>
    </div>
  );
}
