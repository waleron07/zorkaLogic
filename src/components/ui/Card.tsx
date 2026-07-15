import { cn } from "@/lib/cn";

// Карточка — единый стиль поверхности (услуги, преимущества, шаги).
export function Card({
  className,
  interactive,
  children,
}: {
  className?: string;
  interactive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface/50 p-6",
        interactive && "transition-colors hover:border-accent/40 hover:bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}
