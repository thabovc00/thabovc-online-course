/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ 1. นำเข้า SweetAlert2

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const savedUsername = localStorage.getItem("userName");
      
      if (!savedUsername) {
        Swal.fire({
          icon: 'warning',
          title: 'ไม่พบข้อมูลผู้ใช้',
          text: 'กรุณาล็อกอินใหม่อีกครั้ง',
          confirmButtonColor: '#3085d6'
        }).then(() => navigate('/')); // บังคับกลับไปหน้าแรก
        setLoading(false);
        return;
      }

      // ✅ 2. เรียกใช้ Swal.fire แบบ Loading สวยๆ ก่อนดึงข้อมูล
      Swal.fire({
        title: 'กำลังดึงข้อมูลส่วนตัว...',
        text: 'โปรดรอสักครู่ ระบบกำลังเชื่อมต่อฐานข้อมูล',
        allowOutsideClick: false, // ห้ามคลิกข้างนอกเพื่อปิด
        showConfirmButton: false, // ซ่อนปุ่มตกลง
        width: '340px',
        padding: '2em',
        backdrop: `rgba(37, 99, 235, 0.2)`, // พื้นหลังสีฟ้าจางๆ ให้เข้ากับธีม
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const scriptURL = "https://script.google.com/macros/s/AKfycbwAq86PGKnwuXt3JwqSZ8Vz4VIDs8fq5Ean5TiZfnHg0FaYn0QHVQnv_7Yd1I1ZZsVRoQ/exec";

        const response = await fetch(scriptURL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            action: "getProfile",
            username: savedUsername
          }),
        });
        
        const result = await response.json();
        
        if (result.status === "success") {
          setProfile(result.profile);
          Swal.close(); // ✅ 3. ปิดกล่องโหลดเมื่อได้ข้อมูลสำเร็จ
        } else {
          // แจ้งเตือนเมื่อหาข้อมูลไม่เจอ
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: result.message || 'ไม่พบข้อมูลผู้ใช้งานนี้ในระบบ',
            confirmButtonColor: '#ef4444'
          });
        }
      } catch (error) {
        // แจ้งเตือนเมื่อเน็ตหลุดหรือเซิร์ฟเวอร์มีปัญหา
        Swal.fire({
          icon: 'error',
          title: 'การเชื่อมต่อขัดข้อง',
          text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ 4. ระหว่างโหลด ให้โชว์หน้าจอว่างๆ ไปเลย (เพราะ Swal ทำหน้าที่บังหน้าจอไว้อยู่แล้ว)
  if (loading) return null; 

  if (!profile) return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <p style={{ color: "#475569", fontSize: "16px" }}>ไม่พบข้อมูลผู้ใช้งาน (@{localStorage.getItem("userName")})</p>
      <button 
        onClick={() => { localStorage.clear(); navigate('/'); }}
        style={{ marginTop: "12px", padding: "8px 16px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        กลับไปหน้าล็อกอิน
      </button>
    </div>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      
      {/* ปุ่มย้อนกลับไปหน้ารวมวิชา */}
      <button 
        onClick={() => navigate('/courses')}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          color: "#2563eb",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "16px",
          padding: "0"
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        ย้อนกลับไปหน้ารวมวิชา
      </button>

      {/* ส่วนหัว Card */}
      <div style={{
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        borderRadius: "16px 16px 0 0",
        padding: "32px",
        color: "white",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
      }}>
        <div style={{
          width: "70px", height: "70px", background: "rgba(255,255,255,0.2)",
          borderRadius: "50%", margin: "0 auto 12px", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "bold",
          border: "2px solid rgba(255,255,255,0.4)"
        }}>
          {profile.firstName?.charAt(0)}
        </div>
        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>{profile.firstName} {profile.lastName}</h2>
        <p style={{ opacity: 0.85, margin: "6px 0 0", fontSize: "14px", letterSpacing: "0.5px" }}>@{profile.username}</p>
      </div>

      {/* ส่วนข้อมูล Detail */}
      <div style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "0 0 16px 16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.02)"
      }}>
        <DataRow label="รหัสนักเรียน / Username" value={profile.username} icon="👤" />
        <DataRow label="ชื่อ - นามสกุล" value={`${profile.firstName} ${profile.lastName}`} icon="📝" />
        <DataRow label="เบอร์โทรศัพท์" value={profile.phone} icon="📞" />
        <DataRow label="ระดับชั้น" value={profile.level} icon="🎓" />
        <DataRow label="แผนกวิชา / สาขา" value={profile.category} icon="🏫" />
      </div>

      {/* ส่วนหมายเหตุด้านล่าง */}
      <div style={{ textAlign: "center", marginTop: "24px", padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
        <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 8px 0" }}>
          * ข้อมูลนี้ดึงมาจากระบบฐานข้อมูลกลาง วิทยาลัยเทคโนโลยีวิชาชีพท่าบ่อ
        </p>
        <p style={{ color: "#ef4444", fontSize: "13px", margin: "0", fontWeight: "600" }}>
          ** หากต้องการเปลี่ยนแปลงข้อมูล กรุณาติดต่อฝ่ายวิชาการ
        </p>
      </div>

    </div>
  );
}

// Component ย่อยสำหรับแถวข้อมูล
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