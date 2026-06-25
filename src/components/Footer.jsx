import { useLocation, Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { TEAL, DARK_BG, DARK_BORDER } from "../theme";

const PRODUCT_LINKS = [
  { label: "Cómo funciona", anchor: "#como-funciona" },
  { label: "Casos de uso",  anchor: "#casos-de-uso" },
  { label: "Integraciones", anchor: "#integraciones" },
  { label: "FAQ",           anchor: "#faq" },
];

const LEGAL_LINKS = [
  { label: "Política de privacidad", to: "/politica-privacidad" },
  { label: "Aviso legal",            to: "/aviso-legal" },
  { label: "Cookies",                to: "/cookies" },
];

export default function Footer() {
  const location = useLocation();
  const prefix = location.pathname === "/" ? "" : "/";

  return (
    <footer style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}`, padding: "48px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            <Logo light/>
            <p style={{ fontSize: 14, color: "#6B8099", marginTop: 14, lineHeight: 1.7, maxWidth: 260, fontFamily: "'DM Sans', sans-serif" }}>
              Agentes IA personalizados para negocios que gestionan citas. Atención automática, 24/7, por WhatsApp.
            </p>
            <p style={{ fontSize: 13, color: "#3AA898", fontStyle: "italic", marginTop: 10, fontFamily: "'DM Sans', sans-serif" }}>Never miss an opportunity.</p>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E8F4F0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Producto</div>
            {PRODUCT_LINKS.map(({ label, anchor }) => (
              <a key={label} href={prefix + anchor} className="footer-link" style={{ display: "block", fontSize: 14, color: "#6B8099", marginBottom: 10, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color .2s" }}>{label}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E8F4F0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Legal</div>
            {LEGAL_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} className="footer-link" style={{ display: "block", fontSize: 14, color: "#6B8099", marginBottom: 10, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color .2s" }}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E8F4F0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Contacto</div>
            <a href="mailto:hola@betterai.es" style={{ display: "flex", alignItems: "center", gap: 8, color: "#6B8099", textDecoration: "none", fontSize: 14, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
              <Mail size={15}/> hola@betterai.es
            </a>
            <a href={`${prefix}#formulario`} className="footer-cta"
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
  );
}
