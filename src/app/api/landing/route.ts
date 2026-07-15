import { NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getLandingData } from "@/lib/content/landing";

// Единый эндпоинт со всеми данными лендинга.
// Позже проксируется/заменяется на бэк — контракт LandingData тот же.
export function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("locale");
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  return NextResponse.json(getLandingData(locale));
}
