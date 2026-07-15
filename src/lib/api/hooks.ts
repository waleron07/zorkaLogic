"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "./client";
import type { LeadRequest, LeadResponse } from "./types";

// Контент лендинга (включая контакты) рендерится на сервере из getLandingData.
// Клиентский API-слой нужен только для отправки заявки.
export function useSubmitLead() {
  return useMutation({
    mutationFn: (lead: LeadRequest) =>
      api.post<LeadResponse>("/api/leads", lead),
  });
}
