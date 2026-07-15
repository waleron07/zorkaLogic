// Единая точка запросов. Меняем NEXT_PUBLIC_API_URL — и уходим с моков на бэк,
// не трогая компоненты.
import { env } from "@/lib/config";

// В dev с моками ждём старта MSW, чтобы запрос не ушёл в сеть до перехвата.
async function ensureMocks() {
  if (env.useMocks && typeof window !== "undefined") {
    const { startMocks } = await import("@/mocks/browser");
    await startMocks();
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  await ensureMocks();
  const res = await fetch(`${env.apiUrl}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
};
