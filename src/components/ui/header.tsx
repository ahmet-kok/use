import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Header({
  title,
  description,
  link,
  linkText,
  topMargin = "mt-8 sm:mt-16",
}: {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  topMargin?: string;
}) {
  return (
    <section className={`mb-16 ${topMargin}`}>
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
