import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import type { ContactInfo } from "@/lib/api/types";

// Серверный компонент. Контакты приходят пропсом (единый источник — getLandingData).
export function Footer({ contacts }: { contacts: ContactInfo }) {
  const t = useTranslations("footer");

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm text-muted">{t("tagline")}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${contacts.email}`} className="text-muted transition-colors hover:text-fg">
            {contacts.email}
          </a>
          {contacts.phone && (
            <a href={`tel:${contacts.phone.replace(/[^+\d]/g, "")}`} className="text-muted transition-colors hover:text-fg">
              {contacts.phone}
            </a>
          )}
          <div className="mt-1 flex gap-4">
            {contacts.socials.map((s) => (
              <a
                key={s.type}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize text-muted transition-colors hover:text-fg"
              >
                {s.type}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <span>© 2026 ZorkaLogic. {t("rights")}</span>
          <Link href="/privacy" className="transition-colors hover:text-fg">
            {t("privacy")}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
