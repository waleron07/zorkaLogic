import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-600 shadow-[0_12px_30px_-12px_rgba(124,92,255,0.6)]",
  secondary: "border border-border-strong text-fg hover:bg-surface",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

// Ссылка-кнопка (для якорей/CTA).
export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={buttonClass(variant, className)}>
      {children}
    </a>
  );
}
