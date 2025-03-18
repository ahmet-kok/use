"use client";

import { ShareIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

interface ShareButtonProps {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

export default function ShareButton({
  title,
  description,
  link,
  imageUrl,
}: ShareButtonProps) {
  // Use our proxied image URL for sharing

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const shareData: ShareData = {
          title,
          text: description,
          url: link,
        };

        // Some browsers support sharing files/images
        if (navigator.canShare) {
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "image.jpg", { type: "image/jpeg" });
            const filesArray = [file];

            if (navigator.canShare({ files: filesArray })) {
              shareData.files = filesArray;
            }
          } catch (error) {
            console.log("Error preparing image for share:", error);
          }
        }

        await navigator.share(shareData);
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(link);
    }
  };

  const handleLinkedInShare = () => {
    const url = new URL("https://www.linkedin.com/sharing/share-offsite/");
    url.searchParams.set("url", link);
    url.searchParams.set("title", title);
    url.searchParams.set("summary", description);
    url.searchParams.set("source", imageUrl);
    window.open(url.toString(), "_blank", "width=600,height=600");
  };

  const handleXShare = () => {
    const text = `${title}\n\n${description}`;
    const url = new URL("https://twitter.com/intent/tweet");
    url.searchParams.set("text", text);
    url.searchParams.set("url", link);
    url.searchParams.set("image", imageUrl);
    window.open(url.toString(), "_blank", "width=600,height=600");
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct web sharing API, so we'll copy the URL
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="mb-8 flex flex-col space-y-4">
      <p className="text-[15px] font-medium">Share this article</p>
      <div className="flex space-x-4">
        <button
          onClick={handleShare}
          className={cn(
            buttonVariants({
              size: "sm",
              rounded: "lg",
              variant: "outline",
            }),
          )}
        >
          <ShareIcon className="h-4 w-4" />
        </button>

        <button
          onClick={handleLinkedInShare}
          aria-label="Share on LinkedIn"
          className={cn(
            buttonVariants({
              size: "sm",
              rounded: "lg",
              variant: "outline",
            }),
          )}
        ></button>

        <button
          onClick={handleXShare}
          aria-label="Share on X"
          className={cn(
            buttonVariants({
              size: "sm",
              rounded: "lg",
              variant: "outline",
            }),
          )}
        ></button>

        <button
          onClick={handleInstagramShare}
          aria-label="Copy link for Instagram"
          className={cn(
            buttonVariants({
              size: "sm",
              rounded: "lg",
              variant: "outline",
            }),
          )}
        ></button>
      </div>
    </div>
  );
}
