// Контракты API — общие для мока (MSW) и будущего реального бэка.

// Единый источник Locale — i18n-роутинг (не дублируем "ru" | "en").
import type { Locale } from "@/i18n/routing";
export type { Locale };

export interface Service {
  id: string;
  title: string; // локализованный
  description: string; // локализованный
  icon: string; // ключ иконки
}

export interface Case {
  id: string;
  category: string; // напр. "Speech Detection" (техническая метка)
  title: string; // локализованное описание задачи
  metricLabel: string; // локализованное: "Точность" | "MAPE" | ...
  metricValue: string; // "98.1%" — язык-нейтрально
  stack: string[]; // ["PyTorch", "ONNX", "C++"]
}

export interface SocialLink {
  type: string; // "telegram" | "github" | "email" | ...
  url: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  socials: SocialLink[];
}

export interface LeadRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean; // согласие на обработку ПДн (152-ФЗ)
  locale: Locale;
  // honeypot-поле от ботов; на реальном бэке отклоняем заполненное
  company?: string;
}

export interface LeadResponse {
  id: string;
  status: "received";
}

// Все данные лендинга — одним ответом (GET /api/landing).
interface SectionText {
  title: string;
  subtitle: string;
}
interface TitleDesc {
  title: string;
  description: string;
}
export interface LandingData {
  hero: {
    badge: string;
    title: string; // может содержать <grad>...</grad> для градиентного слова
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: SectionText & { items: Service[] };
  cases: SectionText & { items: Case[] };
  about: SectionText & { features: TitleDesc[] };
  process: SectionText & { steps: TitleDesc[] };
  contacts: ContactInfo;
}
