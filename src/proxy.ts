// Next.js 16: бывший middleware.ts теперь называется proxy.ts.
// next-intl обрабатывает определение локали и редиректы на /ru | /en.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Не трогаем API, статику Next и файлы с расширением
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
