"use client";

import { useRef } from "react";
import Image from "next/image";
import { Attachment } from "airtable";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { placeholderBlurhash } from "@/lib/utils";
import BlurImage from "@/components/shared/blur-image";

interface ProjectGalleryProps {
  images: Attachment[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 600; // Width of one image
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-medium">Gallery</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollGallery("left")}
            className="text-dark-500 hover:text-dark-900 p-2 transition-colors dark:text-gray-400 dark:hover:text-white"
            aria-label="Scroll left"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            onClick={() => scrollGallery("right")}
            className="text-dark-500 hover:text-dark-900 p-2 transition-colors dark:text-gray-400 dark:hover:text-white"
            aria-label="Scroll right"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide smooth-scroll flex gap-8 overflow-x-auto"
      >
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="bg-dark-100 dark:bg-dark-100 h-[400px] w-max shrink-0 overflow-hidden rounded-lg"
            >
              <BlurImage
                alt={`${title} - Image ${index + 1}`}
                blurDataURL={placeholderBlurhash}
                className="h-full w-max"
                width={image?.thumbnails?.large?.width}
                height={image?.thumbnails?.large?.height}
                placeholder="blur"
                src={image.url}
                loading="lazy"
                sizes={`(max-width: ${image?.thumbnails?.large?.width}px) ${image?.thumbnails?.large?.width}px, ${image?.thumbnails?.large?.height}px`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
