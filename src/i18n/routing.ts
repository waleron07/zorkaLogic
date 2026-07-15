import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "ru",
  // RU без префикса не делаем: явные /ru и /en лучше для SEO и hreflang
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
