import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import type { LandingData } from "@/lib/api/types";

export function Process({ data }: { data: LandingData["process"] }) {
  return (
    <Section id="process">
      <SectionHeading title={data.title} subtitle={data.subtitle} />

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={(i % 3) * 0.06}>
            <Card className="h-full">
              <span className="font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
