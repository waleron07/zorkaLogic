// Продуктовые направления (решения, не стек). Заголовки — узнаваемые
// продуктовые названия, описания — про результат для бизнеса.
// Технологии живут в кейсах, а не здесь.
import type { Locale } from "@/i18n/routing";
import type { Service } from "@/lib/api/types";

export interface LocalizedService {
  id: string;
  icon: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const services: LocalizedService[] = [
  {
    id: "ai-studio",
    icon: "brain",
    title: { ru: "AI Studio", en: "AI Studio" },
    description: {
      ru: "Кастомные AI/ML-решения под вашу задачу — от исследования и обучения моделей до внедрения, MLOps и Edge AI.",
      en: "Custom AI/ML solutions for your task — from research and model training to deployment, MLOps and Edge AI.",
    },
  },
  {
    id: "computer-vision",
    icon: "eye",
    title: { ru: "Computer Vision", en: "Computer Vision" },
    description: {
      ru: "Распознавание объектов, видеоаналитика и автоматический контроль качества продукции.",
      en: "Object detection, video analytics and automated product quality control.",
    },
  },
  {
    id: "speech-ai",
    icon: "waveform",
    title: { ru: "Speech AI", en: "Speech AI" },
    description: {
      ru: "Распознавание речи, Voice Activity Detection, голосовые интерфейсы и анализ аудиосигналов.",
      en: "Speech recognition, Voice Activity Detection, voice interfaces and audio-signal analysis.",
    },
  },
  {
    id: "forecasting",
    icon: "chart",
    title: { ru: "Forecasting", en: "Forecasting" },
    description: {
      ru: "Прогнозирование спроса, финансовых показателей и IoT-данных на основе временных рядов.",
      en: "Forecasting demand, financial metrics and IoT data from time-series.",
    },
  },
  {
    id: "web-platforms",
    icon: "globe",
    title: { ru: "Web Platforms", en: "Web Platforms" },
    description: {
      ru: "Корпоративные веб-платформы, личные кабинеты, CRM/ERP и интеграции с 1С и внешними API.",
      en: "Enterprise web platforms, customer portals, CRM/ERP and integrations with 1C and external APIs.",
    },
  },
  {
    id: "mobile-apps",
    icon: "smartphone",
    title: { ru: "Mobile Apps", en: "Mobile Apps" },
    description: {
      ru: "Кроссплатформенные мобильные приложения для iOS и Android на Flutter.",
      en: "Cross-platform iOS and Android mobile apps built with Flutter.",
    },
  },
];

// Локализованные решения для серверного рендера (SEO).
// Когда появится CMS/бэк — заменить на async fetch, контракт Service тот же.
export function getServices(locale: Locale): Service[] {
  return services.map((s) => ({
    id: s.id,
    icon: s.icon,
    title: s.title[locale],
    description: s.description[locale],
  }));
}
