"use client";

import { Fragment, useState } from "react";
import Link from "next/link";

import { Blog } from "@/lib/airtable";
import { placeholderBlurhash } from "@/lib/utils";
import { Card } from "@/components/ui/card";

import BlurImage from "../shared/blur-image";
import CustomButton from "../shared/custom-button";
import { BlogListProps } from "./blog";
import TagList from "./tag-list";

export default function BlogList({ blog, category }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState("All");
  const filteredBlog =
    selectedTag === "All"
      ? blog
      : blog.filter((post) => post.category === selectedTag);
  return (
    <div className="space-y-12">
      {category && (
        <TagList
          tags={blog.map((post) => post.category)}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      )}
      {filteredBlog.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}

function BlogCard({ post, index }: { post: Blog; index: number }) {
  const details = [post.category, post.readTime, post.date];
  return (
    <Link prefetch={true} href={`/blog/${post.slug}`} className="group block">
      <div className="relative flex flex-col items-start gap-6 md:flex-row">
        <BlurImage
          alt={post.title || ""}
          blurDataURL={placeholderBlurhash}
          className="aspect-video max-w-60 shrink-0 overflow-hidden rounded-lg bg-gray-300 object-cover dark:bg-gray-300"
          width={800}
          height={600}
          placeholder="blur"
          loading={index < 2 ? "eager" : "lazy"}
          src={post.image}
          sizes={`(max-width: 800px) 800px, 600px`}
          priority={index < 2}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-baseline gap-4 text-sm">
            {details.map((detail, index) => (
              <Fragment key={`${detail}-${index}`}>
                <span>{detail}</span>
                {index < details.length - 1 && (
                  <span
                    key={`separator-${index}`}
                    className="text-dark-300 dark:text-gray-700"
                  >
                    •
                  </span>
                )}
              </Fragment>
            ))}
          </div>
          <h2 className="text-lg font-medium">{post.title}</h2>

          <p className="line-clamp-2 text-base">{post.description}</p>
        </div>
        <CustomButton
          text="Read Post"
          link={`/blog/${post.slug}`}
          button={false}
        />
      </div>
    </Link>
  );
}
