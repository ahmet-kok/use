import Link from "next/link";

import { cn } from "@/lib/utils";

import CustomButton from "./custom-button";

interface HeaderSectionProps {
  label?: string;
  title?: string;
  text?: string;
  link?: string;
  linkText?: string;
  tag?: "h1" | "h2" | "h3" | "h4";
  border?: boolean;
  children?: React.ReactNode;
  grid?: "2" | "3" | "4";
  button?: boolean;
}

export function Section({
  label,
  title,
  text,
  link,
  linkText,
  tag,
  border,
  children,
  grid,
  button,
}: HeaderSectionProps) {
  const Tag = tag;
  const P = tag === "h1" ? "text-xl" : tag === "h2" ? "text-lg" : tag === "h3" ? "text-base" : "text-sm";
  const Type = button ? Link : "div";
  return (
    <Type
      href={link ? link : "/"}
      className={cn("flex flex-col gap-4", border && "rounded-lg border p-6")}
    >
      <div className="flex items-baseline justify-between">
        <div>
          {label ? (
            <div className="text-gradient_indigo-purple font-semibold">
              {label}
            </div>
          ) : null}
          {title && Tag ? (
            <Tag className={cn(tag === "h1" && "mb-4")}>{title}</Tag>
          ) : null}
        </div>
        {link && (
          <CustomButton
            className="text-sm"
            arrow
            link={link}
            text={linkText || "Read More"}
            button={!button}
          />
        )}
      </div>
      {text ? <p className={cn(P, "max-w-prose")}>{text}</p> : null}
      <div
        className={cn(
          "grid gap-8",
          grid === "2" && "md:grid-cols-2",
          grid === "3" && "sm:grid-cols-2 md:grid-cols-3",
          grid === "4" && "sm:grid-cols-3 md:grid-cols-4",
        )}
      >
        {children}
      </div>
    </Type>
  );
}
