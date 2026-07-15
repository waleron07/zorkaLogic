import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import type { LandingData } from "@/lib/api/types";

// Серверный компонент: решения рендерятся в HTML (SEO). Данные — пропсами.
export function Services({ data }: { data: LandingData["services"] }) {
  return (
    <Section id="services">
      <SectionHeading title={data.title} subtitle={data.subtitle} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((service, i) => {
          const alt = i % 2 === 1; // чередуем акцент: фиолет / изумруд
          return (
            <Reveal as="article" key={service.id} delay={(i % 3) * 0.06}>
              <Card interactive className="h-full">
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${
                    alt
                      ? "bg-accent-2/10 ring-accent-2/25"
                      : "bg-accent/10 ring-accent/20"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      alt ? "bg-accent-2" : "bg-accent"
                    }`}
                  />
                </div>
                <h3 className="text-base font-semibold leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
