"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSubmitLead } from "@/lib/api/hooks";
import { env } from "@/lib/config";
import { Section } from "@/components/ui/Section";
import { buttonClass } from "@/components/ui/Button";
import type { Locale } from "@/lib/api/types";

function buildSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().min(1, t("errors.name")),
    email: z.string().email(t("errors.email")),
    phone: z.string().optional(),
    message: z.string().min(10, t("errors.message")),
    consent: z.boolean().refine((v) => v === true, t("errors.consent")),
    // honeypot: реальные пользователи не заполняют
    company: z.string().optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

export function LeadForm() {
  const t = useTranslations("form");
  const locale = useLocale() as Locale;
  const submitLead = useSubmitLead();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(t)),
    defaultValues: { consent: false },
  });

  const onSubmit = (values: FormValues) => {
    submitLead.mutate(
      { ...values, locale },
      {
        onSuccess: () => {
          reset();
          // Цель-конверсия в Яндекс.Метрике (если подключена)
          const ym = (window as unknown as { ym?: (...a: unknown[]) => void }).ym;
          if (env.ymId && ym) ym(Number(env.ymId), "reachGoal", "lead");
        },
      },
    );
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-accent";

  return (
    <Section id="contact" band containerClassName="grid gap-12 lg:grid-cols-2">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-md text-muted">{t("subtitle")}</p>
      </div>

        {submitLead.isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-start justify-center rounded-2xl border border-accent/30 bg-accent/5 p-8"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
              ✓
            </div>
            <h3 className="text-lg font-semibold">{t("successTitle")}</h3>
            <p className="mt-1 text-sm text-muted">{t("successText")}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <div>
              <input {...register("name")} placeholder={t("name")} className={inputClass} />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input {...register("email")} type="email" placeholder={t("email")} className={inputClass} />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>
              <input {...register("phone")} placeholder={t("phone")} className={inputClass} />
            </div>

            <div>
              <textarea {...register("message")} rows={4} placeholder={t("message")} className={`${inputClass} resize-none`} />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
            </div>

            {/* honeypot — визуально скрыт от людей */}
            <input
              {...register("company")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <label className="flex items-start gap-2.5 text-sm text-muted">
              <input
                {...register("consent")}
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
              />
              <span>
                {t("consent")}{" "}
                <Link href="/privacy" className="text-accent underline underline-offset-2">
                  {t("privacyLink")}
                </Link>
              </span>
            </label>
            {errors.consent && <p className="-mt-2 text-xs text-red-400">{errors.consent.message}</p>}

            <button
              type="submit"
              disabled={submitLead.isPending}
              className={buttonClass("primary", "mt-1")}
            >
              {submitLead.isPending ? t("submitting") : t("submit")}
            </button>

            {submitLead.isError && (
              <p className="text-sm text-red-400">{t("errorText")}</p>
            )}
          </form>
        )}
    </Section>
  );
}
