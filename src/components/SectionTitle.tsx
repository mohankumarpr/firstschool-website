export function SectionTitle({
  tagline,
  title,
  align = "center",
  className = "",
}: {
  tagline?: string;
  title: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "text-left"} mb-10 ${className}`}>
      {tagline && (
        <p className="mb-2 font-script text-[20px] leading-[1.2em] text-brand-orange md:text-[24px]">
          {tagline}
        </p>
      )}
      <h2 className="mt-[5px] text-[30px] leading-[1.25em] font-bold text-[#0b2038] md:text-[40px]">
        {title}
      </h2>
    </div>
  );
}
