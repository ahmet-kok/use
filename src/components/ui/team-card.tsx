import { SiLinkedin } from "react-icons/si";

import { placeholderBlurhash } from "@/lib/utils";

import BlurImage from "../shared/blur-image";
import CustomButton from "../shared/custom-button";
import { Section } from "../shared/section";

export function TeamCard({
  index,
  name,
  role,
  image,
  linkedin,
  bio,
}: {
  index: number;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  bio: string;
}) {
  return (
    <div className="group space-y-6">
      {image && (
        <BlurImage
          alt={name || ""}
          blurDataURL={placeholderBlurhash}
          className="aspect-[4/3] shrink-0 overflow-hidden rounded-lg object-cover"
          width={800}
          height={600}
          placeholder="blur"
          loading={index < 2 ? "eager" : "lazy"}
          src={image}
          sizes={`(max-width: 800px) 800px, 600px`}
          priority={index < 2}
        />
      )}
      <div className="space-y-2">
        <div className="flex items-center gap-2 justify-between">
          <span>{role}</span>
{/*           <CustomButton link={linkedin} text={"Connect"} icon={<SiLinkedin className="size-5"/>} />
 */}        </div>
        <Section tag="h2" title={name} text={bio} />
      </div>
    </div>
  );
}
