// Единая точка доступа к окружению и константам сайта.
// NEXT_PUBLIC_* инлайнятся Next при сборке — обращаемся к ним только здесь.

export const siteConfig = {
  name: "ZorkaLogic",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zorkalogic.com",
} as const;

export const env = {
  /** Базовый URL API. Пусто = относительные пути (перехватываются MSW). */
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  /** Включено моковое API (MSW). */
  useMocks: process.env.NEXT_PUBLIC_USE_MOCKS === "true",
  /** ID счётчика Яндекс.Метрики (пусто = аналитика выключена). */
  ymId: process.env.NEXT_PUBLIC_YM_ID || undefined,
} as const;
