import { services } from "@/lib/content/services";
import { contacts } from "@/lib/content/contacts";
import { siteConfig } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

// Структурированные данные для поисковиков (Organization + каталог услуг).
export function JsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    email: contacts.email,
    description:
      locale === "ru"
        ? "Разработка AI-решений, веб-сервисов и мобильных приложений: Machine Learning, Computer Vision, обработка речи, анализ временных рядов, Flutter, Backend, интеграции с 1С."
        : "AI solutions, web services and mobile app development: Machine Learning, Computer Vision, speech processing, time-series analytics, Flutter, Backend, 1C integrations.",
    sameAs: contacts.socials.map((s) => s.url),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title[locale],
        description: s.description[locale],
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
