import { useState, useEffect } from "react";
import {
  Clock, MessageCircle, Calendar, CheckCircle, ChevronDown,
  Zap, Users, Shield, ArrowRight, Mail, Building2,
  Bot, Workflow, Database, Globe, X, Menu, Star, RefreshCw
} from "lucide-react";

const TEAL       = "#2D8B7A";
const TEAL_LIGHT = "#3AA898";
const TEAL_DARK  = "#1F6B5E";
const ACCENT     = "#4FC3F7";
const DARK_BG    = "#0E1217";
const DARK_CARD  = "#151C25";
const DARK_BORDER= "#1E2A36";

/* ─── LOGO (fiel al original: B con chat bubble interior) ─── */
const Logo = ({ light = false, size = 38 }) => {
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
};

/* ─── NAVBAR ─────────────────────────────────────────────── */
const NAV_ITEMS = ["Problema","Solución","Cómo funciona","Casos de uso","FAQ"];
const navSlug = (item) => `#${item.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s/g,"-")}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ background: DARK_BG, borderBottom: `1px solid ${DARK_BORDER}`, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo light />
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <a key={item} href={navSlug(item)} className="nav-link"
              style={{ color: "#9CAAB8", fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", transition: "color .2s" }}>
              {item}
            </a>
          ))}
        </div>
        <a href="#formulario" className="hidden md:block nav-cta"
          style={{ background: TEAL, color: "#fff", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "background .2s" }}>
          Solicitar demo
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
      {open && (
        <div style={{ background: DARK_CARD, borderTop: `1px solid ${DARK_BORDER}`, padding: "16px 24px" }}>
          {NAV_ITEMS.map(item => (
            <a key={item} href={navSlug(item)} onClick={() => setOpen(false)}
              style={{ display: "block", color: "#9CAAB8", fontSize: 15, padding: "10px 0", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", borderBottom: `1px solid ${DARK_BORDER}` }}>
              {item}
            </a>
          ))}
          <a href="#formulario" onClick={() => setOpen(false)}
            style={{ display: "block", background: TEAL, color: "#fff", padding: "12px", borderRadius: 8, textAlign: "center", marginTop: 16, textDecoration: "none", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
            Solicitar demo
          </a>
        </div>
      )}
    </nav>
  );
};

/* ─── CHAT ANIMADO (v2 style) ────────────────────────────── */
const AnimatedChat = () => {
  const msgs = [
    { side: "client", text: "Hola, quería pedir cita para una limpieza dental.",             time: "18:42" },
    { side: "bot",    text: "¡Hola! Claro que sí. ¿Qué día y hora te iría mejor?",           time: "18:42" },
    { side: "client", text: "Mañana por la tarde si es posible.",                             time: "18:43" },
    { side: "bot",    text: "Perfecto, tengo hueco a las 17:00 y las 18:30. ¿Cuál prefieres?",time: "18:43" },
    { side: "client", text: "A las 17:00.",                                                   time: "18:44" },
    { side: "bot",    text: "✓ Cita confirmada para mañana a las 17:00. ¡Hasta pronto!",      time: "18:44" },
  ];

  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= msgs.length) return;
    const delays = [0, 900, 1700, 2500, 3300, 4100];
    const t = setTimeout(() => setVisible(v => v + 1), delays[visible] ?? 900);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div style={{ background: DARK_BG, borderRadius: 20, overflow: "hidden", border: `1px solid ${DARK_BORDER}`, maxWidth: 340, width: "100%", boxShadow: `0 0 60px rgba(45,139,122,0.15)` }}>
      {/* header */}
      <div style={{ background: TEAL_DARK, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bot size={20} color="#fff"/>
          </div>
          <div style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: "#22C55E", border: `2px solid ${TEAL_DARK}` }}/>
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Clínica Dental Martínez</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>Atendido por BetterAI · activo ahora</div>
        </div>
      </div>

      {/* messages */}
      <div style={{ background: "#0B1017", padding: "16px 14px", minHeight: 290, display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.slice(0, visible).map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.side === "client" ? "flex-end" : "flex-start",
            animation: "chatSlideIn 0.35s ease both" }}>
            <div style={{
              background: msg.side === "client" ? TEAL_DARK : DARK_CARD,
              color: "#E8F4F0",
              padding: "9px 13px",
              borderRadius: msg.side === "client" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
              maxWidth: "80%",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.5,
              border: msg.side === "bot" ? `1px solid ${DARK_BORDER}` : "none",
            }}>
              {msg.text}
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", marginTop: 4, textAlign: "right" }}>{msg.time}</div>
            </div>
          </div>
        ))}

        {/* typing indicator */}
        {visible < msgs.length && visible > 0 && (
          <div style={{ display: "flex", gap: 4, padding: "4px 2px" }}>
            {[0, 180, 360].map(d => (
              <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL,
                animation: `typingBlink 1.1s ${d}ms infinite` }}/>
            ))}
          </div>
        )}
      </div>

      {/* input bar */}
      <div style={{ background: "#0B1017", padding: "12px 14px", borderTop: `1px solid ${DARK_BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, background: DARK_CARD, borderRadius: 20, padding: "9px 14px", fontSize: 13, color: "#5A6878", fontFamily: "'DM Sans', sans-serif", border: `1px solid ${DARK_BORDER}` }}>
          Escribe un mensaje...
        </div>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ArrowRight size={16} color="#fff"/>
        </div>
      </div>

      <style>{`
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBlink {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

/* ─── SUB-COMPONENTS ──────────────────────────────────────── */
const ProblemCard = ({ icon: Icon, text }) => (
  <div style={{ background: "#fff", border: "1px solid #E8EEF3", borderRadius: 12, padding: "20px 22px", display: "flex", alignItems: "flex-start", gap: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FFF3F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={20} color="#E05C3A"/>
    </div>
    <p style={{ margin: 0, fontSize: 15, color: "#374151", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{text}</p>
  </div>
);

const StepCard = ({ number, title, desc }) => (
  <div style={{ textAlign: "center", padding: "0 12px" }}>
    <div style={{ width: 52, height: 52, borderRadius: "50%", background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, margin: "0 auto 18px", fontFamily: "'DM Sans', sans-serif" }}>
      {number}
    </div>
    <h4 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>{title}</h4>
    <p style={{ fontSize: 14, color: "#6B7280", margin: 0, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{desc}</p>
  </div>
);

const UseCaseCard = ({ icon: Icon, title, desc }) => (
  <div className="usecase-card" style={{ background: "#fff", border: "1px solid #E8EEF3", borderRadius: 14, padding: "24px 22px", transition: "box-shadow .2s, transform .2s", cursor: "default" }}>
    <div style={{ width: 44, height: 44, borderRadius: 10, background: "#E6F5F2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
      <Icon size={22} color={TEAL}/>
    </div>
    <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>{title}</h4>
    <p style={{ fontSize: 14, color: "#6B7280", margin: 0, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{desc}</p>
  </div>
);

const BenefitItem = ({ icon: Icon, title, desc }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
    <div style={{ width: 44, height: 44, borderRadius: 10, background: "#E6F5F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={20} color={TEAL}/>
    </div>
    <div>
      <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 4px", fontFamily: "'DM Sans', sans-serif" }}>{title}</h4>
      <p style={{ fontSize: 14, color: "#6B7280", margin: 0, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{desc}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E8EEF3" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#111827", fontFamily: "'DM Sans', sans-serif" }}>{question}</span>
        <ChevronDown size={20} color={TEAL} style={{ flexShrink: 0, transition: "transform .3s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}/>
      </button>
      {open && (
        <div style={{ paddingBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 15, color: "#6B7280", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{answer}</p>
        </div>
      )}
    </div>
  );
};

/* ─── MAIN ────────────────────────────────────────────────── */
export default function BetterAiLanding() {
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", telefono: "", tipo: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: conectar con backend, EmailJS o webhook
    setSent(true);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet"/>

      <Navbar/>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ background: DARK_BG, padding: "96px 24px 100px", position: "relative", overflow: "hidden" }}>
        {/* glows */}
        <div style={{ position: "absolute", top: "10%", left: "30%", width: 600, height: 400, background: `radial-gradient(ellipse, rgba(45,139,122,0.14) 0%, transparent 70%)`, pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: 0, right: "8%", width: 350, height: 350, background: `radial-gradient(circle, rgba(79,195,247,0.08) 0%, transparent 65%)`, pointerEvents: "none" }}/>
        {/* subtle grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${DARK_BORDER}55 1px, transparent 1px), linear-gradient(90deg, ${DARK_BORDER}55 1px, transparent 1px)`, backgroundSize: "56px 56px", opacity: 0.3, pointerEvents: "none" }}/>

        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>

          {/* LEFT: headline compacto */}
          <div>
            {/* pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${TEAL}1E`, border: `1px solid ${TEAL}44`, borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: TEAL_LIGHT }}/>
              <span style={{ fontSize: 13, color: TEAL_LIGHT, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Agentes IA para negocios con citas</span>
            </div>

            {/* headline — corto y directo */}
            <h1 style={{ fontSize: "clamp(36px, 4.8vw, 58px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-1.2px", fontFamily: "'DM Sans', sans-serif" }}>
              Tu recepción,<br/>
              <span style={{ color: TEAL_LIGHT }}>siempre activa.</span>
            </h1>

            {/* subheadline — una frase */}
            <p style={{ fontSize: 18, color: "#8FA5B8", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 460, fontWeight: 300 }}>
              BetterAI atiende a tus pacientes, responde preguntas y gestiona citas por WhatsApp — 24 horas, sin esfuerzo por tu parte.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#formulario" className="cta-primary"
                style={{ background: TEAL, color: "#fff", padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", transition: "background .2s, transform .15s, box-shadow .2s" }}>
                No pierdas oportunidades <ArrowRight size={18}/>
              </a>
              <a href="#como-funciona" className="cta-ghost"
                style={{ background: "transparent", color: "#8FA5B8", padding: "14px 24px", borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: "none", border: `1px solid ${DARK_BORDER}`, fontFamily: "'DM Sans', sans-serif", transition: "border-color .2s, color .2s" }}>
                Ver cómo funciona
              </a>
            </div>

            {/* trust badges */}
            <div style={{ display: "flex", gap: 24, marginTop: 36, flexWrap: "wrap" }}>
              {[
                { icon: Clock,          label: "Respuesta 24/7" },
                { icon: MessageCircle,  label: "Por WhatsApp" },
                { icon: Zap,            label: "Implementación rápida" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Icon size={15} color={TEAL_LIGHT}/>
                  <span style={{ fontSize: 13, color: "#7A8FA0", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: chat animado */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AnimatedChat/>
          </div>
        </div>
      </section>

      {/* ══ PROBLEMA ══════════════════════════════════════════════ */}
      <section id="problema" style={{ background: "#F4F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>El problema</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: "0 0 16px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Cada mensaje sin respuesta<br/>es una oportunidad perdida
            </h2>
            <p style={{ fontSize: 17, color: "#6B7280", maxWidth: 540, margin: "0 auto", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
              Los negocios con citas reciben decenas de mensajes por WhatsApp. Muchos fuera de horario. Muchos sin respuesta a tiempo.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { icon: Clock,         text: "Clientes que escriben a las 22h y no reciben respuesta hasta el día siguiente, cuando ya han buscado otra clínica." },
              { icon: MessageCircle, text: "Decenas de mensajes en WhatsApp que la recepción no puede atender durante horas punta o días con mucho volumen." },
              { icon: Calendar,      text: "Citas que se pierden porque el proceso de solicitud es lento o poco cómodo para el paciente." },
              { icon: Building2,     text: "Equipo de recepción desbordado contestando siempre las mismas preguntas: horarios, servicios, disponibilidad." },
              { icon: X,             text: "Sin respuesta en WhatsApp, el paciente percibe falta de profesionalidad y elige a la competencia." },
              { icon: RefreshCw,     text: "Tiempo valioso del equipo invertido en tareas repetitivas que podrían automatizarse fácilmente." },
            ].map((item, i) => <ProblemCard key={i} {...item}/>)}
          </div>
        </div>
      </section>

      {/* ══ SOLUCIÓN ══════════════════════════════════════════════ */}
      <section id="solucion" style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>La solución</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: "0 0 20px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Un agente IA diseñado para tu clínica, no para cualquier negocio
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>
              BetterAI crea un agente completamente personalizado que atiende tu WhatsApp, conoce tus servicios, habla con el tono de tu negocio y gestiona solicitudes de cita sin intervención humana.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Responde preguntas frecuentes sobre servicios, precios y horarios",
                "Recoge datos del paciente y solicita la cita de forma natural",
                "Gestiona cancelaciones y cambios de cita",
                "Funciona las 24 horas, 7 días a la semana",
                "Mantiene el tono y la personalidad de tu clínica",
                "Deriva a un humano cuando la situación lo requiere",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <CheckCircle size={18} color={TEAL} style={{ marginTop: 2, flexShrink: 0 }}/>
                  <span style={{ fontSize: 15, color: "#374151", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: DARK_BG, borderRadius: 20, padding: "36px 32px", border: `1px solid ${DARK_BORDER}` }}>
            <div style={{ fontSize: 13, color: TEAL_LIGHT, fontWeight: 600, marginBottom: 24, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'DM Sans', sans-serif" }}>Lo que hace BetterAI</div>
            {[
              { icon: MessageCircle, title: "Atención inmediata",    desc: "Responde en segundos, a cualquier hora, sin tiempos de espera." },
              { icon: Calendar,      title: "Gestión de citas",      desc: "Solicita, confirma, modifica y cancela citas de forma autónoma." },
              { icon: Bot,           title: "Personalizado al 100%", desc: "Aprende tu negocio: servicios, precios, políticas y tono de marca." },
              { icon: Shield,        title: "Seguro y fiable",       desc: "Derivación inteligente a un humano cuando el agente lo detecta necesario." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${TEAL}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={TEAL_LIGHT}/>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#E8F4F0", marginBottom: 3, fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
                  <div style={{ fontSize: 13, color: "#6B8099", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA ═════════════════════════════════════════ */}
      <section id="como-funciona" style={{ background: "#F4F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Proceso</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Así de sencillo funciona
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
            {[
              { number: "1", title: "El cliente escribe",  desc: "El paciente envía un mensaje a tu WhatsApp habitual, como siempre ha hecho." },
              { number: "2", title: "El agente entiende",  desc: "BetterAI interpreta la solicitud: cita, duda, cancelación o cambio." },
              { number: "3", title: "Recoge los datos",    desc: "Pregunta de forma natural lo necesario: nombre, servicio, disponibilidad." },
              { number: "4", title: "Cita gestionada",     desc: "La solicitud queda registrada y el cliente recibe confirmación al instante." },
            ].map(step => <StepCard key={step.number} {...step}/>)}
          </div>
        </div>
      </section>

      {/* ══ DEMO MOCKUP SECTION ═══════════════════════════════════ */}
      <section style={{ background: DARK_BG, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL_LIGHT, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Demo real</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#fff", margin: "0 0 20px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Así se siente la experiencia para tu paciente
            </h2>
            <p style={{ fontSize: 16, color: "#7A90A4", lineHeight: 1.8, marginBottom: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
              El agente atiende en WhatsApp con naturalidad. El paciente no nota diferencia con una persona, pero tú ganas horas de trabajo cada día.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Tiempo de respuesta",                       value: "Inmediato" },
                { label: "Disponibilidad",                            value: "24 / 7 / 365" },
                { label: "Citas gestionadas sin intervención humana", value: "Hasta el 80%" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: DARK_CARD, borderRadius: 10, border: `1px solid ${DARK_BORDER}` }}>
                  <span style={{ fontSize: 14, color: "#7A90A4", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: TEAL_LIGHT, fontFamily: "'DM Sans', sans-serif" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AnimatedChat/>
          </div>
        </div>
      </section>

      {/* ══ CASOS DE USO ══════════════════════════════════════════ */}
      <section id="casos-de-uso" style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Para quién</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Diseñado para negocios con citas
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { icon: Shield,   title: "Clínicas médicas",       desc: "Gestiona citas, atiende consultas de disponibilidad y recoge datos del paciente desde WhatsApp." },
              { icon: Star,     title: "Clínicas dentales",      desc: "Primera visita, limpiezas, revisiones. El agente conoce tus tratamientos y gestiona el calendario." },
              { icon: Users,    title: "Centros de estética",    desc: "Agenda tratamientos, responde dudas y confirma citas para reducir cancelaciones de última hora." },
              { icon: Zap,      title: "Fisioterapia y bienestar", desc: "Atiende a nuevos pacientes, gestiona sesiones y envía recordatorios automáticos." },
              { icon: Building2, title: "Otros negocios con citas", desc: "Cualquier negocio que gestione su agenda puede beneficiarse de un agente IA personalizado." },
            ].map((card, i) => <UseCaseCard key={i} {...card}/>)}
          </div>
        </div>
      </section>

      {/* ══ BENEFICIOS ════════════════════════════════════════════ */}
      <section id="beneficios" style={{ background: "#F4F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Por qué BetterAI</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Más oportunidades. Menos esfuerzo.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { icon: Clock,         title: "Responde 24/7",                  desc: "Tu negocio nunca cierra en WhatsApp. Captura oportunidades fuera del horario laboral." },
              { icon: MessageCircle, title: "Canal natural para tus clientes", desc: "WhatsApp es donde ya te escriben. No les pides que cambien de canal." },
              { icon: Users,         title: "Libera a tu equipo",              desc: "Menos tiempo respondiendo lo mismo. Más tiempo para atención de calidad." },
              { icon: Zap,           title: "Implementación rápida",           desc: "Tu agente IA operativo en pocos días, sin complicaciones técnicas por tu parte." },
              { icon: Bot,           title: "Totalmente personalizado",        desc: "El agente aprende tu negocio, tus servicios y tu forma de comunicarte." },
              { icon: Calendar,      title: "Más citas confirmadas",           desc: "Menos abandono en el proceso de solicitud. Más conversiones a cita real." },
            ].map((item, i) => <BenefitItem key={i} {...item}/>)}
          </div>
        </div>
      </section>

      {/* ══ INTEGRACIONES ═════════════════════════════════════════ */}
      <section style={{ background: DARK_BG, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: TEAL_LIGHT, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Integraciones</span>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
            Nos adaptamos a cómo trabaja tu negocio
          </h2>
          <p style={{ fontSize: 17, color: "#7A90A4", maxWidth: 540, margin: "0 auto 48px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            BetterAI se puede conectar con las herramientas que ya usas. Sin cambiar tu flujo de trabajo.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {[
              { icon: MessageCircle, label: "WhatsApp",      desc: "Canal principal" },
              { icon: Database,      label: "CRM",           desc: "Tus contactos" },
              { icon: Calendar,      label: "Calendarios",   desc: "Google, Outlook..." },
              { icon: Globe,         label: "Formularios",   desc: "Webs y apps" },
              { icon: Workflow,      label: "Automatizaciones", desc: "Flujos internos" },
              { icon: Database,      label: "Bases de datos", desc: "Tus registros" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{ background: DARK_CARD, border: `1px solid ${DARK_BORDER}`, borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${TEAL}22`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Icon size={20} color={TEAL_LIGHT}/>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#E8F4F0", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
                <div style={{ fontSize: 12, color: "#6B8099", fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════ */}
      <section id="faq" style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Preguntas frecuentes</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Tus dudas, resueltas
            </h2>
          </div>
          <div>
            {[
              { question: "¿El agente sustituye a mi equipo de recepción?",    answer: "No. BetterAI es un apoyo para tu equipo, no un sustituto. Gestiona las consultas rutinarias y la recogida de datos, liberando a tu equipo para que se centre en la atención presencial y en casos que necesitan su criterio." },
              { question: "¿Funciona fuera del horario laboral?",              answer: "Exactamente ahí es donde más valor aporta. El agente atiende a las 22h, los fines de semana y en festivos. Cuando el equipo llega el lunes, las solicitudes ya están recogidas y organizadas." },
              { question: "¿Se puede personalizar para mi clínica?",           answer: "Sí, completamente. Configuramos el agente con la información de tus servicios, tu forma de comunicarte, tus preguntas frecuentes y tu proceso habitual de citas. No es una solución genérica, es tu solución." },
              { question: "¿Puede gestionar cancelaciones o cambios de cita?", answer: "Sí. El agente recoge solicitudes de cancelación o cambio, registra la información y notifica al equipo de forma organizada, siguiendo el proceso que definamos juntos." },
              { question: "¿Necesito cambiar mi forma actual de trabajar?",    answer: "Prácticamente no. Mantienes tu número de WhatsApp y tu flujo de trabajo. BetterAI actúa por delante, gestionando la primera capa de atención, y te pasa la información de forma ordenada." },
              { question: "¿Cuánto tarda la implementación?",                  answer: "En la mayoría de los casos, el agente está configurado y operativo en pocos días. Nos encargamos de todo el proceso técnico y trabajamos contigo para ajustar el comportamiento antes del lanzamiento." },
            ].map((item, i) => <FAQItem key={i} {...item}/>)}
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO ════════════════════════════════════════════ */}
      <section id="formulario" style={{ background: "#F4F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Empieza ahora</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, color: "#111827", margin: "0 0 16px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              No pierdas oportunidades
            </h2>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.7, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
              Cuéntanos sobre tu negocio y un especialista de BetterAI se pondrá en contacto contigo.
            </p>
          </div>

          {sent ? (
            <div style={{ background: "#fff", borderRadius: 16, padding: "48px 32px", textAlign: "center", border: "1px solid #E8EEF3" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E6F5F2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <CheckCircle size={32} color={TEAL}/>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>¡Solicitud recibida!</h3>
              <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>Nos pondremos en contacto contigo pronto para explicarte cómo BetterAI puede ayudar a tu negocio.</p>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", border: "1px solid #E8EEF3", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 16 }}>
                  {[
                    { id: "nombre",   label: "Nombre *",          placeholder: "Tu nombre",          type: "text",  req: true },
                    { id: "empresa",  label: "Empresa / Clínica *", placeholder: "Nombre del negocio", type: "text",  req: true },
                    { id: "email",    label: "Email *",            placeholder: "tu@email.com",        type: "email", req: true },
                    { id: "telefono", label: "Teléfono",           placeholder: "+34 600 000 000",     type: "tel",   req: false },
                  ].map(({ id, label, placeholder, type, req }) => (
                    <div key={id}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
                      <input type={type} placeholder={placeholder} value={formData[id]} required={req}
                        onChange={e => setFormData({ ...formData, [id]: e.target.value })}
                        style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #D1D9E0", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color .2s", color: "#111827", background: "#fff" }}
                        onFocus={e => e.target.style.borderColor=TEAL}
                        onBlur={e => e.target.style.borderColor="#D1D9E0"}/>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Tipo de negocio</label>
                  <select value={formData.tipo} onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #D1D9E0", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", background: "#fff", color: formData.tipo ? "#111827" : "#9CA3AF" }}>
                    <option value="">Selecciona una opción</option>
                    {["Clínica médica","Clínica dental","Centro de estética","Fisioterapia / bienestar","Otro negocio con citas"].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Mensaje (opcional)</label>
                  <textarea placeholder="Cuéntanos brevemente tu situación actual o qué te gustaría automatizar..."
                    value={formData.mensaje} onChange={e => setFormData({ ...formData, mensaje: e.target.value })} rows={4}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #D1D9E0", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color .2s", color: "#111827", background: "#fff" }}
                    onFocus={e => e.target.style.borderColor=TEAL}
                    onBlur={e => e.target.style.borderColor="#D1D9E0"}/>
                </div>
                <button type="submit" className="submit-btn"
                  style={{ width: "100%", background: TEAL, color: "#fff", padding: "16px", borderRadius: 10, fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background .2s, transform .15s, box-shadow .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  No pierdas oportunidades <ArrowRight size={18}/>
                </button>
                <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF", marginTop: 14, fontFamily: "'DM Sans', sans-serif" }}>Sin compromisos. Te contactamos en menos de 24h.</p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════ */}
      <footer style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}`, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <Logo light/>
              <p style={{ fontSize: 14, color: "#6B8099", marginTop: 14, lineHeight: 1.7, maxWidth: 260, fontFamily: "'DM Sans', sans-serif" }}>
                Agentes IA personalizados para negocios que gestionan citas. Atención automática, 24/7, por WhatsApp.
              </p>
              <p style={{ fontSize: 13, color: TEAL_LIGHT, fontStyle: "italic", marginTop: 10, fontFamily: "'DM Sans', sans-serif" }}>Never miss an opportunity.</p>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#E8F4F0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Producto</div>
              {["Cómo funciona","Casos de uso","Integraciones","FAQ"].map(link => (
                <a key={link} href="#" className="footer-link" style={{ display: "block", fontSize: 14, color: "#6B8099", marginBottom: 10, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color .2s" }}>{link}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#E8F4F0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Legal</div>
              {["Política de privacidad","Aviso legal","Cookies"].map(link => (
                <a key={link} href="#" className="footer-link" style={{ display: "block", fontSize: 14, color: "#6B8099", marginBottom: 10, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color .2s" }}>{link}</a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#E8F4F0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Contacto</div>
              <a href="mailto:hola@betterai.es" style={{ display: "flex", alignItems: "center", gap: 8, color: "#6B8099", textDecoration: "none", fontSize: 14, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
                <Mail size={15}/> hola@betterai.es
              </a>
              <a href="#formulario" className="footer-cta"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: TEAL, color: "#fff", padding: "10px 18px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: "background .2s" }}>
                Solicitar demo <ArrowRight size={14}/>
              </a>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${DARK_BORDER}`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#4A6070", fontFamily: "'DM Sans', sans-serif" }}>© 2025 BetterAI. Todos los derechos reservados.</span>
            <span style={{ fontSize: 13, color: "#4A6070", fontStyle: "italic", fontFamily: "'DM Sans', sans-serif" }}>Never miss an opportunity.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
