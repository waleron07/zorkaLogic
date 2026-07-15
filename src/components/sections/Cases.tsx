import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CaseCard } from "@/components/cases/CaseCard";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/Button";
import type { LandingData } from "@/lib/api/types";

// Блок кейсов на главной (серверный рендер — в HTML для SEO). Данные — пропсами.
// Показывает превью, полный список — на /cases.
export function Cases({
  data,
  viewAllLabel,
  limit = 6,
}: {
  data: LandingData["cases"];
  viewAllLabel: string;
  limit?: number;
}) {
  const items = data.items.slice(0, limit);

  return (
    <Section id="cases" band>
      <SectionHeading title={data.title} subtitle={data.subtitle} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <Reveal as="article" key={c.id} delay={(i % 3) * 0.06}>
            <CaseCard data={c} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/cases" className={buttonClass("secondary")}>
          {viewAllLabel} →
        </Link>
      </div>
    </Section>
  );
}
