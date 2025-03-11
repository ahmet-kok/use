"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { placeholderBlurhash } from "@/lib/utils";
import BlurImage from "@/components/shared/blur-image";

interface ProjectGalleryProps {
  images: string[];
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
            <BlurImage
              key={index}
              alt={`${title} - Image ${index + 1}`}
              blurDataURL={placeholderBlurhash}
              className="h-[600px] w-max shrink-0 overflow-hidden rounded-lg"
              width={720}
              height={1280}
              placeholder="blur"
              src={image}
              loading="lazy"
            />
          );
        })}
      </div>
    </section>
  );
}
