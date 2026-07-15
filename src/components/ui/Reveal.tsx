"use client";

import { motion } from "motion/react";

type Tag = "div" | "article" | "li";

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
} as const;

// Появление блока при попадании в вьюпорт (уважает prefers-reduced-motion).
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: {
  as?: Tag;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const Comp = motion[as];
  return (
    <Comp {...reveal} transition={{ duration: 0.4, delay }} className={className}>
      {children}
    </Comp>
  );
}
