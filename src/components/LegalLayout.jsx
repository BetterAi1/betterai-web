import Navbar from "./Navbar";
import Footer from "./Footer";
import { TEAL } from "../theme";

export default function LegalLayout({ title, updated, children }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet"/>

      <Navbar/>

      <section style={{ background: "#F4F7FA", padding: "64px 24px 80px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: 1.5, display: "block", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Legal</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#111827", margin: "0 0 10px", letterSpacing: "-0.5px", fontFamily: "'DM Sans', sans-serif" }}>
            {title}
          </h1>
          <p style={{ fontSize: 14, color: "#9CA3AF", margin: "0 0 36px", fontFamily: "'DM Sans', sans-serif" }}>
            Última actualización: {updated}
          </p>

          <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", border: "1px solid #E8EEF3", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div className="legal-content">
              {children}
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
