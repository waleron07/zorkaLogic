// Контакты-заглушки. Реальные приедут с бэка позже (тот же контракт ContactInfo).
import type { ContactInfo } from "@/lib/api/types";

export const contacts: ContactInfo = {
  email: "hello@zorkalogic.com",
  phone: "+7 (000) 000-00-00",
  socials: [
    { type: "telegram", url: "https://t.me/zorkalogic" },
    { type: "github", url: "https://github.com/zorkalogic" },
  ],
};
