import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Providers } from "@/components/providers/Providers";
import { YandexMetrika } from "@/components/seo/YandexMetrika";
import { siteConfig } from "@/lib/config";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "cyrillic"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale === "ru";

  return {
    metadataBase: new URL(siteConfig.url),
    title: ru
      ? "ZorkaLogic — Разработка AI-решений, веб-сервисов и мобильных приложений"
      : "ZorkaLogic — AI Solutions, Web Services & Mobile App Development",
    description: ru
      ? "ZorkaLogic разрабатывает AI-решения, веб-сервисы и мобильные приложения. Machine Learning, Computer Vision, обработка речи, анализ временных рядов, Flutter, React, Backend, интеграции с 1С и корпоративными системами."
      : "ZorkaLogic builds AI solutions, web services and mobile apps. Machine Learning, Computer Vision, speech processing, time-series analytics, Flutter, React, Backend, 1C and enterprise integrations.",
    alternates: {
      canonical: `/${locale}`,
      languages: { ru: "/ru", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: ru ? "ru_RU" : "en_US",
      siteName: siteConfig.name,
      url: `/${locale}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
