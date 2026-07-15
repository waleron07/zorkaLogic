import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { LeadForm } from "@/components/sections/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLandingData } from "@/lib/content/landing";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Все данные лендинга — одним вызовом (единый источник = будущий GET /api/landing).
  const data = getLandingData(locale);
  const t = await getTranslations("cases");

  return (
    <>
      <JsonLd locale={locale} />
      <Header />
      <main className="flex-1">
        <Hero data={data.hero} />
        <Services data={data.services} />
        <Cases data={data.cases} viewAllLabel={t("viewAll")} />
        <About data={data.about} />
        <Process data={data.process} />
        <LeadForm />
      </main>
      <Footer contacts={data.contacts} />
    </>
  );
}
