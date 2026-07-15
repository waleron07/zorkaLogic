import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// Запуск воркера — один раз, с мемоизацией промиса.
// Запросы дожидаются этого промиса, чтобы не уходить в сеть до старта MSW.
let startPromise: Promise<unknown> | null = null;
export function startMocks() {
  if (!startPromise) {
    startPromise = worker.start({ onUnhandledRequest: "bypass" });
  }
  return startPromise;
}
