"use client";

import { useState } from "react";

import { Card } from "@/components/Card";

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
        <Card
          key={post.id}
          index={index}
          title={post.title}
          description={post.description}
          image={post.image[0]}
          imageWidth={800}
          imageHeight={600}
          link={`/blog/${post.slug}`}
          linkText="Read Post"
          titleClassName="text-lg font-medium"
          descriptionClassName="text-dark-600 dark:text-gray-400 line-clamp-2"
          articleClassName="flex flex-col md:flex-row gap-6 items-start relative"
          imageClassName="max-w-60 aspect-video rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-300 flex-shrink-0 object-cover"
          details={[post.category, post.readTime, post.date]}
          detailsClassName="flex items-baseline gap-4 mb-2 text-sm"
          className="group block"
          contentClassName="flex-1 min-w-0"
        />
      ))}
    </div>
  );
}
