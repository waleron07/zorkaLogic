"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  // Якоря делаем home-aware (с префиксом локали): на главной — плавный скролл,
  // с других страниц (напр. /cases) — переход на главную к нужной секции.
  const home = `/${locale}`;
  const links = [
    { href: `${home}#services`, label: t("services") },
    { href: `${home}#cases`, label: t("cases") },
    { href: `${home}#about`, label: t("about") },
    { href: `${home}#process`, label: t("process") },
    { href: `${home}#contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <a href={`${home}#top`} aria-label="ZorkaLogic">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={`${home}#contact`}
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-600 sm:inline-block"
          >
            {t("cta")}
          </a>

          {/* Бургер (только мобилки) */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-fg transition-transform ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-fg transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-fg transition-transform ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Мобильное меню */}
      {open && (
        <nav className="border-t border-border bg-bg/95 px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`${home}#contact`}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                {t("cta")}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
