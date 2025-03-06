"use client";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";

interface TagListProps {
  tags: string[];
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}

export default function TagList({
  tags,
  selectedTag,
  setSelectedTag,
}: TagListProps) {
  const [tagsList, setTagsList] = useState<string[]>(["All"]);

  useEffect(() => {
    // Extract unique categories from posts
    const uniqueTags = ["All", ...new Set(tags)];
    setTagsList(uniqueTags);
  }, [tags]);

  return (
    <div className="flex flex-wrap gap-2">
      {tagsList.map((tag) => (
        <Button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          size="sm"
          rounded="full"
          variant={selectedTag === tag ? "default" : "outline"}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
