// Канонические кейсы (моковые данные). Формат «сделали X → получили Y».
// Заказчики не раскрываются — только задача, метрика результата и стек.
// Позже отдаётся реальным бэком через тот же контракт Case.
import type { Locale } from "@/i18n/routing";
import type { Case } from "@/lib/api/types";

export interface LocalizedCase {
  id: string;
  category: string;
  title: Record<Locale, string>;
  metricLabel: Record<Locale, string>;
  metricValue: string;
  stack: string[];
}

export const cases: LocalizedCase[] = [
  {
    id: "speech-detection",
    category: "Speech Detection",
    title: {
      ru: "Обнаружение речи в зашумлённом сигнале",
      en: "Speech detection in a noisy signal",
    },
    metricLabel: { ru: "Точность", en: "Accuracy" },
    metricValue: "98.1%",
    stack: ["PyTorch", "ONNX", "C++"],
  },
  {
    id: "demand-forecasting",
    category: "Forecasting",
    title: {
      ru: "Прогнозирование спроса для ритейла",
      en: "Demand forecasting for retail",
    },
    metricLabel: { ru: "MAPE", en: "MAPE" },
    metricValue: "3.2%",
    stack: ["Python", "LightGBM", "Prophet"],
  },
  {
    id: "defect-detection",
    category: "Computer Vision",
    title: {
      ru: "Контроль качества продукции на конвейере",
      en: "Production quality control on the line",
    },
    metricLabel: { ru: "Полнота (recall)", en: "Recall" },
    metricValue: "99.4%",
    stack: ["PyTorch", "YOLO", "TensorRT"],
  },
  {
    id: "doc-ocr",
    category: "OCR / NLP",
    title: {
      ru: "Распознавание и разбор документов",
      en: "Document recognition and parsing",
    },
    metricLabel: { ru: "Точность полей", en: "Field accuracy" },
    metricValue: "96.7%",
    stack: ["Python", "Transformers", "FastAPI"],
  },
  {
    id: "anomaly-timeseries",
    category: "Time Series",
    title: {
      ru: "Детекция аномалий в IoT-телеметрии",
      en: "Anomaly detection in IoT telemetry",
    },
    metricLabel: { ru: "F1-score", en: "F1-score" },
    metricValue: "0.94",
    stack: ["Python", "LSTM", "Kafka"],
  },
  {
    id: "voice-assistant",
    category: "Speech / Edge AI",
    title: {
      ru: "Голосовой ассистент на встроенном устройстве",
      en: "Voice assistant on an embedded device",
    },
    metricLabel: { ru: "Задержка", en: "Latency" },
    metricValue: "120ms",
    stack: ["C++", "TFLite", "VAD"],
  },
];

// Локализованные кейсы для серверного рендера (SEO).
// Когда появится бэк/CMS — заменить на async fetch, контракт Case тот же.
export function getCases(locale: Locale): Case[] {
  return cases.map((c) => ({
    id: c.id,
    category: c.category,
    title: c.title[locale],
    metricLabel: c.metricLabel[locale],
    metricValue: c.metricValue,
    stack: c.stack,
  }));
}
