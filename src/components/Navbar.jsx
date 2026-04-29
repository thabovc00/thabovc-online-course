/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "หน้าแรก", path: "/" },
  { label: "รวมวิชาทั้งหมด", path: "/courses" },
  { label: "ศูนย์ประกาศ", path: "/AnnouncementPage" },
  { label: "ติดต่อ", path: "/ContactPage" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // ✅ เพิ่ม/ปรับ State สำหรับเก็บข้อมูลนักเรียนให้ครบ
  const [userData, setUserData] = useState({
    name: "",
    major: "",
    level: ""
  });

  useEffect(() => {
    // ✅ ดึงข้อมูลทั้งหมดจาก localStorage
    const name = localStorage.getItem("userName");
    const major = localStorage.getItem("userMajor");
    const level = localStorage.getItem("userLevel");

    if (name) {
      setUserData({
        name: name,
        major: major || "ไม่ระบุสาขา",
        level: level || ""
      });
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }
  };

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

        {/* ✅ ส่วนขวามือ: แสดงชื่อ ชั้นปี และสาขา */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          
          {userData.name && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="lh-desktop-nav">
              <div style={{ textAlign: "right", lineHeight: "1.2" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>
                  {userData.name}
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>
                  {userData.level} {userData.major}
                </div>
              </div>
              <button 
                onClick={handleLogout}
                style={{
                  padding: "6px 12px",
                  fontSize: "13px",
                  color: "#ef4444",
                  border: "1px solid #fee2e2",
                  background: "#fef2f2",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                ออกจากระบบ
              </button>
            </div>
          )}

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
          {/* ✅ เวอร์ชัน Mobile: แสดงข้อมูลครบถ้วน */}
          {userData.name && (
             <div style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9", marginBottom: 5 }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>{userData.name}</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{userData.level} {userData.major}</div>
             </div>
          )}

          {navItems.map(item => (
            <button
              key={item.label}
              className={`lh-nav-link${location.pathname === item.path ? " active" : ""}`}
              style={{ textAlign: "left" }}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
            >{item.label}</button>
          ))}

          {userData.name && (
            <button
              style={{ textAlign: "left", color: "#ef4444", marginTop: 10 }}
              className="lh-nav-link"
              onClick={handleLogout}
            >ออกจากระบบ</button>
          )}
        </div>
      )}
    </>
  );
}