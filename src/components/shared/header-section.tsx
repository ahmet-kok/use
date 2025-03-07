import CustomButton from "./custom-button";

interface HeaderSectionProps {
  label?: string;
  title: string;
  subtitle?: string;
  link?: string;
  linkText?: string;
  main?: boolean;
}

export function HeaderSection({
  label,
  title,
  subtitle,
  link,
  linkText,
  main,
}: HeaderSectionProps) {
  if (main) {
    return (
      <div className="mb-8 flex items-baseline justify-between">
        <div>
          {label ? (
            <div className="text-gradient_indigo-purple mb-4 font-semibold">
              {label}
            </div>
          ) : null}
          <h1>{title}</h1>
          {subtitle ? <p className="text-base">{subtitle}</p> : null}
        </div>
        {link && <CustomButton link={link} text={linkText || "Read More"} />}
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-baseline justify-between">
      <div>
        {label ? (
          <div className="text-gradient_indigo-purple mb-4 font-semibold">
            {label}
          </div>
        ) : null}
        <h2>{title}</h2>
        {subtitle ? <p className="text-base">{subtitle}</p> : null}
      </div>
      {link && <CustomButton link={link} text={linkText || "Read More"} />}
    </div>
  );
}
