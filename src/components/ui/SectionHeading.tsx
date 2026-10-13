import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  /** Use "h1" once per page (the main title) and "h2" for sections. */
  level?: "h1" | "h2";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  level = "h2",
  className,
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-sand-600">{eyebrow}</p>
      )}
      <Heading
        className={cn(
          "font-serif font-semibold text-ink-900",
          level === "h1" ? "text-3xl lg:text-5xl" : "text-3xl lg:text-4xl",
        )}
      >
        {title}
      </Heading>
    </div>
  );
}