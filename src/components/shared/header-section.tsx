interface HeaderSectionProps {
  label?: string;
  title: string;
  subtitle?: string;
}

export function HeaderSection({ label, title, subtitle }: HeaderSectionProps) {
  return (
    <div className="mb-8">
      {label ? (
        <div className="text-gradient_indigo-purple mb-4 font-semibold">
          {label}
        </div>
      ) : null}
      <h2>
        {title}
      </h2>
      {subtitle ? (
        <p className="text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
