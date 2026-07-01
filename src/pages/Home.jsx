import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Clock, MessageCircle, Calendar, CheckCircle, ChevronDown,
  Zap, Users, Shield, ArrowRight, Building2,
  Bot, Workflow, Database, Globe, X, Star, RefreshCw
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TEAL, TEAL_LIGHT, TEAL_DARK, DARK_BG, DARK_CARD, DARK_BORDER } from "../theme";

/* ─── ANIMATION VARIANTS ─────────────────────────────────── */
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const FadeUp = ({ children, delay = 0, style, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    style={style}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── COUNT UP ───────────────────────────────────────────── */
const CountUp = ({ to, prefix = "", suffix = "", duration = 1400 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    let rafId;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, to, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

/* ─── CHAT ANIMADO ───────────────────────────────────────── */
const AnimatedChat = ({ lazy: lazyStart = false, loop = false }) => {
  const msgs = [
    { side: "client", text: "Hola, quería pedir cita para una limpieza dental.",               time: "18:42" },
    { side: "bot",    text: "¡Hola! Claro que sí. ¿Qué día y hora te iría mejor?",             time: "18:42" },
    { side: "client", text: "Mañana por la tarde si es posible.",                               time: "18:43" },
    { side: "bot",    text: "Perfecto, tengo hueco a las 17:00 y las 18:30. ¿Cuál prefieres?", time: "18:43" },
    { side: "client", text: "A las 17:00.",                                                     time: "18:44" },
    { side: "bot",    text: "✓ Cita confirmada para mañana a las 17:00. ¡Hasta pronto!",        time: "18:44" },
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const [started, setStarted] = useState(!lazyStart);
  const [visible, setVisible] = useState(0);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    if (lazyStart && isInView && !started) setStarted(true);
  }, [lazyStart, isInView, started]);

  useEffect(() => {
    if (!loop || !started || visible < msgs.length) return;
    const t = setTimeout(() => {
      setVisible(0);
      setLoopCount(c => c + 1);
    }, 2200);
    return () => clearTimeout(t);
  }, [visible, loop, started, msgs.length]);

  useEffect(() => {
    if (!started || visible >= msgs.length) return;
    const delays = [0, 900, 1700, 2500, 3300, 4100];
    const t = setTimeout(() => setVisible(v => v + 1), delays[visible] ?? 900);
    return () => clearTimeout(t);
  }, [visible, started]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Demo de conversación con BetterAI"
      style={{ background: DARK_BG, borderRadius: 20, overflow: "hidden", border: `1px solid ${DARK_BORDER}`, maxWidth: 340, width: "100%", boxShadow: `0 0 60px rgba(45,139,122,0.15)` }}
    >
      <div style={{ background: TEAL_DARK, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bot size={20} color="#fff"/>
          </div>
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: "#22C55E", border: `2px solid ${TEAL_DARK}` }}
          />
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Clínica Dental Martínez</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>Atendido por BetterAI · activo ahora</div>
        </div>
      </div>

      <div
        aria-live="polite"
        aria-atomic="false"
        style={{ background: "#0B1017", padding: "16px 14px", minHeight: 290, display: "flex", flexDirection: "column", gap: 10 }}
      >
        <AnimatePresence>
          {msgs.slice(0, visible).map((msg, i) => (
            <motion.div
              key={`${loopCount}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ display: "flex", justifyContent: msg.side === "client" ? "flex-end" : "flex-start" }}
            >
              <div style={{
                background: msg.side === "client" ? TEAL_DARK : DARK_CARD,
                color: "#E8F4F0", padding: "9px 13px",
                borderRadius: msg.side === "client" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                maxWidth: "80%", fontSize: 13, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5,
                border: msg.side === "bot" ? `1px solid ${DARK_BORDER}` : "none",
              }}>
                {msg.text}
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", marginTop: 4, textAlign: "right" }}>{msg.time}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {started && visible < msgs.length && visible > 0 && (
          <div style={{ display: "flex", gap: 4, padding: "4px 2px" }}>
            {[0, 180, 360].map(d => (
              <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL, animation: `typingBlink 1.1s ${d}ms infinite` }}/>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: "#0B1017", padding: "12px 14px", borderTop: `1px solid ${DARK_BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, background: DARK_CARD, borderRadius: 20, padding: "9px 14px", fontSize: 13, color: "#5A6878", fontFamily: "'DM Sans', sans-serif", border: `1px solid ${DARK_BORDER}` }}>
          Escribe un mensaje...
        </div>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ArrowRight size={16} color="#fff"/>
        </div>
      </div>
    </div>
  );
};

/* ─── SUB-COMPONENTS ──────────────────────────────────────── */
const ProblemCard = ({ icon: Icon, text }) => (
  <motion.div
    variants={staggerChild}
    whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
    style={{ background: "#fff", border: "1px solid #E8EEF3", borderRadius: 12, padding: "20px 22px", display: "flex", alignItems: "flex-start", gap: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
  >
    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FFF3F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={20} color="#E05C3A"/>
    </div>
    <p style={{ margin: 0, fontSize: 15, color: "#374151", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{text}</p>
  </motion.div>
);

const StepCard = ({ number, title, desc }) => (
  <motion.div variants={staggerChild} style={{ textAlign: "center", padding: "0 12px" }}>
    <div style={{ width: 52, height: 52, borderRadius: "50%", background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, margin: "0 auto 18px", fontFamily: "'DM Sans', sans-serif" }}>
      {number}
    </div>
    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>{title}</h3>
    <p style={{ fontSize: 14, color: "#6B7280", margin: 0, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{desc}</p>
  </motion.div>
);

const UseCaseCard = ({ icon: Icon, title, desc }) => (
  <motion.div
    variants={staggerChild}
    whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(45,139,122,0.16)", transition: { duration: 0.2 } }}
    style={{ background: "#fff", border: "1px solid #E8EEF3", borderRadius: 14, padding: "24px 22px", cursor: "default" }}
  >
    <div style={{ width: 44, height: 44, borderRadius: 10, background: "#E6F5F2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
      <Icon size={22} color={TEAL}/>
    </div>
    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>{title}</h3>
    <p style={{ fontSize: 14, color: "#6B7280", margin: 0, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{desc}</p>
  </motion.div>
);

const BenefitItem = ({ icon: Icon, title, desc }) => (
  <motion.div variants={staggerChild} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
    <motion.div
      whileHover={{ scale: 1.12, rotate: 6, transition: { duration: 0.2 } }}
      style={{ width: 44, height: 44, borderRadius: 10, background: "#E6F5F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
    >
      <Icon size={20} color={TEAL}/>
    </motion.div>
    <div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 4px", fontFamily: "'DM Sans', sans-serif" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#6B7280", margin: 0, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>{desc}</p>
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={staggerChild} style={{ borderBottom: "1px solid #E8EEF3" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "#111827", fontFamily: "'DM Sans', sans-serif" }}>{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={20} color={TEAL}/>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ margin: "0 0 20px", fontSize: 15, color: "#6B7280", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── HOME ────────────────────────────────────────────────── */
export default function Home() {
  const [formData, setFormData] = useState({ nombre: "", empresa: "", email: "", telefono: "", tipo: "", mensaje: "", honey: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const heroRef = useRef(null);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const bottom = heroRef.current.getBoundingClientRect().bottom;
      setPastHero(bottom < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honey) return;
    setSending(true);
    setSubmitError(false);
    try {
      const res = await fetch("https://formsubmit.co/ajax/betterai1@hotmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nueva solicitud de demo: ${formData.empresa || formData.nombre}`,
          Nombre: formData.nombre, Empresa: formData.empresa, Email: formData.email,
          Teléfono: formData.telefono || "—", "Tipo de negocio": formData.tipo || "—", Mensaje: formData.mensaje || "—",
        }),
      });
      const data = await res.json();
      if (!res.ok || data.success === "false" || data.success === false) throw new Error("request failed");
      setSent(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="main-content" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar/>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section ref={heroRef} style={{ background: DARK_BG, padding: "96px 24px 100px", position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "10%", left: "30%", width: 600, height: 400, background: `radial-gradient(ellipse, rgba(45,139,122,0.14) 0%, transparent 70%)`, pointerEvents: "none" }}
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ position: "absolute", bottom: 0, right: "8%", width: 350, height: 350, background: `radial-gradient(circle, rgba(79,195,247,0.08) 0%, transparent 65%)`, pointerEvents: "none" }}
        />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${DARK_BORDER}55 1px, transparent 1px), linear-gradient(90deg, ${DARK_BORDER}55 1px, transparent 1px)`, backgroundSize: "56px 56px", opacity: 0.3, pointerEvents: "none" }}/>

        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          <motion.div variants={heroContainer} initial="hidden" animate="show">
            <motion.div
              variants={heroItem}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${TEAL}1E`, border: `1px solid ${TEAL}44`, borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: TEAL_LIGHT }}
              />
              <span style={{ fontSize: 13, color: TEAL_LIGHT, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Agentes IA para negocios con citas</span>
            </motion.div>

            <motion.h1
              variants={heroItem}
              style={{ fontSize: "clamp(36px, 4.8vw, 58px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-1.2px", fontFamily: "'DM Sans', sans-serif" }}
            >
              Tu recepción,<br/>
              <span style={{ color: TEAL_LIGHT }}>siempre activa.</span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              style={{ fontSize: 18, color: "#8FA5B8", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 460, fontWeight: 300 }}
            >
              BetterAI atiende a tus pacientes, responde preguntas y gestiona citas por WhatsApp — 24 horas, sin esfuerzo por tu parte.
            </motion.p>

            <motion.div variants={heroItem} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#formulario" className="cta-primary"
                style={{ background: TEAL, color: "#fff", padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", transition: "background .2s, box-shadow .2s" }}>
                Solicitar demo gratis <span className="cta-arrow"><ArrowRight size={18}/></span>
              </a>
              <a href="#como-funciona" className="cta-ghost"
                style={{ background: "transparent", color: "#8FA5B8", padding: "14px 24px", borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: "none", border: `1px solid ${DARK_BORDER}`, fontFamily: "'DM Sans', sans-serif", transition: "border-color .2s, color .2s" }}>
                Ver cómo funciona
              </a>
            </motion.div>

            <motion.div variants={heroItem} style={{ display: "flex", gap: 24, marginTop: 36, flexWrap: "wrap" }}>
              {[
                { icon: Clock,         label: "Respuesta 24/7" },
                { icon: MessageCircle, label: "Por WhatsApp" },
                { icon: Zap,           label: "Implementación rápida" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Icon size={15} color={TEAL_LIGHT}/>
                  <span style={{ fontSize: 13, color: "#7A8FA0", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <AnimatedChat/>
          </motion.div>
        </div>
      </section>

      {/* ══ CREDIBILITY STRIP ═════════════════════════════════════ */}
      <section style={{ background: "#fff", borderBottom: "1px solid #E8EEF3", padding: "28px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px 52px" }}
          >
            {[
              { value: "Al instante", label: "Tiempo de respuesta" },
              { value: "24/7",        label: "Disponibilidad" },
              { value: "Automática",  label: "Gestión de citas" },
              { value: "En días",     label: "Implementación" },
            ].map(({ value, label }) => (
              <motion.div key={label} variants={staggerChild} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: TEAL, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.1, letterSpacing: "-0.5px" }}>{value}</div>
                <div style={{ fontSize: 13, color: "#6B7280", fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ PROBLEMA ══════════════════════════════════════════════ */}
      <section id="problema" style={{ background: "#F4F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>El problema</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: "0 0 16px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Cada mensaje sin respuesta<br/>es una oportunidad perdida
            </h2>
            <p style={{ fontSize: 17, color: "#6B7280", maxWidth: 540, margin: "0 auto", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
              Los negocios con citas reciben decenas de mensajes por WhatsApp. Muchos fuera de horario. Muchos sin respuesta a tiempo.
            </p>
          </FadeUp>
          <motion.div
            variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}
          >
            {[
              { icon: Clock,         text: "Clientes que escriben a las 22h y no reciben respuesta hasta el día siguiente, cuando ya han buscado otra clínica." },
              { icon: MessageCircle, text: "Decenas de mensajes en WhatsApp que la recepción no puede atender durante horas punta o días con mucho volumen." },
              { icon: Calendar,      text: "Citas que se pierden porque el proceso de solicitud es lento o poco cómodo para el paciente." },
              { icon: Building2,     text: "Equipo de recepción desbordado contestando siempre las mismas preguntas: horarios, servicios, disponibilidad." },
              { icon: X,             text: "Sin respuesta en WhatsApp, el paciente percibe falta de profesionalidad y elige a la competencia." },
              { icon: RefreshCw,     text: "Tiempo valioso del equipo invertido en tareas repetitivas que podrían automatizarse fácilmente." },
            ].map((item, i) => <ProblemCard key={i} {...item}/>)}
          </motion.div>
        </div>
      </section>

      {/* ══ SOLUCIÓN ══════════════════════════════════════════════ */}
      <section id="solucion" style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <FadeUp>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>La solución</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: "0 0 20px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Un agente IA diseñado para tu clínica, no para cualquier negocio
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>
              BetterAI crea un agente completamente personalizado que atiende tu WhatsApp, conoce tus servicios, habla con el tono de tu negocio y gestiona solicitudes de cita sin intervención humana.
            </p>
            <motion.div
              variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {[
                "Responde preguntas frecuentes sobre servicios, precios y horarios",
                "Recoge datos del paciente y solicita la cita de forma natural",
                "Gestiona cancelaciones y cambios de cita",
                "Funciona las 24 horas, 7 días a la semana",
                "Mantiene el tono y la personalidad de tu clínica",
                "Deriva a un humano cuando la situación lo requiere",
              ].map((item, i) => (
                <motion.div key={i} variants={staggerChild} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <CheckCircle size={18} color={TEAL} style={{ marginTop: 2, flexShrink: 0 }}/>
                  <span style={{ fontSize: 15, color: "#374151", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ background: DARK_BG, borderRadius: 20, padding: "36px 32px", border: `1px solid ${DARK_BORDER}` }}>
              <div style={{ fontSize: 13, color: TEAL_LIGHT, fontWeight: 600, marginBottom: 24, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'DM Sans', sans-serif" }}>Lo que hace BetterAI</div>
              <motion.div
                variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
              >
                {[
                  { icon: MessageCircle, title: "Atención inmediata",    desc: "Responde en segundos, a cualquier hora, sin tiempos de espera." },
                  { icon: Calendar,      title: "Gestión de citas",      desc: "Solicita, confirma, modifica y cancela citas de forma autónoma." },
                  { icon: Bot,           title: "Personalizado al 100%", desc: "Aprende tu negocio: servicios, precios, políticas y tono de marca." },
                  { icon: Shield,        title: "Seguro y fiable",       desc: "Derivación inteligente a un humano cuando el agente lo detecta necesario." },
                ].map(({ icon: Icon, title, desc }) => (
                  <motion.div key={title} variants={staggerChild} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${TEAL}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={18} color={TEAL_LIGHT}/>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#E8F4F0", marginBottom: 3, fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
                      <div style={{ fontSize: 13, color: "#6B8099", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA ═════════════════════════════════════════ */}
      <section id="como-funciona" style={{ background: "#F4F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Proceso</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Así de sencillo funciona
            </h2>
          </FadeUp>
          <motion.div
            variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, position: "relative" }}
          >
            {[
              { number: "1", title: "El cliente escribe", desc: "El paciente envía un mensaje a tu WhatsApp habitual, como siempre ha hecho." },
              { number: "2", title: "El agente entiende", desc: "BetterAI interpreta la solicitud: cita, duda, cancelación o cambio." },
              { number: "3", title: "Recoge los datos",   desc: "Pregunta de forma natural lo necesario: nombre, servicio, disponibilidad." },
              { number: "4", title: "Cita gestionada",    desc: "La solicitud queda registrada y el cliente recibe confirmación al instante." },
            ].map(step => <StepCard key={step.number} {...step}/>)}
          </motion.div>
        </div>
      </section>

      {/* ══ DEMO MOCKUP ═══════════════════════════════════════════ */}
      <section style={{ background: DARK_BG, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <FadeUp>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL_LIGHT, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Demo real</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#fff", margin: "0 0 20px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Así se siente la experiencia para tu paciente
            </h2>
            <p style={{ fontSize: 16, color: "#7A90A4", lineHeight: 1.8, marginBottom: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
              El agente atiende en WhatsApp con naturalidad. El paciente no nota diferencia con una persona, pero tú ganas horas de trabajo cada día.
            </p>
            <motion.div
              variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {[
                { label: "Tiempo de respuesta",                       display: "Al instante" },
                { label: "Disponibilidad",                            display: "24 / 7 / 365" },
                { label: "Citas gestionadas sin intervención humana", display: "Automático" },
              ].map(({ label, display }) => (
                <motion.div
                  key={label} variants={staggerChild}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: DARK_CARD, borderRadius: 10, border: `1px solid ${DARK_BORDER}` }}
                >
                  <span style={{ fontSize: 14, color: "#7A90A4", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: TEAL_LIGHT, fontFamily: "'DM Sans', sans-serif" }}>{display}</span>
                </motion.div>
              ))}
            </motion.div>
          </FadeUp>
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <AnimatedChat lazy loop/>
          </motion.div>
        </div>
      </section>

      {/* ══ CASOS DE USO ══════════════════════════════════════════ */}
      <section id="casos-de-uso" style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Para quién</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Diseñado para negocios con citas
            </h2>
          </FadeUp>
          <motion.div
            variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}
          >
            {[
              { icon: Shield,    title: "Clínicas médicas",         desc: "Gestiona citas, atiende consultas de disponibilidad y recoge datos del paciente desde WhatsApp." },
              { icon: Star,      title: "Clínicas dentales",        desc: "Primera visita, limpiezas, revisiones. El agente conoce tus tratamientos y gestiona el calendario." },
              { icon: Users,     title: "Centros de estética",      desc: "Agenda tratamientos, responde dudas y confirma citas para reducir cancelaciones de última hora." },
              { icon: Zap,       title: "Fisioterapia y bienestar", desc: "Atiende a nuevos pacientes, gestiona sesiones y envía recordatorios automáticos." },
              { icon: Building2, title: "Otros negocios con citas", desc: "Cualquier negocio que gestione su agenda puede beneficiarse de un agente IA personalizado." },
            ].map((card, i) => <UseCaseCard key={i} {...card}/>)}
          </motion.div>
        </div>
      </section>

      {/* ══ BENEFICIOS ════════════════════════════════════════════ */}
      <section id="beneficios" style={{ background: "#F4F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Por qué BetterAI</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Más oportunidades. Menos esfuerzo.
            </h2>
          </FadeUp>
          <motion.div
            variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}
          >
            {[
              { icon: Clock,         title: "Responde 24/7",                   desc: "Tu negocio nunca cierra en WhatsApp. Captura oportunidades fuera del horario laboral." },
              { icon: MessageCircle, title: "Canal natural para tus clientes",  desc: "WhatsApp es donde ya te escriben. No les pides que cambien de canal." },
              { icon: Users,         title: "Libera a tu equipo",               desc: "Menos tiempo respondiendo lo mismo. Más tiempo para atención de calidad." },
              { icon: Zap,           title: "Implementación rápida",            desc: "Tu agente IA operativo en pocos días, sin complicaciones técnicas por tu parte." },
              { icon: Bot,           title: "Totalmente personalizado",         desc: "El agente aprende tu negocio, tus servicios y tu forma de comunicarte." },
              { icon: Calendar,      title: "Más citas confirmadas",            desc: "Menos abandono en el proceso de solicitud. Más conversiones a cita real." },
            ].map((item, i) => <BenefitItem key={i} {...item}/>)}
          </motion.div>
        </div>
      </section>

      {/* ══ INTEGRACIONES ═════════════════════════════════════════ */}
      <section id="integraciones" style={{ background: DARK_BG, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL_LIGHT, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Integraciones</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Nos adaptamos a cómo trabaja tu negocio
            </h2>
            <p style={{ fontSize: 17, color: "#7A90A4", maxWidth: 540, margin: "0 auto 48px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
              BetterAI se puede conectar con las herramientas que ya usas. Sin cambiar tu flujo de trabajo.
            </p>
          </FadeUp>
          <motion.div
            variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}
          >
            {[
              { icon: MessageCircle, label: "WhatsApp",         desc: "Canal principal" },
              { icon: Database,      label: "CRM",              desc: "Tus contactos" },
              { icon: Calendar,      label: "Calendarios",      desc: "Google, Outlook..." },
              { icon: Globe,         label: "Formularios",      desc: "Webs y apps" },
              { icon: Workflow,      label: "Automatizaciones", desc: "Flujos internos" },
              { icon: Database,      label: "Bases de datos",   desc: "Tus registros" },
            ].map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label} variants={staggerChild}
                whileHover={{ y: -5, borderColor: `${TEAL}66`, boxShadow: `0 8px 24px rgba(45,139,122,0.15)`, transition: { duration: 0.2 } }}
                style={{ background: DARK_CARD, border: `1px solid ${DARK_BORDER}`, borderRadius: 12, padding: "20px 16px", textAlign: "center" }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1, transition: { duration: 0.2 } }}
                  style={{ width: 44, height: 44, borderRadius: 10, background: `${TEAL}22`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}
                >
                  <Icon size={20} color={TEAL_LIGHT}/>
                </motion.div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#E8F4F0", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
                <div style={{ fontSize: 12, color: "#6B8099", fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════ */}
      <section id="faq" style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Preguntas frecuentes</span>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              Tus dudas, resueltas
            </h2>
          </FadeUp>
          <motion.div
            variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          >
            {[
              { question: "¿El agente sustituye a mi equipo de recepción?",    answer: "No. BetterAI es un apoyo para tu equipo, no un sustituto. Gestiona las consultas rutinarias y la recogida de datos, liberando a tu equipo para que se centre en la atención presencial y en casos que necesitan su criterio." },
              { question: "¿Funciona fuera del horario laboral?",              answer: "Exactamente ahí es donde más valor aporta. El agente atiende a las 22h, los fines de semana y en festivos. Cuando el equipo llega el lunes, las solicitudes ya están recogidas y organizadas." },
              { question: "¿Se puede personalizar para mi clínica?",           answer: "Sí, completamente. Configuramos el agente con la información de tus servicios, tu forma de comunicarte, tus preguntas frecuentes y tu proceso habitual de citas. No es una solución genérica, es tu solución." },
              { question: "¿Puede gestionar cancelaciones o cambios de cita?", answer: "Sí. El agente recoge solicitudes de cancelación o cambio, registra la información y notifica al equipo de forma organizada, siguiendo el proceso que definamos juntos." },
              { question: "¿Necesito cambiar mi forma actual de trabajar?",    answer: "Prácticamente no. Mantienes tu número de WhatsApp y tu flujo de trabajo. BetterAI actúa por delante, gestionando la primera capa de atención, y te pasa la información de forma ordenada." },
              { question: "¿Cuánto tarda la implementación?",                  answer: "En la mayoría de los casos, el agente está configurado y operativo en pocos días. Nos encargamos de todo el proceso técnico y trabajamos contigo para ajustar el comportamiento antes del lanzamiento." },
            ].map((item, i) => <FAQItem key={i} {...item}/>)}
          </motion.div>
        </div>
      </section>

      {/* ══ FORMULARIO ════════════════════════════════════════════ */}
      <section id="formulario" style={{ background: "#F4F7FA", padding: "80px 24px" }}>
        <div style={{ maxWidth: 660, margin: "0 auto" }}>
          <FadeUp style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12 }}>Empieza ahora</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, color: "#111827", margin: "0 0 16px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
              No pierdas oportunidades
            </h2>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.7, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
              Cuéntanos sobre tu negocio y un especialista de BetterAI se pondrá en contacto contigo.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ background: "#fff", borderRadius: 16, padding: "48px 32px", textAlign: "center", border: "1px solid #E8EEF3" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
                  style={{ width: 64, height: 64, borderRadius: "50%", background: "#E6F5F2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}
                >
                  <CheckCircle size={32} color={TEAL}/>
                </motion.div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>¡Solicitud recibida!</h3>
                <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>Nos pondremos en contacto contigo pronto para explicarte cómo BetterAI puede ayudar a tu negocio.</p>
              </motion.div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", border: "1px solid #E8EEF3", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="_honey"
                    value={formData.honey}
                    onChange={e => setFormData({ ...formData, honey: e.target.value })}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 16 }}>
                    {[
                      { id: "nombre",   label: "Nombre *",            placeholder: "Tu nombre",          type: "text",  req: true },
                      { id: "empresa",  label: "Empresa / Clínica *",  placeholder: "Nombre del negocio", type: "text",  req: true },
                      { id: "email",    label: "Email *",              placeholder: "tu@email.com",       type: "email", req: true },
                      { id: "telefono", label: "Teléfono",             placeholder: "+34 600 000 000",    type: "tel",   req: false },
                    ].map(({ id, label, placeholder, type, req }) => (
                      <div key={id}>
                        <label htmlFor={id} style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{label}</label>
                        <input
                          id={id}
                          type={type}
                          placeholder={placeholder}
                          value={formData[id]}
                          required={req}
                          onChange={e => setFormData({ ...formData, [id]: e.target.value })}
                          style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #D1D9E0", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color .2s", color: "#111827", background: "#fff" }}
                          onFocus={e => e.target.style.borderColor = TEAL}
                          onBlur={e => e.target.style.borderColor = "#D1D9E0"}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label htmlFor="tipo" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Tipo de negocio</label>
                    <select
                      id="tipo"
                      value={formData.tipo}
                      onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #D1D9E0", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", background: "#fff", color: formData.tipo ? "#111827" : "#9CA3AF" }}
                    >
                      <option value="">Selecciona una opción</option>
                      {["Clínica médica","Clínica dental","Centro de estética","Fisioterapia / bienestar","Otro negocio con citas"].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="mensaje" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Mensaje (opcional)</label>
                    <textarea
                      id="mensaje"
                      placeholder="Cuéntanos brevemente tu situación actual o qué te gustaría automatizar..."
                      value={formData.mensaje}
                      onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                      rows={4}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #D1D9E0", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color .2s", color: "#111827", background: "#fff" }}
                      onFocus={e => e.target.style.borderColor = TEAL}
                      onBlur={e => e.target.style.borderColor = "#D1D9E0"}
                    />
                  </div>
                  {submitError && (
                    <p style={{ textAlign: "center", fontSize: 14, color: "#E05C3A", marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>
                      No hemos podido enviar tu solicitud. Inténtalo de nuevo o escríbenos directamente a betterai1@hotmail.com.
                    </p>
                  )}
                  <button type="submit" disabled={sending} className="submit-btn"
                    style={{ width: "100%", background: TEAL, color: "#fff", padding: "16px", borderRadius: 10, fontSize: 16, fontWeight: 700, border: "none", cursor: sending ? "default" : "pointer", opacity: sending ? 0.7 : 1, fontFamily: "'DM Sans', sans-serif", transition: "background .2s, box-shadow .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    {sending ? "Enviando..." : <>Solicitar demo gratis <span className="cta-arrow"><ArrowRight size={18}/></span></>}
                  </button>
                  <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF", marginTop: 14, fontFamily: "'DM Sans', sans-serif" }}>Sin compromisos. Te contactamos en menos de 24h.</p>
                </form>
              </div>
            )}
          </FadeUp>
        </div>
      </section>

      <Footer/>

      {/* ══ STICKY MOBILE CTA ═════════════════════════════════════ */}
      <AnimatePresence>
        {pastHero && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden"
            style={{ position: "fixed", bottom: 20, left: 16, right: 16, zIndex: 100 }}
          >
            <a
              href="#formulario"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: TEAL, color: "#fff", padding: "15px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 8px 32px rgba(45,139,122,0.45)" }}
            >
              Solicitar demo gratis <ArrowRight size={18}/>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
