import { useState } from "react";
import { useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import Logo from "./Logo";
import { TEAL, DARK_BG, DARK_CARD, DARK_BORDER } from "../theme";

const NAV_ITEMS = ["Problema","Solución","Cómo funciona","Casos de uso","FAQ"];
const navSlug = (item) => `#${item.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/\s/g,"-")}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // Las secciones solo existen en la home: desde otra página, el enlace debe volver a "/" primero.
  const prefix = location.pathname === "/" ? "" : "/";

  return (
    <nav style={{ background: DARK_BG, borderBottom: `1px solid ${DARK_BORDER}`, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none" }}><Logo light /></a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <a key={item} href={prefix + navSlug(item)} className="nav-link"
              style={{ color: "#9CAAB8", fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", transition: "color .2s" }}>
              {item}
            </a>
          ))}
        </div>
        <a href={`${prefix}#formulario`} className="hidden md:block nav-cta"
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
            <a key={item} href={prefix + navSlug(item)} onClick={() => setOpen(false)}
              style={{ display: "block", color: "#9CAAB8", fontSize: 15, padding: "10px 0", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", borderBottom: `1px solid ${DARK_BORDER}` }}>
              {item}
            </a>
          ))}
          <a href={`${prefix}#formulario`} onClick={() => setOpen(false)}
            style={{ display: "block", background: TEAL, color: "#fff", padding: "12px", borderRadius: 8, textAlign: "center", marginTop: 16, textDecoration: "none", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
            Solicitar demo
          </a>
        </div>
      )}
    </nav>
  );
}
