// Фирменная марка ZorkaLogic — сфера-нейросеть (SVG, повторяет логотип),
// плюс текстовый вордмарк со свечением. Масштабируемо, без растровых ассетов.

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <radialGradient id="zl-sphere" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#8f7bff" />
          <stop offset="55%" stopColor="#5b45e0" />
          <stop offset="100%" stopColor="#2c1e78" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="21" fill="url(#zl-sphere)" />
      <g stroke="#cfc6ff" strokeWidth="1.1" opacity="0.85">
        <line x1="16" y1="15" x2="30" y2="18" />
        <line x1="30" y1="18" x2="34" y2="28" />
        <line x1="34" y1="28" x2="24" y2="35" />
        <line x1="24" y1="35" x2="14" y2="28" />
        <line x1="14" y1="28" x2="16" y2="15" />
        <line x1="16" y1="15" x2="24" y2="24" />
        <line x1="30" y1="18" x2="24" y2="24" />
        <line x1="34" y1="28" x2="24" y2="24" />
        <line x1="24" y1="35" x2="24" y2="24" />
        <line x1="14" y1="28" x2="24" y2="24" />
      </g>
      <g fill="#eae6ff">
        <circle cx="16" cy="15" r="2.4" />
        <circle cx="30" cy="18" r="2.4" />
        <circle cx="34" cy="28" r="2.4" />
        <circle cx="24" cy="35" r="2.4" />
        <circle cx="14" cy="28" r="2.4" />
        <circle cx="24" cy="24" r="2.8" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 select-none">
      <LogoMark size={30} />
      <span className="text-lg font-semibold tracking-tight">
        <span className="text-fg">Zorka</span>
        <span
          className="text-accent"
          style={{ textShadow: "0 0 18px var(--accent-glow)" }}
        >
          Logic
        </span>
      </span>
    </span>
  );
}
