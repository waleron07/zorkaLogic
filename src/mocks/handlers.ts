import { http, HttpResponse, delay } from "msw";
import type { LeadRequest } from "@/lib/api/types";

// Весь контент (включая контакты) отдаётся серверным рендером из getLandingData
// (+ реальный GET /api/landing). Мок остаётся только для отправки заявки.
export const handlers = [
  // Приём заявки
  http.post("*/api/leads", async ({ request }) => {
    const body = (await request.json()) as LeadRequest;
    await delay(600);

    // honeypot: заполненное поле company => это бот
    if (body.company) {
      return HttpResponse.json({ error: "spam_detected" }, { status: 400 });
    }
    if (!body.name || !body.email || !body.message || !body.consent) {
      return HttpResponse.json({ error: "validation_error" }, { status: 422 });
    }

    return HttpResponse.json({ id: crypto.randomUUID(), status: "received" });
  }),
];
