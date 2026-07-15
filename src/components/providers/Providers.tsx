"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { env } from "@/lib/config";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false, retry: 1 },
    },
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  // MSW стартуем не блокируя рендер: контент сразу рендерится (важно для SEO),
  // а api-клиент дожидается готовности воркера перед запросами (см. client.ts).
  useEffect(() => {
    if (env.useMocks) void import("@/mocks/browser").then((m) => m.startMocks());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
