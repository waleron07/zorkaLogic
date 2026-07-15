import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import type { Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "ZorkaLogic — Политика обработки персональных данных",
  robots: { index: true, follow: true },
};

const content: Record<Locale, { title: string; updated: string; body: string[] }> = {
  ru: {
    title: "Политика обработки персональных данных",
    updated: "Последнее обновление: 2026",
    body: [
      "Настоящая Политика описывает, как ZorkaLogic обрабатывает персональные данные пользователей сайта в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».",
      "Мы собираем данные, которые вы добровольно указываете в форме заявки: имя, адрес электронной почты, телефон (по желанию) и текст сообщения.",
      "Цель обработки — связаться с вами по вашему запросу, подготовить коммерческое предложение и оказать услуги. Данные не передаются третьим лицам, кроме случаев, предусмотренных законом.",
      "Отправляя форму, вы даёте согласие на обработку указанных персональных данных. Вы можете отозвать согласие, написав нам на указанный контактный адрес.",
      "Мы принимаем разумные организационные и технические меры для защиты данных от несанкционированного доступа.",
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 2026",
    body: [
      "This Policy describes how ZorkaLogic processes personal data of website users.",
      "We collect the data you voluntarily provide in the contact form: name, email, phone (optional) and message.",
      "The purpose of processing is to contact you regarding your request, prepare a proposal and deliver services. Data is not shared with third parties except as required by law.",
      "By submitting the form you consent to the processing of the specified personal data. You may withdraw consent by contacting us at the provided email.",
      "We apply reasonable organizational and technical measures to protect the data from unauthorized access.",
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale];

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10">
      <Link href="/" aria-label="ZorkaLogic" className="inline-flex">
        <Logo />
      </Link>

      <main className="mt-12 flex-1">
        <h1 className="text-3xl font-semibold tracking-tight">{c.title}</h1>
        <p className="mt-2 text-sm text-muted">{c.updated}</p>
        <div className="mt-8 flex flex-col gap-5 text-muted leading-relaxed">
          {c.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-block rounded-full border border-border px-5 py-2.5 text-sm text-fg transition-colors hover:bg-surface"
        >
          ← {locale === "ru" ? "На главную" : "Back home"}
        </Link>
      </main>
    </div>
  );
}
