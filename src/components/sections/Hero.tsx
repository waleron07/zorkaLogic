import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import type { LandingData } from "@/lib/api/types";

// Рендер заголовка с градиентным словом (<grad>...</grad>).
function renderTitle(title: string) {
  return title.split(/<grad>(.*?)<\/grad>/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-gradient">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

// Hero — серверный компонент. Данные приходят пропсами (единый источник —
// getLandingData). Анимация появления через CSS (виден без JS — SEO/скорость).
export function Hero({ data }: { data: LandingData["hero"] }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="aurora pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[640px]"
      />
      <Container className="relative max-w-4xl py-28 text-center sm:py-36">
        <span
          className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted"
          style={{ animationDelay: "0ms" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent-2"
            style={{ boxShadow: "0 0 10px var(--accent-2)" }}
          />
          {data.badge}
        </span>

        <h1
          className="animate-fade-up mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
          style={{ animationDelay: "60ms" }}
        >
          {renderTitle(data.title)}
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={{ animationDelay: "120ms" }}
        >
          {data.subtitle}
        </p>

        <div
          className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "180ms" }}
        >
          <ButtonLink href="#contact" className="w-full sm:w-auto">
            {data.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="#services" variant="secondary" className="w-full sm:w-auto">
            {data.ctaSecondary}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
