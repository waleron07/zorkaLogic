import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import type { LandingData } from "@/lib/api/types";

export function About({ data }: { data: LandingData["about"] }) {
  return (
    <Section id="about" band>
      <SectionHeading title={data.title} subtitle={data.subtitle} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {data.features.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 2) * 0.08}>
            <Card className="h-full">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                <span className="text-sm font-semibold">{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
