import { Card } from "@/components/ui/Card";
import type { Case } from "@/lib/api/types";

// Карточка кейса: задача → метрика результата → стек.
export function CaseCard({ data }: { data: Case }) {
  return (
    <Card interactive className="flex h-full flex-col">
      <span className="text-xs font-medium uppercase tracking-wide text-accent-2">
        {data.category}
      </span>
      <h3 className="mt-2 text-base font-semibold leading-snug">{data.title}</h3>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight">
          {data.metricValue}
        </span>
        <span className="text-sm text-muted">{data.metricLabel}</span>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {data.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-bg/40 px-2 py-0.5 font-mono text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
}
