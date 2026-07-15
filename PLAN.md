# ZorkaLogic — План разработки

> Продающий двухязычный (RU/EN) лендинг. Стиль: **тёмный tech / минимализм** (референсы: Linear, Vercel, Better Stack).
> Фронт пишем первым, бэк — позже. Данные (услуги/контакты/заявки) сначала отдаёт **моковое API**, потом подключаем реальный бэк без переписывания фронта.

- **Frontend:** `/Users/waleron.90yandex.ru/Desktop/ZorkaLogic/frontend`
- **Backend:** `/Users/waleron.90yandex.ru/Desktop/ZorkaLogic/backend` (пишем позже)
- **Деплой:** свой VPS (Node + nginx reverse-proxy, `next start` под pm2)

---

## Технологический стек

| Область | Выбор | Зачем |
|---|---|---|
| Фреймворк | **Next.js (App Router) + TypeScript** | SSR/SSG, SEO из коробки, hreflang для RU/EN |
| Стили | **Tailwind CSS** | адаптив под все ширины, тёмная тема, быстрый темизинг |
| Серверные данные | **TanStack Query (React Query)** | загрузка услуг/контактов, отправка заявок, кеш и статусы |
| Клиентский стейт | **Zustand** | язык, тема, мелкий UI-стейт |
| i18n | **next-intl** | RU/EN, локализованные URL `/ru` и `/en` (важно для SEO) |
| Моковое API | **MSW (Mock Service Worker)** | перехватывает реальные fetch; выключаем при переходе на бэк |
| Формы | **react-hook-form + zod** | валидация заявки |
| Анимации | **Framer Motion** | появление при скролле, плавность |
| SEO | next/metadata, JSON-LD, sitemap, robots | индексация, ключевые слова |

**Разделение хранилища:** React Query = всё «серверное» (услуги, контакты, заявки). Zustand = клиентские мелочи (язык, тема). Это стандарт 2026.

---

## Визуальный язык (черновик, уточняется)

- Фон: почти чёрный `#0A0A0B`, поверхности `#141416`
- Акцент: **неоновый сине-фиолетовый `#7C5CFF`** — выбран (совпадает с логотипом)
- Типографика: Inter / Geist, крупные заголовки, чёткая иерархия
- Эффекты: тонкие градиентные свечения, аккуратные анимации на скролле
- Настроение: строго, дорого, современно

---

## Фазы

### Фаза 0 — Каркас проекта ✅ ГОТОВО
- [x] `create-next-app` (Next 16.2, TS, Tailwind v4, App Router, ESLint, src/)
- [x] `git init` + `.gitignore` + `.env.example`/`.env.local` (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_USE_MOCKS`, `NEXT_PUBLIC_SITE_URL`)
- [x] Настройка next-intl: RU (по умолчанию) / EN, роутинг `/ru` `/en`, `proxy.ts` (Next 16 = бывший middleware), файлы переводов
- [x] Базовый layout, тёмная тема, шрифты Geist через **`next/font`** (subset cyrillic)
- [x] Дизайн-токены в `globals.css` (@theme, акцент `#7C5CFF`, reduced-motion, focus-visible)
- [x] TanStack Query provider + MSW (неблокирующий старт, через env, dev)
- [x] Логотип — воссоздан как SVG-марка (сфера-нейросеть) + вордмарк в `components/ui/Logo.tsx`
      _(TODO позже: при желании подменить на обрезанный PNG из исходника + favicon-набор)_

### Фаза 1 — Моковый API-слой ✅ ГОТОВО
- [x] Типы данных: `Service`, `ContactInfo`, `LeadRequest` (+consent/honeypot), `LeadResponse`
- [x] MSW-хендлеры (`src/mocks/`):
  - `GET /api/services?locale=` → 9 услуг (локализованные)
  - `GET /api/contacts` → контакты-заглушки
  - `POST /api/leads` → приём заявки (валидация, honeypot, задержка, успех/ошибка)
- [x] React Query хуки: `useServices()`, `useContacts()`, `useSubmitLead()`
- [x] Единый слой `api/client.ts` (base URL из env → переключение на бэк одной переменной)

### Фаза 2 — Секции лендинга (адаптив + i18n) ✅ секции готовы
- [x] Header: лого, якорная навигация, переключатель языка RU/EN
- [x] Hero: заголовок + подзаголовок + CTA (один экран, Framer Motion)
- [x] Услуги: карточки из `GET /api/services` (React Query + MSW)
- [x] Мобильное меню (бургер) для Header
- [x] Преимущества / «Почему мы» (About, 4 карточки)
- [x] Процесс работы: исследование → архитектура → разработка → обучение моделей → внедрение → поддержка (6 шагов)
- [x] Форма заявки: `POST /api/leads`, состояния loading/success/error (react-hook-form + zod)
  - [x] Чекбокс **согласия на обработку ПДн (152-ФЗ)** — обязателен для отправки
  - [x] Антиспам: honeypot-поле (rate-limit добавим на бэке в Фазе 5)
- [x] Footer: контакты из `GET /api/contacts`, соцсети, ссылка на «Политику обработки ПДн»
- [x] Страница «Политика обработки персональных данных» (RU/EN) `/privacy`, ссылки подключены
- [x] Страницы `not-found` (404) и `error` (локализованные)
- [x] Все секции адаптивны 360px → 4K (Tailwind, mobile-first)
- [~] Доступность: `prefers-reduced-motion` ✅, focus-visible ✅; клавиатура/aria — финальная ревизия в Фазе 3

### Фаза 3 — SEO и полировка ✅ основное готово
- [x] Метаданные (title/description) на каждую локаль
- [x] Open Graph + OG-картинка (next/og, брендовая, RU/EN)
- [x] JSON-LD: Organization + каталог услуг (LocalBusiness — когда будет адрес с бэка)
- [x] `hreflang` для RU/EN, canonical
- [x] `sitemap.xml`, `robots.txt` (с hreflang-alternates)
- [x] **Аналитика**: Яндекс.Метрика (env `NEXT_PUBLIC_YM_ID`), цель-конверсия `lead` на отправку заявки
- [x] Hero виден без JS (CSS-анимации вместо Framer Motion)
- [ ] Оптимизация изображений (next/image) — появятся с реальным контентом/скринами
- [ ] Lighthouse (Performance/SEO/Accessibility) + финальная a11y-ревизия — прогнать в браузере
- [ ] Прогнать форму заявки в реальном браузере (сабмит + цель Метрики)

### Фаза 4 — Деплой фронта на VPS
- [ ] `next build && next start` под pm2
- [ ] nginx reverse-proxy + HTTPS (certbot)
- [ ] Переменные окружения (`NEXT_PUBLIC_API_URL`)

### Фаза 5 — Реальный бэк (директория `backend/`)
- [ ] Отключаем MSW (`NEXT_PUBLIC_USE_MOCKS=false`), `NEXT_PUBLIC_API_URL` → на реальный бэк
- [ ] Бэк хранит заявки (endpoint `POST /api/leads`), отдаёт услуги/контакты
- [ ] Уведомление о заявке: письмо на email / Telegram-бот
- [ ] Серверный антиспам: rate-limit + проверка honeypot
- [ ] Фронт **не переписываем** — совпадают контракты API

---

## Контракты API (черновик — общие для мока и бэка)

```ts
type Service = {
  id: string;
  title: string;        // локализованный
  description: string;  // локализованный
  icon?: string;
};

type ContactInfo = {
  email: string;
  phone?: string;
  address?: string;
  socials?: { type: string; url: string }[];
};

type LeadRequest = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;     // согласие на обработку ПДн (152-ФЗ)
  locale: 'ru' | 'en';
};

type LeadResponse = { id: string; status: 'received' };
```

---

## Контент
Весь текст (о компании, 9 услуг, SEO title/description/keywords, структура секций) — в **`CONTENT.md`**.
ZorkaLogic = студия AI/ML + fullstack-разработки «под ключ» (Computer Vision, Speech/VAD, time series, веб, backend, Flutter, Embedded AI, интеграции 1С/CRM/ERP).

## Решения
- [x] Акцентный цвет — сине-фиолетовый (`#7C5CFF`); совпадает с брендом логотипа
- [x] Логотип — исходник `../ChatGPT Image ...11_20_24.png` (3D-мокап сферы-нейросети на сером фоне).
      TODO Фаза 0: вырезать сферу с прозрачным фоном → лого в хедере + favicon; вордмарк «ZorkaLogic» воссоздать в CSS на тёмном фоне со свечением.
- [x] Язык по умолчанию — **RU** (EN переключением)
- [x] Контакты — пока плейсхолдеры в моке; реальные приедут с бэка позже
