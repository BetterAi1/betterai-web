import { TEAL, ACCENT } from "../theme";

/* ─── LOGO (fiel al original: B con chat bubble interior) ─── */
export default function Logo({ light = false, size = 38 }) {
  const tealColor   = light ? "#3AA898" : TEAL;
  const accentColor = ACCENT;
  const textBetter  = light ? "#3AA898" : TEAL;
  const textAI      = light ? "#FFFFFF" : "#111827";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Trazo vertical izquierdo de la B */}
        <line x1="10" y1="6" x2="10" y2="38" stroke={tealColor} strokeWidth="3" strokeLinecap="round"/>

        {/* Panza superior de la B — semicírculo hacia la derecha */}
        <path
          d="M10 6 L10 6 Q10 6 10 6 L26 6 Q34 6 34 13 Q34 20 26 20 L10 20"
          stroke={tealColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />

        {/* Burbuja de chat que forma la panza inferior de la B */}
        {/* Contorno exterior de la burbuja */}
        <path
          d="M10 20 L24 20 Q34 20 34 28 Q34 36 24 36 L16 36 L12 41 L13 36 L10 36 Z"
          stroke={tealColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
        />

        {/* Punto acento azul (el "." del ícono del logo) */}
        <circle cx="27" cy="28" r="2.2" fill={accentColor}/>

        {/* Ondas wifi pequeñas junto al punto */}
        <path d="M22 25.5 Q24.5 23 27 25.5" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        <path d="M19.5 23.5 Q23.5 20 27 23.5" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
      </svg>

      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: size * 0.6, letterSpacing: "-0.4px", lineHeight: 1 }}>
        <span style={{ color: textBetter }}>Better</span>
        <span style={{ color: textAI }}>AI</span>
      </span>
    </div>
  );
}
