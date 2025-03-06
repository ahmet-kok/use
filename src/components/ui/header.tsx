import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Header({
  title,
  description,
  link,
  linkText,
}: {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <section className="mb-16 mt-8 sm:mt-16">
      <h1>{title}</h1>
      <p className="text-base">{description}</p>
      {link && (
        <Link
          prefetch={true}
          href="/contact"
          className="group mt-8 inline-flex items-center"
        >
          <span className="mr-2">{linkText}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </section>
  );
}
