import { getBlurDataURL } from "@/lib/utils";
import BlurImage from "@/components/shared/blur-image";

export default async function Author({
  name,
  title,
  image,
  imageOnly = false,
}: {
  name: string;
  title: string;
  image: string;
  imageOnly?: boolean;
}) {
  if (imageOnly) {
    return (
      <BlurImage
        src={image}
        alt={name}
        width={40}
        height={40}
        
        loading="lazy"
        placeholder="blur"
        blurDataURL={await getBlurDataURL(image!)}
        className="size-8 rounded-full transition-all group-hover:brightness-90 md:size-10"
      />
    );
  }

  return (
    <div className="group flex w-max items-center space-x-2.5">
      <BlurImage
        src={image}
        alt={name}
        width={40}
        height={40}
        
        loading="lazy"
        placeholder="blur"
        blurDataURL={await getBlurDataURL(image!)}
        className="size-8 rounded-full transition-all group-hover:brightness-90 md:size-10"
      />
      <div className="flex flex-col -space-y-0.5">
        <p className="font-semibold text-foreground max-md:text-sm">{name}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}
