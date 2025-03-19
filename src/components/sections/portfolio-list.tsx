"use client";

import { Fragment, useState } from "react";
import Link from "next/link";

import { Portfolio } from "@/lib/airtable";
import { placeholderBlurhash } from "@/lib/utils";
import { Card } from "@/components/ui/card";

import BlurImage from "../shared/blur-image";
import CustomButton from "../shared/custom-button";
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
        <PortfolioCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}

function PortfolioCard({ post, index }: { post: Portfolio; index: number }) {
  return (
    <Link
      prefetch={true}
      href={`/portfolio/${post.slug}`}
      className="group block"
    >
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
        <div>
          <div className="text-sm">
            <span>{post.category}</span>
          </div>
          <h2 className="text-lg font-medium">{post.title}</h2>

          <p className="line-clamp-2 text-base">{post.description}</p>
        </div>
        <CustomButton
          text="View Project"
          link={`/portfolio/${post.slug}`}
          button={false}
        />
      </div>
    </Link>
  );
}
