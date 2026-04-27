import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "หน้าแรก", path: "/" },
  { label: "รวมวิชาทั้งหมด", path: "/courses" },
  { label: "ศูนย์ประกาศ", path: "/AnnouncementPage" },
  { label: "ติดต่อ", path: "/ContactPage" },
];

export default function Navbar() { // ← เอา search, onSearchChange ออกเพราะไม่ได้ใช้แล้ว
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, background: "#fff",
        borderBottom: "1px solid #e2e8f0", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, color: "#fff", fontWeight: 700,
            }}>L</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>LearnHub</span>
          </div>

          <div className="lh-desktop-nav" style={{ display: "flex", gap: 2 }}>
            {navItems.map(item => (
              <button
                key={item.label}
                className={`lh-nav-link${location.pathname === item.path ? " active" : ""}`}
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
              >{item.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* ✅ ลบส่วนช่องค้นหา (location.pathname === "/courses") ออกไปแล้ว */}
          
          <button className="lh-hamburger" onClick={() => setMobileOpen(o => !o)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "#fff", borderBottom: "1px solid #e2e8f0",
          padding: "12px 20px", display: "flex", flexDirection: "column", gap: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {navItems.map(item => (
            <button
              key={item.label}
              className={`lh-nav-link${location.pathname === item.path ? " active" : ""}`}
              style={{ textAlign: "left" }}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
            >{item.label}</button>
          ))}
        </div>
      )}
    </>
  );
}