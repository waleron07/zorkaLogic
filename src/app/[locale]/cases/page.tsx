import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CaseCard } from "@/components/cases/CaseCard";
import { getLandingData } from "@/lib/content/landing";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/cases`,
      languages: { ru: "/ru/cases", en: "/en/cases" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      url: `/${locale}/cases`,
    },
  };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cases");
  const data = getLandingData(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Section>
          <SectionHeading title={t("pageHeading")} subtitle={t("pageIntro")} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.cases.items.map((c, i) => (
              <Reveal as="article" key={c.id} delay={(i % 3) * 0.06}>
                <CaseCard data={c} />
              </Reveal>
            ))}
          </div>
        </Section>
      </main>
      <Footer contacts={data.contacts} />
    </>
  );
}
