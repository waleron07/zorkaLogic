import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/routing";

export const alt = "ZorkaLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tagline =
    locale === "ru"
      ? "AI-решения, веб-сервисы и мобильные приложения"
      : "AI solutions, web services and mobile apps";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0b",
          backgroundImage:
            "radial-gradient(60% 60% at 30% 30%, rgba(124,92,255,0.35), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "linear-gradient(135deg, #8f7bff, #2c1e78)",
            }}
          />
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "#ededf0" }}>
            <span>Zorka</span>
            <span style={{ color: "#7c5cff" }}>Logic</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 40,
            lineHeight: 1.2,
            color: "#9a9aa6",
            maxWidth: 900,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
