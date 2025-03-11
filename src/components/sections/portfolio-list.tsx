"use client";

import { useState } from "react";

import { Card } from "@/components/Card";

import { PortfolioListProps } from "./portfolio";
import TagList from "./tag-list";

export default function PortfolioList({
  portfolio,
  category,
}: PortfolioListProps) {
  const [selectedTag, setSelectedTag] = useState("All");
  const filteredPortfolio =
    selectedTag === "All"
      ? portfolio
      : portfolio.filter((post) => post.category === selectedTag);
  return (
    <div className="space-y-12">
      {category && (
        <TagList
          tags={portfolio.map((post) => post.category)}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      )}
      {filteredPortfolio.map((post, index) => (
        <Card
          key={post.id}
          index={index}
          title={post.title}
          description={post.description}
          details={[post.category]}
          detailsClassName="text-sm"
          descriptionClassName="line-clamp-2"
          image={post.image}
          imageWidth={800}
          imageHeight={600}
          link={`/portfolio/${post.slug}`}
          linkText="View Project"
          titleClassName="text-lg font-medium"
          articleClassName="flex flex-col md:flex-row gap-6 items-start relative"
          imageClassName="max-w-60 aspect-video rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-300 flex-shrink-0 object-cover"
        />
      ))}
    </div>
  );
}
