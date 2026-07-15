import { cn } from "@/lib/cn";
import { Container } from "./Container";

// Секция лендинга: единый вертикальный ритм + якорь для навигации.
export function Section({
  id,
  band,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  /** Приглушённая фон-полоса для визуального ритма между секциями. */
  band?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-24",
        band && "border-t border-border bg-surface/30",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

// Заголовок секции (заголовок + подзаголовок) — единый стиль.
export function SectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </div>
  );
}
