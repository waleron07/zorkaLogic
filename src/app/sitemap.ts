import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";

// Маршруты сайта (без префикса локали). Расширяется по мере роста IA.
const PATHS = ["", "/cases"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
    );

    return routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" && locale === routing.defaultLocale ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
