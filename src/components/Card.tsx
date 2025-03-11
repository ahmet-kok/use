import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import { placeholderBlurhash } from "@/lib/utils";

import BlurImage from "./shared/blur-image";
import CustomButton from "./shared/custom-button";

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  link: string;
  linkText?: string;
  image?: string;
  className?: string;
  index: number;
  articleClassName?: string;
  imageClassName?: string;
  contentClassName?: string;
  details?: string[];
  titleClassName?: string;
  descriptionClassName?: string;
  detailsClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export function Card({
  children,
  title,
  description,
  details,
  link,
  linkText,
  image,
  index,
  articleClassName = "",
  imageClassName = "",
  contentClassName = "",
  titleClassName = "",
  detailsClassName = "",
  descriptionClassName = "",
  imageWidth = 64,
  imageHeight = 64,
  className = "",
}: CardProps) {
  return (
    <>
      <article className="group">
        <Link prefetch={true} href={link || "#"} className={`${className}`}>
          <div className={`${articleClassName}`}>
            {image && (
              <BlurImage
                alt={title || ""}
                blurDataURL={placeholderBlurhash}
                className={`${imageClassName}`}
                width={imageWidth}
                height={imageHeight}
                placeholder="blur"
                loading={index < 2 ? "eager" : "lazy"}
                src={image}
                sizes={`(max-width: ${imageWidth}px) ${imageWidth}px, ${imageHeight}px`}
                priority={index < 2}
              />
            )}
            {title && (
              <div className={`${contentClassName}`}>
                {details && (
                  <div className={`${detailsClassName}`}>
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
                )}
                {title && <h2 className={`${titleClassName}`}>{title}</h2>}
                {description && (
                  <p className={`${descriptionClassName}`}>{description}</p>
                )}
              </div>
            )}
            {link && <CustomButton text={linkText || "Read More"} />}
          </div>
          {children && children}
        </Link>
      </article>
    </>
  );
}
