import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { getTestimonials } from "@/lib/airtable";
import CustomButton from "@/components/shared/custom-button";
import { HeaderSection } from "@/components/shared/header-section";

export default function Testimonials({ locale }) {
  const t = useTranslations("Testimonials");
  return (
    <section>
      <HeaderSection title={t("title")} />
      <div className="space-y-10">
        <TestimonialsWrapper />
      </div>
    </section>
  );
}

async function TestimonialsWrapper() {
  const testimonials = await getTestimonials();
  return (
    <>
      {testimonials.map((item) => (
        <article className="group" key={item.id}>
          <Link
            prefetch={true}
            href={item.slug ? `/portfolio/${item.slug}` : "/#"}
            className="grid items-start gap-8 md:grid-cols-[1fr,2fr]"
          >
            <div className="space-y-4">
              <div className="aspect-square size-12 overflow-hidden">
                <Image
                  src={
                    item.image[0]?.thumbnails?.large?.url || item.image[0]?.url
                  }
                  alt={item.author}
                  width={100}
                  height={100}
                  className="size-full rounded-full border object-cover"
                  placeholder="blur"
                  blurDataURL={item.image[0]?.thumbnails?.small?.url}
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="mb-1">{item.author}</h3>
                <p>
                  {item.role} at {item.company}
                </p>
              </div>
            </div>
            <div>
              <blockquote>
                <p className="mb-6 text-base leading-relaxed">
                  &quot;{item.quote}&quot;
                </p>
              </blockquote>
              <CustomButton text="View project" />
            </div>
          </Link>
        </article>
      ))}
    </>
  );
}
