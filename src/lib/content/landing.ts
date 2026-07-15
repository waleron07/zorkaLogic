// Единый источник всех данных лендинга — одним объектом (и одним GET /api/landing).
// Сейчас собирается из контент-модулей и переводов; когда появится бэк/CMS —
// эта функция заменится на fetch к бэку, контракт LandingData тот же.
import type { Locale } from "@/i18n/routing";
import type { LandingData } from "@/lib/api/types";
import { getServices } from "./services";
import { getCases } from "./cases";
import { contacts } from "./contacts";
import ru from "../../../messages/ru.json";
import en from "../../../messages/en.json";

const messages = { ru, en };

const FEATURE_KEYS = ["fullstack", "ai", "lifecycle", "integrations"] as const;
const STEP_KEYS = [
  "research",
  "architecture",
  "development",
  "training",
  "deployment",
  "support",
] as const;

export function getLandingData(locale: Locale): LandingData {
  const m = messages[locale];

  return {
    hero: {
      badge: m.hero.badge,
      title: m.hero.title,
      subtitle: m.hero.subtitle,
      ctaPrimary: m.hero.ctaPrimary,
      ctaSecondary: m.hero.ctaSecondary,
    },
    services: {
      title: m.services.title,
      subtitle: m.services.subtitle,
      items: getServices(locale),
    },
    cases: {
      title: m.cases.title,
      subtitle: m.cases.subtitle,
      items: getCases(locale),
    },
    about: {
      title: m.about.title,
      subtitle: m.about.subtitle,
      features: FEATURE_KEYS.map((k) => m.about.features[k]),
    },
    process: {
      title: m.process.title,
      subtitle: m.process.subtitle,
      steps: STEP_KEYS.map((k) => m.process.steps[k]),
    },
    contacts,
  };
}
