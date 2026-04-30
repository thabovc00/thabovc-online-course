/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const firstName = localStorage.getItem("userFirstName");
    const lastName = localStorage.getItem("userLastName");
    const phone = localStorage.getItem("userPhone");
    const level = localStorage.getItem("userLevel");
    const category = localStorage.getItem("userMajor");

    if (!username) {
      navigate('/');
      return;
    }

    setProfile({ username, firstName, lastName, phone, level, category });
    setLoading(false);
  }, [navigate]);

  if (loading) return null;

  if (!profile) return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <p style={{ color: "#475569", fontSize: "16px" }}>ไม่พบข้อมูลผู้ใช้งาน</p>
      <button
        onClick={() => { localStorage.clear(); navigate('/'); }}
        style={{ marginTop: "12px", padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        กลับไปหน้าล็อกอิน
      </button>
    </div>
  );

  return (
    <>
      <Navbar /> {/* ✅ เพิ่มบรรทัดนี้ */}

      <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>

        <div style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: "16px 16px 0 0", padding: "32px", color: "white", textAlign: "center" }}>
          <div style={{ width: "70px", height: "70px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "bold", border: "2px solid rgba(255,255,255,0.4)" }}>
            {profile.firstName?.charAt(0)}
          </div>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#ffffff" }}>
            {profile.firstName} {profile.lastName}
          </h2>
          <p style={{ opacity: 0.85, margin: "6px 0 0", fontSize: "14px", color: "#ffffff" }}>
            {profile.level} · {profile.category}
          </p>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "0 0 16px 16px", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <DataRow label="รหัสบัตรประชาชน / Username" value={profile.username} icon="👤" />
          <DataRow label="ชื่อ - นามสกุล" value={`${profile.firstName} ${profile.lastName}`} icon="📝" />
          <DataRow label="เบอร์โทรศัพท์" value={profile.phone} icon="📞" />
          <DataRow label="ระดับชั้น" value={profile.level} icon="🎓" />
          <DataRow label="แผนกวิชา / สาขา" value={profile.category} icon="🏫" />
        </div>

        <div style={{ textAlign: "center", marginTop: "24px", padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
          <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 8px 0" }}>* ข้อมูลนี้ดึงมาจากระบบฐานข้อมูลกลาง วิทยาลัยเทคโนโลยีวิชาชีพท่าบ่อ</p>
          <p style={{ color: "#ef4444", fontSize: "13px", margin: "0", fontWeight: "600" }}>** หากต้องการเปลี่ยนแปลงข้อมูล กรุณาติดต่อฝ่ายวิชาการ</p>
        </div>

      </div>
    </>
  );
}

function DataRow({ label, value, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
      <span style={{ fontSize: "22px" }}>{icon}</span>
      <div>
        <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "500", marginBottom: "4px" }}>{label}</div>
        <div style={{ fontSize: "16px", color: "#1e293b", fontWeight: "600" }}>{value || "-"}</div>
      </div>
    </div>
  );
}