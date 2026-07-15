"use client";

import { useLocale } from "next-intl";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const locale = useLocale();
  const ru = locale === "ru";

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center">
      <h1 className="text-2xl font-semibold">
        {ru ? "Что-то пошло не так" : "Something went wrong"}
      </h1>
      <p className="mt-2 text-muted">
        {ru
          ? "Произошла ошибка. Попробуйте обновить страницу."
          : "An error occurred. Please try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-600"
      >
        {ru ? "Повторить" : "Retry"}
      </button>
    </div>
  );
}
