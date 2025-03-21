import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { getTestimonials } from "@/lib/airtable";
import { placeholderBlurhash } from "@/lib/utils";
import CustomButton from "@/components/shared/custom-button";
import { Section } from "@/components/shared/section";

import BlurImage from "../shared/blur-image";

export default function Testimonials({ locale }) {
  const t = useTranslations("Testimonials");

  return (
    <Section tag="h2" title={t("title")}>
      <div className="space-y-10">
        <TestimonialsWrapper />
      </div>
    </Section>
  );
}

async function TestimonialsWrapper() {
  const testimonials = await getTestimonials();
  return (
    <>
      {testimonials.map((item) => (
        <Testimonial key={item.id} item={item} />
      ))}
    </>
  );
}

function Testimonial({ item }) {
  const Type = item.slug ? Link : "div";
  return (
    <article className="group" key={item.id}>
      <Type
        href={item.slug ? `/portfolio/${item.slug}` : "/"}
        className="grid items-start gap-8 md:grid-cols-[1fr,2fr]"
      >
        <div className="space-y-4">
          <BlurImage
            alt={item.author}
            blurDataURL={placeholderBlurhash}
            className="aspect-square size-12 rounded-full border"
            width={100}
            height={100}
            placeholder="blur"
            src={item.image}
            sizes="(max-width: 100px) 100px, 100px"
            loading="lazy"
          />
          <div>
            <h3 className="mb-1">{item.author}</h3>
            <p>
              {item.role} at {item.company}
            </p>
          </div>
        </div>
        <div>
          <blockquote >
            <p className="mb-6 text-base">
              &quot;{item.quote}&quot;
            </p>
          </blockquote>
          <CustomButton
            link={item.slug ? `/portfolio/${item.slug}` : null}
            text="View project"
            button={false}
          />
        </div>
      </Type>
    </article>
  );
}
