import { cn } from "@/lib/cn";

// Центрирующий контейнер с единой макс-шириной и горизонтальными отступами.
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5", className)}>
      {children}
    </div>
  );
}
