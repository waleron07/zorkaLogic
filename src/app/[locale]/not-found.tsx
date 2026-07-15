import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";

export default async function NotFound() {
  const locale = await getLocale();
  const ru = locale === "ru";

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center">
      <Logo />
      <p className="mt-10 font-mono text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold">
        {ru ? "Страница не найдена" : "Page not found"}
      </h1>
      <p className="mt-2 text-muted">
        {ru
          ? "Возможно, страница была перемещена или удалена."
          : "The page may have been moved or deleted."}
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-600"
      >
        {ru ? "На главную" : "Back home"}
      </Link>
    </div>
  );
}
